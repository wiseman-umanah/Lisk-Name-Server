// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract LiskNameServiceV2 is Initializable, OwnableUpgradeable, ReentrancyGuardUpgradeable, UUPSUpgradeable {
    struct Name {
        address owner;
        uint256 expires;
    }

    uint256 private debts;
    mapping(string => Name) public names;
    mapping(address => uint256) public pendingRefunds;
    address public feeRecipient; // Mitigate DoS
    uint256 public constant NAME_MAX_LENGTH = 18;
    uint256 public constant RENEWAL_PERIOD = 365 days;
    uint256 public constant MIN_FEE = 3 ether;
    uint256 public constant MAX_FEE = 30 ether;
    uint256 public constant MIN_NAME_LENGTH = 3;
    uint256 public constant BASE_PRICE = 30 ether;
    uint256 public constant PRICE_REDUCTION_PER_LETTER = 1_500_000_000_000_000_000; // 1.5 ether

    event NameRegistered(string indexed name, address indexed owner);
    event NameRenewed(string indexed name, uint256 newExpiry);
    event NameReleased(string indexed name, address indexed owner);
    event OwnershipTransferred(string indexed name, address indexed newOwner);
    event FundsReceived(address indexed sender, uint256 amount); // For storing funds
    event FundsReturned(address indexed sender, uint256 amount); // For immediate refunds

    // Storage gap for future upgrades
    uint256[50] private __gap;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();
        feeRecipient = msg.sender;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    function setFeeRecipient(address _recipient) external onlyOwner {
        require(_recipient != address(0), "Invalid recipient");
        feeRecipient = _recipient;
    }

    modifier validName(string memory _name) {
        uint256 nameLength = bytes(_name).length;
        require(nameLength >= MIN_NAME_LENGTH && nameLength <= NAME_MAX_LENGTH, "Invalid name length");
        bytes memory nameBytes = bytes(_name);
        for (uint256 i = 0; i < nameBytes.length; i++) {
            bytes1 char = nameBytes[i];
            require(
                (char >= 0x30 && char <= 0x39) || // 0-9
                (char >= 0x61 && char <= 0x7A), // a-z
                "Invalid character"
            );
        }
        _;
    }

    modifier onlyNameOwner(string memory _name) {
        require(names[_name].owner == msg.sender, "Not the owner");
        _;
    }

    function calculatePrice(string memory _name) public pure returns (uint256) {
        uint256 nameLength = bytes(_name).length;
        if (nameLength < MIN_NAME_LENGTH) {
            return MIN_FEE;
        }
    
        uint256 reduction = PRICE_REDUCTION_PER_LETTER * (nameLength - MIN_NAME_LENGTH);
        uint256 price = BASE_PRICE - reduction;
        if (price < MIN_FEE) {
            return MIN_FEE;
        }
        if (price > MAX_FEE) {
            return MAX_FEE;
        }
        return price;
    }

    function register(string memory _name) public payable nonReentrant validName(_name) {
        require(isAvailable(_name), "Name not available");
        uint256 price = calculatePrice(_name);
        require(msg.value >= price, "Insufficient fee");

        uint256 newExpiry = block.timestamp + RENEWAL_PERIOD;
        
        names[_name] = Name({
            owner: msg.sender,
            expires: newExpiry
        });

        if (msg.value > price) {
            uint256 refund = msg.value - price;
            pendingRefunds[msg.sender] += refund;
            debts += refund;
        }

        (bool success, ) = payable(feeRecipient).call{value: price}("");
        require(success, "Fee transfer failed");

        emit NameRegistered(_name, msg.sender);
    }

    function resolve(string memory _name) public view returns (address) {
        require(names[_name].owner != address(0) && block.timestamp <= names[_name].expires, "Name not registered or expired");
        return names[_name].owner;
    }

    function transfer(string memory _name, address _newOwner) public onlyNameOwner(_name) {
        require(block.timestamp <= names[_name].expires, "Name expired");
        require(_newOwner != address(0), "Invalid new owner");
        names[_name].owner = _newOwner;
        emit OwnershipTransferred(_name, _newOwner);
    }

    function isAvailable(string memory _name) public view returns (bool) {
        return names[_name].owner == address(0) || block.timestamp > names[_name].expires;
    }

    function renew(string memory _name) public payable nonReentrant {
        require(names[_name].owner == msg.sender, "Not the owner");
        uint256 price = calculatePrice(_name);
        require(msg.value >= price, "Insufficient fee");

        uint256 newExpiry = names[_name].expires + RENEWAL_PERIOD;
        
        names[_name].expires = newExpiry;

        if (msg.value > price) {
            uint256 refund = msg.value - price;
            pendingRefunds[msg.sender] += refund;
            debts += refund;
        }

        (bool success, ) = payable(feeRecipient).call{value: price}("");
        require(success, "Fee transfer failed");

        emit NameRenewed(_name, newExpiry);
    }

    function release(string memory _name) public onlyNameOwner(_name) {
        require(block.timestamp <= names[_name].expires, "Name expired");
        delete names[_name];
        emit NameReleased(_name, msg.sender);
    }

    function claimRefund() public nonReentrant {
        uint256 amount = pendingRefunds[msg.sender];
        require(amount > 0, "No refund available");
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Refund failed");
        
        pendingRefunds[msg.sender] = 0;
        debts -= amount;

        emit FundsReturned(msg.sender, amount);
    }

    function withdraw() public onlyOwner nonReentrant {
        uint256 balance = address(this).balance - debts;
        require(balance > 0, "No funds to withdraw");
        (bool success, ) = payable(feeRecipient).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    function getDebts() public view onlyOwner returns (uint256) {
        return debts;
    }

    receive() external payable nonReentrant {
        (bool success, ) = payable(msg.sender).call{value: msg.value}("");
        require(success, "Refund failed");
        emit FundsReturned(msg.sender, msg.value);
    }
}

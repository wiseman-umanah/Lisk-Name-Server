import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-ethers";


const account = vars.get('WALLET_KEY');

const config: HardhatUserConfig = {
  solidity: "0.8.23",
  networks: {
    'lisk-sepolia': {
      url: 'https://rpc.sepolia-api.lisk.com',
      accounts: [account as string],
      gasPrice: 1000000000,
    },
  },
};

export default config;

# 🌐 Lisk Name Service (LNS)

> A decentralized, human-readable naming system for the Lisk Layer 2 blockchain — bringing Web3 identity, simplicity, and interoperability to high-growth markets and the Optimism Superchain.

---

## ✨ Overview

**Lisk Name Service (LNS)** is a decentralized naming protocol that allows users, developers, and enterprises to register readable and portable blockchain names like `yourname.lisk` instead of complex hexadecimal addresses.

LNS is designed to integrate directly with the Lisk Layer 2 chain (EVM-compatible) and interoperates across the **Optimism Superchain** including networks like Optimism, Base, Mode, and Worldchain.

Whether you're a user sending tokens, a DAO managing your identity, or a developer building the next killer DApp — LNS gives you a secure, accessible Web3 identity.

---

## 🔍 Key Features

- 🔤 **Human-Readable Names**  
  Replace 0x-like wallet addresses with simple `.lisk` names for payments, login, and more.

- 🆔 **Decentralized Identity (DID)**  
  Build your on-chain reputation, associate metadata (avatar, bio, socials), and manage keys securely.

- 🔗 **Cross-Chain Compatibility**  
  Works on Lisk EVM and integrates with other Superchain networks for full interoperability.

- 🧩 **Developer Friendly**  
  Open APIs and smart contracts for resolving, reverse resolving, and registry management.

- 💰 **Tokenomics & Incentives (Upcoming)**  
  Staking, referral rewards, and DAO governance for long-term sustainability.

---

## 🏗️ Architecture

LNS consists of the following core components:

- **Name Registry Smart Contract**:  
  Stores name ownership and metadata (address, avatar, content hash, etc.)

- **Resolver Contract**:  
  Allows dApps and wallets to resolve `.lisk` names to addresses and metadata.

- **Reverse Resolver**:  
  Maps an address back to the `.lisk` name (optional but improves UX).

- **Frontend DApp**:  
  User-facing interface for searching, registering, and managing names.

- **Backend API (Optional)**:  
  For caching queries, search indexing, and analytics.

---

## 🧪 MVP Scope

The MVP includes:

- ✅ Registration of `.lisk` names
- ✅ ERC-721 compatible ownership (NFT-style)
- ✅ Resolution of names to Lisk EVM addresses
- ✅ Frontend interface with wallet connect
- ✅ Public testnet deployment

---

## 🚀 Getting Started

### 🔧 Requirements

- Node.js ≥ v18.x
- Hardhat or Foundry
- Metamask or WalletConnect-enabled wallet
- Lisk SDK CLI (optional)

### 🛠️ Installation

Clone the repository:

```bash
git clone https://github.com/your-org/lisk-name-service.git
cd lisk-name-service
```

Install dependencies:

```bash
npm install
# or
yarn
```

Deploy contracts (to Lisk Testnet):

```bash
npx hardhat deploy --network lisk-testnet
```

Run frontend locally:

```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Live Demo (Coming Soon)
*Testnet Access | Demo Videos | Faucet Link | Docs*

---

## 📦 Repository Structure

```
.        
├── frontend/            # React-based DApp frontend
├── contract/             # Solidity smart contract
└── README.md            # Project overview and docs
```

---

## 🪙 Token Utility (Planned)

* Register or renew `.lisk` domains
* DAO governance of name policies and pricing
* Discounted pricing for early adopters

---

## 👥 Target Users

* Everyday users seeking an easy blockchain identity
* Lisk-based apps and wallets
* Local founders in high-growth regions
* DAOs and web3 brands looking to establish presence
* Developers seeking DID integrations

---

## 🤝 Contributing

We welcome contributions from developers, designers, and community managers!

### To Contribute:

1. Fork this repository
2. Create a new feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request


---

## 📚 Resources

* 📘 [Lisk Official Docs](https://lisk.com/documentation)
* 📘 [Optimism Superchain](https://optimism.io/superchain)
* 💬 Community Chat: [Discord](https://discord.gg/lisk)
* 📢 Twitter/X: [@lisk](https://twitter.com/liskhq)

---

## 🧠 Vision

LNS is not just a naming service. It’s a **foundational identity layer** for the Lisk ecosystem — one that will power login systems, content networks, wallets, metaverse handles, and reputation protocols in the decentralized future.


---

## 🧑‍🚀 Join Us

We’re building the identity layer for a new era of the web. Join the mission — register your `.lisk` name and help make Web3 more human, accessible, and local.


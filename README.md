# 🛰 Telehash

Telehash is a blockchain-based telemetry and command provenance system designed for satellite missions and deep space infrastructure.

---

## 🔧 What This Repo Includes

- ✅ Solidity Smart Contract (`Telehash.sol`)
- ✅ Hardhat setup for local/testnet deployment
- ✅ Command logging and data event tracking per satellite
- ✅ Deployment scripts
- ✅ `.env`-based wallet integration

---

## 💡 Purpose

Designed for space agencies like **NASA**, **ISRO**, or **SpaceX** to:
- Log satellite commands immutably
- Upload telemetry hash + metadata
- Improve deep space mission transparency

---

## 📄 Deployed Smart Contract

📍 Deployed on BNB Testnet:  
[`0x76ca0FdbE82Fb9a0a23b5fA8A1Bb3844DFA2b3Ea`](https://testnet.bscscan.com/address/0x76ca0FdbE82Fb9a0a23b5fA8A1Bb3844DFA2b3Ea#code)

---

## 📦 Related Projects

| Repository              | Description                                      |
|--------------------------|--------------------------------------------------|
| [`telehash-frontend`](https://github.com/yourusername/telehash-frontend) | React dashboard UI for uploading, viewing logs |
| [`telehash-storage`](https://github.com/yourusername/telehash-storage)   | Greenfield integration for decentralized file storage |

---

## 📁 Key Files

| File/Folder      | Purpose                        |
|------------------|--------------------------------|
| `contracts/`     | Contains the smart contract     |
| `scripts/`       | Deploy and test scripts         |
| `hardhat.config.js` | Hardhat + network setup       |
| `.env`           | Wallet private key (never commit this)

---

## ✅ Getting Started

```bash
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network testnet

# 🛰 Telehash

Telehash is a blockchain-based telemetry and command provenance system designed for satellite missions and deep space infrastructure.

## 🔧 What This Repo Includes

- ✅ Solidity Smart Contract (`Telehash.sol`)
- ✅ Hardhat setup for local/testnet deployment
- ✅ Command logging and data event tracking per satellite
- ✅ Deployment scripts
- ✅ `.env`-based private key integration

## 💡 Purpose

Designed for use by space agencies like NASA, ISRO, or SpaceX to:
- Log satellite command events immutably
- Upload telemetry hashes and metadata securely
- Decentralize mission-critical logs

---

## 📦 Sub-Projects

| Project              | Description                                      |
|----------------------|--------------------------------------------------|
| [`telehash-frontend`](https://github.com/yourusername/telehash-frontend) | Web UI dashboard with wallet connect, logs, and analytics |
| [`telehash-storage`](https://github.com/yourusername/telehash-storage)   | Greenfield SDK integration for decentralized telemetry storage |

---

## 📁 Key Files

| File/Folder      | Purpose                        |
|------------------|--------------------------------|
| `contracts/`     | Contains `Telehash.sol` smart contract |
| `scripts/`       | Hardhat deploy + test scripts  |
| `.env`           | Stores wallet private key (not committed) |
| `hardhat.config.js` | Network and compiler config  |

---

## 🔐 Security

- Wallet interactions are secured using `.env`
- All satellite commands and data logs are immutably stored onchain

---

## ✅ Getting Started

```bash
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network testnet

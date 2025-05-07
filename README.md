# Sui Escrow dApp

This is a decentralized escrow application built on the [Sui blockchain](https://sui.io/) (devnet), using smart contracts written in Move. It allows users to securely lock, release and exchange NFTs through an intuitive React-based frontend.

## 🔧 Tech Stack

- **Smart Contracts**: Move on Sui
- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Wallet Integration**: `@mysten/sui.js` and `@mysten/dapp-kit`

## 💡 Features

- Mint demo NFTs on-chain
- Lock NFTs into escrow using Sui Move contracts
- Unlock and claim NFTs via frontend interaction
- Uses shared and owned object logic in Sui
- Smooth frontend-to-backend integration using Sui Kit

## 🚧 Challenges I Faced

- Handling shared vs. owned objects in Move
- Designing transactions that respect Sui's object ownership model
- Syncing wallet state changes in frontend after actions like minting or locking
- Making the UI reflect blockchain state without requiring a manual refresh

## 🧪 Try It Locally

```bash
git clone https://github.com/bhanavigoyal/sui-escrow.git
cd sui-escrow
npm install
npm run dev
```

## 📂 Project Structure
- ``contract/`` - Contains Move contracts for NFT and escrow logic
- ``src/components/`` - Reusable UI components
- ``src/pages/`` - Main views and routing

Built with ❤️ using Move and React.
Open to feedback, DMs welcome!


# Spacebear NFT Hardhat Project

This repository is a focused Hardhat workspace that demonstrates an ERC‑721 NFT implementation with a minimal deployment pipeline, automated tests, and trusted configuration for Sepolia and verification tooling.

## Key Components

- **`contracts/Spacebear.sol`** – A single ERC‑721 contract that inherits from `ERC721URIStorage` and `Ownable`. It exposes a `safeMint` helper that only the owner can call, stores metadata URIs, and keeps a predictable `_nextTokenId` counter.
- **`test/Spacebear.js`** – Two Chai-powered tests deployed via Hardhat’s Ethers plugin: one checks that minting succeeds, and the other ensures a non-owner cannot transfer someone else’s token, expecting the `ERC721InsufficientApproval` error.
- **`hardhat.config.cjs`** – Specifies Solidity `0.8.28`, enables Sepolia deployments via Infura, and wires in Etherscan and Sourcify verification. Sensitive credentials are read from `.secret`, `.infura`, and `.etherscan`.
- **`ignition/`** – Placeholder directory for Hardhat Ignition modules. No automatic templates are currently configured, but the folder keeps the workspace compatible with future ignition deployments.

## Prerequisites

1. Install dependencies (this repo uses `pnpm`):

   ```bash
   pnpm install
   ```

2. Provide secrets for live networks:

   | File | Contents | Usage |
   | --- | --- | --- |
   | `.secret` | Mnemonic phrase for deployment account | Sepolia and any other networks that need a funded wallet |
   | `.infura` | Infura project ID | Sepolia RPC endpoint |
   | `.etherscan` | Etherscan API key | Contract verification |

   Keep these files out of version control (already ignored) and protect them like private keys.

## Running Tests

The suite uses Hardhat’s built-in networks and expects access to the compiled `Spacebear` contract:

```bash
pnpm hardhat test
```

Tests cover minting logic plus a rejection case for unauthorized transfers, ensuring the contract emits the appropriate custom error from the OpenZeppelin ERC‑721 base.

## Deploying to Sepolia

1. Make sure `.secret` and `.infura` are populated.
2. Compile the contracts:

   ```bash
   pnpm hardhat compile
   ```

3. Deploy (customize deploy script or use Ignition when ready). For a manual deploy:

   ```bash
   pnpm hardhat run scripts/deploy.js --network sepolia
   ```

   (Add a `scripts/deploy.js` if you need scripted deployments; right now the repo only provides the contract and tests.)

4. Verify on Etherscan:

   ```bash
   pnpm hardhat verify --network sepolia <DEPLOYED_ADDRESS> "ConstructorArg1" ...
   ```

## Next Steps

- Add a deployment script inside `scripts/` if you want a repeatable on-chain rollout.
- Improve coverage with more behavior tests (mint limits, transfer hooks, metadata consistency) and enable `solidity-coverage` if needed.
- Wire up Ignition modules within `ignition/modules/` when automated deployment graphs are required.

Let me know if you want help adding scripts, gating with CI, or expanding verifications.

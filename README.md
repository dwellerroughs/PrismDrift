# PrismDrift

Built for Base

PrismDrift is a small, Base-native repository that emphasizes repeatable validation over complexity. It combines OnchainKit’s wallet UX with Viem-based JSON-RPC reads to confirm that your Base environment is wired correctly.

## What You Get

Primary file: app/prismDrift.ts

When you run PrismDrift in a browser, it:
- provides wallet onboarding via OnchainKit Wallet
- pins the app to a selected Base network (Mainnet or Sepolia)
- reads onchain state from Base RPC:
  - chainId
  - latest block number
  - ETH balance for a supplied address
- surfaces the relevant Basescan explorer URL for quick inspection

## Base Networks

Base Sepolia (testnet)  
- chainId (decimal): 84532  
- Explorer: https://sepolia.basescan.org  
- RPC: https://sepolia.base.org  

Base Mainnet  
- chainId (decimal): 8453  
- Explorer: https://basescan.org  
- RPC: https://mainnet.base.org  

## Repository Layout

- app/
  - prismDrift.ts
    React entry component: OnchainKit wallet UX + Base RPC reads (Viem).

Common supporting files:
- package.json
- tsconfig.json
- index.html / main.tsx
- .env (optional)

## Libraries

OnchainKit
- Wallet UI components and Base-first primitives
- https://github.com/coinbase/onchainkit

Viem
- EVM client library used for Base JSON-RPC queries

## Installation and Running

Requirements:
- Node.js 18+
- Browser environment with wallet support

Install dependencies with your preferred package manager and run using a standard React/Vite or Next.js dev server.

Optional environment variables:
- VITE_BASE_RPC_URL
- VITE_BASE_SEPOLIA_RPC_URL

## Notes

- Prefer Base Sepolia for integration validation (chainId 84532).
- If the RPC chainId does not match the selected network, verify wallet network settings.
- Public RPC endpoints are rate-limited and best suited for development usage.

## Base Mainnet Deployment

Deployed on Base Mainnet

Network: Base Mainnet  
chainId (decimal): 8453  
Explorer: https://basescan.org  

Deployed contract address:  
your_adress  

Basescan deployment and verification links:
- Contract address:  
  https://basescan.org/address/your_adress  
- Contract verification (source code):  
  https://basescan.org/address/your_adress#code  

## License

MIT License

## Author

GitHub: https://github.com/dwellerroughs 
Public contact (email): roughs_dweller0v@icloud.com
Public contact (X): https://x.com/Kapustin53

## Testnet Deployment (Base Sepolia)

A Base Sepolia deployment is kept as a test harness so the repository can be validated against real Base testnet infrastructure.

**Network:** Base Sepolia  
**chainId (decimal):** 84532  
**Explorer:** https://sepolia.basescan.org  

**Contract #1 address:**  
0x9474070cd709ea7a9f700f01d82c394569d33740

Deployment and verification:
- https://sepolia.basescan.org/address/0x9474070cd709ea7a9f700f01d82c394569d33740 
- https://sepolia.basescan.org/0x9474070cd709ea7a9f700f01d82c394569d33740/0#code  

**Contract #2 address:**  
0xdcc892a08e8704c0e400036bf020bace9e4a64da

Deployment and verification:
- https://sepolia.basescan.org/address/0xdcc892a08e8704c0e400036bf020bace9e4a64da
- https://sepolia.basescan.org/0xdcc892a08e8704c0e400036bf020bace9e4a64da/0#code  


This testnet footprint supports validation of Base-compatible tooling, account abstraction-adjacent flows, and read-only onchain checks before moving to Base Mainnet.

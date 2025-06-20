# Lisk Name Service SDK (JS/TS)

> A lightweight JavaScript/TypeScript SDK to resolve `.lisk` names into wallet addresses via the Lisk Name Service API.

## ✨ Features

- 🔐 Secure resolution via API key
- 🧠 Simple `resolve(name)` method
- 🌐 Works in both browser and Node.js (Axios-based)
- 📦 Supports tree-shaking and TypeScript types

---

## 📦 Install

```bash
npm install lisk-name-service
```

## Usage

```
import { LNSClient } from 'lisk-name-service';

const lns = new LNSClient('your-api-key');

const result = await lns.resolve('wiseman');
console.log(result);
```

## API

new LNSClient(apiKey: string)

Create a new client instance.

    `apiKey` – your unique API key (provided after wallet connect).

    `baseUrl` – optional. Default points to production API.

`resolve(name: string): Promise<string>`

Resolves a .lisk name to its associated Ethereum-compatible wallet address.

Returns:

    address: string – the resolved Ethereum-compatible wallet address.

    Throws if name is not found or expired.

## 🧪 Build (for contributors)

```
pnpm install
pnpm build
pnpm test
```

## 🔐 Notes

    You must generate your API key by authenticating with your wallet on the LNS frontend.

    Make sure your API key is kept secret and never exposed in frontend code.

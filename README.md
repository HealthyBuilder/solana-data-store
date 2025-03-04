# Solana Data Store

## Overview

This project is a Solana smart contract built using **Anchor** that allows users to:

- **Create** a new account with data stored on-chain.
- **Update** existing data stored in the account.
- **Delete** the account and remove stored data.

The smart contract and tests have been successfully executed, ensuring proper functionality.

## Test Results

After running tests, the output confirms that all operations work as expected:

```sh
Running tests...
anchor.test.ts:
Solana Data Store
  Transaction successful: 4q6Nzq2bQ1NVUevBEsxHPMsjyTqB3yyfpUwtnMqxT6hC22ktGRLWaaG23JWGr1tzYaUonDgxEJX8z9V2UdeVUkL
  Stored Data: hello world
  ✔ Creates a new data account (1120ms)
  Updated Data: Hello Web3
  ✔ Updates the data account (4626ms)
  Account successfully deleted
  ✔ Delete the data account (1543ms)

3 passing (7s)
```

## Installation and Setup

### 1. Install Dependencies

Navigate to your project directory and run:

```sh
yarn
```

### 2. Build the Smart Contract

Compile the Anchor program:

```sh
anchor build
```

### 3. Run Tests

To verify that the smart contract works as expected:

```sh
anchor test
```

### 4. Run the Client

Execute the client script if applicable:

```sh
anchor run client
```

### Notes

- If running locally, ensure **Solana CLI, Anchor, Node.js, and Yarn** are installed.
- You may need to adjust test code for local execution since some **Playground-exclusive features** (e.g., `pg.wallets.myWallet`) need manual keypair loading.
- Or feel free to copy ***lib.rs*** and ***anchor.test.ts*** directly to Solana Playground

## License

This project is open-source under the MIT License.


import * as anchor from "@coral-xyz/anchor";
import * as web3 from "@solana/web3.js";
import type { SolanaDataStore } from "../target/types/solana_data_store";

describe("Solana Data Store", () => {
  // Configure the client to use the local cluster
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaDataStore as anchor.Program<SolanaDataStore>;
  
  before(async () => {
    if (!program) {
      throw new Error(
        "program is undefined. Make sure your program is deployed."
      );
    }
  });
  it("Creates a new data account", async () => {
    // Generate keypair for the new account
    const dataAccountKp = new web3.Keypair();

    // Send transaction to create the account
    const txHash = await program.methods
      .create("hello world")
      .accounts({
        dataAccount: dataAccountKp.publicKey,
        signer: program.provider.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([dataAccountKp])
      .rpc();

    console.log(`Transaction successful: ${txHash}`);

    // Wait for transaction confirmation before fetching
    await program.provider.connection.confirmTransaction(txHash, "confirmed");

    // Fetch and verify the created account
    const account = await program.account.dataAccount.fetch(
      dataAccountKp.publicKey
    );

    // Fetch and verify the created account
    // const account = await program.account.dataAccount.fetch(
    //   dataAccountKp.publicKey
    // );

    console.log("Stored Data:", account.data);

    if (account.data !== "hello world") {
      throw new Error("Data mismatch: Expected 'hello world'");
    }
  });

  it("Updates the data account", async () => {
    const dataAccountKp = new web3.Keypair();

    // Create the account
    const createTxHash = await program.methods
      .create("hello world")
      .accounts({
        dataAccount: dataAccountKp.publicKey,
        signer: program.provider.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([dataAccountKp])
      .rpc();

    // Confirm creation before updating
    await program.provider.connection.confirmTransaction(createTxHash, "confirmed");

    // Update the account
    const updateTxHash = await program.methods
      .update("Hello Web3")
      .accounts({
        dataAccount: dataAccountKp.publicKey,
      })
      .rpc();

    // Confirm the update before fetching
    await program.provider.connection.confirmTransaction(updateTxHash, "confirmed");

    // Fetch and verify updated data
    const account = await program.account.dataAccount.fetch(
      dataAccountKp.publicKey
    );
    console.log("Updated Data:", account.data);

    if (account.data !== "Hello Web3") {
      throw new Error("Data mismatch: Expected 'Hello Web3'");
    }
  });

  it("Delete the data account", async () => {
    // Generate a keypair for the new account
    const dataAccountKp = new web3.Keypair();

    // Create the amount first
    await program.methods
      .create("hello world")
      .accounts({
        dataAccount: dataAccountKp.publicKey,
        signer: program.provider.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([dataAccountKp])
      .rpc();

    // Send transaction to delete the account
    await program.methods
      .delete()
      .accounts({
        dataAccount: dataAccountKp.publicKey,
        signer: program.provider.publicKey,
      })
      .rpc();

    // Try fetching the deleted account (should fail)
    try {
      await program.account.dataAccount.fetch(dataAccountKp.publicKey);
      throw new Error("Account was not deleted properly");
    } catch (e) {
      console.log("Account successfully deleted");
    }
  });
});

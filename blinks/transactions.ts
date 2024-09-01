import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import { MediatorProgram, MediatorProgramIDL } from "./idl";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { CONNECTION } from "./config";

// SAMPLE TRANSACTION
export const transferSolTransaction = async ({
  from,
}: {
  from: string;
}): Promise<Transaction> => {
  const fromPubkey = new PublicKey(from);
  const toPubkey = new PublicKey(
    "CfurJW5g544kWypk2mik3dpJBzDAtMXBS4qseoePkqwi"
  );

  const minimumBalance = await CONNECTION.getMinimumBalanceForRentExemption(0);

  const transaction = new Transaction();
  transaction.feePayer = fromPubkey;

  transaction.add(
    SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: toPubkey,
      lamports: minimumBalance,
    })
  );

  transaction.recentBlockhash = (
    await CONNECTION.getLatestBlockhash()
  ).blockhash;

  return transaction;
};

interface ITakeEscrowTransaction {
  taker: string;
  escrow: string;
}

export const takeEscrowTransaction = async ({
  taker,
  escrow,
}: ITakeEscrowTransaction) => {
  const takerPubkey = new PublicKey(taker);
  const escrowPubkey = new PublicKey(escrow);

  const provider = new AnchorProvider(
    CONNECTION,
    Keypair.generate() as unknown as Wallet
  );

  const program = new Program<MediatorProgramIDL>(MediatorProgram, provider);

  const escrowAccount = await program.account.escrow.fetch(escrow);

  const vault = getAssociatedTokenAddressSync(
    escrowAccount.mintA,
    escrowPubkey,
    true,
    TOKEN_PROGRAM_ID
  );

  const takerAtaA = getAssociatedTokenAddressSync(
    escrowAccount.mintA,
    takerPubkey,
    false,
    TOKEN_PROGRAM_ID
  );

  const takerAtaB = getAssociatedTokenAddressSync(
    escrowAccount.mintB,
    takerPubkey,
    false,
    TOKEN_PROGRAM_ID
  );

  const makerAtaB = getAssociatedTokenAddressSync(
    escrowAccount.mintB,
    escrowAccount.maker,
    false,
    TOKEN_PROGRAM_ID
  );

  const accounts = {
    taker: takerPubkey,
    maker: escrowAccount.maker,
    mintA: escrowAccount.mintA,
    mintB: escrowAccount.mintB,
    takerAtaA: takerAtaA,
    takerAtaB: takerAtaB,
    makerAtaB: makerAtaB,
    escrow: escrowPubkey,
    vault: vault,
    tokenProgram: TOKEN_PROGRAM_ID,
  };

  const tx = await program.methods
    .take()
    .accounts({
      ...accounts,
    })
    .transaction();
  tx.feePayer = takerPubkey;
  tx.recentBlockhash = (await CONNECTION.getLatestBlockhash()).blockhash;
  return tx;
};

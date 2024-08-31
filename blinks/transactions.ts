import express, { Request, Response, NextFunction } from "express";
import {
  ActionGetResponse,
  ActionPostResponse,
  ActionsJson,
  createPostResponse,
} from "@solana/actions";
import cors from "cors";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { MediatorProgram, MediatorProgramIDL } from "./idl";
import {
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";

export const transferSolTransaction = async ({
  from,
}: {
  from: string;
}): Promise<Transaction> => {
  const fromPubkey = new PublicKey(from);
  const toPubkey = new PublicKey(
    "CfurJW5g544kWypk2mik3dpJBzDAtMXBS4qseoePkqwi"
  );

  const connection = new Connection(clusterApiUrl("mainnet-beta"));

  const minimumBalance = await connection.getMinimumBalanceForRentExemption(0);

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
    await connection.getLatestBlockhash()
  ).blockhash;

  return transaction;
};

interface ITakeEscrowTransaction {
  taker: string;
}

export const takeEscrowTransaction = async ({
  taker,
}: ITakeEscrowTransaction) => {
  const takerPubkey = new PublicKey(taker);

  const program = new Program<MediatorProgramIDL>(MediatorProgram);

  const escrow = new PublicKey("6MZhJLKvYtAVsMGE5QECd1C5uucMu9UVihazKCaJz6vk");

  const vault = getAssociatedTokenAddressSync(
    new PublicKey("6zsD1q2QvCmzuwSzurcHcMFuZ3PAhgtQZviRQsRBv8FP"),
    escrow,
    true,
    TOKEN_2022_PROGRAM_ID
  );
  return await program.methods
    .take()
    .accounts({
      escrow: new PublicKey("6MZhJLKvYtAVsMGE5QECd1C5uucMu9UVihazKCaJz6vk"),
      vault,
      maker_ata_b: new PublicKey(
        "6MZhJLKvYtAVsMGE5QECd1C5uucMu9UVihazKCaJz6vk"
      ),
    })
    .transaction();

  //   try {
  //     await program.methods
  //       .take()
  //       .accounts({ ...accounts })
  //       .signers([taker])
  //       .rpc()
  //       .then(confirm)
  //       .then(log);
  //   const toPubkey = new PublicKey(
  //     "CfurJW5g544kWypk2mik3dpJBzDAtMXBS4qseoePkqwi"
  //   );

  //   const connection = new Connection(clusterApiUrl("mainnet-beta"));

  //   const minimumBalance = await connection.getMinimumBalanceForRentExemption(0);

  //   const transaction = new Transaction();
  //   transaction.feePayer = fromPubkey;

  //   transaction.add(
  //     SystemProgram.transfer({
  //       fromPubkey: fromPubkey,
  //       toPubkey: toPubkey,
  //       lamports: minimumBalance,
  //     })
  //   );

  //   transaction.recentBlockhash = (
  //     await connection.getLatestBlockhash()
  //   ).blockhash;

  //   return transaction;
};

// #[derive(Accounts)]
// pub struct Take<'info> {
//     #[account(mut)]
//     pub taker: Signer<'info>,
//     #[account(mut)]
//     pub maker: SystemAccount<'info>,
//     pub mint_a: InterfaceAccount<'info, Mint>,
//     pub mint_b: InterfaceAccount<'info, Mint>,
//     #[account(
//         init_if_needed,
//         payer = taker,
//         associated_token::mint = mint_a,
//         associated_token::authority = taker,
//         associated_token::token_program = token_program,
//     )]
//     pub taker_ata_a: Box<InterfaceAccount<'info, TokenAccount>>,
//     #[account(
//         mut,
//         associated_token::mint = mint_b,
//         associated_token::authority = taker,
//         associated_token::token_program = token_program,
//     )]
//     pub taker_ata_b: Box<InterfaceAccount<'info, TokenAccount>>,
//     #[account(
//         init_if_needed,
//         payer = taker,
//         associated_token::mint = mint_b,
//         associated_token::authority = maker,
//         associated_token::token_program = token_program,
//     )]
//     pub maker_ata_b: Box<InterfaceAccount<'info, TokenAccount>>,
//     #[account(
//         mut,
//         close = maker,
//         has_one = maker,
//         has_one = mint_a,
//         has_one = mint_b,
//         seeds = [b"escrow", maker.key().as_ref(), escrow.seed.to_le_bytes().as_ref()],
//         bump = escrow.bump,
//     )]
//     pub escrow: Account<'info, Escrow>,
//     #[account(
//         mut,
//         associated_token::mint = mint_a,
//         associated_token::authority = escrow,
//         associated_token::token_program = token_program,
//     )]
//     pub vault: InterfaceAccount<'info, TokenAccount>,
//     pub token_program: Interface<'info, TokenInterface>,
//     pub associated_token_program: Program<'info, AssociatedToken>,
//     pub system_program: Program<'info, System>,
// }

import {
  clusterApiUrl,
  Connection,
  Keypair,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import wallet from "./wallet.json";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  MINT_SIZE,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";

(async () => {
  const CONNECTION = new Connection(clusterApiUrl("devnet"));

  const SIGNER = Keypair.fromSecretKey(new Uint8Array(wallet));
  const USDC_KEYPAIR = Keypair.generate();

  const minimumRent = await CONNECTION.getMinimumBalanceForRentExemption(
    MINT_SIZE
  );
  const ATA = getAssociatedTokenAddressSync(
    USDC_KEYPAIR.publicKey,
    SIGNER.publicKey,
    true,
    TOKEN_2022_PROGRAM_ID
  );

  const tx = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: SIGNER.publicKey,
      newAccountPubkey: USDC_KEYPAIR.publicKey,
      lamports: minimumRent,
      space: MINT_SIZE,
      programId: TOKEN_2022_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      USDC_KEYPAIR.publicKey,
      6,
      SIGNER.publicKey,
      null,
      TOKEN_2022_PROGRAM_ID
    ),
    createAssociatedTokenAccountIdempotentInstruction(
      SIGNER.publicKey,
      ATA,
      SIGNER.publicKey,
      USDC_KEYPAIR.publicKey,
      TOKEN_2022_PROGRAM_ID
    ),
    createMintToInstruction(
      USDC_KEYPAIR.publicKey,
      ATA,
      SIGNER.publicKey,
      1_000_000 * 10 ** 6,
      undefined,
      TOKEN_2022_PROGRAM_ID
    )
  );
  const hash = await sendAndConfirmTransaction(
    CONNECTION,
    tx,
    [SIGNER, USDC_KEYPAIR],
    undefined
  );
  console.log(hash);
  console.log(USDC_KEYPAIR.publicKey.toString());
})();

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
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { CONNECTION, UMI_INSTANCE, UMI_SIGNER } from "./config";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey } from "@metaplex-foundation/umi";
import {
  toWeb3JsLegacyTransaction,
  toWeb3JsTransaction,
} from "@metaplex-foundation/umi-web3js-adapters";

(async () => {
  const SIGNER = Keypair.fromSecretKey(new Uint8Array(wallet));
  const MINT_KEYPAIR = Keypair.generate();

  const minimumRent = await CONNECTION.getMinimumBalanceForRentExemption(
    MINT_SIZE
  );

  const latestBlockhash = await CONNECTION.getLatestBlockhash();
  const tokenProgram = TOKEN_PROGRAM_ID;

  const ATA = getAssociatedTokenAddressSync(
    MINT_KEYPAIR.publicKey,
    SIGNER.publicKey,
    true,
    tokenProgram
  );

  let accounts: CreateMetadataAccountV3InstructionAccounts = {
    mint: publicKey(MINT_KEYPAIR.publicKey.toString()),
    mintAuthority: UMI_SIGNER,
  };

  let data: DataV2Args = {
    name: "Image",
    symbol: "IMG",
    uri: "https://arweave.net/8R1Zwt_tumwbO_6vaCqBVEJ-8jG7wPkSpbLsPkLdWkY",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  };

  let args: CreateMetadataAccountV3InstructionArgs = {
    data: data,
    isMutable: false,
    collectionDetails: null,
  };

  const tx = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: SIGNER.publicKey,
      newAccountPubkey: MINT_KEYPAIR.publicKey,
      lamports: minimumRent,
      space: MINT_SIZE,
      programId: tokenProgram,
    }),
    createInitializeMintInstruction(
      MINT_KEYPAIR.publicKey,
      6,
      SIGNER.publicKey,
      null,
      tokenProgram
    ),
    toWeb3JsLegacyTransaction(
      createMetadataAccountV3(UMI_INSTANCE, {
        ...accounts,
        ...args,
      })
        .setBlockhash({ ...latestBlockhash })
        .build(UMI_INSTANCE)
    ),
    createAssociatedTokenAccountIdempotentInstruction(
      SIGNER.publicKey,
      ATA,
      SIGNER.publicKey,
      MINT_KEYPAIR.publicKey,
      tokenProgram
    ),
    createMintToInstruction(
      MINT_KEYPAIR.publicKey,
      ATA,
      SIGNER.publicKey,
      1_000_000 * 10 ** 6,
      undefined,
      tokenProgram
    )
  );
  const hash = await sendAndConfirmTransaction(
    CONNECTION,
    tx,
    [SIGNER, MINT_KEYPAIR],
    undefined
  );
  console.log(hash);
  console.log(MINT_KEYPAIR.publicKey.toString());
})();

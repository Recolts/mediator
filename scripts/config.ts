import { Connection } from "@solana/web3.js";
import wallet from "./wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  signerIdentity,
  createGenericFile,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

export const RPC_URL =
  "https://devnet.helius-rpc.com/?api-key=86841795-5a03-4192-bd44-cbe41117cb77";

export const CONNECTION = new Connection(RPC_URL);

export const UMI_INSTANCE = createUmi(RPC_URL);
UMI_INSTANCE.use(irysUploader());

export const keypair = UMI_INSTANCE.eddsa.createKeypairFromSecretKey(
  new Uint8Array(wallet)
);
export const UMI_SIGNER = createSignerFromKeypair(UMI_INSTANCE, keypair);

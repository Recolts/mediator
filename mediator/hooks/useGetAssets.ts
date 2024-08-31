import {
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AnchorProvider, BN, Program, Wallet } from "@coral-xyz/anchor";
import { MediatorProgram, MediatorProgramIDL } from "@/lib/programs/idl";
import { randomBytes } from "crypto";
import { RPC_INSTANCE } from "@/lib/http";
import { fetchAllDigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey } from "@metaplex-foundation/umi";

const TOKEN_ADDRESSES = [
  "EazMsFv3wPKvb3XMHfpaQe9tQtKaCsXw7mSKxZDhBfkU",
  "6JUdNJaobA7iKam5SUNTDqAfudSHGbVu4qvhcYPPQ43K",
  "So11111111111111111111111111111111111111112",
];

export default function useGetAssets() {
  const query = useQuery({
    queryFn: async () => {
      const UMI_INSTANCE = createUmi(
        "https://devnet.helius-rpc.com/?api-key=86841795-5a03-4192-bd44-cbe41117cb77"
      );

      return await fetchAllDigitalAsset(
        UMI_INSTANCE,
        TOKEN_ADDRESSES.map((e) => publicKey(e))
      );
    },
    queryKey: [],
  });

  return { ...query };
}

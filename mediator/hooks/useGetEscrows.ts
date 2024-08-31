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
import useGetAssets from "./useGetAssets";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { fetchAllDigitalAsset } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";

export default function useGetEscrows() {
  const { connection } = useConnection();
  const anchor = useAnchorWallet();
  // const { data: assets } = useGetAssets();

  const query = useQuery({
    queryFn: async () => {
      const provider = new AnchorProvider(
        connection,
        anchor as unknown as Wallet
      );
      const MEDIATOR_PROGRAM = new Program<MediatorProgramIDL>(
        MediatorProgram,
        provider
      );

      const TOKEN_ADDRESSES = [
        "EazMsFv3wPKvb3XMHfpaQe9tQtKaCsXw7mSKxZDhBfkU",
        "6JUdNJaobA7iKam5SUNTDqAfudSHGbVu4qvhcYPPQ43K",
        "So11111111111111111111111111111111111111112",
      ];
      const UMI_INSTANCE = createUmi(
        "https://devnet.helius-rpc.com/?api-key=86841795-5a03-4192-bd44-cbe41117cb77"
      );

      const escrows = await MEDIATOR_PROGRAM.account.escrow.all();

      const mintAddress = new Set<string>();

      escrows.forEach((e) => {
        mintAddress.add(e.account.mintA.toString());
        mintAddress.add(e.account.mintB.toString());
      });

      const mints = await fetchAllDigitalAsset(
        UMI_INSTANCE,
        [...mintAddress].map((e) => publicKey(e))
      );

      const parsed = escrows.map((e) => {
        const tempMintA = mints.find(
          (mintA) => mintA.publicKey.toString() === e.account.mintA.toString()
        );
        const tempMintB = mints.find(
          (mintB) => mintB.publicKey.toString() === e.account.mintB.toString()
        );

        return { ...e, mintA: tempMintA, mintB: tempMintB };
      });

      return parsed;

      // if (anchor && signTransaction) {
      //   const provider = new AnchorProvider(
      //     connection,
      //     anchor as unknown as Wallet
      //   );
      //   const MEDIATOR_PROGRAM = new Program<MediatorProgramIDL>(
      //     MediatorProgram,
      //     provider
      //   );
      //   const seed = new BN(randomBytes(8));
      //   const maker = anchor.publicKey!;
      //   const mintA = value.mintA!;
      //   const mintB = value.mintB!;
      //   const makerAtaA = getAssociatedTokenAddressSync(
      //     mintA,
      //     anchor.publicKey,
      //     false,
      //     TOKEN_2022_PROGRAM_ID
      //   );
      //   const escrow = PublicKey.findProgramAddressSync(
      //     [
      //       Buffer.from("escrow"),
      //       maker.toBuffer(),
      //       seed.toArrayLike(Buffer, "le", 8),
      //     ],
      //     MEDIATOR_PROGRAM.programId
      //   )[0];
      //   const vault = getAssociatedTokenAddressSync(
      //     mintA,
      //     escrow,
      //     true,
      //     TOKEN_2022_PROGRAM_ID
      //   );
      //   const tx = await MEDIATOR_PROGRAM.methods
      //     .make(seed, new BN(1e6), new BN(1e6))
      //     .accounts({
      //       maker,
      //       mintA,
      //       mintB,
      //       // @ts-ignore
      //       makerAtaA,
      //       escrow,
      //       vault,
      //       tokenProgram: TOKEN_2022_PROGRAM_ID,
      //     })
      //     .rpc();
      //   return tx;
      // }
      // return null;
    },
    queryKey: [],
  });

  return { ...query };
}

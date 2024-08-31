import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
import { AnchorProvider, BN, Program, Wallet } from "@coral-xyz/anchor";
import { MediatorProgram, MediatorProgramIDL } from "@/lib/programs/idl";
import { randomBytes } from "crypto";

interface IClaimBidArgs {
  mintA: PublicKey;
  mintB: PublicKey;
  maker: PublicKey;
  escrow: PublicKey;
}

export default function useClaimBid() {
  const { publicKey, sendTransaction, signTransaction } = useWallet();
  const { connection } = useConnection();
  const anchor = useAnchorWallet();

  const mutation = useMutation({
    mutationFn: async (value: IClaimBidArgs) => {
      if (anchor && signTransaction) {
        const provider = new AnchorProvider(
          connection,
          anchor as unknown as Wallet
        );
        const MEDIATOR_PROGRAM = new Program<MediatorProgramIDL>(
          MediatorProgram,
          provider
        );
        const seed = new BN(randomBytes(8));
        const taker = anchor.publicKey!;
        const maker = value.maker;
        const mintA = value.mintA!;
        const mintB = value.mintB!;

        const makerAtaB = getAssociatedTokenAddressSync(
          mintB,
          maker,
          false,
          TOKEN_PROGRAM_ID
        );

        const takerAtaA = getAssociatedTokenAddressSync(
          mintA,
          taker,
          false,
          TOKEN_PROGRAM_ID
        );

        const takerAtaB = getAssociatedTokenAddressSync(
          mintB,
          taker,
          false,
          TOKEN_PROGRAM_ID
        );

        const escrow = value.escrow;

        const vault = getAssociatedTokenAddressSync(
          mintA,
          escrow,
          true,
          TOKEN_PROGRAM_ID
        );

        console.log({
          taker: taker.toString(),
          maker: maker.toString(),
          mintA: mintA.toString(),
          mintB: mintB.toString(),
          makerAtaB: makerAtaB.toString(),
          takerAtaA: takerAtaA.toString(),
          takerAtaB: takerAtaB.toString(),
          escrow: escrow.toString(),
          vault: vault.toString(),
          tokenProgram: TOKEN_PROGRAM_ID,
        });

        const tx = await MEDIATOR_PROGRAM.methods
          .take()
          .accounts({
            // @ts-ignore
            taker,
            // @ts-ignore
            maker,
            mintA,
            mintB,
            // @ts-ignore
            makerAtaB,
            takerAtaA,
            takerAtaB,
            escrow,
            vault,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .rpc();

        return tx;
      }

      return null;
    },
  });

  return { ...mutation };
}

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
import { useEffect } from "react";

interface ICreateEscrowArgs {
  mintA: PublicKey;
  mintB: PublicKey;
  receive: number;
  deposit: number;
}

export default function useCreateEscrow() {
  const { publicKey, sendTransaction, signTransaction } = useWallet();
  const { connection } = useConnection();
  const anchor = useAnchorWallet();

  const mutation = useMutation({
    mutationFn: async (value: ICreateEscrowArgs) => {
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
        const maker = anchor.publicKey!;
        const mintA = value.mintA!;
        const mintB = value.mintB!;

        const makerAtaA = getAssociatedTokenAddressSync(
          mintA,
          anchor.publicKey,
          false,
          TOKEN_PROGRAM_ID
        );

        const escrow = PublicKey.findProgramAddressSync(
          [
            Buffer.from("escrow"),
            maker.toBuffer(),
            seed.toArrayLike(Buffer, "le", 8),
          ],
          MEDIATOR_PROGRAM.programId
        )[0];

        const vault = getAssociatedTokenAddressSync(
          mintA,
          escrow,
          true,
          TOKEN_PROGRAM_ID
        );

        const tx = await MEDIATOR_PROGRAM.methods
          .make(seed, new BN(1e6), new BN(1e6))
          .accounts({
            maker,
            mintA,
            mintB,
            // @ts-ignore
            makerAtaA,
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

  useEffect(() => {
    console.log(mutation.error);
  }, [mutation.error]);

  return { ...mutation };
}

import { FAUCET_KEYPAIR, PYUSD_MINT } from "@/lib/web3";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Transaction,
  Keypair,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";

interface IClaimFromFaucetArgs {
  mintAddress: PublicKey;
}

export default function useClaimFromFaucet() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  // TODO: Update this to data from the create escrow from
  const mutation = useMutation({
    mutationFn: async (value: IClaimFromFaucetArgs) => {
      if (publicKey) {
        const FAUCET = Keypair.fromSecretKey(new Uint8Array(FAUCET_KEYPAIR));

        const toATA = getAssociatedTokenAddressSync(
          value.mintAddress,
          publicKey,
          false,
          TOKEN_2022_PROGRAM_ID
        );

        const fromATA = getAssociatedTokenAddressSync(
          value.mintAddress,
          FAUCET.publicKey,
          false,
          TOKEN_2022_PROGRAM_ID
        );
        const tx = new Transaction().add(
          createAssociatedTokenAccountIdempotentInstruction(
            FAUCET.publicKey,
            toATA,
            publicKey,
            value.mintAddress,
            TOKEN_2022_PROGRAM_ID
          ),
          createTransferCheckedInstruction(
            fromATA,
            value.mintAddress,
            toATA,
            FAUCET.publicKey,
            10 * 10 ** 6,
            6,
            undefined,
            TOKEN_2022_PROGRAM_ID
          )
        );

        const hash = await sendAndConfirmTransaction(
          connection,
          tx,
          [FAUCET],
          undefined
        );

        return hash;
      }
      return null;
    },
  });

  return { ...mutation };
}

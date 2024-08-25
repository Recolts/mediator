"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import useClaimFromFaucet from "@/hooks/useClaimFromFaucet";
import { PYUSD_MINT, USDC_MINT } from "@/lib/web3";
import { PublicKey } from "@solana/web3.js";

export default function Home() {
  const { mutate, isPending } = useClaimFromFaucet();

  if (isPending) {
    return <></>;
  }

  const onMintPYUSD = () => {
    mutate({ mintAddress: new PublicKey(PYUSD_MINT) });
  };

  const onMintUSDC = () => {
    mutate({ mintAddress: new PublicKey(USDC_MINT) });
  };

  return (
    <main className="flex flex-col relative">
      <Navbar />

      <div className="flex flex-col gap-4">
        <Button onClick={onMintUSDC}>Mint USDC</Button>
        <Button onClick={onMintPYUSD}>Mint PYUSD</Button>
      </div>

      <Footer />
    </main>
  );
}

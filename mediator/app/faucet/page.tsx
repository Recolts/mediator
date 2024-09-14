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

      <div className="flex flex-col gap-4 p-4 md:p-8 lg:p-12 xl:p-16">
        <Button
          variant={"default"}
          onClick={onMintUSDC}
          className={
            "ty-title p-3.5 text-white-100 bg-white-8 hover:bg-white-16 ease-out duration-300"
          }
        >
          Mint USDC
        </Button>
        <Button
          variant={"default"}
          onClick={onMintPYUSD}
          className={
            "ty-title p-3.5 text-white-100 bg-white-8 hover:bg-white-16 ease-out duration-300"
          }
        >
          Mint PYUSD
        </Button>
      </div>

      <Footer />
    </main>
  );
}

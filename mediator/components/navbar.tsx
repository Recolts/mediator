"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/mediator-logo.svg";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";

interface INavbarProps {}

function Navbar({}: INavbarProps) {
  const [open, setopen] = useState(false);

  const handleOpen = () => {
    setopen((state) => !state);
  };

  // TODO: Update color of connect wallet
  return (
    <div className="flex justify-center w-full p-4 md:p-6 lg:p-8 top-0 sticky z-50 bg-black-16 backdrop-blur-2xl">
      <div className="flex w-full max-w-[1440px] justify-between">
        <Link href="/">
          <Image src={logo} alt={""} className="h-8 md:h-10 lg:h-12"></Image>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/faucet">
            <p className="text-white-100 text-base md:text-lg lg:text-2xl">
              Faucet
            </p>
          </Link>
          <WalletMultiButton />
        </div>
        {/* <div className="flex border rounded-xl p-1 border-blue-50">
          <Button variant={"connectwallet"}>Connect Wallet</Button>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;

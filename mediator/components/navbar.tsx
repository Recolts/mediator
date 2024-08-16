"use client";
import Image from "next/image";
import React, { useState } from "react";
// import Button from "../(components)/button";
import logo from "@/public/mediator-logo.svg";
import { Button } from "@/components/ui/button";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

interface INavbarProps {}

function Navbar({}: INavbarProps) {
  const [open, setopen] = useState(false);

  const handleOpen = () => {
    setopen((state) => !state);
  };

  // TODO: Update color of connect wallet
  return (
    <div className="flex justify-center w-full p-8 top-0 sticky z-50 bg-black-16 backdrop-blur-2xl">
      <div className="flex w-full max-w-[1440px] justify-between">
        <Image src={logo} alt={""} className="h-[2rem]"></Image>

        <WalletMultiButton />
        {/* <div className="flex border rounded-xl p-1 border-blue-50">
          <Button variant={"connectwallet"}>Connect Wallet</Button>
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;

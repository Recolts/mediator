"use client";
import Image from "next/image";
import React, { useState } from "react";
// import Button from "../(components)/button";
import logo from "@/public/mediator-logo.svg";
import { Button } from "@/components/ui/button";

interface INavbarProps {}

function Navbar({}: INavbarProps) {
  const [open, setopen] = useState(false);

  const handleOpen = () => {
    setopen((state) => !state);
  };
  return (
    <div className="flex justify-center w-full p-8">
      <div className="flex w-[960px] justify-between">
        <Image src={logo} alt={""}></Image>
        <div className="flex border rounded-xl p-1 border-blue-50">
          <Button variant={"connectwallet"}>Connect Wallet</Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

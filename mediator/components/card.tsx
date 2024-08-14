import React from "react";
import Image from "next/image";
import { useState } from "react";
import icon1 from "@/public/icons/Bonk.png";
import icon2 from "@/public/icons/Sol.png";
import icon3 from "@/public/icons/copy-01.svg";
import cancel from "@/public/cancel-01.svg";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const jsonObject = {
  amount: "586,129,222.02",
  currency: "Bonk",
  forAmount: "0",
  forCurrency: "SOL",
  programId: "0x132..a9s",
  escrowCreator: "0x132..a9s",
};

export default function Card() {
  return (
    <div className="flex flex-col border rounded-2xl bg-white-4 border-white-4 p-4 gap-4">
      <div className="flex justify-between gap-2">
        <div className="flex border rounded-full bg-yellow-4 border-yellow-8 text-yellow-100 ty-subtitle py-2 px-3">
          Unclaimed
        </div>
        <div className="flex ty-subtext text-white-50">July 09 • 11:45 PM</div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="flex items-center pr-3 pl-1 py-1 gap-2 rounded-full bg-white-4">
          <div className="flex border rounded-full border-white-16 p-1">
            <Image src={icon1} alt="Bonk Icon" />
          </div>
          <h1 className="ty-title text-white-100">BONK</h1>
        </div>
        <h1 className="ty-descriptions text-white-50">for</h1>
        <div className="flex items-center pr-3 pl-1 py-1 gap-2 rounded-full bg-white-4">
          <div className="flex border rounded-full border-white-16 p-1">
            <Image src={icon2} alt="SOL Icon" />
          </div>
          <h1 className="ty-subheading text-white-100">2.69</h1>
          <h1 className="ty-title text-white-100">SOL</h1>
        </div>
      </div>

      <div className="flex flex-col gap-2 grow">
        <div className="flex gap-1 items-center">
          <h1 className="ty-descriptions text-white-50 w-[108px]">
            Program ID
          </h1>
          <h1 className="ty-descriptions text-white-100">0x132..a9s</h1>
          <Image src={icon3} alt="Copy Icon" />
        </div>
      </div>

      <div className="flex flex-col gap-2 grow">
        <div className="flex gap-1 items-center">
          <h1 className="ty-descriptions text-white-50 w-[108px] text-nowrap">
            Escrow Creator
          </h1>
          <h1 className="ty-descriptions text-white-100">cryptofonzy.sol</h1>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"default"}
            className="ty-title p-3.5 text-white-100 bg-white-16"
          >
            Claim bidding
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription className="flex flex-col gap-4 relative">
              <div className="flex justify-between">
                <p className="ty-subtext text-white-50">Create an Escrow</p>
                <button className="p-2">
                  <Image src={cancel} alt="Cancel Icon" />
                </button>
              </div>
              <div className="p-4 bg-white-50 flex items-center justify-between rounded-xl">
                <p>{jsonObject.amount}</p>
                <Button
                  variant={"default"}
                  className="ty-title p-3.5 text-white-100 bg-white-16 gap-1"
                >
                  <Image src={icon1} alt="Bonk Icon" />
                  {jsonObject.currency}
                </Button>
              </div>
              <div className="flex justify-center">
                <p>for</p>
              </div>

              <div className="p-4 bg-white-50 flex items-center justify-between rounded-xl">
                <p>{jsonObject.forAmount}</p>
                <Button
                  variant={"default"}
                  className="ty-title p-3.5 text-white-100 bg-white-16 gap-1"
                >
                  <Image src={icon2} alt="SOL Icon" />
                  {jsonObject.forCurrency}
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <p>Program ID</p>
                <p>{jsonObject.programId}</p>
              </div>
              <div className="flex items-center gap-4">
                <p>Escrow Creator</p>
                <p>{jsonObject.escrowCreator}</p>
              </div>

              <Button
                variant={"default"}
                className="ty-title p-3.5 text-black-100 bg-white-100"
              >
                Approve Contract
              </Button>

              <div className="mt-4 p-4 bg-black-50 rounded-xl">
                <pre>{JSON.stringify(jsonObject, null, 2)}</pre>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

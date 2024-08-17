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
import { Check, CheckCircle, CheckCircle2Icon } from "lucide-react";

type jsonObject = {
  status: string;
  amount: number;
  currency: string;
  forAmount: number;
  forCurrency: string;
  programId: string;
  escrowCreator: string;
};

const Card = ({
  status,
  amount,
  currency,
  forAmount,
  forCurrency,
  programId,
  escrowCreator,
}: jsonObject) => {
  return (
    <div className="flex flex-col border rounded-2xl bg-white-4 border-white-4 p-4 gap-4">
      <div className="flex justify-between gap-2">
        {status == "Claimed" ? (
          <div className="flex border gap-2 items-center rounded-full bg-blue-100 border-blue-8 text-white-100 ty-subtitle py-2 px-3">
            {status}
            <Check className="h-3 w-3 text-white-100"></Check>
          </div>
        ) : (
          <div className="flex border rounded-full bg-yellow-4 border-yellow-8 text-yellow-100 ty-subtitle py-2 px-3">
            {status}
          </div>
        )}

        <div className="flex ty-subtext text-white-50">July 09 • 11:45 PM</div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="flex items-center pr-3 pl-1 py-1 gap-2 rounded-full bg-white-4">
          <div className="flex border rounded-full border-white-16 p-1">
            <Image src={icon1} alt="Bonk Icon" />
          </div>
          <p className="ty-subheading text-white-100 max-w-[168px] text-ellipsis text-nowrap overflow-hidden">
            {amount}
          </p>
          <p className="ty-title text-white-100 uppercase">{currency}</p>
        </div>
        <p className="ty-descriptions text-white-50">for</p>
        <div className="flex items-center pr-3 pl-1 py-1 gap-2 rounded-full bg-white-4">
          <div className="flex border rounded-full border-white-16 p-1">
            <Image src={icon2} alt="SOL Icon" />
          </div>
          <p className="ty-subheading text-white-100 max-w-[168px] text-ellipsis text-nowrap overflow-hidden">
            {forAmount}
          </p>
          <p className="ty-title text-white-100 uppercase">{forCurrency}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 grow">
        <div className="flex gap-1 items-center">
          <h1 className="ty-descriptions text-white-50 w-[108px]">
            Program ID
          </h1>
          <h1 className="ty-descriptions text-white-100">{programId}</h1>
          <Image src={icon3} alt="Copy Icon" />
        </div>
      </div>

      <div className="flex flex-col gap-2 grow">
        <div className="flex gap-1 items-center">
          <h1 className="ty-descriptions text-white-50 w-[108px] text-nowrap">
            Escrow Creator
          </h1>
          <h1 className="ty-descriptions text-white-100">{escrowCreator}</h1>
        </div>
      </div>

      <Button
        variant={"default"}
        className={
          status === "Claimed"
            ? "ty-title p-3.5 text-white-32 bg-white-4 cursor-not-allowed"
            : "ty-title p-3.5 text-white-100 bg-white-8 hover:bg-white-16 ease-out duration-300"
        }
      >
        Claim bidding
      </Button>
    </div>
  );
};

export default Card;

import React from "react";
import Image from "next/image";
import SOL from "@/public/icons/Sol.png";
import USDC from "@/public/icons/usdc.svg";
import PYUSD from "@/public/icons/pyusd.svg";
import { Button } from "@/components/ui/button";
import { Check, Copy, CheckCircle, CheckCircle2Icon } from "lucide-react";
import { useToast } from "./ui/use-toast";
import formatString from "./formatString";

type jsonObject = {
  status: string;
  date: number;
  amount: number;
  currency: string;
  forAmount: number;
  forCurrency: string;
  escrowID: string;
  escrowCreator: string;
};

const Card = ({
  status,
  date,
  amount,
  currency,
  forAmount,
  forCurrency,
  escrowID,
  escrowCreator,
}: jsonObject) => {
  const { toast } = useToast();

  const getCurrencyImage = () => {
    switch (currency) {
      case "PYUSD":
        return PYUSD;
      case "USDC":
        return USDC;
      case "SOL":
        return SOL;
      default:
        return null;
    }
  };

  const getForCurrencyImage = () => {
    switch (forCurrency) {
      case "PYUSD":
        return PYUSD;
      case "USDC":
        return USDC;
      case "SOL":
        return SOL;
      default:
        return null;
    }
  };

  const currencyImage = getCurrencyImage();
  const forCurrencyImage = getForCurrencyImage();
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

        <div className="flex ty-subtext text-white-50">{date}</div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="flex items-center pr-3 pl-1 py-1 gap-2 rounded-full bg-white-4">
          <div className="flex border rounded-full border-white-16 p-1">
            {currencyImage && (
              <Image
                src={currencyImage}
                alt={`${currency} Icon`}
                width={16}
                height={16}
              />
            )}
          </div>
          <p className="ty-subheading text-white-100 max-w-[168px] text-ellipsis text-nowrap overflow-hidden">
            {amount}
          </p>
          <p className="ty-title text-white-100 uppercase">{currency}</p>
        </div>
        <p className="ty-descriptions text-white-50">for</p>
        <div className="flex items-center pr-3 pl-1 py-1 gap-2 rounded-full bg-white-4">
          <div className="flex border rounded-full border-white-16 p-1">
            {forCurrencyImage && (
              <Image
                src={forCurrencyImage}
                alt={`${forCurrency} Icon`}
                width={16}
                height={16}
              />
            )}
          </div>
          <p className="ty-subheading text-white-100 max-w-[168px] text-ellipsis text-nowrap overflow-hidden">
            {forAmount}
          </p>
          <p className="ty-title text-white-100 uppercase">{forCurrency}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 grow">
        <div className="flex gap-1 items-center">
          <p className="ty-descriptions text-white-50 w-[108px]">Escrow ID</p>
          <p className="ty-descriptions text-white-100">
            {formatString(escrowID)}
          </p>
          <Copy
            className="h-3 w-3 shrink-0 opacity-50 cursor-pointer text-white-100"
            onClick={() => {
              navigator.clipboard.writeText(escrowID);
              toast({
                variant: "good",
                title: "Escrow ID copied to clipboard!",
              });
            }}
          ></Copy>
        </div>
      </div>

      <div className="flex flex-col gap-2 grow">
        <div className="flex gap-1 items-center">
          <p className="ty-descriptions text-white-50 w-[108px] text-nowrap">
            Escrow Creator
          </p>
          <p className="ty-descriptions text-white-100">
            {formatString(escrowCreator)}
          </p>
          <Copy
            className="h-3 w-3 shrink-0 opacity-50 cursor-pointer text-white-100"
            onClick={() => {
              navigator.clipboard.writeText(escrowCreator);
              toast({
                variant: "good",
                title: "Escrow Creator copied to clipboard!",
              });
            }}
          ></Copy>
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

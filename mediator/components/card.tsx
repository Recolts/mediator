import React from "react";
import Image from "next/image";
import icon1 from "@/public/icons/Bonk.png";
import icon2 from "@/public/icons/Sol.png";
import icon3 from "@/public/icons/copy-01.svg";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export default function card() {
  return (
    <div className="flex flex-col border rounded-2xl bg-white-4 border-white-4 p-4 gap-4">
      <div className="flex justify-between grow gap-2">
        <div className="flex border rounded-[999px] bg-yellow-4 border-yellow-8 text-yellow-100 ty-subtitle py-2 px-3">
          Unclaimed
        </div>
        <div className="flex ty-subtext text-white-50">July 09 • 11:45 PM</div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="flex pr-3 pl-1 py-1  gap-2 rounded-[999px] bg-white-4 items-center">
          <div className="flex border rounded-[999px] border-white-16 p-1">
            <Image src={icon1} alt="Bonk Icon" />
          </div>
          <h1 className="ty-subheading text-white-100">586,129,222.02</h1>
          <h1 className="ty-title text-white-100">BONK</h1>
        </div>
        <h1 className="ty-descriptions text-white-50">for</h1>
        <div className="flex pr-3 pl-1 py-1  gap-2 rounded-[999px] bg-white-4 items-center">
          <div className="flex border rounded-[999px] border-white-16 p-1">
            <Image src={icon2} alt="Sol Icon" />
          </div>
          <h1 className="ty-subheading text-white-100">2.69</h1>
          <h1 className="ty-title text-white-100">SOL</h1>
        </div>
      </div>

      <div className="flex flex-col gap-2 grow">
        <div className="flex gap-1">
          <h1 className="ty-descriptions text-white-50 w-[108px]">
            Program ID
          </h1>
          <h1 className="ty-descriptions text-white-100 ">0x132..a9s</h1>
          <Image src={icon3} alt="copy icon" />
        </div>
      </div>

      <div className="flex flex-col gap-2 grow">
        <div className="flex gap-1">
          <h1 className="ty-descriptions text-white-50 w-[108px] text-nowrap">
            Escrow Creator
          </h1>
          <h1 className="ty-descriptions text-white-100 ">cryptofonzy.sol</h1>
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
            {/* <AlertDialogTitle>Create an Escrow</AlertDialogTitle> */}
            <AlertDialogDescription className="flex flex-col gap-4">
              <p className="ty-subtext text-white-50">Create an Escrow</p>
              <div className="p-4 bg-white-50 flex items-center justify-between rounded-xl">
                <p>586,129,222.02</p>
                <Button
                  variant={"default"}
                  className="ty-title p-3.5 text-white-100 bg-white-16 gap-1"
                >
                  <Image src={icon1} alt="Bonk Icon" />
                  Bonk
                </Button>
              </div>
              <div className="flex justify-center">
                <p>for</p>
              </div>

              <div className="p-4 bg-white-50 flex items-center justify-between rounded-xl">
                <p>0</p>
                <Button
                  variant={"default"}
                  className="ty-title p-3.5 text-white-100 bg-white-16 gap-1"
                >
                  <Image src={icon2} alt="Bonk Icon" />
                  SOL
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <p>Program ID</p>
                <p>0x132..a9s</p>
              </div>
              <div className="flex items-center gap-4">
                <p>Escrow Creator</p>
                <p>0x132..a9s</p>
              </div>

              <Button
                variant={"default"}
                className="ty-title p-3.5 text-black-100 bg-white-100"
              >
                Approve Contract
              </Button>
            </AlertDialogDescription>
          </AlertDialogHeader>
          {/* <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter> */}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronDown, Copy, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const frameworks = [
  {
    value: "So11111111111111111111111111111111111111112",
    label: "SOL",
  },
  {
    value: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    label: "USDC",
  },
];

const data = {
  privateEscrowID:
    "2vtpYChGsdqQ3cZW2uzZip6Wp4kq5Na2T6SmXddZygMHaT1DoUNrahQy5DEMXQPSnK73xEz5DE2qFawHLev6kL7X",
};

export default function InitializeEscrow() {
  const [toMintOpen, setToMintOpen] = useState(false);
  const [fromMintOpen, setFromMintOpen] = useState(false);
  const [toMint, setToMint] = useState("");
  const [fromMint, setFromMint] = useState("");

  // const [programID, setProgramID] = useState("");
  // const [escrowID, setEscrowID] = useState("");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"tokenDropdown"}
          className="ty-title p-3.5 border border-blue-50 bg-blue-100 text-white-100 w-full"
        >
          Initialize Escrow
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <p className="ty-subtext text-white-50"> Create an Escrow</p>
          </AlertDialogTitle>

          <AlertDialogDescription className="flex flex-col gap-4 items-center">
            <iframe src="https://lottie.host/embed/ba2b34d7-1d0a-46f2-812b-9cd7ea99f489/n17jipZtBb.json"></iframe>
            <p className="ty-title text-white-100">
              Escrow successfully initialized!
            </p>
            <div className="flex flex-col items-center gap-2">
              <p className="flex text-white-50 ty-subtitle">
                Private Escrow ID
              </p>
              <div className="grow flex items-center backdrop-blur-lg bg-white-4 rounded-lg p-3 gap-3 ease-out duration-300 hover:ring-2 hover:ring-white-16 cursor-pointer has-[:focus]:bg-white-8 has-[:focus]:ring-2 has-[:focus]:ring-blue-100">
                <p className="overflow-hidden text-nowrap truncate text-white-100">
                  {data.privateEscrowID}
                </p>
              </div>
            </div>

            {/* button */}
            <Button
              variant={"tokenDropdown"}
              className="ty-title p-3.5 border border-blue-50 bg-blue-100 text-white-100 w-full"
            >
              Continue
            </Button>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

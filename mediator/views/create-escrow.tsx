"use client";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronDown, CircleHelp, Copy, X } from "lucide-react";
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
import InitializeEscrow from "./initialize-escrow";
import formatString from "@/components/formatString";
import { useToast } from "@/components/ui/use-toast";
import SOL from "@/public/icons/Sol.png";
import USDC from "@/public/usdc.svg";
import PYUSD from "@/public/pyusd.svg";
import Image from "next/image";

const frameworks = [
  {
    image: SOL,
    value: "So11111111111111111111111111111111111111112",
    label: "SOL",
  },
  {
    image: USDC,
    value: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    label: "USDC",
  },
  {
    image: PYUSD,
    value: "2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo",
    label: "PYUSD",
  },
];

const data = {
  programID: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
  escrowID: "H4vxLTfQHLR8tsEvvGfVmy1B5YtgrbmKFhiZr6VRvv9q",
};

export default function CreateEscrow() {
  const { toast } = useToast();
  const [toMintOpen, setToMintOpen] = useState(false);
  const [fromMintOpen, setFromMintOpen] = useState(false);
  const [toMint, setToMint] = useState("");
  const [fromMint, setFromMint] = useState("");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"button1"} className="ty-title p-3.5">
          Create an Escrow
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <p className="ty-subtext text-white-50"> Create an Escrow</p>

            <AlertDialogCancel>
              <X className="text-white-50 h-3.5 w-3.5 bg-inherit" />
            </AlertDialogCancel>
          </AlertDialogTitle>

          <AlertDialogDescription className="flex flex-col gap-2">
            <div className="grow flex items-center backdrop-blur-lg bg-white-4 rounded-lg p-3 gap-3 ease-out duration-300 hover:ring-2 hover:ring-white-16 cursor-pointer has-[:focus]:bg-white-8 has-[:focus]:ring-2 has-[:focus]:ring-blue-100">
              <Input
                type="number"
                min={0}
                className="min-w-[144px] cursor-pointer bg-transparent focus:outline-none rounded-none border-none ty-subheading ring-0 flex-1 text-white-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              ></Input>
              <Popover open={fromMintOpen} onOpenChange={setFromMintOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="tokenDropdown"
                    role="fromCombobox"
                    aria-expanded={fromMintOpen}
                    className="gap-2 p-2 items-center flex rounded-lg bg-white-4 ty-title text-white-100 hover:ring-2 hover:ring-white-8 focus:ring-white-16 focus:bg-white-8 ease-out duration-300"
                  >
                    {fromMint ? (
                      <Image
                        src={
                          frameworks.find(
                            (framework) => framework.value === fromMint
                          )?.image
                        }
                        alt=""
                        className="h-4 w-4"
                      ></Image>
                    ) : (
                      <CircleHelp className="h-4 w-4 opacity-50"></CircleHelp>
                    )}
                    {fromMint
                      ? frameworks.find(
                          (framework) => framework.value === fromMint
                        )?.label
                      : "Select a coin"}
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="min-w-[128px] p-0">
                  <Command>
                    {/* <CommandInput placeholder="Search framework..." /> */}
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) =>
                          framework.value === toMint && toMint !== "" ? (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              className="cursor-not-allowed bg-white-8 text-white-32"
                            >
                              <Check
                                className={cn(
                                  "h-4 w-4",
                                  fromMint === framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          ) : (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              className={
                                fromMint === framework.value
                                  ? "bg-blue-100 hover:bg-blue-50"
                                  : ""
                              }
                              onSelect={(currentValue) => {
                                setFromMint(
                                  currentValue === fromMint ? "" : currentValue
                                );
                                setFromMintOpen(false);
                              }}
                            >
                              {/* <Check
                                className={cn(
                                  "h-4 w-4",
                                  fromMint === framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              /> */}
                              <Image
                                src={framework.image}
                                alt={framework.label}
                                className="h-4 w-4"
                              ></Image>
                              {framework.label}
                            </CommandItem>
                          )
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <p className="text-center text-white-16 ty-description">for</p>

            <div className="grow flex items-center backdrop-blur-lg bg-white-4 rounded-lg p-3 gap-3 ease-out duration-300 hover:ring-2 hover:ring-white-16 cursor-pointer has-[:focus]:bg-white-8 has-[:focus]:ring-2 has-[:focus]:ring-blue-100">
              <Input
                type="number"
                min={0}
                className="min-w-[144px] cursor-pointer grow bg-transparent focus:outline-none rounded-none border-none ty-subheading ring-0 flex-1 text-white-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              ></Input>
              <Popover open={toMintOpen} onOpenChange={setToMintOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="tokenDropdown"
                    role="fromCombobox"
                    aria-expanded={toMintOpen}
                    className="gap-2 p-2 items-center flex rounded-lg bg-white-4 ty-title text-white-100 hover:ring-2 hover:ring-white-8 focus:ring-white-16 focus:bg-white-8 ease-out duration-300"
                  >
                    <CircleHelp className="h-4 w-4 opacity-50"></CircleHelp>
                    {toMint
                      ? frameworks.find(
                          (framework) => framework.value === toMint
                        )?.label
                      : "Select a coin"}
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="min-w-[128px] p-0">
                  <Command>
                    {/* <CommandInput placeholder="Search framework..." /> */}
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {frameworks.map((framework) =>
                          framework.value === fromMint && fromMint !== "" ? (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              className="cursor-not-allowed bg-white-8 text-white-32"
                            >
                              <Check
                                className={cn(
                                  "h-4 w-4",
                                  toMint === framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          ) : (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              className={
                                toMint === framework.value
                                  ? "bg-blue-100 hover:bg-blue-50"
                                  : ""
                              }
                              onSelect={(currentValue) => {
                                setToMint(
                                  currentValue === toMint ? "" : currentValue
                                );
                                setToMintOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "h-4 w-4",
                                  toMint === framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          )
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <div className="flex items-center gap-4">
                <p className="text-start w-[108px] ty-descriptions text-white-50">
                  Program ID
                </p>
                <p className="text-start grow ty-descriptions text-white-100 flex gap-2 items-center">
                  {formatString(data.programID)}
                  <Copy
                    className="h-3 w-3 shrink-0 opacity-50 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(data.programID);
                      toast({
                        variant: "good",
                        title: "Program ID copied to clipboard!",
                      });
                    }}
                  ></Copy>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-start w-[108px] ty-descriptions text-white-50">
                  Escrow Creator
                </p>
                <p className="text-start grow ty-descriptions text-white-100 flex gap-2 items-center">
                  {formatString(data.escrowID)}
                  <Copy
                    className="h-3 w-3 shrink-0 opacity-50 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(data.escrowID);
                      toast({
                        variant: "good",
                        title: "Escrow ID copied to clipboard!",
                      });
                    }}
                  ></Copy>
                </p>
              </div>
            </div>
            <InitializeEscrow privateEscrowID={data.programID} />
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

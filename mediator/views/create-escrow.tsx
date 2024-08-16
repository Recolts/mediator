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
import { Check, ChevronDown, X } from "lucide-react";
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

export default function CreateEscrow() {
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
                className="min-w-[144px] cursor-pointer grow bg-transparent focus:outline-none rounded-none border-none ty-subheading ring-0 flex-1 text-white-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"></Input>
              <Popover open={fromMintOpen} onOpenChange={setFromMintOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="tokenDropdown"
                    role="fromCombobox"
                    aria-expanded={fromMintOpen}
                    className="gap-2 p-2 items-center flex rounded-lg bg-white-4 ty-title text-white-100 hover:ring-2 hover:ring-white-8 focus:ring-white-16 focus:bg-white-8 ease-out duration-300">
                    <Avatar className="h-4 w-4">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
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
                        {frameworks.map((framework) => (
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
                            }}>
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
                        ))}
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
                className="min-w-[144px] cursor-pointer grow bg-transparent focus:outline-none rounded-none border-none ty-subheading ring-0 flex-1 text-white-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"></Input>
              <Popover open={toMintOpen} onOpenChange={setToMintOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="tokenDropdown"
                    role="fromCombobox"
                    aria-expanded={toMintOpen}
                    className="gap-2 p-2 items-center flex rounded-lg bg-white-4 ty-title text-white-100 hover:ring-2 hover:ring-white-8 focus:ring-white-16 focus:bg-white-8 ease-out duration-300">
                    <Avatar className="h-4 w-4">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
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
                        {frameworks.map((framework) => (
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
                            }}>
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
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <p className="text-center">Program ID</p>
                <p className="text-center">0x132..a9s</p>
              </div>{" "}
              <div className="flex items-center gap-4">
                <p className="text-center">Excrow Creator</p>
                <p className="text-center">0x132..a9s</p>
              </div>
            </div>

            <Button
              variant={"default"}
              className="ty-title p-3.5 bg-white-100 text-black-100">
              Approve Contract
            </Button>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

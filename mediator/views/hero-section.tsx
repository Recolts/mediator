"use client";
import Image from "next/image";
import Card from "@/components/card";
import search from "@/public/icons/search-01.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CreateEscrow from "./create-escrow";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const cards = [
  {
    status: "Unclaimed",
    amount: 12415,
    currency: "Bonk",
    forAmount: 1,
    forCurrency: "SOL",
    programId: "0x132..a9s",
    escrowCreator: "0x132..a9s",
  },
  {
    status: "Claimed",
    amount: 125,
    currency: "SOL",
    forAmount: 2,
    forCurrency: "Mabaho",
    programId: "0x132..a9s",
    escrowCreator: "0x132..a9s",
  },
];

const status = [
  {
    value: "Unclaimed",
    label: "Unclaimed",
  },
  {
    value: "Claimed",
    label: "Claimed",
  },
];

const coins = [
  {
    value: "SOL",
    label: "SOL",
  },
  {
    value: "USDC",
    label: "USDC",
  },
  {
    value: "PYUSD",
    label: "PYUSD",
  },
  {
    value: "ETH",
    label: "ETH",
  },
  {
    value: "BONK",
    label: "BONK",
  },
];

const HeroSection = () => {
  const [coinOpen, setcoinOpen] = useState(false);
  const [statusOpen, setstatusOpen] = useState(false);
  const [coinValue, setcoinValue] = useState("");
  const [statusValue, setstatusValue] = useState("");

  return (
    <div className="flex bg-white-4 justify-center items-start min-h-[100dvh]">
      <div className="flex flex-col gap-8 max-w-[960px] pt-[calc(.4*100dvh)] grow">
        <div className="hero flex flex-col gap-8 items-start grow">
          <div className="flex flex-col gap-4 max-w-[636px] w-full">
            <h1 className="ty-h6 sm:ty-h4 lg:ty-h1 text-white-100">
              Escrow your tokens, name your price.
            </h1>
            <h1 className="ty-subheading text-white-50">
              Secured deals, hassle-free token bidding using Anchor Escrow in
              Solana.
            </h1>
          </div>

          <div className="flex justify-center items-center gap-4">
            <div className="flex p-1 border rounded-xl w-[344px] border-white-8">
              <Input
                title="private key"
                placeholder="Paste an escrow private key here..."
                className="border rounded-lg p-3.5 border-white-8"
              />
            </div>
            <h1 className="ty-subtext text-white-12">OR</h1>
            <div className="flex p-1 border rounded-xl border-blue-50">
              <CreateEscrow />
            </div>
          </div>
        </div>
        <div className="second flex flex-col gap-4 h-[100vh]">
          <div className="flex gap-4 w-full">
            <div className="flex gap-4 grow w-[480px]">
              <Tabs
                defaultValue="account"
                className="flex flex-col items-start rounded-lg grow gap-4"
              >
                <div className="flex grow  w-full">
                  <TabsList className="bg-white-4 p-2">
                    <TabsTrigger value="PublicBidding" className="">
                      Public Bidding
                    </TabsTrigger>
                    <TabsTrigger value="MyEscrow">My Escrow</TabsTrigger>
                  </TabsList>
                  <div className="flex filters justify-end grow">
                    <div className="flex gap-2">
                      <Popover open={coinOpen} onOpenChange={setcoinOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="tokenDropdown"
                            role="combobox"
                            aria-expanded={coinOpen}
                            className="gap-2 p-2 items-center flex rounded-lg bg-white-4 ty-title text-white-100 hover:ring-2 hover:ring-white-8 focus:ring-white-16 focus:bg-white-8 ease-out duration-300"
                          >
                            {coinValue
                              ? coins.find((coins) => coins.value === coinValue)
                                  ?.label
                              : "Select Coins"}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search framework..." />
                            <CommandList>
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {coins.map((coins) => (
                                  <CommandItem
                                    key={coins.value}
                                    value={coins.value}
                                    onSelect={(currentValue) => {
                                      setcoinValue(
                                        currentValue === coinValue
                                          ? ""
                                          : currentValue
                                      );
                                      setcoinOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        coinValue === coins.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {coins.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <Popover open={statusOpen} onOpenChange={setstatusOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="tokenDropdown"
                            role="combobox"
                            aria-expanded={statusOpen}
                            className="gap-2 p-2 items-center flex rounded-lg bg-white-4 ty-title text-white-100 hover:ring-2 hover:ring-white-8 focus:ring-white-16 focus:bg-white-8 ease-out duration-300"
                          >
                            {statusValue
                              ? status.find(
                                  (status) => status.value === statusValue
                                )?.label
                              : "Select status"}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search framework..." />
                            <CommandList>
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {status.map((status) => (
                                  <CommandItem
                                    key={status.value}
                                    value={status.value}
                                    onSelect={(currentValue) => {
                                      setstatusValue(
                                        currentValue === statusValue
                                          ? ""
                                          : currentValue
                                      );
                                      setstatusOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        statusValue === status.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {status.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <Input
                        title="Search coin or creator"
                        placeholder="Search coin or creator"
                        className="border rounded-lg p-3.5 border-white-8 bg-white-4"
                      />
                      {/* <div className="flex items-center border rounded-lg border-white-8 gap-2 py-2 pr-3 pl-2 bg-white-4">
                        <Image src={search} alt="copy icon" />
                        <h1 className="ty-descriptions text-white-32 text-nowrap">
                          Search coin or creator
                        </h1>
                      </div> */}
                    </div>
                  </div>
                </div>

                <TabsContent
                  value="PublicBidding"
                  className="data-[state=inactive]:hidden"
                >
                  <div className="flex flex-wrap gap-4 scroll-auto overflow-hidden">
                    {cards.map((data, i) => (
                      <Card
                        key={i}
                        status={data.status}
                        amount={data.amount}
                        currency={data.currency}
                        forAmount={data.forAmount}
                        forCurrency={data.forCurrency}
                        programId={data.programId}
                        escrowCreator={data.escrowCreator}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent
                  value="MyEscrow"
                  className="data-[state=inactive]:hidden"
                >
                  <div className="flex flex-wrap gap-4 scroll-auto overflow-hidden"></div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

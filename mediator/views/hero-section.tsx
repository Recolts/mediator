"use client";
import Image from "next/image";
import Card from "@/components/card";
import search from "@/public/icons/search-01.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import CreateEscrow from "./create-escrow";
import { Check, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CommandGroup,
  CommandItem,
  CommandList,
  Command,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const cards = [
  {
    status: "Unclaimed",
    amount: 586129222.02,
    currency: "PYUSD",
    forAmount: 2.69,
    forCurrency: "USDC",
    escrowID: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    escrowCreator: "CfurJW5g544kWypk2mik3dpJBzDAtMXBS4qseoePkqwi",
  },
  {
    status: "Unclaimed",
    amount: 586129222.02,
    currency: "PYUSD",
    forAmount: 2.69,
    forCurrency: "SOL",
    escrowID: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    escrowCreator: "CfurJW5g544kWypk2mik3dpJBzDAtMXBS4qseoePkqwi",
  },
  {
    status: "Unclaimed",
    amount: 586129222.02,
    currency: "SOL",
    forAmount: 2.69,
    forCurrency: "USDC",
    escrowID: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    escrowCreator: "CfurJW5g544kWypk2mik3dpJBzDAtMXBS4qseoePkqwi",
  },
  {
    status: "Claimed",
    amount: 123456789,
    currency: "USDC",
    forAmount: 69,
    forCurrency: "SOL",
    escrowID: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    escrowCreator: "0xBA4A377917e54d06a09951CB47D406b8b7E2C9E7",
  },
  {
    status: "Claimed",
    amount: 123456789,
    currency: "SOL",
    forAmount: 69,
    forCurrency: "SOL",
    escrowID: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDnIo",
    escrowCreator: "0xBA4A377917e54d06a09951CB47D406b8b7E2C9E7",
  },
  {
    status: "Claimed",
    amount: 123456789,
    currency: "USDC",
    forAmount: 69,
    forCurrency: "SOL",
    escrowID: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDnIo",
    escrowCreator: "0xBA4A377917e54d06a09951CB47D406b8b7E2C9E7",
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
];

const HeroSection = () => {
  const [coinOpen, setcoinOpen] = useState(false);
  const [statusOpen, setstatusOpen] = useState(false);
  const [coinValue, setcoinValue] = useState("All Coins");
  const [statusValue, setstatusValue] = useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredCards, setFilteredCards] = useState(cards);

  const filterCards = () => {
    return cards.filter((data) => {
      return (
        (statusValue === "All Status" || data.status === statusValue) &&
        (coinValue === "All Coins" ||
          data.currency === coinValue ||
          data.forCurrency === coinValue) &&
        (data.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.forCurrency.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.escrowCreator
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        data.escrowID.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  };

  useEffect(() => {
    setFilteredCards(filterCards());
  }, [searchTerm, statusValue, coinValue, searchValue]);

  return (
    <div className="flex bg-white-4 justify-center items-start min-h-[100dvh]">
      <div className="flex flex-col gap-8 max-w-[960px] pt-[calc(.4*100dvh)] grow">
        <div className="hero flex flex-col gap-8 items-start grow">
          {/* <BackgroundGradientAnimation>
            <HeroHighlight>
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: [20, -5, 0],
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
                className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
              ></motion.h1>
            </HeroHighlight>
          </BackgroundGradientAnimation> */}

          <div className="flex flex-col gap-4 max-w-[636px] w-full">
            <h1 className="ty-h6 sm:ty-h4 lg:ty-h1 text-white-100">
              Escrow your tokens,{" "}
              <Highlight className="text-black dark:text-white">
                name your price.
              </Highlight>
            </h1>
            <h1 className="ty-subheading text-white-50">
              Secured deals, hassle-free token bidding using Anchor Escrow in
              Solana.
            </h1>
          </div>

          <div className="flex justify-center items-center gap-4">
            <div className="flex p-1 border rounded-xl w-[344px] border-white-8">
              <Input
                title="escrowID"
                placeholder="Paste an escrow program address here..."
                className="text-white-100 border rounded-lg p-3.5 bg-white-8 border-white-8 grow hover:ring-2 hover:ring-white-8 focus:ring-white-16 focus:bg-white-8 ease-out duration-300"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setFilteredCards(filterCards());
                }}
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
                defaultValue="PublicBidding"
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
                            {coinValue !== "All Coins"
                              ? coinValue
                              : "All Coins"}
                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                {coins.map((coins) => (
                                  <CommandItem
                                    key={coins.value}
                                    value={coins.value}
                                    onSelect={(currentValue) => {
                                      setcoinValue(
                                        currentValue === coinValue
                                          ? "All Coins"
                                          : currentValue
                                      );
                                      setcoinOpen(false);
                                      setFilteredCards(filterCards());
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
                            {statusValue !== "All Status"
                              ? statusValue
                              : "All Status"}
                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandList>
                              <CommandGroup>
                                {status.map((status) => (
                                  <CommandItem
                                    key={status.value}
                                    value={status.value}
                                    onSelect={(currentValue) => {
                                      setstatusValue(
                                        currentValue === statusValue
                                          ? "All Status"
                                          : currentValue
                                      );
                                      setstatusOpen(false);
                                      setFilteredCards(filterCards());
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
                      <div
                        className="flex items-center gap-2 bg-white-4 border text-white-100
                       border-white-8 rounded-lg px-2 hover:ring-2 hover:ring-white-8 focus:ring-white-16 focus:bg-white-8 ease-out duration-300"
                      >
                        <Image src={search} alt={"search icon"}></Image>
                        <Input
                          type="text"
                          placeholder="Search coin or Creator"
                          className="bg-transparent"
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setFilteredCards(filterCards());
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <TabsContent
                  value="PublicBidding"
                  className="data-[state=inactive]:hidden"
                >
                  <div className="flex flex-wrap gap-4 scroll-auto overflow-hidden">
                    {filteredCards.map((data, i) => (
                      <Card
                        key={i}
                        status={data.status}
                        amount={data.amount}
                        currency={data.currency}
                        forAmount={data.forAmount}
                        forCurrency={data.forCurrency}
                        escrowID={data.escrowID}
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

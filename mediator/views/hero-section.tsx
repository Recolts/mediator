"use client";
import Image from "next/image";
import Card from "@/components/card";
import search from "@/public/icons/search-01.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import CreateEscrow from "./create-escrow";
import { Check, ChevronDown, Copy } from "lucide-react";
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

import SOL from "@/public/icons/Sol.png";
import USDC from "@/public/icons/usdc.svg";
import PYUSD from "@/public/icons/pyusd.svg";
import useGetEscrows from "@/hooks/useGetEscrows";
import useGetAssets from "@/hooks/useGetAssets";
import formatString from "@/components/formatString";
import { toast } from "@/components/ui/use-toast";
import useClaimBid from "@/hooks/useClaimBid";
import { PublicKey } from "@solana/web3.js";

const cards = [
  {
    status: "Unclaimed",
    date: 123456789,
    amount: 586129222.02,
    currency: "PYUSD",
    forAmount: 2.69,
    forCurrency: "USDC",
    escrowID: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    escrowCreator: "CfurJW5g544kWypk2mik3dpJBzDAtMXBS4qseoePkqwi",
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
    image: SOL,
    value: "SOL",
    label: "SOL",
  },
  {
    image: USDC,
    value: "USDC",
    label: "USDC",
  },
  {
    image: PYUSD,
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
  const { data: escrows, isPending } = useGetEscrows();
  const { mutate, error } = useClaimBid();

  // const { data: assets, error: assetsError } = useGetAssets();

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    console.log(escrows);
  }, [escrows]);

  useEffect(() => {
    setFilteredCards(filterCards());
  }, [searchTerm, statusValue, coinValue, searchValue]);

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
                                    <Image
                                      src={coins.image}
                                      alt={coins.value}
                                      className="h-4 w-4"
                                    ></Image>
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
                    {escrows?.map((data, i) => (
                      <div
                        key={data.publicKey.toString()}
                        className="flex flex-col border rounded-2xl bg-white-4 border-white-4 p-4 gap-4"
                      >
                        <div className="flex justify-between gap-2">
                          <div className="flex border rounded-full bg-yellow-4 border-yellow-8 text-yellow-100 ty-subtitle py-2 px-3">
                            Unclaimed
                          </div>

                          <div className="flex ty-subtext text-white-50">
                            September 3 - 11:45
                          </div>
                        </div>

                        <div className="flex gap-2 items-center">
                          <div className="flex items-center pr-3 pl-1 py-1 gap-2 rounded-full bg-white-4">
                            <div className="flex border rounded-full border-white-16 p-1">
                              {/* {data.mintA && (
                                <Image
                                  src={data.mintA.metadata.uri}
                                  alt={data.mintA.metadata.name}
                                  width={16}
                                  height={16}
                                />
                              )} */}
                            </div>
                            <p className="ty-subheading text-white-100 max-w-[168px] text-ellipsis text-nowrap overflow-hidden">
                              {data.account.receive /
                                10 ** (data.mintA?.mint.decimals ?? 1)}
                            </p>
                            <p className="ty-title text-white-100 uppercase">
                              {data.mintA?.metadata.symbol}
                            </p>
                          </div>
                          <p className="ty-descriptions text-white-50">for</p>
                          <div className="flex items-center pr-3 pl-1 py-1 gap-2 rounded-full bg-white-4">
                            <div className="flex border rounded-full border-white-16 p-1">
                              {/* {data.mintB && (
                                <Image
                                  src={data.mintB.metadata.uri}
                                  alt={data.mintB.metadata.name}
                                  width={16}
                                  height={16}
                                />
                              )} */}
                            </div>
                            <p className="ty-subheading text-white-100 max-w-[168px] text-ellipsis text-nowrap overflow-hidden">
                              {data.account.receive /
                                10 ** (data.mintB?.mint.decimals ?? 1)}
                            </p>
                            <p className="ty-title text-white-100 uppercase">
                              {data.mintB?.metadata.symbol}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 grow">
                          <div className="flex gap-1 items-center">
                            <p className="ty-descriptions text-white-50 w-[108px]">
                              Escrow ID
                            </p>
                            <p className="ty-descriptions text-white-100">
                              {formatString(data.publicKey.toString())}
                            </p>
                            <Copy
                              className="h-3 w-3 shrink-0 opacity-50 cursor-pointer text-white-100"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  data.publicKey.toString()
                                );
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
                              {formatString(data.account.maker.toString())}
                            </p>
                            <Copy
                              className="h-3 w-3 shrink-0 opacity-50 cursor-pointer text-white-100"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  data.account.maker.toString()
                                );
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
                          onClick={() => {
                            if (
                              data.mintA?.publicKey &&
                              data.mintB?.publicKey
                            ) {
                              mutate({
                                mintA: new PublicKey(
                                  data.mintA?.publicKey.toString()
                                ),
                                mintB: new PublicKey(
                                  data.mintB?.publicKey.toString()
                                ),
                                maker: new PublicKey(
                                  data.account.maker.toString()
                                ),
                                escrow: new PublicKey(
                                  data.publicKey.toString()
                                ),
                              });
                            }
                          }}
                          className={
                            "ty-title p-3.5 text-white-100 bg-white-8 hover:bg-white-16 ease-out duration-300"
                          }
                        >
                          Claim bidding
                        </Button>
                      </div>
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

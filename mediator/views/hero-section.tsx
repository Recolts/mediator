import Image from "next/image";
import Card from "@/components/card";
import search from "@/public/icons/search-01.svg";
import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const HeroSection = () => {
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
              <Button variant={"button1"} className="ty-title p-3.5">
                Create an Escrow
              </Button>
            </div>
          </div>
        </div>
        <div className="second flex flex-col gap-4 h-[100vh]">
          <div className="flex gap-4 w-full">
            <div className="flex gap-4 grow">
              <Tabs defaultValue="account" className="w-[480px]">
                <TabsList className="p-1">
                  <TabsTrigger value="Public Bidding">
                    Public Bidding
                  </TabsTrigger>
                  <TabsTrigger value="My Escrow">My Escrow</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex gap-2">
              <ComboboxDemo />
              <ComboboxDemo />

              <div className="flex items-center border rounded-lg border-white-8 gap-2 py-2 pr-3 pl-2 bg-white-4">
                <Image src={search} alt="copy icon" />
                <h1 className="ty-descriptions text-white-32 text-nowrap">
                  Search coin or creator
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 scroll-auto overflow-hidden">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

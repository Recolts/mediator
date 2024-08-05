import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import React from "react";

const HeroSection = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-start justify-start gap-8 max-w-[960px] px-4 lg:px-8 lg:pb-8 lg:pt-[306px] grow w-full">
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
          <Input
            title="private key"
            placeholder="Paste an escrow private key here..."
          />
          <h1 className="ty-subtext text-white-12">OR</h1>
          <Button variant={"default"}>Create an Escrow</Button>
        </div>
        <div className="flex gap-4 max-w-[896px]">
          <div className="flex gap-4 w-full">
            <Tabs></Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

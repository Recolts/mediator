import React from "react";
import Image from "next/image";
import logo from "@/public/mediator-logo.svg";

export default function footer() {
  return (
    <div className="flex p-4 justify-center items-center">
      <div className="flex gap-4 max-w-[960px] items-center w-full">
        <div className="flex gap-4 items-center p-4 w-[787px]">
          <Image
            src={logo}
            width={93.97}
            height={16}
            className="opacity-30"
            alt={""}
          ></Image>
          <h1 className="flex ty-subtext text-white-32">
            ©️2024 | All rights reserved.{" "}
          </h1>
        </div>
        <h1 className="text-white-50 ty-subtitle">How to use</h1>
        <h1 className="text-white-50 ty-subtitle">Privacy Policy</h1>
      </div>
    </div>
  );
}

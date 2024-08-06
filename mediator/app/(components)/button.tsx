import { cn } from "@/lib/utils";
import { outfit } from "@/public/fonts";
import React from "react";

interface IButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}
export default function Button({ title, onClick, disabled }: IButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(outfit.className, "p-1 border border-blue-50 rounded-lg")}
    >
      <p className="connect-wallet-bg text-white-100 p-2">{title}</p>
    </button>
  );
}
{
  /* <div className="p-1 border border-white-8 rounded">
  <button className="connect-wallet-bg text-white-100 p-2">asdasd</button>
</div>; */
}

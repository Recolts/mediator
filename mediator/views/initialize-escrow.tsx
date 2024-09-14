"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Copy, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import formatString from "@/components/formatString";
import { useToast } from "@/components/ui/use-toast";

interface InitializeEscrowProps {
  privateEscrowID: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const InitializeEscrow = ({
  privateEscrowID,
  open,
  setOpen,
}: InitializeEscrowProps) => {
  const { toast } = useToast();
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            <div className="flex flex-col gap-4 items-center max-w-full w-full">
              <iframe
                className="grow"
                src="https://lottie.host/embed/ba2b34d7-1d0a-46f2-812b-9cd7ea99f489/n17jipZtBb.json"
              ></iframe>
              <p className="ty-title text-white-100">
                Escrow successfully initialized!
              </p>
              <div className="flex flex-col items-center gap-2 self-stretch grow w-full">
                <p className="flex text-white-50 ty-subtitle">
                  Private Escrow ID
                </p>
                <div className="flex w-full items-center justify-center backdrop-blur-lg bg-white-4 rounded-lg px-3 py-2 gap-3 ease-out duration-300 hover:ring-2 hover:ring-white-16 cursor-pointer has-[:focus]:bg-white-8 has-[:focus]:ring-2 has-[:focus]:ring-blue-100">
                  <p className="text-white-100">
                    {formatString(privateEscrowID)}
                  </p>
                  <Copy
                    className="h-3 w-3 shrink-0 opacity-50 cursor-pointer text-white-100"
                    onClick={() => {
                      navigator.clipboard.writeText(privateEscrowID);
                      toast({
                        variant: "good",
                        title: "Private Escrow ID copied to clipboard!",
                      });
                    }}
                  ></Copy>
                </div>
              </div>

              <Button
                onClick={() => setOpen(false)}
                className="ty-title p-3.5 border border-blue-50 bg-blue-100 text-white-100 w-full"
              >
                Continue
              </Button>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InitializeEscrow;

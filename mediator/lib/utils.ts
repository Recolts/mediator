import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseToLocalDateTimeString = (date: Date) => {
  const shortTime = new Intl.DateTimeFormat("en", {
    timeStyle: "short",
  });
  return `${(date ?? new Date()).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
    day: "2-digit",
  })} · ${shortTime.format(date ?? new Date())}`;
};

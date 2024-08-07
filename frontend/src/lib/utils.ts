import { Invoice } from "@/types";

import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getUniqueClientNumbers = (data: Invoice[]) => {
  return Array.from(new Set(data.map((invoice) => invoice.clientNumber)));
};

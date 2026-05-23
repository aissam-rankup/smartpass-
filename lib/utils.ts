import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number, currency = "MAD") {
  return `${new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(value)} ${currency}`;
}

export function discountPct(normal: number, reduced: number) {
  if (normal <= 0) return 0;
  return Math.round(((normal - reduced) / normal) * 100);
}

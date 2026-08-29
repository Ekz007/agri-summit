import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a Date/ISO string to HH:MM (pt-BR). */
export function hhmm(value: string | Date) {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

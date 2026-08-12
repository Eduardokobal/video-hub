import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Shared hover/surface treatment for external-link "thumbnail card" style
// components (VideoCard, EditComparisonSection) — keep this in one place so
// the two don't silently drift on the next theme tweak.
export const cardSurfaceClasses =
  "overflow-hidden rounded-xl border border-purple-900 bg-purple-950 shadow-lg shadow-purple-950/40 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-600/30";

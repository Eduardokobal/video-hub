// Set via env vars, not hardcoded — see .env.example. Copy it to
// .env.local (gitignored) with your real values for local dev, and add
// the same vars in your Vercel project settings for deploys. The
// fallbacks below only apply if the env vars are unset (e.g. a fresh
// clone before .env.local is created).
//
// These are plain (non-NEXT_PUBLIC_) vars, which only inline correctly in
// Server Components — every current consumer (Header, AboutSection,
// VideoCard) is one. If any consumer ever becomes a Client Component
// ("use client"), these will read as undefined in the browser bundle;
// prefix with NEXT_PUBLIC_ at that point.
export const TIKTOK_HANDLE = process.env.TIKTOK_HANDLE ?? "@your_handle";
export const GITHUB_URL = process.env.GITHUB_URL ?? "https://github.com/your-username";
export const FULL_NAME = process.env.FULL_NAME ?? "Seu Nome";
export const ABOUT_BIO =
  process.env.ABOUT_BIO ?? "Aqui fica uma breve história sobre você.";

export function tiktokProfileUrl(): string {
  const handle = TIKTOK_HANDLE.startsWith("@") ? TIKTOK_HANDLE : `@${TIKTOK_HANDLE}`;
  return `https://www.tiktok.com/${handle}`;
}

export function tiktokVideoUrl(videoId: string): string {
  return `${tiktokProfileUrl()}/video/${videoId}`;
}

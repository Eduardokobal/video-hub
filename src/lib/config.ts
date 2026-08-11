// Set via env vars, not hardcoded — see .env.example. Copy it to
// .env.local (gitignored) with your real values for local dev, and add
// the same two vars in your Vercel project settings for deploys. The
// fallbacks below only apply if the env vars are unset (e.g. a fresh
// clone before .env.local is created).
export const TIKTOK_HANDLE = process.env.TIKTOK_HANDLE ?? "@your_handle";
export const GITHUB_URL = process.env.GITHUB_URL ?? "https://github.com/your-username";
export const ABOUT_BIO =
  process.env.ABOUT_BIO ?? "Aqui fica uma breve história sobre você.";

export function tiktokProfileUrl(): string {
  const handle = TIKTOK_HANDLE.startsWith("@") ? TIKTOK_HANDLE : `@${TIKTOK_HANDLE}`;
  return `https://www.tiktok.com/${handle}`;
}

export function tiktokVideoUrl(videoId: string): string {
  return `${tiktokProfileUrl()}/video/${videoId}`;
}

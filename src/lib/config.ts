// Replace with your real TikTok handle (including the @) before deploying.
export const TIKTOK_HANDLE = "@replace_with_your_handle";
// Replace with your real GitHub profile URL before deploying.
export const GITHUB_URL = "https://github.com/replace-with-your-username";

export function tiktokProfileUrl(): string {
  const handle = TIKTOK_HANDLE.startsWith("@") ? TIKTOK_HANDLE : `@${TIKTOK_HANDLE}`;
  return `https://www.tiktok.com/${handle}`;
}

export function tiktokVideoUrl(videoId: string): string {
  return `${tiktokProfileUrl()}/video/${videoId}`;
}

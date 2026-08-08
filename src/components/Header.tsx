import { TIKTOK_HANDLE, GITHUB_URL } from "@/lib/config";

export function Header() {
  const tiktokUrl = `https://www.tiktok.com/${TIKTOK_HANDLE}`;

  return (
    <header className="flex items-center justify-between border-b border-neutral-200 p-6 dark:border-neutral-800">
      <span className="text-lg font-bold">{TIKTOK_HANDLE}</span>
      <nav className="flex gap-4">
        <a
          href={tiktokUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          TikTok
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}

import { TIKTOK_HANDLE, GITHUB_URL, tiktokProfileUrl } from "@/lib/config";
import { TikTokIcon, GitHubIcon } from "@/components/icons";

export function Header() {
  const tiktokUrl = tiktokProfileUrl();

  const linkClasses =
    "flex items-center gap-2 rounded-full border border-purple-800 bg-purple-950 px-5 py-2.5 text-purple-200 transition-colors hover:border-purple-500 hover:bg-purple-800 hover:text-white";

  return (
    <header className="border-b border-purple-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-purple-50">
          {TIKTOK_HANDLE}
        </h1>
        <div className="flex gap-3 sm:gap-4">
          <a href={tiktokUrl} target="_blank" rel="noreferrer" className={linkClasses}>
            <TikTokIcon className="h-5 w-5" />
            <span className="text-sm font-medium">TikTok</span>
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={linkClasses}>
            <GitHubIcon className="h-5 w-5" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}

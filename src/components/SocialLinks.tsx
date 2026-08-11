import { GITHUB_URL, tiktokProfileUrl } from "@/lib/config";
import { TikTokIcon, GitHubIcon } from "@/components/icons";

export function SocialLinks() {
  const tiktokUrl = tiktokProfileUrl();

  const linkClasses =
    "flex items-center gap-2 rounded-full border border-purple-800 bg-purple-950 px-5 py-2.5 text-purple-200 transition-colors hover:border-purple-500 hover:bg-purple-800 hover:text-white";

  return (
    <div className="flex justify-center gap-4 border-t border-purple-900 pt-8">
      <a href={tiktokUrl} target="_blank" rel="noreferrer" className={linkClasses}>
        <TikTokIcon className="h-5 w-5" />
        <span className="text-sm font-medium">TikTok</span>
      </a>
      <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={linkClasses}>
        <GitHubIcon className="h-5 w-5" />
        <span className="text-sm font-medium">GitHub</span>
      </a>
    </div>
  );
}

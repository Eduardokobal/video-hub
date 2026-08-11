import { TIKTOK_HANDLE } from "@/lib/config";

export function Header() {
  return (
    <header className="border-b border-purple-900 p-6">
      <h1 className="text-lg font-bold text-purple-50">{TIKTOK_HANDLE}</h1>
    </header>
  );
}

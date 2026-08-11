import { TIKTOK_HANDLE } from "@/lib/config";

export function Header() {
  return (
    <header className="border-b border-purple-900">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-2xl font-bold tracking-tight text-purple-50">
          {TIKTOK_HANDLE}
        </h1>
      </div>
    </header>
  );
}

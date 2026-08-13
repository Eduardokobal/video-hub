import { ABOUT_BIO, AVATAR_URL, FULL_NAME, TIKTOK_HANDLE } from "@/lib/config";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function AboutSection() {
  const initial = TIKTOK_HANDLE.replace("@", "").charAt(0).toUpperCase() || "?";

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4 space-y-0">
        {AVATAR_URL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={AVATAR_URL}
            alt={FULL_NAME}
            className="h-16 w-16 shrink-0 rounded-full border border-purple-700 object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-purple-700 bg-purple-900 text-2xl font-bold text-purple-200">
            {initial}
          </div>
        )}
        <CardTitle>{FULL_NAME}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-purple-300">{ABOUT_BIO}</p>
      </CardContent>
    </Card>
  );
}

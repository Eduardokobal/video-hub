import { ABOUT_BIO, FULL_NAME } from "@/lib/config";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4 space-y-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/avatar.jpg"
          alt={FULL_NAME}
          className="h-16 w-16 shrink-0 rounded-full border border-purple-700 object-cover"
        />
        <CardTitle>{FULL_NAME}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-purple-300">{ABOUT_BIO}</p>
      </CardContent>
    </Card>
  );
}

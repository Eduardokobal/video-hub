import { ABOUT_BIO } from "@/lib/config";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sobre mim</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-purple-300">{ABOUT_BIO}</p>
      </CardContent>
    </Card>
  );
}

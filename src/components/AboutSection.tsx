import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sobre mim</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Placeholder bio — replace with your own before deploying. */}
        <p className="text-neutral-600 dark:text-neutral-400">
          Edito vídeos e desenvolvo software. Aqui você encontra meus vídeos
          e um link pro meu trabalho como dev.
        </p>
      </CardContent>
    </Card>
  );
}

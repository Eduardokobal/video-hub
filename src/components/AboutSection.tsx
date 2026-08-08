import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-2 text-xl font-semibold">Sobre mim</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Edito vídeos e desenvolvo software. Aqui você encontra meus vídeos
          e um link pro meu trabalho como dev.
        </p>
      </CardContent>
    </Card>
  );
}

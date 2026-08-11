import type { Metadata } from "next";
import "./globals.css";

// title/description below are placeholders — replace before deploying.
export const metadata: Metadata = {
  metadataBase: new URL("https://replace-with-your-vercel-url.vercel.app"), // Replace with your real deployed URL before/after first deploy.
  title: "Meus vídeos | Video Hub",
  description: "Vídeos editados por mim, com links pro TikTok e GitHub.",
  openGraph: {
    title: "Meus vídeos",
    description: "Vídeos editados por mim, com links pro TikTok e GitHub.",
    type: "website",
    url: "/",
    locale: "pt_BR",
  },
  twitter: {
    // No og-image asset exists yet. Add public/og-image.png (1200x630) and
    // switch this back to "summary_large_image" + add `images: ["/og-image.png"]`
    // to both `openGraph` and `twitter` once you have one.
    card: "summary",
    title: "Meus vídeos",
    description: "Vídeos editados por mim, com links pro TikTok e GitHub.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

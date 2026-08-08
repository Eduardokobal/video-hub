import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meus vídeos | Video Hub",
  description: "Vídeos editados por mim, com links pro TikTok e GitHub.",
  openGraph: {
    title: "Meus vídeos",
    description: "Vídeos editados por mim, com links pro TikTok e GitHub.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
      <body>
        {children}
        <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

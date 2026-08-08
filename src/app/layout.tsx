import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video Hub",
  description: "Placeholder",
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

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FULL_NAME } from "@/lib/config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const pageTitle = `${FULL_NAME} | Hub Portfólio`;
const pageDescription = `Portfólio de vídeos de ${FULL_NAME}, com links pro TikTok e GitHub.`;

// Vercel injects VERCEL_URL automatically at build time (e.g. "my-app.vercel.app",
// no protocol) — using it means metadataBase is always correct on deploy without
// manual configuration. Falls back to localhost for local dev/build.
const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "/",
    locale: "pt_BR",
  },
  twitter: {
    // No og-image asset exists yet. Add public/og-image.png (1200x630) and
    // switch this back to "summary_large_image" + add `images: ["/og-image.png"]`
    // to both `openGraph` and `twitter` once you have one.
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

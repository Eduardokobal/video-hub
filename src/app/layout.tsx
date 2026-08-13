import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FULL_NAME } from "@/lib/config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const pageTitle = `${FULL_NAME} | Hub Portfólio`;
const pageDescription = `Portfólio de vídeos de ${FULL_NAME}, com links pro TikTok e GitHub.`;

// Vercel injects these automatically at build time — no manual configuration
// needed. VERCEL_PROJECT_PRODUCTION_URL is the assigned production domain
// (e.g. a renamed *.vercel.app or a custom domain) and is what we want here;
// VERCEL_URL is the current *deployment's* own URL (a per-build hash), which
// would make metadataBase point at a throwaway deployment URL instead of the
// real production one. Falls back to localhost for local dev/build.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
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

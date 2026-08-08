# Personal Video Hub v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a static Next.js site showing a personal TikTok video gallery (via TikTok's official embed widget) plus an about section, header with TikTok/GitHub links, and Open Graph metadata for link sharing.

**Architecture:** Next.js App Router, fully static (SSG), no backend/database/auth. Content lives in a hand-edited TypeScript data file. UI built from small, focused components; a couple of shadcn-style primitives are hand-authored (not installed via the shadcn CLI, to keep the dependency footprint minimal and the code fully visible in-repo).

**Tech Stack:** TypeScript, Next.js 15 (App Router), React 19, Tailwind CSS 3, npm. Deployed to Vercel via GitHub integration.

## Global Constraints

- Package manager: npm (no yarn/pnpm/bun)
- Rendering: SSG only — no API routes, no database, no auth, no per-request server logic
- Styling: Tailwind CSS utility classes; shadcn-style components are hand-authored source in `src/components/ui/`, not installed via the shadcn CLI or as a runtime dependency
- Video embedding: TikTok's official `https://www.tiktok.com/embed.js` widget script only — no custom oEmbed fetch/parsing code, at build time or runtime
- Content management: videos are added by editing `src/data/videos.ts` directly and committing — no CMS
- **No automated test suite** (per approved spec — static content, no business logic worth testing). Every task's verification step is `npm run build` (must succeed with no type/compile errors) instead of a red/green unit test cycle. The final assembly task (Task 7) additionally requires a manual visual check via `npm run dev`.
- SEO: no search-discovery optimization effort; Open Graph/Twitter Card metadata IS in scope (controls link-preview appearance when shared, which is this site's actual distribution channel)
- Deploy target: Vercel, connected via GitHub

---

### Task 1: Project scaffolding (Next.js + TypeScript + Tailwind)

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `.eslintrc.json`
- Create: `.gitignore`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx`

**Interfaces:**
- Produces: a runnable Next.js dev server (`npm run dev`) and a passing production build (`npm run build`), which every later task's verification step depends on.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "video-hub",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "@types/node": "^20.14.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

- [ ] **Step 2: Create the remaining config files**

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`next.config.mjs`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;
```

`postcss.config.mjs`:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

`tailwind.config.ts`:
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
```

`.eslintrc.json`:
```json
{
  "extends": "next/core-web-vitals"
}
```

`.gitignore`:
```
# dependencies
/node_modules

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 3: Create the initial app shell**

`src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
```

`src/app/page.tsx`:
```tsx
export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Video Hub — em construção</h1>
    </main>
  );
}
```

- [ ] **Step 4: Install dependencies**

Run: `npm install`
Expected: installs with no errors, creates `package-lock.json` and `node_modules/`

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: build succeeds with no TypeScript or lint errors

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.mjs postcss.config.mjs tailwind.config.ts .eslintrc.json .gitignore src/
git commit -m "feat: scaffold Next.js + TypeScript + Tailwind project"
```

---

### Task 2: shadcn-style Card primitive

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/components/ui/card.tsx`

**Interfaces:**
- Consumes: nothing (foundational)
- Produces: `cn(...inputs: ClassValue[]): string` from `src/lib/utils.ts`; `Card`, `CardHeader`, `CardTitle`, `CardContent` React components from `src/components/ui/card.tsx` — used by Task 6 (`AboutSection`)

- [ ] **Step 1: Create the `cn` class-merging helper**

`src/lib/utils.ts`:
```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Create the Card component**

`src/components/ui/card.tsx`:
```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds with no TypeScript or lint errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/utils.ts src/components/ui/card.tsx
git commit -m "feat: add cn helper and Card primitive"
```

---

### Task 3: Video data model and content file

**Files:**
- Create: `src/data/videos.ts`
- Create: `src/lib/videos.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `type Video = { id: string; title: string; publishedAt: string }` and `videos: Video[]` from `src/data/videos.ts`; `sortVideosByDateDesc(videos: Video[]): Video[]` from `src/lib/videos.ts` — both used by Task 5 (`GalleryGrid`)

- [ ] **Step 1: Create the video data file**

`src/data/videos.ts`:
```ts
export type Video = {
  id: string;
  title: string;
  publishedAt: string; // ISO date string, e.g. "2026-08-01"
};

export const videos: Video[] = [
  {
    id: "7123456789012345678",
    title: "Vídeo mais recente — substitua pelos seus",
    publishedAt: "2026-08-01",
  },
  {
    id: "7123456789012345000",
    title: "Vídeo mais antigo — substitua pelos seus",
    publishedAt: "2026-07-01",
  },
];
```

(These two sample entries have different dates so Task 5's ordering check has something to verify against. Replace both with your real TikTok video IDs before deploying — the ID is the numeric string at the end of a TikTok video URL, e.g. `tiktok.com/@user/video/7123456789012345678`.)

- [ ] **Step 2: Create the sort helper**

`src/lib/videos.ts`:
```ts
import { type Video } from "@/data/videos";

export function sortVideosByDateDesc(videos: Video[]): Video[] {
  return [...videos].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds with no TypeScript or lint errors

- [ ] **Step 4: Commit**

```bash
git add src/data/videos.ts src/lib/videos.ts
git commit -m "feat: add video data model and date-sort helper"
```

---

### Task 4: TikTok embed widget and VideoCard

**Files:**
- Create: `src/lib/config.ts`
- Create: `src/components/VideoCard.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `type Video` from `src/data/videos.ts` (Task 3)
- Produces: `TIKTOK_HANDLE`, `GITHUB_URL` constants from `src/lib/config.ts` — used by Task 6 (`Header`); `VideoCard({ video: Video })` component from `src/components/VideoCard.tsx` — used by Task 5 (`GalleryGrid`)

- [ ] **Step 1: Create the site config constants**

`src/lib/config.ts`:
```ts
// Replace with your real TikTok handle (including the @) before deploying.
export const TIKTOK_HANDLE = "@replace_with_your_handle";
// Replace with your real GitHub profile URL before deploying.
export const GITHUB_URL = "https://github.com/replace-with-your-username";
```

- [ ] **Step 2: Create the VideoCard component**

`src/components/VideoCard.tsx`:
```tsx
import { TIKTOK_HANDLE } from "@/lib/config";
import { type Video } from "@/data/videos";

type VideoCardProps = {
  video: Video;
};

export function VideoCard({ video }: VideoCardProps) {
  const videoUrl = `https://www.tiktok.com/${TIKTOK_HANDLE}/video/${video.id}`;

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <blockquote
        className="tiktok-embed"
        cite={videoUrl}
        data-video-id={video.id}
        style={{ maxWidth: "605px", minWidth: "325px" }}
      >
        <section>
          <a target="_blank" title={video.title} href={videoUrl} rel="noreferrer">
            {video.title}
          </a>
        </section>
      </blockquote>
    </div>
  );
}
```

- [ ] **Step 3: Load the TikTok embed script in the root layout**

Modify `src/app/layout.tsx` — add the `Script` import and tag:

```tsx
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
```

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: build succeeds with no TypeScript or lint errors

- [ ] **Step 5: Commit**

```bash
git add src/lib/config.ts src/components/VideoCard.tsx src/app/layout.tsx
git commit -m "feat: add TikTok embed widget and VideoCard component"
```

---

### Task 5: GalleryGrid

**Files:**
- Create: `src/components/GalleryGrid.tsx`

**Interfaces:**
- Consumes: `videos` and `type Video` from `src/data/videos.ts` (Task 3), `sortVideosByDateDesc` from `src/lib/videos.ts` (Task 3), `VideoCard` from `src/components/VideoCard.tsx` (Task 4)
- Produces: `GalleryGrid()` component — used by Task 7 (`page.tsx`)

- [ ] **Step 1: Create the GalleryGrid component**

`src/components/GalleryGrid.tsx`:
```tsx
import { videos } from "@/data/videos";
import { sortVideosByDateDesc } from "@/lib/videos";
import { VideoCard } from "@/components/VideoCard";

export function GalleryGrid() {
  const sorted = sortVideosByDateDesc(videos);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sorted.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build succeeds with no TypeScript or lint errors

- [ ] **Step 3: Commit**

```bash
git add src/components/GalleryGrid.tsx
git commit -m "feat: add GalleryGrid component"
```

---

### Task 6: AboutSection and Header

**Files:**
- Create: `src/components/AboutSection.tsx`
- Create: `src/components/Header.tsx`

**Interfaces:**
- Consumes: `Card`, `CardContent` from `src/components/ui/card.tsx` (Task 2); `TIKTOK_HANDLE`, `GITHUB_URL` from `src/lib/config.ts` (Task 4)
- Produces: `AboutSection()` and `Header()` components — used by Task 7 (`page.tsx`)

- [ ] **Step 1: Create the AboutSection component**

`src/components/AboutSection.tsx`:
```tsx
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
```

(Placeholder bio text — replace with your own before deploying.)

- [ ] **Step 2: Create the Header component**

`src/components/Header.tsx`:
```tsx
import { TIKTOK_HANDLE, GITHUB_URL } from "@/lib/config";

export function Header() {
  const tiktokUrl = `https://www.tiktok.com/${TIKTOK_HANDLE}`;

  return (
    <header className="flex items-center justify-between border-b border-neutral-200 p-6 dark:border-neutral-800">
      <span className="text-lg font-bold">{TIKTOK_HANDLE}</span>
      <nav className="flex gap-4">
        <a
          href={tiktokUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          TikTok
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds with no TypeScript or lint errors

- [ ] **Step 4: Commit**

```bash
git add src/components/AboutSection.tsx src/components/Header.tsx
git commit -m "feat: add AboutSection and Header components"
```

---

### Task 7: Assemble the home page and finalize metadata

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `Header` (Task 6), `AboutSection` (Task 6), `GalleryGrid` (Task 5)
- Produces: the complete, deployable home page

- [ ] **Step 1: Replace the placeholder home page with the real assembly**

Replace the full contents of `src/app/page.tsx`:
```tsx
import { Header } from "@/components/Header";
import { AboutSection } from "@/components/AboutSection";
import { GalleryGrid } from "@/components/GalleryGrid";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl space-y-8 p-6">
        <AboutSection />
        <GalleryGrid />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Add Open Graph and Twitter Card metadata**

Replace the full contents of `src/app/layout.tsx`:
```tsx
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
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds with no TypeScript or lint errors

- [ ] **Step 4: Manual visual verification**

Run: `npm run dev`, open `http://localhost:3000` in a browser.
Expected: header with handle + TikTok/GitHub links, "Sobre mim" card, then a grid of 2 video cards with "Vídeo mais recente" appearing before "Vídeo mais antigo". The TikTok embeds may show a loading state or the fallback link if the sample video IDs aren't real — that's expected until real IDs are added.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: assemble home page and add Open Graph metadata"
```

---

### Task 8: Publish to GitHub and deploy to Vercel

**Files:** none (infrastructure/deployment task)

**Interfaces:**
- Consumes: the complete working project from Tasks 1–7
- Produces: a public GitHub repository and a live Vercel deployment URL

- [ ] **Step 1: Create the GitHub repository**

Run: `gh repo create video-hub --public --source=. --remote=origin`
Expected: creates a public repo named `video-hub` under the authenticated GitHub account and adds it as the `origin` remote

- [ ] **Step 2: Push the existing commit history**

Run: `git push -u origin master`
Expected: all local commits (design spec, plan, and all Task 1–7 commits) appear on GitHub

- [ ] **Step 3: Import the project into Vercel**

In the Vercel dashboard (vercel.com), click "Add New Project," select the `video-hub` GitHub repository, and import it. Vercel auto-detects the Next.js framework — no configuration overrides are needed. Click "Deploy."
Expected: Vercel builds and deploys successfully, producing a live `*.vercel.app` URL

- [ ] **Step 4: Verify the live deployment**

Open the deployed URL in a browser.
Expected: same result as the local manual verification in Task 7, Step 4, now live on the public internet

- [ ] **Step 5: Update `src/lib/config.ts` and `src/data/videos.ts` with real values, then redeploy**

Replace `TIKTOK_HANDLE`, `GITHUB_URL`, and the sample `videos` entries with your real values (see the customization notes left in Tasks 3 and 4). Commit and push — Vercel redeploys automatically on every push to `master`.

```bash
git add src/lib/config.ts src/data/videos.ts
git commit -m "chore: replace sample content with real handle, links, and videos"
git push
```

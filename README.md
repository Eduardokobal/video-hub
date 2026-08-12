# Video Hub

A small, self-hosted personal video hub / portfolio: a static gallery of your
own videos (played inline, no third-party player), an about section, a
before/after video-editing comparison, and links out to TikTok/GitHub — built
as a template for anyone who wants a lightweight landing page for their
edited video content.

## What it does

- Displays a gallery of your videos (most recent first), played inline with
  the browser's native `<video>` element — no third-party embed/iframe
- An "about" section with photo, name, and bio
- A before/after video-editing comparison (two YouTube thumbnails, linking out)
- A header with TikTok/GitHub links
- Fully static (SSG) — no database, no auth, no server to run in production

## Stack

- [Next.js](https://nextjs.org/) (App Router), TypeScript
- [Tailwind CSS](https://tailwindcss.com/) with a small set of hand-authored,
  shadcn-style UI primitives (`src/components/ui/`) — no component library
  runtime dependency
- Deployed as a static site (e.g. [Vercel](https://vercel.com/))

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your real values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Configuration

Four environment variables control the identity shown on the site — copy
`.env.example` to `.env.local` (gitignored) and set:

| Variable        | Description                                   |
| --------------- | ---------------------------------------------- |
| `TIKTOK_HANDLE` | Your TikTok handle, including the `@`           |
| `GITHUB_URL`    | Your GitHub profile URL                         |
| `FULL_NAME`     | Your name, shown as the About section's title   |
| `ABOUT_BIO`     | Your bio text                                   |

When deploying (e.g. on Vercel), set the same four variables in the project's
environment settings — `.env.local` is never committed. These are read at
build time in server components only; if any consumer ever becomes a client
component, prefix the var with `NEXT_PUBLIC_` or it will render as `undefined`.

### Adding videos

Edit `src/data/videos.ts` — each entry needs a `title`, a `publishedAt` date
(used for sorting), the TikTok video's numeric `id` (found at the end of a
TikTok video URL, used only for the "ver no TikTok" link below the player),
and `src`: the path to the actual video file under `public/videos/`.

### Avatar

Replace `public/avatar.jpg` with your own photo (same filename, or update the
path in `src/components/AboutSection.tsx`).

### Edit comparison section

Edit `src/data/editComparisons.ts` — each entry is a YouTube video ID and a
label (e.g. "Com edição" / "Sem edição"). Thumbnails are fetched from
YouTube's public `img.youtube.com` thumbnail URLs, no API key needed.

## Project structure

```
src/
├── app/                     # Next.js App Router: pages, layout, global styles, favicon (icon.svg)
├── components/
│   ├── ui/                  # hand-authored Card primitive
│   ├── Header.tsx           # name + TikTok/GitHub links
│   ├── AboutSection.tsx     # avatar + name + bio
│   ├── GalleryGrid.tsx      # video gallery
│   ├── VideoCard.tsx        # single self-hosted <video>
│   ├── EditComparisonSection.tsx  # before/after YouTube thumbnails
│   ├── SectionHeading.tsx   # shared eyebrow + title heading
│   └── icons.tsx            # TikTok/GitHub icon SVGs
├── data/                    # videos.ts, editComparisons.ts
└── lib/                     # config (env-driven), sort helper, YouTube URL helpers, class-merge utility
public/
├── videos/                  # your .mp4 files
└── avatar.jpg
```

## Why no test suite

This project is static content with no business logic — the only real logic
(sorting videos by date) is small and low-risk. Each change is verified with
`npm run build` (type-checking + compile) plus a manual check rather than a
dedicated test suite. See `docs/specs/` for the original design rationale and
its superseding notes for what changed since.

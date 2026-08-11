# Video Hub

A small, self-hosted personal video hub: a static gallery of TikTok videos with
an about section and links out to TikTok/GitHub, built as a template for
anyone who wants a lightweight landing page for their edited video content.

## What it does

- Displays a gallery of TikTok videos (most recent first) using TikTok's
  official embed widget — no scraping, no unofficial API calls
- An "about" section and a link bar (TikTok + GitHub)
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

Two environment variables control the identity shown on the site — copy
`.env.example` to `.env.local` (gitignored) and set:

| Variable        | Description                                  |
| --------------- | --------------------------------------------- |
| `TIKTOK_HANDLE` | Your TikTok handle, including the `@`          |
| `GITHUB_URL`    | Your GitHub profile URL                        |

When deploying (e.g. on Vercel), set the same two variables in the project's
environment settings — `.env.local` is never committed.

### Adding videos

Edit `src/data/videos.ts` — each entry needs the TikTok video's numeric `id`
(found at the end of a TikTok video URL), a `title`, and a `publishedAt`
date used for sorting.

## Project structure

```
src/
├── app/            # Next.js App Router pages, layout, global styles
├── components/     # GalleryGrid, VideoCard, AboutSection, Header, SocialLinks
│   └── ui/         # hand-authored Card primitive
├── data/           # video content (src/data/videos.ts)
└── lib/            # config (env-driven), sort helper, class-merge utility
```

## Why no test suite

This project is static content with no business logic — the only real logic
(sorting videos by date) is small and low-risk. Each change is verified with
`npm run build` (type-checking + compile) plus a manual check rather than a
dedicated test suite. See `docs/specs/` for the original design rationale.

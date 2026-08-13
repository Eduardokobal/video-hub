# Development guide

Notes for anyone developing on or forking this project.

## What this project is

A personal video-hub portfolio site: a static gallery of your own videos
(self-hosted, played inline), an about section with photo, a before/after
video-editing comparison, and links to TikTok/GitHub. Built with Next.js
(App Router) + TypeScript + Tailwind CSS, deployed to Vercel as a fully
static site — no database, no auth, no API routes.

Full history and reasoning: `docs/specs/2026-08-08-video-hub-v1-design.md`
(read its "Superseded" section first — several original decisions changed
after real-world use, most notably video embedding). Implementation plan and
task-by-task build log: `docs/superpowers/plans/2026-08-08-video-hub-v1-implementation.md`.

## Conventions

- **Specs before code, plans before implementation.** Non-trivial changes get
  a dated doc in `docs/specs/`; don't silently drift the codebase away from
  what's documented — update the doc (append a superseding note, don't
  rewrite history) when a real decision changes.
- **No automated test suite.** Deliberate — static content, low-risk logic.
  Verify every change with `npm run build` (type-check + compile) and a
  manual check, not a test run.
- **Commits:** atomic, Conventional-Commits-style messages (`feat:`, `fix:`,
  `docs:`, `chore:`), no vague "update stuff" messages.
- **The repo is public and genuinely generic — nothing personal is committed,
  not even video content.** All identity/content lives only in `.env.local`
  (gitignored), never hardcoded: `TIKTOK_HANDLE`, `GITHUB_URL`, `FULL_NAME`,
  `ABOUT_BIO`, `AVATAR_URL`, `VIDEOS_JSON`. Source code and `.env.example`
  only ever contain generic placeholders/fallbacks. See `src/lib/config.ts`
  and `src/data/videos.ts`. Before committing anything, a quick sanity check
  is worth running: `git diff --cached | grep -iE "<any-real-name-or-handle-fragment>"`
  should come back empty.
- **Video/photo files are NOT committed** — they're hosted on Vercel Blob
  (public access) and referenced by URL via `AVATAR_URL`/`VIDEOS_JSON`.
  `public/videos/` and `public/avatar.jpg` are gitignored; use
  `scripts/upload-to-blob.mjs` to upload and get the URLs.

## Commands

```bash
npm install
npm run build   # verification step for every change — must pass clean
npm run dev     # local dev server
npm run start   # serve the production build (after npm run build)
```

Don't run `npm run build` and `npm run dev`/`npm run start` concurrently
against the same `.next/` directory — it corrupts the build cache. Stop one
before starting the other (`rm -rf .next` if it happens).

## Environment variables

Read in `src/lib/config.ts` and `src/data/videos.ts`, all Server-Component-only
(no `NEXT_PUBLIC_` prefix — see the comment in `config.ts` for why that
matters if a component ever becomes a Client Component):

| Variable               | Purpose                                              |
| ----------------------- | ------------------------------------------------------ |
| `TIKTOK_HANDLE`          | shown in header, builds TikTok links                   |
| `GITHUB_URL`             | GitHub link in header                                  |
| `FULL_NAME`              | About section title                                    |
| `ABOUT_BIO`              | About section body text                                |
| `AVATAR_URL`             | optional — About section photo (Blob URL)              |
| `VIDEOS_JSON`            | the video gallery, as a JSON array (see `videos.ts`)    |
| `BLOB_READ_WRITE_TOKEN`  | local-only, for `scripts/upload-to-blob.mjs` — **not** a Vercel deploy var |

Copy `.env.example` to `.env.local` for local dev. Set all but
`BLOB_READ_WRITE_TOKEN` in the Vercel project's environment settings for
deploys — that one is only needed to run the upload script on your own
machine.

## Project structure

```
src/
├── app/                     # App Router: page.tsx, layout.tsx, globals.css, icon.svg (favicon)
├── components/
│   ├── ui/card.tsx          # hand-authored shadcn-style primitive (no runtime dep)
│   ├── Header.tsx
│   ├── AboutSection.tsx
│   ├── GalleryGrid.tsx / VideoCard.tsx
│   ├── EditComparisonSection.tsx
│   ├── SectionHeading.tsx   # shared eyebrow+title heading, used by 2+ sections
│   └── icons.tsx            # TikTok/GitHub SVG icons
├── data/                    # videos.ts (reads VIDEOS_JSON, generic fallback), editComparisons.ts
└── lib/                     # config.ts (env), videos.ts (sort), youtube.ts, utils.ts (cn + shared classes)
public/
├── videos/*.mp4             # local staging only, gitignored — see scripts/upload-to-blob.mjs
└── avatar.jpg                # local staging only, gitignored
scripts/
└── upload-to-blob.mjs       # uploads public/videos/ + avatar.jpg to Vercel Blob, prints URLs
docs/
├── specs/                   # design decisions, dated, with superseding notes
└── superpowers/plans/       # implementation plan + task-by-task execution record
```

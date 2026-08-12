# CLAUDE.md

Guidance for Claude Code (or any future session) working in this repository.

## What this project is

A personal video-hub portfolio site for a single user: a static gallery of
their own videos (self-hosted, played inline), an about section with photo,
a before/after video-editing comparison, and links to TikTok/GitHub. Built
with Next.js (App Router) + TypeScript + Tailwind CSS, deployed to Vercel as
a fully static site — no database, no auth, no API routes.

Full history and reasoning: `docs/specs/2026-08-08-video-hub-v1-design.md`
(read its "Superseded" section first — several original decisions changed
after real-world use, most notably video embedding). Implementation plan and
task-by-task build log: `docs/superpowers/plans/2026-08-08-video-hub-v1-implementation.md`.

## Working conventions

- **Specs before code, plans before implementation.** Non-trivial changes get
  a dated doc in `docs/specs/`; don't silently drift the codebase away from
  what's documented — update the doc (append a superseding note, don't
  rewrite history) when a real decision changes.
- **No automated test suite.** Deliberate — static content, low-risk logic.
  Verify every change with `npm run build` (type-check + compile) and a
  manual check, not a test run.
- **Commits:** author is the user only, no AI co-author trailer. Conventional-
  commit-style messages (`feat:`, `fix:`, `docs:`, `chore:`), atomic, no vague
  "update stuff" messages.
- **Identity data lives only in `.env.local`** (gitignored), never hardcoded:
  `TIKTOK_HANDLE`, `GITHUB_URL`, `FULL_NAME`, `ABOUT_BIO`. Source code and
  `.env.example` only ever contain generic placeholders. See `src/lib/config.ts`.
  Before committing anything, a quick sanity check is worth running:
  `git diff --cached | grep -iE "<any-real-name-or-handle-fragment>"` should
  come back empty.
- **Video/photo content (`public/videos/*.mp4`, `public/avatar.jpg`) IS
  committed intentionally** — the repo is private, and this content isn't
  identity data the way handle/name/bio are, so it doesn't get the
  `.env.local` treatment.
- **Ask before big visual/architecture swings**, then implement directly —
  this project doesn't re-run the full spec→plan→subagent-driven-development
  pipeline for every small iteration (that pipeline was used for the original
  v1 build; later changes are lighter-weight but still build-verified and
  committed properly).

## Commands

```bash
npm install
npm run build   # verification step for every change — must pass clean
npm run dev     # local dev server
npm run start   # serve the production build (after npm run build)
```

Note: on this dev machine, Node/npm are installed at `C:\Program Files\nodejs`
but not on the default shell `PATH` — prepend
`export PATH="/c/Program Files/nodejs:$PATH"` (bash) or
`$env:Path += ";C:\Program Files\nodejs"` (PowerShell) to commands that need
them. Also: don't run `npm run build` and `npm run dev`/`npm run start`
concurrently against the same `.next/` directory — it corrupts the build
cache. Stop one before starting the other (`Remove-Item -Recurse -Force .next`
if it happens).

## Environment variables

Four, all read in `src/lib/config.ts`, all Server-Component-only (no
`NEXT_PUBLIC_` prefix — see the comment in that file for why that matters if
a component ever becomes a Client Component):

| Variable        | Purpose                                  |
| ---------------- | ----------------------------------------- |
| `TIKTOK_HANDLE`  | shown in header, builds TikTok links      |
| `GITHUB_URL`     | GitHub link in header                     |
| `FULL_NAME`      | About section title                       |
| `ABOUT_BIO`      | About section body text                   |

Copy `.env.example` to `.env.local` for local dev. Set the same four in the
Vercel project's environment settings for deploys.

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
├── data/                    # videos.ts, editComparisons.ts — real content, hand-edited
└── lib/                     # config.ts (env), videos.ts (sort), youtube.ts, utils.ts (cn + shared classes)
public/
├── videos/*.mp4             # self-hosted video files (committed — see above)
└── avatar.jpg
docs/
├── specs/                   # design decisions, dated, with superseding notes
└── superpowers/plans/       # implementation plan + task-by-task execution record
```

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

Environment variables control the identity and content shown on the site —
none of this is hardcoded in `src/`, so the repo stays generic even though
it's public. Copy `.env.example` to `.env.local` (gitignored) and set:

| Variable        | Description                                              |
| --------------- | --------------------------------------------------------- |
| `TIKTOK_HANDLE` | Your TikTok handle, including the `@`                      |
| `GITHUB_URL`    | Your GitHub profile URL                                    |
| `FULL_NAME`     | Your name, shown as the About section's title              |
| `ABOUT_BIO`     | Your bio text                                               |
| `AVATAR_URL`    | Optional — see "Hosting your videos/avatar" below           |
| `VIDEOS_JSON`   | Your video gallery — see "Adding videos" below              |

When deploying (e.g. on Vercel), set the same variables in the project's
environment settings — `.env.local` is never committed. These are read at
build time in server components only; if any consumer ever becomes a client
component, prefix the var with `NEXT_PUBLIC_` or it will render as `undefined`.

### Adding videos

Set `VIDEOS_JSON` (in `.env.local` / Vercel) to a single-line JSON array —
each entry needs a `title`, a `publishedAt` date (used for sorting), the
TikTok video's numeric `id` (found at the end of a TikTok video URL, used
only for the "ver no TikTok" link below the player), and `src`: the hosted
video file URL (see "Hosting" below). See `.env.example` for the exact shape.
Without `VIDEOS_JSON` set, the site shows one generic placeholder entry —
`src/data/videos.ts` itself should stay untouched, so this repo never ships
anyone's specific videos by default.

### Avatar

Replace `public/avatar.jpg` with your own photo (same filename, or update the
path in `src/components/AboutSection.tsx`).

### Edit comparison section

Edit `src/data/editComparisons.ts` — each entry is a YouTube video ID and a
label (e.g. "Com edição" / "Sem edição"). Thumbnails are fetched from
YouTube's public `img.youtube.com` thumbnail URLs, no API key needed.

### Hosting your videos/avatar

Video and avatar files aren't committed to this repo (keeps it free of
personal media). Instead:

1. Put your `.mp4` files in `public/videos/` and your photo at
   `public/avatar.jpg` locally (both gitignored)
2. Create a Blob store (**access: Public**) in the Vercel dashboard's Storage
   tab, and put the resulting token in `.env.local` as `BLOB_READ_WRITE_TOKEN`
3. Run `node --env-file=.env.local scripts/upload-to-blob.mjs` — it uploads
   everything and prints the URLs
4. Paste the video URLs into `VIDEOS_JSON`'s `src` fields and the avatar URL
   into `AVATAR_URL` — both in `.env.local`/Vercel, not in the code

`BLOB_READ_WRITE_TOKEN` is only needed to run the upload script locally —
don't add it to Vercel's deployment environment variables.

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
├── data/                    # videos.ts (reads VIDEOS_JSON, generic fallback), editComparisons.ts
└── lib/                     # config (env-driven), sort helper, YouTube URL helpers, class-merge utility
public/
├── videos/                  # your .mp4 files locally (gitignored — see "Hosting" above)
└── avatar.jpg                # your photo locally (gitignored — see "Hosting" above)
scripts/
└── upload-to-blob.mjs       # uploads public/videos/ and avatar.jpg to Vercel Blob
```

## Why no test suite

This project is static content with no business logic — the only real logic
(sorting videos by date) is small and low-risk. Each change is verified with
`npm run build` (type-checking + compile) plus a manual check rather than a
dedicated test suite. See `docs/specs/` for the original design rationale and
its superseding notes for what changed since.

## License

[MIT](LICENSE) — use it, fork it, whitelabel it for your own portfolio.

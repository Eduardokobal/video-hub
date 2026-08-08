# Personal Video Hub Site — Design Spec

**Date:** 2026-08-08
**Status:** Approved

## Purpose

Portfolio project #1 in a 4-project roadmap (see project memory for the full roadmap).
A personal site showcasing the user's edited TikTok videos, playable on-site, with
links out to TikTok and GitHub. Positioned as a personal brand/landing page — not the
main technical showcase piece of the portfolio (that's project #2, an e-commerce/
seller tool, shelved for later). Low engineering depth by design; the point is a
clean, fast, shareable personal hub, not a demonstration of backend complexity.

## Scope

**In scope (v1):**
- Video gallery: simple grid, most recent first, no categories
- "About me" section
- Links to TikTok and GitHub only
- Header with name/links

**Explicitly out of scope:**
- Auth, database, or any backend — pure static content
- Categorization/tagging of videos
- Links to other portfolio projects (none exist yet; add later when they do, doesn't
  require a redesign)
- CMS for content management (see decision below)
- SEO optimization for search discovery — this site is reached via direct link
  (TikTok bio, shared links), not search, so search-engine SEO is not a priority.
  Link-preview quality (Open Graph tags) still matters and is in scope — different
  concern from search SEO.

## Tech stack

- **Framework:** Next.js (App Router), reused from/into project #2's stack for
  consistency and reusable learning across the roadmap
- **Rendering:** SSG (Static Site Generation) — all pages built at build time, no
  per-request server work needed since content is public and identical for everyone.
  Chosen for performance/simplicity, not primarily for SEO (SEO was deprioritized
  after scoping, but SSG remains the right call on its own merits).
- **Styling:** Tailwind CSS + shadcn/ui — same reasoning as prior projects: polished,
  accessible components without needing a dedicated design skill
- **Deployment:** Vercel — zero-config for a static Next.js site, free tier is ample

## Architecture

```
video-hub/
├── src/
│   ├── app/
│   │   ├── page.tsx      # home: about section + gallery
│   │   └── layout.tsx    # header/footer, meta tags (incl. Open Graph)
│   ├── components/       # GalleryGrid, VideoCard, AboutSection, Header
│   └── data/
│       └── videos.ts     # content source (see schema below)
├── docs/
│   └── specs/
└── CLAUDE.md
```

## Content management

**Decision:** a plain data file (`src/data/videos.ts`), edited and committed by the
user directly — not a headless CMS (Sanity/Contentful). A CMS would be free at this
scale and does offer a nicer non-technical editing UI, but that solves a problem the
user doesn't have (they're the developer maintaining the site); it would add an
external service dependency and setup overhead for marginal convenience. Revisit only
if update frequency/non-technical editing needs grow significantly.

```ts
export type Video = {
  id: string;          // TikTok video ID
  title: string;
  publishedAt: string; // drives most-recent-first ordering
};

export const videos: Video[] = [
  { id: "7123456789012345678", title: "Edição X", publishedAt: "2026-08-01" },
];
```

## Video embedding

**Decision:** TikTok's official embed widget (`https://www.tiktok.com/embed.js`,
loaded once in the layout) rendering a `<blockquote class="tiktok-embed">` per video,
which TikTok's script transforms into the real player client-side.

Rejected alternatives:
- Fetching the oEmbed JSON endpoint at **build time**: risks build failures if
  TikTok's endpoint is briefly unavailable during a deploy.
- Fetching oEmbed JSON **client-side** ourselves: still requires custom fetch/parsing
  code and doesn't offer meaningful advantage over the official widget script.

The official widget is simpler (no custom fetch/parsing code to maintain), more
resilient (no dependency on our own network calls succeeding, at build or runtime),
and has a built-in fallback (`<a>` link to the video) if the script is slow or fails
to load.

## Link-preview metadata

Even without search-SEO ambitions, Open Graph (and Twitter Card) meta tags are in
scope: this site's primary distribution is as a shared link, and OG tags control how
that link previews when pasted into WhatsApp/Discord/TikTok bio/etc. Low cost (a few
meta tags in `layout.tsx`), directly serves the site's actual purpose.

## Testing

No dedicated unit test suite — this is static content with no business logic, so the
return on investment is low (unlike project #2, where RLS/calculation logic will
justify real test coverage). Validated manually by running the site.

## Working conventions

See project memory `project_workflow_conventions` and `project_portfolio_roadmap` for
the full agreement and how this project fits the broader plan.

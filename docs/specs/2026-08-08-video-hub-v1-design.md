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

## Superseded / v1.1 changes (2026-08-11 – 2026-08-12)

This section documents decisions above that changed after real-world use. The
sections above are left as historical record of the original reasoning, not
rewritten — this is the current source of truth where it conflicts with them.

**Video embedding — reversed.** The "Video embedding" decision above (TikTok's
official embed widget) was abandoned after actually seeing it rendered: the
widget forces its own white background, unstylable from our side (cross-origin
iframe — no CSS/JS access, and TikTok's embed has no dark-theme parameter), and
a "click-through card" alternative (no iframe, but no inline playback either)
turned out to sacrifice the thing that mattered most: the video actually
playing on the page. **Current approach: self-hosted `<video>` elements**,
sourced from `public/videos/*.mp4` (the user's own video files, downloaded
from their own TikTok posts). This required also reversing the repo-visibility
assumption below.

**Repo visibility — now private.** The plan's Task 8 (`gh repo create --public`)
reflected the original assumption that the repo would stay a fully public,
identity-free template. Once real video files needed to be committed (see
above — Vercel builds from git, so self-hosted playback requires the actual
`.mp4` files in the repo), the user changed the GitHub repo to **private**
instead of pursuing external video hosting — video content isn't identity
data the way handle/bio/name are, so it doesn't need the same `.env.local`
treatment, but the user preferred not to have it on a public repo regardless.
The `Video` type also gained a required `src` field (path to the local file)
not present in the original schema above.

**Content additions beyond original scope:**
- **Avatar photo** (`public/avatar.jpg`) in the About section, replacing the
  original text-only "About me" card.
- **`FULL_NAME` env var** — the About card's title is now the user's real name
  (env-driven, same pattern as `TIKTOK_HANDLE`/`GITHUB_URL`), not a static
  "Sobre mim" label.
- **Edit-comparison section** (`EditComparisonSection.tsx` /
  `editComparisons.ts`): two YouTube thumbnails ("com edição" / "sem edição")
  demonstrating the user's editing skill by contrast, linking out to YouTube.
  Thumbnails via YouTube's public `img.youtube.com/vi/<id>/hqdefault.jpg`
  convention — no API key needed.
- **Page branding**: title/OG copy changed from generic "Meus vídeos | Video
  Hub" to `"<name> | Hub Portfólio"`, framing the site explicitly as a
  portfolio rather than a generic video gallery.

**Visual design pass** (not itself a spec-level decision, noted for
completeness): dark/purple theme (was originally unspecified beyond "shadcn/ui
for polish"), custom Inter font, radial background gradient, hover glow/lift
on cards, mobile-responsive header, SVG favicon (a circle+"H" mark).

**Security hardening added after a full-codebase review (2026-08-12):**
- `metadataBase` now derives from Vercel's auto-injected `VERCEL_URL` env var
  instead of a manually-maintained placeholder — self-corrects on every
  deploy instead of risking a stale/unclaimed URL in shipped `og:url` tags.
- `X-Frame-Options: SAMEORIGIN` header added via `next.config.mjs` (cheap,
  the one header judged to have real value for a static site with no
  auth/forms/cookies — protects against the page being iframed elsewhere).
- `.claude/*.local.json` added to the repo's own `.gitignore` (was previously
  relying solely on the global gitignore, a gap on any other machine/clone).
- Confirmed via full git history search: `.env.local` was never committed in
  any commit, and no identity data (name/handle/bio) leaked into source or
  docs outside of it.

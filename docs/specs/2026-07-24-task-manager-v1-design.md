# Task Management System v1 — Design Spec (IN PROGRESS)

**Date:** 2026-07-24
**Status:** Brainstorming in progress — NOT yet approved/complete. Resume here.

## Purpose

Portfolio project (replaces the shelved Tetris project — see git history commit
f6cd840 for that spec, superseded at b4ea70c). A personal task management web app
demonstrating real auth, CRUD, and data security (RLS), not a business-model SaaS
(no billing/plans/teams).

## Decided so far

**Product scope:**
- Single-user/personal only (no teams/shared workspaces) — isolation via `user_id`,
  simple RLS ("row belongs to user")
- Auth: email/password + Google OAuth (via Supabase Auth)
- Task fields: title, description, status (todo/in-progress/done), priority
  (low/medium/high), due date
- Dashboard filters: by status, by due-date urgency (overdue/today/this week),
  free-text search (title/description) — priority filter explicitly NOT included
- Profile page: edit name/avatar, change password, view stats (task counts/%
  completed), delete account

**Tech stack:**
- TypeScript, Next.js (App Router), Tailwind CSS, Supabase (Postgres + Auth + RLS)

**Architecture decision — approved:**
- Server Components (data fetching) + Server Actions (mutations), NOT API routes +
  client-side React Query. Rationale: idiomatic current Next.js/Supabase pattern,
  less code, avoids the classic client-side infinite-refetch-loop bug class entirely
  since there's no `useEffect`-driven fetching.
- Caching/performance safeguards agreed: pages are dynamically rendered (Next.js
  auto-detects auth cookie usage, won't statically cache per-user data); mutations
  call `revalidatePath` scoped to the exact path, never a blanket revalidate; task
  lists are paginated via Supabase `.range()`, never fetched unbounded; indexes on
  `user_id` and on filtered columns (status, due date).
- Rate limiting — direction agreed, not yet fully speced: add as defense-in-depth
  (not a substitute for the above), focused on auth endpoints (login/signup/password
  change) and mutation Server Actions. Must use a distributed store (Upstash Redis +
  `@upstash/ratelimit`), NOT an in-memory counter — Vercel serverless functions are
  stateless across invocations/regions, so in-memory rate limiting silently fails to
  protect against real distributed abuse (false sense of security).
- UI/design system — **approved**: shadcn/ui (Tailwind + Radix-based components) to
  avoid an amateur-looking UI without needing a dedicated design skill (none is
  installed — dataviz/artifact-design don't apply to a real app's front-end). User
  chose to proceed directly rather than search for a dedicated design skill/plugin.

## Not yet decided / next steps when resuming

1. Full RLS policy design (table schema, policies) — not yet drafted
3. Folder structure for this project (parallel to the one drafted for Tetris, adapted
   for Next.js App Router conventions)
4. Testing strategy (framework choice — likely Vitest + React Testing Library +
   possibly Playwright for e2e — not yet discussed)
5. Deployment target — likely Vercel (pairs natively with Next.js) but not explicitly
   confirmed with the user yet for this project
6. Rate limiting — finalize exact endpoints/limits
7. Once design sections are all approved: write final clean design doc (replacing
   this in-progress version), self-review, user reviews spec, then invoke
   `writing-plans` skill — no code/scaffolding before that per the project's
   brainstorming hard gate

## Working conventions

See project memory `project_workflow_conventions` (updated 2026-07-24 for this
project pivot) — senior-dev critical analysis, docs/specs per step, on-demand review
subagent, ask before acting, commits without AI co-author trailer.

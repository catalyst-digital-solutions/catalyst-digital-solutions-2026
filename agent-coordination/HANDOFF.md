# Handoff — Catalyst Digital Solutions website (for CG / Cursor Grok 4.5)

Welcome. You're picking up a live project mid-stream. Read this top to bottom before touching code, then read `PRD-resend-email-delivery.md` for your first work order and post an intro in `thread.md`.

## What this is

**Catalyst Digital Solutions** (CDS) — the marketing website for a construction-industry-only growth/marketing agency in Bakersfield, CA, run by **Mario Garza**. Production domain: **catalyst-digital-solutions.com**. Visual direction is "dramatic tech-noir": near-black `#080b0f`, violet `#8000ff` + cyan `#00d4ff` accents, green `#80ff80`, Bebas Neue display type, JetBrains Mono labels, Inter body.

Six pages, all built: **Home, About, Services, Quick Wins, Pricing, Contact**.

## Repo & infra

- **Repo root:** `/Users/Mario/Documents/aaa-catalyst-digital-solutions/catalyst-companies-and-domains/catalyst-digital-solutions-2026`
- **Vercel project:** `catalyst-digital-solutions-2026` (projectId `prj_kHJVhmc1sz7ZiNak1kxKLEoOUhIn`, org/team `team_XTrwYomM6RHxMEvbhFhyuV7Q`). Deploys catalyst-digital-solutions.com.
- **Stack:** Next.js **16.2.9** (App Router, `src/app`), React **19.2.4**, TypeScript, Tailwind v4 available. Sections are authored with **inline `style` objects** + design tokens/keyframes in `src/app/globals.css` (CSS variables `--cds-*`). Shared `Nav` + `Footer` render in `src/app/layout.tsx`.
- ⚠️ **`AGENTS.md` at repo root says: "This is NOT the Next.js you know."** APIs/conventions may differ from your training data. **Read the relevant guide in `node_modules/next/dist/docs/` before writing any Next code.** (Route Handlers doc: `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`.)

### Sibling-repo warning (don't get lost)
Under `catalyst-companies-and-domains/` there are also `construction1-5-catalyst-demos/` repos — those are **5 separate demo contractor sites** (Apex/Holloway/Monolith/Voltaic/Meridian) shown in this site's Proof section. **This repo is the main CDS site, not a demo.** Don't cross the streams.

## Current branch state (important)

- **Active branch: `redesign/v3-handoff`.** All six pages were rebuilt to the "v3" design and the contact form got a real backend. This branch is **NOT merged to `main`** and **NOT deployed** yet.
- `main` has a **WIP checkpoint commit `6ce6d71`** preserving Mario's earlier uncommitted edits — don't lose it.
- The working tree may carry **uncommitted edits from Mario** (he edits files directly). Run `git status` first; don't clobber his changes — commit or ask.
- Recent commits are page builds + homepage tweaks + the contact backend (`1f2788c Contact: real form delivery…`).

## Key files

| Purpose | Path |
|---|---|
| Contact form (client) | `src/components/contact/ContactContent.tsx` |
| Contact API (delivery) | `src/app/api/contact/route.ts` |
| Homepage (13 sections) | `src/components/home/HomeV3.tsx` |
| Shared nav / footer | `src/components/Nav.tsx`, `src/components/Footer.tsx` |
| Design tokens + keyframes | `src/app/globals.css` |
| Env template + docs | `.env.example` (gitignored here; the route file header also documents envs) |

## Run / build / verify

- **Dev:** `npm run dev -- --port 3007` → http://localhost:3007
- **Build (typecheck + prod):** `npm run build`
- Next 16 **refuses a second `next dev`** instance. For a parallel server (e.g. testing with different env), use `npx next start -p <port>` against a prod build.
- The in-repo browser/preview may report a 0-height viewport in some harnesses; resize to a real height before relying on IntersectionObserver / scroll.

## Known open items (context, not all yours)

- **Quick Wins → "Credit Mechanic"** section contains an intentional **placeholder**: `[X]% … [Y] days … Do not publish as-is`. Mario owes real numbers before launch. (`src/components/quick-wins/QuickWinsContent.tsx`)
- **Contact email mismatch:** the Contact page body uses `hello@catalyst-digital-solutions.com`; the shared footer uses `info@…`. Both are from the design. Mario to confirm canonical.
- **Contact form** now collects Email (required) + Phone (added — the design had neither), consent checkboxes (required contact consent gates submit; optional SMS consent), Trade→Other and Source→Other conditionals, honeypot, and posts tracking metadata.

## Guardrails

- **No secrets in git.** Keys → Vercel env + local `.env.local` (gitignored). 
- Don't merge to `main` / deploy to prod without Mario's OK.
- No force-push / history rewrite.
- Prefer this repo's established patterns (inline styles + `--cds-*` tokens); match surrounding code.

## Your first steps

1. Read `PRD-resend-email-delivery.md`.
2. `git status` + `git log --oneline -15` to confirm state.
3. Append an intro/ack to `thread.md` (see README for format) — flag anything unclear before starting.

# Catalyst client agreements

Self-contained Next.js app for private per-client agreements. Deployed as a **separate Vercel project** so the main Catalyst site (`catalyst-digital-solutions-2026`) is not rebuilt or rerouted.

Production host: `https://terms.catalyst-digital-solutions.com`

## Local

```bash
cd terms
npm install
npm run dev
```

- `/` — minimal noindex landing (does not list clients)
- `/atara` — Atara Mechanical Website Build & Managed Care Agreement

```bash
npm run typecheck
npm run lint
npm run build
```

## Adding another client

1. Copy `src/content/atara.tsx` to `src/content/<client>.tsx` and replace the content/config.
2. Add `src/app/<slug>/page.tsx` that exports metadata and renders `<AgreementPage agreement={...} />`.
3. Add any checkout env key to `src/lib/config.ts`.

Do not rewrite legal wording without Mario’s approval.

## Vercel project settings

Create a **new** Vercel project (do not change the main site project):

| Setting | Value |
|---|---|
| Framework Preset | Next.js |
| Root Directory | `terms` |
| Build Command | `next build` (default) |
| Output | Next.js default |
| Install Command | `npm install` (default) |
| Node.js | 22.x (or current Vercel default) |

**Environment variable (Production + Preview):**

- `NEXT_PUBLIC_ATARA_CHECKOUT_URL` — full `https://` URL of Catalyst’s private checkout page. If unset, the checkout button is disabled and shows “Checkout link coming soon”.

**Domain:** attach `terms.catalyst-digital-solutions.com` to this project only.

The app sends `X-Robots-Tag: noindex, nofollow` on every route, sets matching robots metadata, and serves `robots.txt` that disallows all crawlers.

## Main-site ignore build (optional, not applied in this repo)

The main Catalyst project has no `vercel.json` ignore command today. To skip main-site rebuilds when a commit only touches `terms/`, the main project’s Ignored Build Step can be:

```bash
git diff --quiet HEAD^ HEAD -- . ':!terms' ':!terms/**'
```

Vercel skips the build when this command exits `0`. Only add this in the main project dashboard if you have confirmed it against existing deploy behavior. This repo does **not** add a root `vercel.json`, so current main-site deploys are unchanged.

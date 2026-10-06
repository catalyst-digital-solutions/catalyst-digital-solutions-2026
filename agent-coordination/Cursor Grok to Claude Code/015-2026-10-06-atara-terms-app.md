# CG → Claude — Atara agreement on isolated `terms/` app

Built a self-contained Next.js app at `terms/` for `https://terms.catalyst-digital-solutions.com/atara`. Separate Vercel project (you create). Main site routing and production behavior are unchanged.

**Branch:** `cursor/atara-terms-agreement-4abd` off `main`.

## Why a sub-app
Putting `/atara` on the main site would add a public route, share the main build, and risk shipping client-agreement pages with the marketing site. A `terms/` app with Root Directory = `terms` keeps the main project’s build graph, `next.config.ts`, and `src/app` routing untouched.

## Main-site files touched (isolation only)
- `tsconfig.json` — exclude `terms` so the main typecheck does not compile the sub-app
- `eslint.config.mjs` — ignore `terms/**` so `npm run lint` at repo root stays scoped to the main site

No `vercel.json` ignore command was added (none existed; adding one could change deploy behavior). Recommended dashboard ignore command is in `terms/README.md`.

## Vercel settings you need
See the PR and `terms/README.md`. Env: `NEXT_PUBLIC_ATARA_CHECKOUT_URL`.

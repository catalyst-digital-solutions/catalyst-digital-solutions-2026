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
- `/myers` — Myers Diesel Repair Website Development & Independent Services Agreement, **Version 1.4** (November 13, 2026), signature-ready. Canonical host: `https://terms.catalystdigitalsolutions.com/myers`

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

## Myers Diesel (`/myers`) — Version 1.4 (signature-ready)

- **Authoritative source (unchanged):** `src/content/myers/agreement-v1.4.md`, the verbatim v1.4 Mario supplied on Nov 13, 2026.
- **Rendered copy:** `src/content/myers/agreement-v1.4-final.md` is built from the source by `scripts/make-myers-final.mjs`. It applies only the removals Mario authorized: the internal "To be confirmed before signing" note, the duplicate "Items for confirmation before signing" section, and the draft/not-executed status words in the title block and closing line. Each removal must match exactly once, or the script fails.
- After replacing the source, run `node scripts/make-myers-final.mjs && node scripts/gen-myers-source.mjs`. This writes `source.generated.ts` with both SHA-256 values. Then rebuild and regenerate the PDF.
- **PDF:** `public/myers/Myers-Diesel-Website-Agreement-v1.4.pdf` is printed with headless Chrome from the built `/myers` page. It uses the print CSS on Letter paper, with the footer "Version 1.4 · November 13, 2026 · Page X of Y". Regenerate it whenever the markdown or print CSS changes.
- **Execution:** Mario uploads the PDF to Zoho Sign and places the fields there: both signatures and dates, plus the Schedule D choice, initials and date. The site has no signing integration.
- **Kickoff checkout:** this is a separate one-time $8,500 Stripe link sent after signing. It is not shown on the page, and `NEXT_PUBLIC_MYERS_CHECKOUT_URL` stays unset.

# STATUS — Atara private checkout (active)

Living checklist. **CG updates the boxes** as work lands.

## Branch
`cursor/atara-checkout-splash-87c0` off `main` — **do not merge to `main` / prod without Mario OK**

## Isolated start app
- [x] Separate Next.js app in `start/` (not wired into the main site)
- [x] `/atara` checkout page + `/` → `/atara`
- [x] Intro splash on every load (no persisted skip)
- [x] Stripe buttons gated on checkbox + env URLs
- [x] noindex/nofollow metadata + `X-Robots-Tag` + robots.txt disallow all
- [x] Typecheck / lint / production build for `start/`
- [x] Playwright visual QA
- [ ] Mario: create Vercel project (Root Directory = `start`) and attach `start.catalyst-digital-solutions.com`
- [ ] Mario: set `NEXT_PUBLIC_ATARA_STRIPE_KICKOFF_URL` and `NEXT_PUBLIC_ATARA_STRIPE_FULL_URL`

**Blockers:** Stripe Payment Link env vars unset until Mario provides them (buttons disable gracefully).
**Last updated:** 2026-10-06 by CG — checkout app + splash; not merged.

---

# STATUS — Atara client agreement (active)

Living checklist. **CG updates the boxes** as work lands.

## Branch
`cursor/atara-secondary-market-copy-4abd` off `main` — **do not merge to `main` / prod without Mario OK**

## Isolated terms app
- [x] Separate Next.js app in `terms/` (not wired into the main site)
- [x] `/atara` agreement page with reusable components + `terms/src/content/atara.tsx`
- [x] noindex/nofollow metadata + `X-Robots-Tag` + robots.txt disallow all
- [x] Typecheck / lint / production build for `terms/`
- [x] Responsive + print artifacts
- [x] Confirm main site still builds (same 24 routes; no `/atara` on the marketing site)
- [x] PR #2 merged; PostCSS/root fix shipped in #3
- [x] PR #4 (ready, not merged): Eastvale bullet → secondary expansion market; redundant acceptance panel removed
- [x] Vercel project `catalyst-terms` exists (Root Directory = `terms`)
- [ ] Mario: attach `terms.catalyst-digital-solutions.com` if not already live
- [ ] Mario: set `NEXT_PUBLIC_ATARA_CHECKOUT_URL` when the private checkout exists

**Blockers:** checkout URL env unset until Mario provides it (button disables gracefully).
**Last updated:** 2026-10-06 by CG — PR #4 copy follow-ups; not merged.

---

# STATUS — getbranded Brand Starter v5 (active)

Living checklist. **CG updates the boxes** as work lands.

## Branch
`feature/getbranded-brand-starter-v5` off `main` — **do not merge to `main` / prod without Mario OK**

## v5
- [x] Feature branch created; PRD copied to `agent-coordination/PRD-getbranded-brand-starter-v5.md`
- [x] Stripe live: $500 public + $3,500 / $1,750 private Payment Links
- [x] Landing rewrite (hero $500, three-quotes hook, What $500 Gets You, package reveal, scarcity)
- [x] `/start` intake + Cal embed + `proxy.ts` rewrite
- [x] Terms Schedule B (Brand Starter)
- [x] `npm run build` green
- [ ] Mario: confirm ToS checkbox on the $500 Stripe link
- [ ] Mario: add `STRIPE_SECRET_KEY` (+ optional Supabase/Twilio) before first real $500
- [ ] Preview deploy (not production)
- [ ] Merge → main + prod (Mario explicit OK only)

**Blockers:** Supabase table/bucket and Twilio SMS are env-gated; intake still emails via Resend without them.
**Last updated:** 2026-08-19 by CG — Brand Starter v5 on feature branch only.

---

# STATUS — v4 design port (parked)

Living checklist. **CG updates the boxes** as work lands.

## Branch
`redesign/v4-design-port` — **do not merge to `main` / prod without Mario OK**

## Port
- [x] Assets synced from `_design-export-2026-07-30/` → `public/assets/`
- [x] Nav (Automation pattern) + Footer (`info@`)
- [x] Homepage v4
- [x] Services hub + 7 service pages (short live slugs)
- [x] Quick Wins, Pricing, About
- [x] Contact (existing API + consent; v4 padding/email)
- [x] `npm run build` green
- [x] Preview deploy: https://catalyst-digital-solutions-2026-otyu6mfjh.vercel.app
- [ ] Visual QA @ 1440 / 1040 / **900** / 600
- [ ] Mario fills Quick Wins credit `[X]%` / `[Y]` days
- [ ] Commit on branch (when Mario asks)
- [ ] Merge → main + prod (Mario explicit OK only)

**Blockers:** _(none for build)_  
**Last updated:** 2026-08-11 by CG — Testimonials live on `main` (`035481a`). Coverflow parked on `wip/presence-coverflow` (`c605c7a`).

---

# Archive — Resend email delivery PRD (complete 2026-07-15)

- [x] **T1–T5** Resend + contact API + merge/deploy — done 2026-07-15

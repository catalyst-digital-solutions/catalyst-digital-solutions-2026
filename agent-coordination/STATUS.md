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

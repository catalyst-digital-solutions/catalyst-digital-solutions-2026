# CLAUDE.md

Guidance for agents working in this repository. **This file is current state only** — not a changelog. When something is replaced, update this file in place. Historical notes live in [`docs/SITE-HISTORY.md`](docs/SITE-HISTORY.md).

## Project

**Catalyst Digital Solutions (CDS)** — the agency’s own marketing site for a construction-niche *revenue-growth* company (not a generic marketing agency). Owner: **Mario Garza**, Bakersfield CA.

- **Production:** https://catalyst-digital-solutions.com (also `www` and `catalyst-digital.solutions`)
- **Vercel:** project `catalyst-digital-solutions-2026`, team `catalyst-digital-solutions-projects`
- **Canonical email (sitewide):** `info@catalyst-digital-solutions.com`
- **Phone (NAP / RingCentral):** `(661) 888-4837` — `tel:+16618884837` (do not reintroduce `(661) 535-9927`)
- **Hours:** Monday–Friday, 8:00 AM – 6:00 PM PT (site + GBP)
- **Booking:** Cal.com `https://cal.com/catalystdigitalsolutions/20min` (used heavily in CTAs)

**Positioning rule:** Headlines sell the destination (jobs, revenue, profit, margins) — never the vehicle (websites, SEO, AI) as the hero claim.

**Program names (sitewide):** Foundation → Framework → Landmark. Anchors: `#foundation` `#framework` `#landmark`. **Inclusive progression:** each program includes everything in the one below it, at one price — never imply stacking `$1,497 + $2,997`. Prices: Foundation `$1,497` / Framework `$2,997` / Landmark `$7,997` (do not change without Mario).

**Pricing authority:** intended source of truth is `docs/pricing/tiers-canonical.md` (v2.0+) — **file not yet in this repo** as of 2026-08-07; add it before further pricing copy passes.

## Roles & coordination

- **Mario** owns decisions and production deploys.
- **CG (Cursor Grok)** = lead implementer.
- **Claude Code** = coordinator.
- Before substantive work: read `agent-coordination/HANDOFF.md`, active `agent-coordination/PRD-*.md`, `agent-coordination/STATUS.md`; run `git status` / `git log` — do not clobber Mario’s uncommitted edits.
- Messages to Claude: `agent-coordination/Cursor Grok to Claude Code/NNN-YYYY-MM-DD-topic.md` + one-liner in `agent-coordination/thread.md`.

## Commands

```bash
npm run dev              # Next.js dev (default 3000; often also on 3007)
npm run dev -- -p 4567   # alternate port
npm run build            # production build + typecheck
npm run lint             # ESLint
```

**Deploy:** push to `main` auto-deploys on Vercel. Manual: `vercel deploy --prod --yes --scope catalyst-digital-solutions-projects`.

**Branch:** active work on `redesign/v4-design-port`; production tracks `main`. Do not force-push. Never commit secrets (`.env.local` / Vercel env only).

⚠️ **`AGENTS.md` / this file:** Next.js APIs may differ from training data — read `node_modules/next/dist/docs/` before writing Next-specific code.

## Stack

- **Next.js 16** (App Router under `src/app`), **React 19**, TypeScript strict
- **Tailwind CSS v4** — tokens bridged via `@theme inline` in `src/app/globals.css`
- Page UI is mostly **inline `style` objects** + shared classes / `--cds-*` tokens / keyframes in `globals.css`
- **lucide-react** for icons (homepage prospects, etc.)
- GSAP + Framer Motion installed but not the primary motion system
- **LenisProvider** is an intentional no-op (Lenis removed for scroll lag); keep import for `layout.tsx`

## Brand tokens

Prefer `var(--cds-*)` from `globals.css`. Common values still appear as literals in v4 ports — match surrounding code; don’t invent a second palette.

| Token / value | Use |
|---|---|
| `--cds-purple` / `#8000ff`, `#5600ab` | Primary CTAs, purple gradients |
| `--cds-purple-light` / `#b56bff` | Accent / gradient text |
| `--cds-cyan` / `#00d4ff` | Eyebrows, tech accents |
| `--cds-green` / `#80ff80` | Positive stats (sparingly) |
| `--cds-bg-dark` / `#080b0f` | Default page background |
| Websites hero section | **`#07080a`** — must match `websites-hero-devices.jpg` (do not change independently) |

**Fonts** (`layout.tsx` via `next/font/google`):
- `--font-bebas-neue` / display → Bebas Neue — large uppercase headlines
- `--font-inter` / body → Inter
- `--font-jetbrains-mono` → JetBrains Mono — eyebrows, labels

**Gradient text pattern:**
```css
background: linear-gradient(90deg, #b56bff, #00d4ff);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```

## Architecture (current)

### Layout (`src/app/layout.tsx`)
`LenisProvider > Nav > main > Footer`. Nav is a **fixed overlay**; pages own top padding (no `main` paddingTop). Favicon: `/assets/catalyst-digital-solutions-favicon-circle.png` (+ `src/app/favicon.ico`). OG image: `/assets/og-share.jpg`.

### Page wiring
Thin `src/app/**/page.tsx` files import v4 page bodies from `src/components/v4/*V4.tsx`. Shared expand/collapse: `src/components/v4/Expandable.tsx`.

| Route | Component |
|---|---|
| `/` | `HomeV4.tsx` |
| `/about` | `AboutV4.tsx` |
| `/services` | `ServicesV4.tsx` (7-card hub) |
| `/services/websites` | `ServiceWebsitesV4.tsx` |
| `/services/seo` | `ServiceSeoV4.tsx` |
| `/services/google-reviews` | `ServiceGoogleReviewsV4.tsx` |
| `/services/advertising` | `ServiceAdvertisingV4.tsx` |
| `/services/content` | `ServiceContentV4.tsx` |
| `/services/automation` | `ServiceAutomationV4.tsx` |
| `/services/rfp-ai` | `ServiceRfpAiV4.tsx` |
| `/pricing` | `PricingV4.tsx` (`#tiers`, `#foundation`, `#framework`, `#landmark`) |
| `/quick-wins` | `QuickWinsV4.tsx` (live; `quick-wins/QuickWinsContent.tsx` is legacy) |
| `/contact` | `ContactContent.tsx` + `POST /api/contact` (Resend) |
| `/privacy`, `/terms` | Legal pages (A2P/SMS language included) |

### Homepage
`HomeV4` is the live homepage (single client component assembling sections). Demo site cards use class `demo-card` + image class `demo-thumb-img` for hover scroll-through previews.

### Pricing (`PricingV4.tsx`)
- Foundation card lists capabilities only (no “No X” exclusion bullets).
- Framework must **not** claim Speed-to-Lead or 5-Star Autopilot until Twilio infrastructure is live.
- Landmark may list client-facing `24/7 AI Voice Agent` as a **product** feature — do not claim Catalyst’s own after-hours phone line is AI-covered (it is not deployed).

### Quick Wins credit
Leak Finder `$497` credits in full toward first month on any monthly program or a custom website build **within 60 days** of report delivery. Builds: client owns them; monthly onboarding wires them in (no rebuild). Fine-print ⊕ panel documents one-credit / no ad-spend rules.

### Contact hours copy
`Mon–Fri, 8am–6pm PT` + purple accent: *Send a message any time — we reply the next business morning.* Do not restore “After-hours? Our AI is always on.”

### Websites service hero
- Class `.hero-web`: flat `#07080a`, copy left / devices right
- Asset: `public/assets/websites-hero-devices.jpg` (1918×1080)
- Violet atmosphere: `::after` with `mix-blend-mode: screen`, left-biased, behind copy (`z-index` stack: devices 1, glow 2, copy 3)
- Device figure: no border/radius/frame; slight left/right crop to hide JPEG seams
- “See the work” → `#work` on the demo gallery section

### Program tier CTAs (SEO / Google Reviews / Automation)
Class `a.ghost-program-btn`: **purple gradient + glow at rest**; **white background / black text on hover**. Links to `/pricing#foundation|framework|landmark`.

### Demo card scroll
Requires parent `className="demo-card"` and img `className="demo-thumb-img"`. Hover scrolls the tall screenshot inside a `container-type: size` frame; touch devices get ambient `thumbScroll` animation. Defined in `globals.css`.

### Contact
Real delivery via `src/app/api/contact/route.ts` (Resend). Form: email, phone, consent/honeypot, trade/source conditionals. Env vars in Vercel + `.env.local` only.

## Sibling repos (do not confuse)

Under `catalyst-companies-and-domains/`, `construction1–5-catalyst-demos` are **separate demo contractor sites** (Apex, Holloway, Monolith, Voltaic, Meridian) linked from this site. **This repo is the main CDS site.**

## Known open items

- Prefer matching existing v4 patterns over introducing a new design system mid-page.
- Add `docs/pricing/tiers-canonical.md` (v2.0.1 hours + changelog) — missing; blocks Task 6 of the 2026-08-07 alignment PRD.
- Homepage presence coverflow (`CoverflowCarousel` + stacked Bad/Good rails) may be WIP locally — confirm before treating as live.
- Program-relationship copy still needs judgment calls (do not auto-edit): HomeV4 “Three separate monthly options…”, Pricing “Add RFP AI to My Stack”, Advertising “layered on top of any”.
- Foundation pricing card may look shorter than Framework/Landmark after exclusion bullets were removed — filler is a separate copy decision.

## Pricing uncertainty — video tools (HeyGen / OpusClip)

**Trigger:** revisit before selling ~the 8th client who needs video generation (Framework/Landmark AI video). Research note from Claude Opus (2026-08).

**HeyGen is not the risk.** Business is $149/mo with 1,500 credits; Avatar IV burns 20 credits per minute; top-ups run $0.05/credit. At 10 clients you're around $420/mo total — roughly $42 per client, and it drops as you grow. The old "$212 / $494 per client" numbers were badly wrong in your favor.

**OpusClip is the risk.** Pro is $29/mo for 300 source-minutes and caps at 2–4 seats. At 10 clients you need ~346 minutes. You break Pro at roughly client #8, and the tier above it has no published price. **Get a Business quote before you sell the eighth seat** — that's the one number that can quietly eat the margin.

**API caveat (can invalidate HeyGen math entirely):** the HeyGen API is a completely separate pay-as-you-go subscription from the web plan. If the pipeline generates video via API, web-plan credits don't apply at all. Confirm before building.

## Task Master

If using Task Master, treat `@./.taskmaster/CLAUDE.md` as imported here.

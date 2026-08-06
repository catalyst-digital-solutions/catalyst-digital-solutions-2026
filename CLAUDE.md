# CLAUDE.md

Guidance for agents working in this repository. **This file is current state only** — not a changelog. When something is replaced, update this file in place. Historical notes live in [`docs/SITE-HISTORY.md`](docs/SITE-HISTORY.md).

## Project

**Catalyst Digital Solutions (CDS)** — the agency’s own marketing site for a construction-niche *revenue-growth* company (not a generic marketing agency). Owner: **Mario Garza**, Bakersfield CA.

- **Production:** https://catalyst-digital-solutions.com (also `www` and `catalyst-digital.solutions`)
- **Vercel:** project `catalyst-digital-solutions-2026`, team `catalyst-digital-solutions-projects`
- **Canonical email (sitewide):** `info@catalyst-digital-solutions.com`
- **Phone:** `(661) 535-9927`
- **Booking:** Cal.com `https://cal.com/catalystdigitalsolutions/20min` (used heavily in CTAs)

**Positioning rule:** Headlines sell the destination (jobs, revenue, profit, margins) — never the vehicle (websites, SEO, AI) as the hero claim.

**Program names (sitewide):** Foundation → Framework → Landmark (pricing tiers / service cards). Pricing page cards also carry legacy labels Launchpad / Growth Engine / Domination with anchors `#foundation` `#framework` `#landmark`.

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
| `/quick-wins` | `QuickWinsV4.tsx` (and/or `quick-wins/QuickWinsContent.tsx`) |
| `/contact` | `ContactContent.tsx` + `POST /api/contact` (Resend) |
| `/privacy`, `/terms` | Legal pages (A2P/SMS language included) |

### Homepage
`HomeV4` is the live homepage (single client component assembling sections). Demo site cards use class `demo-card` + image class `demo-thumb-img` for hover scroll-through previews.

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

- Quick Wins “Credit Mechanic” still has intentional placeholders (`[X]%` / `[Y] days`) — do not treat as final publishable numbers until Mario fills them.
- Prefer matching existing v4 patterns over introducing a new design system mid-page.

## Task Master

If using Task Master, treat `@./.taskmaster/CLAUDE.md` as imported here.

# Cursor AI Handoff — Catalyst Digital Solutions 2026

**Project:** Catalyst Digital Solutions — results-oriented marketing site for construction companies  
**Local root:** `/Users/Mario/Documents/aaa-catalyst-digital-solutions/catalyst-companies-and-domains/catalyst-digital-solutions-2026`  
**GitHub:** `https://github.com/catalyst-digital-solutions/catalyst-digital-solutions-2026`  
**Production URL:** `https://catalyst-digital-solutions-2026.vercel.app`  
**Custom domain:** `catalyst-digital-solutions.com` (DNS A-record pointed at Vercel; may or may not be fully propagated)  
**Dev server:** `npm run dev -- -p 4567`

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.9 — App Router, TypeScript strict |
| Styling | Tailwind CSS v4 + inline styles + CSS custom properties |
| Animations | CSS keyframes (all defined in `globals.css`) |
| Fonts | Bebas Neue · Inter · JetBrains Mono (via `next/font/google`) |
| Packages | `framer-motion`, `gsap` (installed, not yet used) |
| Deployment | Vercel — team `catalyst-digital-solutions-projects` |
| Images | `next/image`, all assets in `public/assets/` |

> **Lenis was removed** — it caused scroll lag on mouse wheel. Native scroll only.

---

## Brand System — DO NOT HARDCODE HEX IN COMPONENTS

All tokens live in `src/app/globals.css` as CSS custom properties:

```css
--cds-purple:        #8000ff   /* primary CTAs, gradient start */
--cds-purple-2:      #5600ab   /* gradient end, hovers */
--cds-purple-light:  #b56bff   /* accent headline words */
--cds-cyan:          #00d4ff   /* eyebrows, icons, tech accents */
--cds-green:         #80ff80   /* positive stats, status dots */
--cds-bg-dark:       #080b0f   /* primary background */
--cds-bg-light:      #f8f8f8   /* rare light sections */
--cds-heading:       #fafafa   /* headings on dark */
--cds-body:          #c8c8c8   /* body text on dark */
--cds-muted:         #7f8896   /* secondary/fine print */
--cds-gradient:      linear-gradient(135deg, #8000ff, #5600ab)
```

**Fonts via CSS vars:**
- `var(--font-bebas-neue)` — H1/H2 hero display only, uppercase
- `var(--font-inter)` — all body copy
- `var(--font-jetbrains-mono)` — eyebrows, labels, mono UI

**Gradient text pattern** (used on "We answer.", "Linktree", "there."):
```css
background: linear-gradient(90deg, #b56bff, #00d4ff);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```

---

## CSS Architecture

All keyframe animations are in `src/app/globals.css`:
`wordIn` · `glowPulse` · `floatY` · `winPulse` · `gridDrift` · `t1`–`t4` (beam sweeps) · `scan` · `panelIn` · `fadeUp` · `flow` · `dotPulse` · `dotRun` · `ctaPulse` · `revealUp`

**Responsive utility classes** (also in `globals.css`):

| Class | Purpose |
|---|---|
| `.nav-desktop` / `.nav-hamburger` | Show/hide nav elements at 768px |
| `.omni-desktop` / `.omni-mobile` | Show/hide omnipresence diagram at 768px |
| `.rfp-steps` | Flex container for step cards |
| `.rfp-step-card` | Individual step card; `margin:auto` centering on ≤1023px |
| `.rfp-connector-h` / `.rfp-connector-v` | Step connectors direction toggle |
| `.footer-grid` | 4-col footer grid; collapses on mobile |
| `.footer-start-col` | CTA column; hidden on mobile |
| `.anim-fadeup` | Adds `opacity:1` fallback when `prefers-reduced-motion` is on |
| `.anim-float` | Suppressed float animation under reduce-motion |
| `.eyebrow` | JetBrains Mono, cyan, uppercase, 13px, 3px letter-spacing |
| `.btn-primary` | Purple gradient CTA button with glow |
| `.btn-secondary` | Ghost button |
| `.card` / `.card-featured` | Standard / purple-tinted cards |
| `.iceberg-pill` | Expandable panel trigger button |

---

## File Map

```
src/
├── app/
│   ├── globals.css          ← ALL tokens, keyframes, utility classes
│   ├── layout.tsx           ← root layout: fonts, Nav, Footer
│   ├── page.tsx             ← homepage (imports all section components)
│   ├── global-error.tsx     ← Turbopack global error boundary (required)
│   ├── about/page.tsx       ← stub ("Coming Soon")
│   ├── services/page.tsx    ← stub
│   ├── pricing/page.tsx     ← stub  ← BUILD THIS NEXT
│   ├── contact/page.tsx     ← stub  ← BUILD THIS NEXT
│   ├── privacy/page.tsx     ← stub
│   └── terms/page.tsx       ← stub
│
└── components/
    ├── Nav.tsx              ← sticky nav; glassmorphic on scroll >24px
    ├── Footer.tsx           ← 4-col grid footer; server component
    ├── LenisProvider.tsx    ← intentionally a no-op (Lenis removed)
    ├── IcebergPanel.tsx     ← "use client" collapsible expand/collapse
    │
    └── home/
        ├── HeroSection.tsx          ← building SVG + beam sweeps + gridDrift
        ├── RotatingWord.tsx         ← "use client"; cycles JOBS/REVENUE/PROFIT
        ├── ProspectSection.tsx      ← "use client"; phone mockup + scan anim
        ├── VoiceAgentSection.tsx    ← "use client"; AI chat card + fadeUp anims
        ├── OmnipresenceSection.tsx  ← "use client"; hub-spoke SVG (desktop) +
        │                               MobileHubSpoke with ResizeObserver (mobile)
        ├── RFPSection.tsx           ← "use client"; 3-step cards + dotRun connectors
        ├── WordOfMouthSection.tsx   ← server; ceiling chart SVG
        ├── ProofSection.tsx         ← "use client"; overlapping browser frames
        ├── SpeedStatsSection.tsx    ← "use client"; IntersectionObserver counters
        └── FinalCTASection.tsx      ← "use client"; ctaPulse CTA + revealUp
```

---

## Public Assets

```
public/assets/
├── cds-wordmark.png              ← header & footer logo (purple rectangle style)
├── cds-logo-circle.png           ← circular Catalyst dot-pattern logo
├── catalyst-wordmark.png         ← alternate wordmark (same as cds-wordmark)
├── catalyst-digital-solutions-circular-logo.png
├── catalyst-digital-solutions-favicon.png
├── catalyst-wordmark-white.svg   ← white-only wordmark (no bg box)
├── catalyst-wordmark-black.svg
├── demo-site.webp                ← Apex Construction demo screenshot (front frame)
├── demo-site-holloway.png        ← Holloway GC demo screenshot (back frame)
├── Apex-Construction-Logo-and-Wordmark-*.png  ← multiple variants
└── holloway-construction-logo-transparent.png
```

---

## Homepage Section Order

`page.tsx` assembles these in order — do not reorder without updating the visual flow:

1. `HeroSection` — building wireframe, rotating word (JOBS/REVENUE/PROFIT)
2. `ProspectSection` — "If a prospect looks you up" / phone mockup / scan bar
3. `VoiceAgentSection` — "Your phone rings. We answer." / AI chat card
4. `OmnipresenceSection` — "Be the name they see everywhere" / hub-spoke network
5. `RFPSection` — "Your estimator should be bidding. Not hunting." / 3-step cards
6. `WordOfMouthSection` — "Word of mouth is a ceiling" / S-curve chart
7. `ProofSection` — "We'd rather prove it" / overlapping browser frames
8. `SpeedStatsSection` — "Fastest contractor wins" / animated 21× / 42 hrs / 78%
9. `FinalCTASection` — "Let's get your phone ringing" / ctaPulse button

---

## Key Patterns

**Iceberg expand/collapse** — used in almost every section. The `IcebergPanel` component handles it client-side. The DC source had `sc-if` tags which map to this component.

**`prefers-reduced-motion` safe pattern** — elements that start at `opacity: 0` for animation MUST also have `className="anim-fadeup"` so the CSS fallback makes them visible when animations are disabled on mobile.

**Section structure** — most sections use:
```tsx
<section style={{ 
  background: "#080b0f", 
  display: "flex", 
  flexDirection: "column",
  alignItems: "center",
  padding: "clamp(72px,9vw,128px) clamp(20px,5vw,64px)"
}}>
```

**Demo sites** — Apex → `https://construction1.catalyst-demos.com`, Holloway → `https://construction2.catalyst-demos.com`. Both are real live sites.

---

## What's Been Built ✅

- [x] Full homepage (all 9 sections), desktop + mobile responsive
- [x] Sticky glassmorphic nav with hamburger menu
- [x] 4-column footer
- [x] All CSS keyframe animations ported from Claude Design reference
- [x] Mobile: hub-spoke diagram with measured SVG lines (ResizeObserver)
- [x] Mobile: RFP cards in vertical column with down-arrow connectors
- [x] Scroll performance (Lenis removed, IntersectionObserver for counters)
- [x] Vercel deployment + domain attached
- [x] GitHub repo connected to Vercel (auto-deploys on push to `main`)

---

## What Needs Building 🔲

### Priority 1 — Pricing Page (`/pricing`)
Currently a "Coming Soon" stub. Build from `initial-references/.../website-copy-text-only.md` → **"Pricing Page"** section verbatim.

Required elements:
- Hero: "Transparent Pricing. Measurable Results."
- **3-tier comparison table** — Launchpad ($1,497/mo) · Growth Engine ($2,997/mo) · Domination ($7,997/mo) — with feature rows across 5 categories: Website & Foundation, SEO, Content & Video, AI Tools, Reporting & Strategy, Support. Growth Engine = "Most Popular" (featured/decoy-anchored card).
- "Why Most Clients Choose Growth Engine" decoy block
- Construction RFP AI standalone block ($497/mo)
- **FAQ accordion** (8 questions in the copy file)
- On-brand tokens throughout; no hardcoded hex

### Priority 2 — Contact Page (`/contact`)
Build from copy file → **"Contact Page"** section verbatim.

Required elements:
- Heading: "Let's Talk About Your Pipeline"
- Form: Full Name, Company Name, Trade/Specialty (dropdown), Current Monthly Revenue (dropdown), Website URL, Biggest Digital Challenge (textarea), How did you hear about us? (dropdown)
- **Stub the form submit** — validate + show success message ("We got it. Expect to hear from Mario within 1 business day."). No backend today.
- Contact info block (phone, email, location, hours)
- After-submit 3-step timeline
- All dropdown options are in the copy file

### Priority 3 — Stub Pages
Fill in real content for `/about`, `/services`, `/privacy`, `/terms`. Each currently shows "Coming Soon." At minimum each needs a proper hero section + 1 content block + CTA.

### Priority 4 — Future
- Wire up the contact form to a real backend (Resend / Formspree / Supabase)
- Add GSAP ScrollTrigger scroll-reveal animations to section entry points
- SEO metadata per page (title, description, OG image)
- Google Analytics 4 integration

---

## Copy Source File

All canonical copy lives in:
```
initial-references/md-file-from-initial-attempt-of-catalyst-2026-site-now-used-for-parts/website-copy-text-only.md
```

Use this file verbatim for: Pricing page, Contact page, FAQ, Footer, Client Results. The homepage copy is already built into the section components.

---

## Deployment

```bash
# Preview deploy
vercel --scope catalyst-digital-solutions-projects

# Production deploy  
vercel --prod --scope catalyst-digital-solutions-projects --yes

# Or just push to main — GitHub → Vercel auto-deploy is wired
git push origin main
```

---

## Business Context

- **Client:** Mario — Founder & CEO, Catalyst Digital Solutions, Bakersfield CA
- **Niche:** Revenue-growth company for construction GCs / design-build firms ($5M+ revenue)
- **Positioning (non-negotiable):** Catalyst is a *revenue-growth company*, not a marketing agency. Headlines sell the destination (jobs, revenue, profit, time off the tools) — never the vehicle (websites, SEO, AI)
- **Phone:** (661) 535-9927
- **Email:** info@catalyst-digital-solutions.com
- **Location:** Bakersfield, CA 93306

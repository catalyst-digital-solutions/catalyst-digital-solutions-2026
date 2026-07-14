# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Catalyst Digital Solutions 2026 — the canonical marketing site for a construction-niche revenue-growth agency. Owner: Mario Garza, Bakersfield CA. This is the agency's own site, not a client project.

**Positioning rule:** Catalyst is a *revenue-growth company*, not a marketing agency. Headlines sell the destination (jobs, revenue, profit) — never the vehicle (websites, SEO, AI).

## Commands

```bash
npm run dev              # Next.js dev server (port 3000)
npm run dev -- -p 4567   # alternate port
npm run build            # production build
npm run lint             # ESLint
```

Deployment: push to `main` auto-deploys to Vercel. Manual: `vercel --prod --scope catalyst-digital-solutions-projects --yes`.

## Stack

- **Next.js 16** (App Router, TypeScript strict, React 19)
- **Tailwind CSS v4** — tokens bridged via `@theme inline` in `globals.css`
- **CSS keyframe animations** — all defined in `src/app/globals.css`; GSAP + Framer Motion installed but not yet wired
- **LenisProvider** is an intentional no-op (Lenis caused scroll lag and was removed); kept so the import in `layout.tsx` doesn't break

## Brand Tokens — CRITICAL

All color/font tokens are CSS custom properties in `src/app/globals.css`. **Never hardcode hex values in components** — always use `var(--cds-*)`.

| Token | Use |
|---|---|
| `--cds-purple` / `--cds-purple-2` | Primary CTAs, gradients |
| `--cds-purple-light` | Accent headline words |
| `--cds-cyan` | Eyebrows, tech accents |
| `--cds-green` | Positive stats (sparingly) |
| `--cds-bg-dark` (`#080b0f`) | Primary background |
| `--cds-heading` / `--cds-body` / `--cds-muted` | Text hierarchy |

**Fonts** (loaded in `layout.tsx` via `next/font/google`):
- `var(--font-display)` → Bebas Neue — H1/H2 hero only, uppercase
- `var(--font-body)` → Inter — all body copy
- `var(--font-mono)` → JetBrains Mono — eyebrows, labels, cyan

**Gradient text pattern:**
```css
background: linear-gradient(90deg, #b56bff, #00d4ff);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```

## Architecture

### Layout (`layout.tsx`)
Root layout wraps all pages in: `LenisProvider > Nav > main (paddingTop: 64px) > Footer`. Nav is a sticky glassmorphic bar; Footer is a 4-column server component grid.

### Homepage (`page.tsx`)
Assembles 9 section components in fixed order — do not reorder without understanding the narrative flow:
1. HeroSection → 2. ProspectSection → 3. VoiceAgentSection → 4. OmnipresenceSection → 5. RFPSection → 6. WordOfMouthSection → 7. ProofSection → 8. SpeedStatsSection → 9. FinalCTASection

### Client vs Server
Most home sections are `"use client"` (they use IntersectionObserver, ResizeObserver, or state). `WordOfMouthSection` and `Footer` are server components. Pages under `app/` (about, services, etc.) are currently stubs.

### CSS Patterns
- **`globals.css`** contains: brand tokens, `@theme inline` Tailwind bridge, all keyframe animations, responsive utility classes (`.nav-desktop`, `.omni-desktop`/`.omni-mobile`, `.rfp-steps`, `.footer-grid`, etc.), and component classes (`.eyebrow`, `.btn-primary`, `.btn-secondary`, `.card`, `.iceberg-pill`)
- **`prefers-reduced-motion` rule:** elements starting at `opacity: 0` for animation MUST have `className="anim-fadeup"` so the CSS fallback makes them visible when animations are off
- **Section template:** most sections use inline styles with `background: "#080b0f"`, flex column, centered, `clamp()` padding

### IcebergPanel
Reusable `"use client"` expand/collapse component used across multiple sections.

### Images
All assets in `public/assets/`. Use `next/image` for all images.

## Copy Source

Canonical copy for unbuilt pages lives in:
```
initial-references/md-file-from-initial-attempt-of-catalyst-2026-site-now-used-for-parts/website-copy-text-only.md
```

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md

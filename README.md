# Catalyst Digital Solutions — 2026 (Canonical)

This is the **canonical, results-oriented** Catalyst Digital Solutions marketing site.

> An older `catalyst-website-2026-rive-version` repo exists but drifted — treat it as a parts-bin only. This repo is the source of truth.

## Stack

- **Next.js 16** — App Router, TypeScript strict
- **Tailwind CSS v4** — utility-first, token-driven
- **GSAP + ScrollTrigger** — scroll reveals, animated counters
- **Lenis** — smooth scroll (`LenisProvider` wraps the root layout)
- **Framer Motion** — supplementary animation
- **Vercel** — deployment target
- **Domain** — catalyst-digital-solutions.com

## Dev

```bash
npm run dev       # starts on port 3000 (default)
npm run dev -- -p 4567  # port 4567
```

## Brand

Brand tokens live in `src/app/globals.css` as CSS custom properties.  
**Zero hardcoded hex values in components** — reference `var(--cds-*)` only.

| Token | Value | Use |
|---|---|---|
| `--cds-purple` | `#8000ff` | Primary CTAs, gradient start |
| `--cds-purple-2` | `#5600ab` | Gradient end, hovers |
| `--cds-purple-light` | `#b56bff` | Accent headline words |
| `--cds-cyan` | `#00d4ff` | Eyebrows, tech visuals |
| `--cds-green` | `#80ff80` | Positive badges (sparingly) |
| `--cds-bg-dark` | `#080b0f` | Primary background |
| `--cds-heading` | `#fafafa` | Headings on dark |
| `--cds-body` | `#c8c8c8` | Body text on dark |
| `--cds-muted` | `#7f8896` | Fine print, eyebrow gray |

## Fonts

- **Bebas Neue** — H1/H2 hero only, uppercase, `var(--font-display)`
- **Inter** — all body copy, `var(--font-body)`
- **JetBrains Mono** — eyebrows/labels, cyan, `var(--font-mono)`

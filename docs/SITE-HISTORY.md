# Site history (CDS marketing site)

Append-only notes about what changed over time. **Do not use this as the source of truth for how to work today** — that is [`CLAUDE.md`](../CLAUDE.md) (and `AGENTS.md`). When a decision is reversed, update `CLAUDE.md` and add a short line here.

## 2026-08 — v4 live + pre-campaign polish

- Full site port from 2026-07-30 Claude Design export to Next.js (`src/components/v4/*V4.tsx`), shipped on production (`catalyst-digital-solutions.com`).
- Short service slugs: `/services/websites`, `/seo`, `/google-reviews`, `/advertising`, `/content`, `/automation`, `/rfp-ai`.
- Sitewide email locked to `info@catalyst-digital-solutions.com`.
- Websites hero: device composite `websites-hero-devices.jpg` on `#07080a` with CSS screen-blend glow (left-biased).
- Program tier buttons: purple at rest / white–black hover; deep links to pricing anchors.
- Demo scroll previews require `demo-card` + `demo-thumb-img` (was missing on v4 websites cards until restored).
- Favicon: circular Catalyst mark (`catalyst-digital-solutions-favicon-circle.png` + `src/app/favicon.ico`).
- Pricing FAQ updated for setup fees, cancellation/vesting, and month-to-month ownership language.
- Quick Wins credit section finalized (Leak Finder full credit; builds credit back on 12-month terms; month-to-month remains available). Placeholders removed.
- Pricing tier labels restored to Foundation / Framework / Landmark after v4 port had reintroduced Launchpad / Growth Engine / Domination from the design export.

## 2026-07 — v3 handoff era (superseded by v4)

- Branch `redesign/v3-handoff`: six-page rebuild (Home as `HomeV3.tsx` with many section components), contact form + Resend backend.
- Layout used `main` with `paddingTop: 64px` under sticky nav (v4 removed that; heroes own padding).
- Agent coordination workflow established (`agent-coordination/`, Cursor rules).
- A2P / SMS legal language hardened on Privacy & Terms; contact SMS consent deferred/adjusted per launch cut.
- Homepage Proof trim / Footer Cityscape PRDs written; not all optional PRD work may have shipped before v4.

## Earlier

- Scaffold and iterative homepage experiments; copy references once lived under `initial-references/` (design exports, screenshots, text-only copy). Those paths are not required for day-to-day v4 work.

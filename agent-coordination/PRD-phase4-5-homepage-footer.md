# PRD — Phase 4 (Homepage Proof trim) + Phase 5 (Footer Cityscape)

**For:** Claude Code CLI (fresh session) · **Branch:** `main` (Phases 1–3 already live)
**Source material:** the Claude Design export unzipped at
`design_handoff_cds_website/` in this repo root — specifically
`CDS Homepage v3.dc.html` and `CDS Footer Cityscape.dc.html`.
(If that folder is missing, ask Mario for `Catalyst Digital Solutions brand guide (2).zip`
from Downloads and unzip `design_handoff_cds_website/` into the repo root — it's gitignored.)

## Context

This is the last piece of reconciling a batch of Claude Design updates into the live
Next.js site. Phases 1–3 (Nav Services dropdown, 7 service pages, Services hub) are
done and deployed. Two items remain:

## Phase 4 — Homepage Proof section

**File:** `src/components/home/HomeV3.tsx` (`DEMOS` array + the Proof section JSX, ~line 52 and ~line 560).

**Decision already made by Mario: keep only Monolith and Holloway** (in that order) on
the homepage. Do NOT ask again — just implement.

1. Trim `DEMOS` to 2 entries, in this order: **Monolith** (`demo-full-monolith.jpeg`), then
   **Holloway** (`demo-full-holloway.jpeg`). Remove Apex/Voltaic/Meridian from the homepage
   array (they stay on `/services/websites`, already built).
2. Per-card scroll speed is now **proportional**, not a flat 12s/48s. Use these exact values
   (already matches what's live on `/services/websites` — see `src/app/services/websites/page.tsx`
   `DEMOS` array for the pattern to copy):
   - Monolith: hover `48s`, return `12s`
   - Holloway: hover `44s`, return `11.1s`
   `globals.css` already supports this — `.demo-thumb-img` reads `--thumb-hover` /
   `--thumb-return` CSS custom properties (defaults 48s/12s), set them inline per card via
   `style={{ "--thumb-hover": d.hover, "--thumb-return": d.ret } as CSSProperties}` on the
   `.demo-card` anchor, same as the Websites page does it.
3. Add a **"See More Sites Here →"** ghost button after the 2 cards, linking to `/services/websites`.
   Exact copy/style from the design source (search `CDS Homepage v3.dc.html` for
   `"See More Sites Here"`):
   ```
   style: display:inline-flex;align-items:center;gap:10px;min-height:48px;
   font:600 15.5px Inter;color:#fafafa;background:rgba(255,255,255,.04);
   border:1px solid rgba(255,255,255,.18);padding:14px 26px;border-radius:11px;
   ```
   Place it next to/near the existing "Want to see YOUR company..." CTA line — check the
   `.dc.html` source for exact placement (it sits in the same flex row as that paragraph,
   before the "Book a 20-Min Call" button).
4. The Proof section's intro paragraph copy also changed slightly in the export — diff it
   against what's currently in `HomeV3.tsx` and update if different (last time I checked,
   `CDS Homepage v3.dc.html`'s copy was: *"Talk is cheap. Here's the proof. These are real,
   live sites, built for contractors. No two look alike..."* — verify verbatim, don't
   paraphrase).
5. Build + verify: card count = 2, order = Monolith then Holloway, "See More Sites Here"
   link resolves to `/services/websites`, no console errors, screenshot looks right at
   desktop + mobile.

## Phase 5 — Footer Cityscape

**Files:** `src/components/Footer.tsx`, `src/app/globals.css`.
**Reference:** `agent-coordination/PRD-footer-cityscape.md` (the original spec I wrote) and
`CDS Footer Cityscape.dc.html` (what Claude Design actually built from it).

This is a **background/visual-only** change — footer content/columns/copy do not change.

1. Read `CDS Footer Cityscape.dc.html`. It's an ambient SVG skyline silhouette (two layered
   `<svg viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice">`, one blurred/背景 layer
   at ~50% opacity, one sharper foreground layer) positioned absolutely behind the footer
   content, with small `<rect>` "windows" that each fade in/out independently via the
   `winPulse` keyframe (`opacity .18↔.6` roughly, or per-window `opacity .3↔.9` — check the
   file, values vary per window) with staggered `animation-delay` per window so it never
   looks synchronized.
2. Port the two SVG layers + the `winPulse` keyframe into `Footer.tsx` as a background layer
   (`position:absolute; inset:0; z-index:0; pointer-events:none; aria-hidden`), with the
   existing footer content re-layered above it (`position:relative; z-index:1`).
3. Add `@media (prefers-reduced-motion: reduce)` handling consistent with the rest of the
   site (freeze windows at their mid-opacity, no animation) — `globals.css` already has a
   global `*{animation:none!important}` reduced-motion rule, confirm it actually reaches
   these new keyframes (it should, since it's a universal selector) and don't fight it with
   `!important` overrides.
4. Keep it subtle — this is atmosphere behind a footer, not a hero. If it reads as too
   bright/busy against the existing footer content once ported, dim the opacities further
   rather than removing detail.
5. Build + verify: footer still fully legible and functional (links clickable, no
   z-index/pointer-events regressions), works at all 3 footer breakpoints (desktop /
   ≤880px 2-col / ≤540px 1-col), animation visible in normal mode, frozen under
   reduced-motion (test via browser devtools emulation or OS accessibility setting).

## Guardrails

- Read `AGENTS.md` at repo root before any Next.js work (this codebase's conventions may
  differ from training data).
- Match existing code style: inline `style` objects + `--cds-*` / `--thumb-*` CSS vars,
  not Tailwind classes, not new CSS files.
- Build (`npm run build`) and manually verify in-browser before committing. Don't skip
  the visual check — this PRD covers two purely visual changes.
- Commit each phase separately (matches the Phase 1/2/3 commit history convention already
  in this repo — `git log --oneline` to see the pattern).
- **Ask Mario before pushing to `main` / deploying**, unless he's pre-authorized it the way
  he did for Phases 1–3 tonight (2026-07-16) — check with him first if unsure.

# PRD — Footer redesign: ambient cityscape at night

**For:** Claude Design (visual generation) → handed to Claude Code for implementation
**Site:** Catalyst Digital Solutions (catalyst-digital-solutions.com)
**Scope:** Footer background/visual treatment ONLY. Do not rewrite footer copy or restructure its content columns.

---

## 1. What this is

Give the shared site footer an **ambient night-cityscape background** — a skyline silhouette with building windows that softly fade in and out, like a city breathing at night. This is a mood/brand touch, not a hero moment: quiet, subtle, and legible text always wins over the visual.

It should feel like a **quieter cousin** of the homepage hero's animated skyline (which *assembles itself* — wireframe → framed → clad, with a crane). The footer version is **not** an assembly animation. The buildings are already standing; only the windows breathe. Different motion, same visual language (tech-noir skyline, violet/cyan glow).

## 2. Deliverable format

Produce a **standalone `.dc.html` design-component file** (same convention as prior CDS handoffs: `<helmet>` with fonts/keyframes/CSS, an inline-styled `<x-dc>` template, and if there's any interactive state — e.g. a toggle to preview reduced-motion — a `<script type="text/x-dc" data-dc-script">` component). Build it as its **own standalone page** (not wedged into the live footer) so it can be reviewed and ported in isolation — keep the implementation surface small and self-contained. Include a `screenshots/` capture if possible.

Do not touch any other page. This PRD produces exactly one file.

## 3. What must NOT change

The footer's **content and structure are locked** — this is a background/visual reskin only:
- Column 1: wordmark + tagline ("Bakersfield's construction growth partner.")
- Column 2: "Pages" nav (Home / About / Services / Quick Wins / Pricing / Contact, active page bold)
- Column 3: "Get in touch" (phone, email, "Bakersfield, CA 93306")
- Column 4: "Start" CTA button (hidden on mobile per existing responsive rule)
- Bottom bar: "© 2026 Catalyst Digital Solutions, LLC. All rights reserved. · Privacy Policy · Terms"
- Grid: `1.3fr 1fr 1.2fr 1.1fr` desktop → 2-col ≤880px → 1-col ≤540px (existing breakpoints — keep them)

Transcribe this content into your mockup exactly as listed above so the visual reads correctly, but the copy itself is not up for revision here.

## 4. The cityscape treatment

- **Position:** background layer behind the whole footer (`position:absolute; inset:0; z-index:0`), content sits above it (`z-index:1`) with enough contrast to stay fully readable — the visual is atmosphere, never a legibility fight.
- **Silhouette:** a low-detail skyline of building outlines (varying heights, simple rectangles/setbacks — same wireframe language as the hero SVG), spanning the full footer width, anchored to the bottom edge like a horizon.
- **Line color:** cyan `#00d4ff` at low opacity (~.15–.25) for building outlines, consistent with the hero's `stroke:#00d4ff`.
- **Windows:** small rects scattered across the buildings. Each window **fades in and out independently** on its own slow cycle (stagger the delays so it never looks synchronized) — reuse the existing `winPulse` keyframe language (`opacity .3 ↔ .9`, ~4.5–6s per cycle, staggered `animation-delay`) already used on the homepage hero skyline. Window fill colors: mix of cyan `#00d4ff`, violet `#8000ff`, and light violet `#b56bff` (matching the hero's window palette), never green or any off-brand color.
- **Ambient glow:** one or two soft blurred violet radial-gradient blobs behind the skyline (`radial-gradient(circle, rgba(128,0,255,.15–.2), transparent 64%)`, heavily blurred), very subtle — this is a footer, not a hero; keep it dim.
- **No crane, no assembly/build animation, no scan lines.** This skyline is static in form — only the windows animate.
- **Overall opacity/dimness:** the whole treatment should read as barely-there texture behind dark `#080b0f` — err on the side of too subtle rather than too loud. The footer must not compete with page content above it.

## 5. Brand tokens (must match exactly — do not invent new colors)

```
Background:      #080b0f
Cyan (lines):    #00d4ff
Violet:          #8000ff / #5600ab (gradient pair) / #b56bff (light)
Heading text:    #fafafa
Body text:       #c8c8c8
Muted text:      #7f8896
Display font:    Bebas Neue (uppercase, wordmark only — footer wordmark stays as the existing image asset, not reset in type)
Body font:       Inter
Mono/labels:     JetBrains Mono
```

## 6. Motion & accessibility

- All animation is `opacity` fades only — no layout shift, no transform-heavy motion.
- **Must honor `prefers-reduced-motion: reduce`:** windows freeze at a fixed dim/lit pattern (no animation), exactly like the rest of the site (`@media (prefers-reduced-motion:reduce){*{animation:none !important;}}`).
- Background is `pointer-events:none` and `aria-hidden` — it must never interfere with or announce itself to footer links/keyboard nav.
- Keep it lightweight: pure inline SVG + CSS keyframes, no image assets, no external requests.

## 7. Responsive

- The skyline should scale/crop gracefully down to mobile widths — on narrow screens it's fine for the silhouette to simplify (fewer buildings visible) rather than squish. Prioritize the footer content columns' existing responsive behavior (§3) over the visual; the visual should never cause horizontal scroll or push content.

## 8. Reference

- Homepage hero's animated skyline SVG is the sibling asset for visual language (wireframe stroke color/weight, window palette, `winPulse` keyframe) — match its *style*, not its *animation* (no assembly/crane here, ambient windows only).
- Existing footer implementation: `src/components/Footer.tsx` + `.footer-*` classes in `src/app/globals.css` (for the exact content/columns/breakpoints to mirror).

## 9. Acceptance checklist

- [ ] Delivered as one standalone `.dc.html` file, all styles inline, correct brand tokens only.
- [ ] Cityscape is a static silhouette; only windows fade in/out, staggered, on independent cycles.
- [ ] Existing footer content/columns/copy reproduced exactly, unchanged.
- [ ] Legible at every breakpoint (desktop / ≤880px 2-col / ≤540px 1-col); no horizontal scroll.
- [ ] `prefers-reduced-motion` freezes the animation with no layout impact.
- [ ] No crane/assembly animation, no off-brand colors, no stock imagery.

# Atara splash: last-frame hold + real overlay fade

Mario’s preview: video end darkened ~0.25s (PNG color shift), then overlay vanished with no 800ms fade.

**Fix on `cursor/atara-checkout-splash-87c0` (PR #5, do not merge):**
- Natural `ended` path keeps the **paused video** last frame for the 600ms hold + 800ms fade. PNG only for skip / fail / reduced-motion.
- Overlay stays mounted; `transition: opacity 800ms ease` is on the base rule. Fade arms with reflow + rAF×2, then `opacity: 0`. Unmount on `transitionend` (overlay + opacity) with 900ms timeout.
- `intro-controlled` is always on the React `className` so a re-render cannot restart the 8s fallback animation. Fallback keyframes no longer animate `opacity`. `html.js .intro-splash` forces `animation: none`.

Not merging. Preview-only.

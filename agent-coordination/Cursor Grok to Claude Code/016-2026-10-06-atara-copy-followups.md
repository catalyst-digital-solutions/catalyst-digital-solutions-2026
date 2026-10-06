# CG → Claude — Atara copy follow-ups on PR #4

Mario’s two `/atara` copy edits are on **`cursor/atara-secondary-market-copy-4abd`**.

**PR (open, ready, not merged):** https://github.com/catalyst-digital-solutions/catalyst-digital-solutions-2026/pull/4

**catalyst-terms preview:** https://catalyst-terms-git-c-f65643-catalyst-digital-solutions-projects.vercel.app

1. Section 1 bullet: Eastvale replaced with secondary-expansion-market language. No remaining “Eastvale” in `terms/`.
2. Redundant “How these terms are accepted” panel removed. Formal §16 unchanged. Checkout button lived in that panel; it now sits in an unlabeled `.checkout-after-agreement` container after §16 (still disabled when `NEXT_PUBLIC_ATARA_CHECKOUT_URL` is unset). Bottom “Last updated” line kept. `acceptanceText` remains optional for future templates; Atara does not pass it.

Do not merge without Mario’s OK.

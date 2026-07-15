# 003 — T1 blocked: need Resend API key (or dashboard DNS)

**From:** CG · **To:** Claude / Mario · **2026-07-15 ~13:30 PT**

## T1 progress
Started T1. Findings:
- **No Resend MCP** in Cursor (not in `~/.cursor/mcp.json`). PRD assumed one — proceeding via Resend HTTP API instead.
- **No `RESEND_API_KEY`** in local `.env` / `.env.local` (CONTACT_* also unset locally).
- **Vercel project has zero env vars** today (`vercel env ls` empty for this project).
- Contact route is ready; it will use Resend once `RESEND_API_KEY` is set and `CONTACT_WEBHOOK_URL` is empty.

## Blocker — need Mario
DNS records for a Resend domain are **generated per domain in Resend** — I can't invent them. Pick one path:

### Path A (preferred — I finish T1 end-to-end)
1. Resend dashboard → **API Keys** → create a key with **sending** scope.
2. Put it **only** in local `.env.local` (never chat/thread/git):
   ```
   RESEND_API_KEY=re_...
   CONTACT_TO_EMAIL=hello@catalyst-digital-solutions.com
   CONTACT_FROM_EMAIL=Catalyst Website <noreply@catalyst-digital-solutions.com>
   CONTACT_WEBHOOK_URL=
   ```
3. Tell me "key is in .env.local" — I'll `POST /domains` for `catalyst-digital-solutions.com`, hand you the **exact** Namecheap DNS table (no secrets), then continue T2.

### Path B (dashboard)
1. Resend → **Domains** → Add `catalyst-digital-solutions.com`.
2. Paste the DNS records table here (type / name / value / priority — not secret).
3. Still need an API key in `.env.local` (Path A step 2) before T2/T3.

## Namecheap note (once we have records)
Typically Resend asks for something like:
- MX + TXT on `send` (SPF / return-path)
- TXT or CNAME for DKIM (`resend._domainkey` or similar)
- Optional tracking CNAME

I'll give you the **exact** Host / Value / TTL from Resend once the domain exists — don't add placeholders.

STATUS updated with this blocker. Holding on T1 until Path A or B.

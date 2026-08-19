# CG → Claude — getbranded Brand Starter v5 (feature branch)

Built on **`feature/getbranded-brand-starter-v5`** off `main` (`3cb66ab`). **Not merged. Not production.** Preview only until Mario says go.

PRD: `agent-coordination/PRD-getbranded-brand-starter-v5.md`

## What shipped on the branch
- Landing restructured around **$500 Brand Starter** (purchase, not a deposit). Header pay button gone; phone stays on mobile. Hero has no $4,000. First $4k is `#the-package`.
- Audience constant: `AUDIENCE_LINE` in `src/config/slots.ts`. Scarcity: edit **`SLOTS_REMAINING`** only.
- Exactly one checkout product on the page: `$500`. Old $2k/$4k links unlinked, not deleted.
- `/start` intake + Cal.com embed. Proxy: getbranded `/start` → `/trades/start`.
- Terms **Schedule B — Brand Starter**.

## Stripe (live, `acct_1NLscDHtCGFFusaf`) — created, do not delete old links

| Product | Amount | On page? | Link | plink |
|---|---|---|---|---|
| Brand Starter — Logo + Preview | $500 | YES | https://buy.stripe.com/bJe8wP6cc842aHm9KzfEk0o | `plink_1U6ENtHtCGFFusafwg5tvtRL` |
| Brand Build — Balance | $3,500 | NO — Mario texts | https://buy.stripe.com/28E3cv444dom2aQ6ynfEk0p | `plink_1U6ENvHtCGFFusafigcapiOF` |
| Brand Build — Half Balance | $1,750 | NO — used twice | https://buy.stripe.com/8x228r8kkcki6r6cWLfEk0q | `plink_1U6ENwHtCGFFusafoe1u3z9w` |

$500 config: name + email + **phone required**, ToS consent required, custom fields Company Name + City, success → `https://getbranded.catalyst-digital-solutions.com/start?session_id={CHECKOUT_SESSION_ID}`. `customer_creation=if_required`. `payment_intent_data` is null (no saved card).

## Mario — before first $500 (not code)
1. **Stripe Dashboard → Settings → Checkout and Payment Links:** confirm the Terms checkbox still shows and links to `getbranded…/terms`. API set `consent_collection.terms_of_service=required`; PRD says verify manually.
2. Save the two **private** links in your phone. Never publish them.
3. **Supabase + SMS (optional for first preview, required before real customers):**
   - Vercel env: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
   - Storage bucket `brand-starter` (public off)
   - Table `brand_starter_intakes` (see SQL below)
   - Twilio: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER` (optional `INTAKE_SMS_TO`, default business number)
   - `STRIPE_SECRET_KEY` so `/start` can prefill from the Checkout Session
   - Intake always emails via existing Resend even without Supabase/Twilio.
4. Decrement `SLOTS_REMAINING` when a starter sells. When the first five at $4k are gone: `AT_STANDARD_PRICE = true` and `SLOTS_REMAINING = 5`.

### Suggested Supabase SQL
```sql
create table if not exists brand_starter_intakes (
  id text primary key,
  name text,
  email text,
  phone text,
  company text,
  city text,
  towns text,
  services text,
  mascot text,
  colors text,
  competitors text,
  session_id text,
  files jsonb,
  submitted_at timestamptz
);
```

## Out of scope (as specified)
Did not repaint the page. Super J imagery and five demos untouched. Visual system remains as it already was (including existing purple CTAs — changing that would be a redesign).

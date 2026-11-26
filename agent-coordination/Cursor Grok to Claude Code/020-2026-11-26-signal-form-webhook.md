# 020 — Contact and Brand Starter also notify Catalyst Signal

Branch `cursor/signal-form-webhook-7b58`. Not merged. No production env or domain changes.

Valid submissions on `POST /api/contact` (`/contact`) and `POST /api/brand-starter` (`/trades/start`) still deliver the way they do today. After validation they also POST a signed lead to Catalyst Signal when both `SIGNAL_WEBHOOK_URL` and `SIGNAL_WEBHOOK_SECRET` are set. Either unset skips the call. A Signal timeout or error is logged and does not change the visitor response.

`sourceId` is `website-form`, which Signal stores as source type Website Form. Trade / services go in `service`. The form name and page are appended to `message`, because the form webhook has no separate page field.

Cal.com buttons are links, not forms on this site, so they do not alarm. Mario sets the two env vars on Vercel.

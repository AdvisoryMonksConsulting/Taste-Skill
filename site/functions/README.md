# Cloudflare Pages Functions

## `/api/contact` — contact-form handler

`functions/api/contact.js` receives the homepage "Request an introduction"
form (POST) and emails it to the partnership inbox via [Resend](https://resend.com).
The front-end (`monks.js`, `FORM_ENDPOINT = '/api/contact'`) posts here; on any
non-2xx it falls back to a `mailto:` so a lead is never silently lost.

### One-time setup (on the Pages project that serves the live domain)

1. **Resend account** → add and **verify the `advisorymonks.com` domain**
   (add the DNS records Resend shows). This lets you send from the domain.
2. Create a **Resend API key**.
3. Cloudflare → the Pages project → **Settings → Variables and secrets** →
   add (type: *Secret*):
   - `RESEND_API_KEY` = the key from step 2
   - *(optional)* `CONTACT_TO` = `info@advisorymonks.com` (default)
   - *(optional)* `CONTACT_FROM` = `Advisory Monks Website <noreply@advisorymonks.com>` (must be on the verified domain)
4. Redeploy. Test by submitting the form; the email lands in `info@`,
   with the submitter's address as **reply-to**.

Until `RESEND_API_KEY` is set the endpoint returns 500 and the site shows
the "email us directly" fallback — nothing breaks.

> Prefer no third-party? The same handler can be rewritten to use Cloudflare
> Email Routing's `send_email` binding (recipient must be a verified Email
> Routing destination). Ask and I'll switch it.

## Analytics

Cloudflare Web Analytics (privacy-first, cookieless). Easiest: enable it on
the Pages project (dashboard → **Web Analytics** → one click) — it auto-injects
the beacon, no code needed. Or paste the site token into `CF_BEACON_TOKEN`
in `monks.js`.

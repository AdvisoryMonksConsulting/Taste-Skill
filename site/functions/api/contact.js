// Cloudflare Pages Function — POST /api/contact
// Emails contact-form submissions to the partnership inbox via Resend.
//
// Required env var (Pages > Settings > Variables & Secrets, encrypted):
//   RESEND_API_KEY   — from https://resend.com (verify advisorymonks.com first)
// Optional env vars:
//   CONTACT_TO       — recipient (default: info@advisorymonks.com)
//   CONTACT_FROM     — verified Resend sender (default below)
//
// If RESEND_API_KEY is absent or Resend errors, the function returns a
// non-2xx status; the front-end (monks.js) then shows the "email us
// directly" fallback, so a misconfiguration never silently drops a lead.

const DEFAULT_TO = "info@advisorymonks.com";
const DEFAULT_FROM = "Advisory Monks Website <noreply@advisorymonks.com>";

// Hard caps so one submission can't balloon parsing time, the outbound
// email, or (indirectly) Resend usage. Generous for a real inquiry,
// tight enough to reject abuse cheaply.
const MAX_BODY_BYTES = 20_000; // whole request
const MAX_FIELD_LEN = { name: 200, company: 200, email: 254, phone: 40, persona: 100, tier: 100, message: 4000 };

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
}

function clip(v, max) {
  return v == null ? "" : String(v).trim().slice(0, max);
}

export async function onRequestPost({ request, env }) {
  // ---- reject oversized requests before touching the body ----
  const len = Number(request.headers.get("content-length") || 0);
  if (len > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Submission is too large." }, 413);
  }

  // ---- parse body (FormData from the site, or JSON) ----
  let raw = {};
  const ctype = request.headers.get("content-type") || "";
  try {
    if (ctype.includes("application/json")) {
      raw = await request.json();
    } else {
      const fd = await request.formData();
      raw = Object.fromEntries(fd.entries());
    }
  } catch {
    return json({ ok: false, error: "Could not read the submission." }, 400);
  }

  // ---- spam honeypot: pretend success, send nothing ----
  if (raw._gotcha) return json({ ok: true });

  // ---- clip every field to a sane length before using it anywhere ----
  const data = {
    name: clip(raw.name, MAX_FIELD_LEN.name),
    company: clip(raw.company, MAX_FIELD_LEN.company),
    email: clip(raw.email, MAX_FIELD_LEN.email),
    phone: clip(raw.phone, MAX_FIELD_LEN.phone),
    persona: clip(raw.persona, MAX_FIELD_LEN.persona),
    tier: clip(raw.tier, MAX_FIELD_LEN.tier),
    message: clip(raw.message, MAX_FIELD_LEN.message),
  };

  // ---- validate ----
  const name = data.name;
  const email = data.email;
  if (!name || !email) return json({ ok: false, error: "Name and email are required." }, 422);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "That email address does not look right." }, 422);
  }

  if (!env.RESEND_API_KEY) {
    return json({ ok: false, error: "Email service is not configured yet." }, 500);
  }

  const to = env.CONTACT_TO || DEFAULT_TO;
  const from = env.CONTACT_FROM || DEFAULT_FROM;

  const fields = [
    ["Name", data.name],
    ["Company", data.company],
    ["Email", data.email],
    ["Phone", data.phone],
    ["I'm a", data.persona],
    ["Engagement interest", data.tier],
    ["Message", data.message],
  ].filter(([, v]) => v && String(v).trim());

  const text = fields.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html =
    "<h2 style=\"font-family:Arial,sans-serif\">New introduction request</h2>" +
    fields
      .map(([k, v]) => `<p style="font-family:Arial,sans-serif;margin:6px 0"><strong>${esc(k)}:</strong> ${esc(v).replace(/\n/g, "<br>")}</p>`)
      .join("");

  let r;
  try {
    r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Introduction request — ${data.company ? data.company : name}`,
        text,
        html,
      }),
    });
  } catch {
    return json({ ok: false, error: "Could not reach the email service." }, 502);
  }

  if (!r.ok) {
    // Do not relay Resend's raw response to an unauthenticated caller —
    // it can contain account/domain configuration detail. Log it
    // server-side (visible in the Pages Function's Real-time Logs) only.
    const detail = await r.text().catch(() => "");
    console.error("Resend send failed", r.status, detail.slice(0, 500));
    return json({ ok: false, error: "Could not send right now." }, 502);
  }

  return json({ ok: true });
}

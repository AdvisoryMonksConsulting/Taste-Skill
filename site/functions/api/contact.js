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

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
}

export async function onRequestPost({ request, env }) {
  // ---- parse body (FormData from the site, or JSON) ----
  let data = {};
  const ctype = request.headers.get("content-type") || "";
  try {
    if (ctype.includes("application/json")) {
      data = await request.json();
    } else {
      const fd = await request.formData();
      data = Object.fromEntries(fd.entries());
    }
  } catch {
    return json({ ok: false, error: "Could not read the submission." }, 400);
  }

  // ---- spam honeypot: pretend success, send nothing ----
  if (data._gotcha) return json({ ok: true });

  // ---- validate ----
  const name = (data.name || "").toString().trim();
  const email = (data.email || "").toString().trim();
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
    const detail = await r.text().catch(() => "");
    return json({ ok: false, error: "Could not send right now.", detail: detail.slice(0, 200) }, 502);
  }

  return json({ ok: true });
}

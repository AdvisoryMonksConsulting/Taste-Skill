/**
 * Site config — edit these once and they apply everywhere.
 * Replace every REPLACE_* placeholder with your real values before going live.
 */
export const site = {
  name: "Veska",
  legalEntity: "Advisory Monks Consulting",
  email: "hello@veska.studio", // TODO: your real inbox
  // Booking — create a free Cal.com event and paste its link:
  calLink: "https://cal.com/veska/15min", // TODO
  // Contact form — create a form at formspree.io (free) and paste its endpoint:
  formspree: "https://formspree.io/f/REPLACE_ID", // TODO
  // Razorpay Dashboard → Payment Button → copy the button id (pl_xxx):
  razorpayButtonId: "pl_REPLACE_ME", // TODO
  // Alternate global payment options (optional):
  wiseLink: "https://wise.com/pay/me/REPLACE", // TODO
  paypalLink: "https://paypal.me/REPLACE", // TODO
} as const;

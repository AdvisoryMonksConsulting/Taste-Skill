import type { FC, CSSProperties } from "react";

/**
 * Premium "client demo" landing pages, themed for the ICPs we email (aesthetics
 * clinics, med spas, dental). One config-driven elegant design; accent colors via
 * inline styles so each vertical re-themes cleanly. Used as the "here's what we'd
 * build for you" asset at /demos/<slug>.
 */
export type ClinicConfig = {
  slug: string;
  name: string;
  vertical: string;
  tagline: string;
  sub: string;
  accent: string;
  accentDark: string;
  bg: string;
  ink: string;
  services: { t: string; d: string }[];
  points: { t: string; d: string }[];
  testimonials: { q: string; who: string }[];
};

export const clinics: ClinicConfig[] = [
  {
    slug: "lumiere",
    name: "Lumière Aesthetics",
    vertical: "Aesthetics clinic",
    tagline: "Look refreshed, never “done.”",
    sub: "Doctor-led aesthetic treatments in a calm, discreet setting — results that look like you, on your best day.",
    accent: "#b08968", accentDark: "#8c6a4f", bg: "#faf6f1", ink: "#2b2722",
    services: [
      { t: "Injectables", d: "Anti-wrinkle & dermal fillers, placed conservatively for a natural finish." },
      { t: "Skin & Peels", d: "Medical-grade facials and peels tailored to your skin goals." },
      { t: "Laser & Energy", d: "Resurfacing and tightening with the latest devices." },
      { t: "Consultations", d: "A no-pressure plan built around what you actually want." },
    ],
    points: [
      { t: "Doctor-led", d: "Every treatment by a qualified medical practitioner." },
      { t: "Natural results", d: "Subtle, refined — we under-treat by design." },
      { t: "5★ reviewed", d: "Trusted by hundreds of returning clients." },
    ],
    testimonials: [
      { q: "The most natural results I’ve had — no one can tell, they just say I look well.", who: "Verified client" },
      { q: "Calm, professional, never pushy. I finally found my clinic.", who: "Verified client" },
    ],
  },
  {
    slug: "serene",
    name: "Serene Med Spa",
    vertical: "Med spa",
    tagline: "Your reset button.",
    sub: "A medical spa where clinical results meet genuine calm — skin, body, and wellness treatments under one roof.",
    accent: "#6b8f71", accentDark: "#547159", bg: "#f4f7f4", ink: "#23302a",
    services: [
      { t: "Advanced Facials", d: "HydraFacial, microneedling, and bespoke skin programmes." },
      { t: "Body & Contouring", d: "Non-invasive sculpting and skin tightening." },
      { t: "Wellness IV", d: "Vitamin drips and recovery treatments." },
      { t: "Memberships", d: "Monthly maintenance at member pricing." },
    ],
    points: [
      { t: "Clinically led", d: "Protocols designed by skin specialists." },
      { t: "Relaxed setting", d: "Spa comfort, clinical standards." },
      { t: "Visible results", d: "Before/after tracked at every visit." },
    ],
    testimonials: [
      { q: "My skin has never looked better, and the experience is genuinely relaxing.", who: "Verified client" },
      { q: "Booked a facial, became a member the same day.", who: "Verified client" },
    ],
  },
  {
    slug: "bright-smile",
    name: "Bright Smile Dental",
    vertical: "Dental",
    tagline: "Dentistry you’ll actually look forward to.",
    sub: "Gentle, modern dental care — from routine check-ups to smile makeovers — with same-week appointments.",
    accent: "#0ea5a8", accentDark: "#0c8588", bg: "#f3f9f9", ink: "#0f2a2b",
    services: [
      { t: "Check-ups & Hygiene", d: "Thorough, gentle, and on time." },
      { t: "Cosmetic & Whitening", d: "Veneers, bonding, and brighter smiles." },
      { t: "Invisible Aligners", d: "Straighten discreetly, on your schedule." },
      { t: "Implants", d: "Permanent, natural-looking replacements." },
    ],
    points: [
      { t: "Same-week visits", d: "See us when you actually need to." },
      { t: "Anxiety-friendly", d: "Calm, judgment-free care." },
      { t: "Transparent pricing", d: "Know the cost before we start." },
    ],
    testimonials: [
      { q: "First time I’ve not dreaded the dentist. Painless and friendly.", who: "Verified patient" },
      { q: "Booked online, seen in two days, brilliant result.", who: "Verified patient" },
    ],
  },
];

export function getClinic(slug: string): ClinicConfig | undefined {
  return clinics.find((c) => c.slug === slug);
}

export const ClinicDemo: FC<{ c: ClinicConfig }> = ({ c }) => {
  const accent: CSSProperties = { backgroundColor: c.accent };
  const accentText: CSSProperties = { color: c.accent };
  return (
    <main className="font-serif" style={{ backgroundColor: c.bg, color: c.ink }}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-xl tracking-tight">{c.name}</span>
        <a href="#book" className="rounded-full px-5 py-2.5 text-sm font-medium text-white" style={accent}>Book a consultation</a>
      </nav>

      <section className="mx-auto max-w-3xl px-6 pb-16 pt-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em]" style={accentText}>{c.vertical}</p>
        <h1 className="mt-5 text-5xl leading-[1.05] sm:text-6xl">{c.tagline}</h1>
        <p className="mx-auto mt-6 max-w-xl font-sans text-lg" style={{ color: c.ink, opacity: 0.7 }}>{c.sub}</p>
        <div className="mt-8 flex justify-center gap-3 font-sans">
          <a href="#book" className="rounded-full px-7 py-3 text-sm font-medium text-white" style={accent}>Book a consultation</a>
          <a href="#services" className="rounded-full border px-7 py-3 text-sm font-medium" style={{ borderColor: c.accent, color: c.accent }}>View treatments</a>
        </div>
      </section>

      {/* elegant hero band */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-56 rounded-3xl" style={{ background: `linear-gradient(135deg, ${c.accent}22, ${c.accent}66)` }} />
      </div>

      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl sm:text-4xl">Treatments</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.services.map((s) => (
            <div key={s.t} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg">{s.t}</h3>
              <p className="mt-2 font-sans text-sm" style={{ opacity: 0.65 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="grid gap-8 md:grid-cols-3">
          {c.points.map((p, i) => (
            <div key={p.t}>
              <div className="text-2xl" style={accentText}>0{i + 1}</div>
              <h3 className="mt-2 text-lg">{p.t}</h3>
              <p className="mt-1 font-sans text-sm" style={{ opacity: 0.65 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {c.testimonials.map((t) => (
            <figure key={t.q} className="rounded-2xl bg-white p-8 shadow-sm">
              <blockquote className="text-pretty">&ldquo;{t.q}&rdquo;</blockquote>
              <figcaption className="mt-4 font-sans text-sm" style={{ opacity: 0.6 }}>{t.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="book" className="py-20 text-center text-white" style={accent}>
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-3xl sm:text-4xl">Ready when you are.</h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-lg" style={{ opacity: 0.9 }}>Book a consultation online in under a minute.</p>
          <a href="#" className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-medium font-sans" style={accentText}>Book now</a>
        </div>
      </section>

      <footer className="px-6 py-10 text-center font-sans text-sm" style={{ opacity: 0.5 }}>
        {c.name} · Demo by Veska — veskadesign.com
      </footer>
    </main>
  );
};

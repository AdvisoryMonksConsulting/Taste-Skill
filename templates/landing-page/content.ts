/**
 * Landing page content config.
 *
 * THIS IS THE ONLY FILE YOU EDIT PER CLIENT.
 * Swap the copy + brand tokens below, and the whole page re-skins itself.
 *
 * Copy framework: written here in PAS (Problem → Agitate → Solution).
 * Swap to AIDA/BAB by rewriting hero.headline + hero.sub (see README).
 */

export type Feature = { title: string; description: string };
export type Plan = {
  name: string;
  price: string; // "$49" or "Custom"
  cadence?: string; // "/mo"
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};
export type Faq = { q: string; a: string };
export type Testimonial = { quote: string; name: string; role: string };

export type LandingContent = {
  brand: {
    name: string;
    /** Tailwind accent classes — change these to re-theme everything. */
    accent: string; // e.g. "bg-[#533afd] hover:bg-[#4a33e3]"
    accentText: string; // e.g. "text-[#533afd]"
    accentSoftBg: string; // tinted surface, e.g. "bg-[#533afd]/5"
    accentSoftBorder: string; // tinted border, e.g. "border-[#533afd]/30"
    accentRing: string; // focus/emphasis ring, e.g. "ring-[#533afd]/15"
    gradientFrom: string; // hero glow, e.g. "from-[#533afd]/15"
    heading: string; // heading text color — Stripe navy "text-[#061b31]"
    shadow: string; // Stripe blue-tinted elevation
  };
  seo: { title: string; description: string; url: string };
  nav: { label: string; href: string }[];
  hero: {
    badge?: string;
    headline: string;
    headlineAccent?: string; // gradient/accent fragment appended to headline
    sub: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
    trustLine?: string;
  };
  logos?: { caption: string; names: string[] };
  features: { eyebrow: string; heading: string; items: Feature[] };
  pricing: { eyebrow: string; heading: string; plans: Plan[] };
  testimonials?: { heading: string; items: Testimonial[] };
  faq: { heading: string; items: Faq[] };
  cta: { heading: string; sub: string; button: { label: string; href: string } };
  footer: { tagline: string; columns: { title: string; links: { label: string; href: string }[] }[] };
};

/* ----------------------------------------------------------------------------
 * SAMPLE DATA — replace with the client's. (PAS framework.)
 * -------------------------------------------------------------------------- */
export const content: LandingContent = {
  brand: {
    name: "Northwind",
    // Brand navy #061C33 (from the brand PDF, Pantone 296 C) — monochrome premium.
    accent: "bg-[#061C33] hover:bg-[#0b2c52]",
    accentText: "text-[#061C33]",
    accentSoftBg: "bg-[#061C33]/5",
    accentSoftBorder: "border-[#061C33]/25",
    accentRing: "ring-[#061C33]/15",
    gradientFrom: "from-[#061C33]/10",
    heading: "text-[#061C33]",
    shadow: "shadow-stripe", // defined in src/app/globals.css (@utility shadow-stripe)
  },
  seo: {
    title: "Northwind — Close your books in a day, not a week",
    description:
      "Automated reconciliation for finance teams. Stop drowning in spreadsheets and close every month in hours.",
    url: "https://northwind.example.com",
  },
  nav: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    badge: "Now in public beta",
    // PAS — Problem state
    headline: "Your team loses 3 days every month to",
    headlineAccent: "manual reconciliation.",
    // PAS — Agitate + Solution
    sub: "Every hour in spreadsheets is an hour not spent on the numbers that matter. Northwind reconciles your accounts automatically, so you close in a day — not a week.",
    ctaPrimary: { label: "Start free trial", href: "#pricing" },
    ctaSecondary: { label: "See how it works →", href: "#features" },
    trustLine: "No credit card required · 14-day free trial",
  },
  logos: {
    caption: "Trusted by finance teams at",
    names: ["Acme", "Globex", "Initech", "Umbrella", "Soylent"],
  },
  features: {
    eyebrow: "Why Northwind",
    heading: "Everything you need to close faster",
    items: [
      { title: "Auto-reconciliation", description: "Match thousands of transactions in seconds with rules that learn from your corrections." },
      { title: "Real-time dashboards", description: "See your close status, exceptions, and cash position the moment data lands." },
      { title: "Audit-ready trails", description: "Every match, edit, and approval logged automatically — export-ready for your auditors." },
      { title: "Connects to everything", description: "Native sync with your ERP, bank feeds, and payment processors. Setup in minutes." },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    heading: "Simple, transparent plans",
    plans: [
      {
        name: "Starter",
        price: "$49",
        cadence: "/mo",
        description: "For small teams getting started.",
        features: ["Up to 1,000 transactions/mo", "2 bank connections", "Email support"],
        cta: "Start free trial",
      },
      {
        name: "Growth",
        price: "$199",
        cadence: "/mo",
        description: "For scaling finance teams.",
        features: ["Unlimited transactions", "Unlimited connections", "Audit trails & exports", "Priority support"],
        cta: "Start free trial",
        highlighted: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "For complex, multi-entity orgs.",
        features: ["SSO & advanced roles", "Dedicated success manager", "Custom integrations", "SLA"],
        cta: "Talk to sales",
      },
    ],
  },
  testimonials: {
    heading: "Finance teams love closing on time",
    items: [
      { quote: "We went from a 7-day close to a 1-day close. Northwind paid for itself in the first month.", name: "Priya Nair", role: "Controller, Globex" },
      { quote: "The audit trail alone saved us a week during year-end. I can't imagine going back.", name: "Marcus Lee", role: "Head of Finance, Initech" },
      { quote: "Setup took 20 minutes. It just worked with our existing stack.", name: "Sofia Alvarez", role: "CFO, Acme" },
    ],
  },
  faq: {
    heading: "Frequently asked questions",
    items: [
      { q: "How long does setup take?", a: "Most teams are connected and reconciling within 20 minutes. Native integrations mean no manual CSV wrangling." },
      { q: "Is my financial data secure?", a: "Yes — data is encrypted in transit and at rest, and we maintain SOC 2 Type II compliance." },
      { q: "Can I cancel anytime?", a: "Absolutely. Plans are month-to-month with no lock-in, and you can export your data at any time." },
      { q: "Do you support multiple entities?", a: "Yes, on the Enterprise plan — with consolidated reporting across entities and currencies." },
    ],
  },
  cta: {
    heading: "Close your next month in a day",
    sub: "Join the finance teams who stopped dreading the close.",
    button: { label: "Start your free trial", href: "#pricing" },
  },
  footer: {
    tagline: "Automated reconciliation for modern finance teams.",
    columns: [
      { title: "Product", links: [ { label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }, { label: "Changelog", href: "#" } ] },
      { title: "Company", links: [ { label: "About", href: "#" }, { label: "Careers", href: "#" }, { label: "Contact", href: "#" } ] },
      { title: "Legal", links: [ { label: "Privacy", href: "#" }, { label: "Terms", href: "#" } ] },
    ],
  },
};

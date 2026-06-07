/**
 * 10 portfolio samples — each renders as a full, live landing page at /work/<slug>
 * using the same token-driven template. Distinct industry + brand color per sample
 * demonstrates range. Color tokens are written as literal Tailwind classes so the
 * v4 scanner generates them.
 */
import type { LandingContent } from "./content";

type Brand = LandingContent["brand"];

export type SampleSpec = {
  slug: string;
  label: string; // shown on portfolio card
  industry: string;
  brand: Brand;
  seoTitle: string;
  seoDesc: string;
  badge?: string;
  headline: string;
  headlineAccent?: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary?: string;
  features: { title: string; description: string }[];
};

const INK = "text-[#0f172a]";

export const samples: SampleSpec[] = [
  {
    slug: "northwind",
    label: "Northwind",
    industry: "Fintech · Reconciliation",
    brand: { name: "Northwind", accent: "bg-[#533afd] hover:bg-[#4a33e3]", accentText: "text-[#533afd]", accentSoftBg: "bg-[#533afd]/5", accentSoftBorder: "border-[#533afd]/30", accentRing: "ring-[#533afd]/15", gradientFrom: "from-[#533afd]/15", heading: INK, shadow: "shadow-stripe" },
    seoTitle: "Northwind — Close your books in a day",
    seoDesc: "Automated reconciliation for finance teams. Close every month in hours, not weeks.",
    badge: "Now in public beta",
    headline: "Your team loses 3 days a month to",
    headlineAccent: "manual reconciliation.",
    sub: "Northwind reconciles your accounts automatically, so you close in a day — not a week.",
    ctaPrimary: "Start free trial",
    ctaSecondary: "See how it works →",
    features: [
      { title: "Auto-reconciliation", description: "Match thousands of transactions in seconds with rules that learn from your corrections." },
      { title: "Real-time dashboards", description: "See close status, exceptions, and cash position the moment data lands." },
      { title: "Audit-ready trails", description: "Every match and approval logged automatically — export-ready for auditors." },
      { title: "Connects to everything", description: "Native sync with your ERP, bank feeds, and payment processors." },
    ],
  },
  {
    slug: "cortex",
    label: "Cortex",
    industry: "AI · Knowledge",
    brand: { name: "Cortex", accent: "bg-[#4f46e5] hover:bg-[#4338ca]", accentText: "text-[#4f46e5]", accentSoftBg: "bg-[#4f46e5]/5", accentSoftBorder: "border-[#4f46e5]/30", accentRing: "ring-[#4f46e5]/15", gradientFrom: "from-[#4f46e5]/15", heading: INK, shadow: "shadow-stripe" },
    seoTitle: "Cortex — Your company's second brain",
    seoDesc: "AI that answers any question from your company's knowledge, instantly and with sources.",
    badge: "Backed by top operators",
    headline: "Stop digging through docs.",
    headlineAccent: "Just ask.",
    sub: "Cortex turns your scattered docs, tickets, and chats into one AI that answers with citations.",
    ctaPrimary: "Get early access",
    ctaSecondary: "Watch demo →",
    features: [
      { title: "Answers with sources", description: "Every answer links back to the exact document, so your team can trust it." },
      { title: "Connects your stack", description: "Slack, Notion, Drive, Jira — indexed securely in minutes." },
      { title: "Stays current", description: "Re-indexes continuously, so answers never go stale." },
      { title: "Enterprise-grade security", description: "SOC 2, SSO, and granular permissions out of the box." },
    ],
  },
  {
    slug: "forge",
    label: "Forge",
    industry: "Developer tools · CI/CD",
    brand: { name: "Forge", accent: "bg-[#059669] hover:bg-[#047857]", accentText: "text-[#059669]", accentSoftBg: "bg-[#059669]/5", accentSoftBorder: "border-[#059669]/30", accentRing: "ring-[#059669]/15", gradientFrom: "from-[#059669]/15", heading: INK, shadow: "shadow-stripe" },
    seoTitle: "Forge — Ship without breaking",
    seoDesc: "The deployment platform that catches errors before your users do. Zero config, instant rollbacks.",
    badge: "Now self-serve",
    headline: "Ship faster.",
    headlineAccent: "Break less.",
    sub: "Forge catches errors before your users do — zero config, instant rollbacks, real-time monitoring.",
    ctaPrimary: "Deploy your first app",
    ctaSecondary: "Read the docs →",
    features: [
      { title: "Preview every PR", description: "A live, shareable environment for every pull request, automatically." },
      { title: "Instant rollbacks", description: "Bad deploy? Roll back to any previous version in one click." },
      { title: "Built-in monitoring", description: "Errors, latency, and logs in one place — no extra setup." },
      { title: "Scales to zero", description: "Pay only for what you use; idle apps cost nothing." },
    ],
  },
  {
    slug: "lume",
    label: "Lumé",
    industry: "D2C · Skincare",
    brand: { name: "Lumé", accent: "bg-[#e11d48] hover:bg-[#be123c]", accentText: "text-[#e11d48]", accentSoftBg: "bg-[#e11d48]/5", accentSoftBorder: "border-[#e11d48]/30", accentRing: "ring-[#e11d48]/15", gradientFrom: "from-[#e11d48]/15", heading: INK, shadow: "shadow-stripe" },
    seoTitle: "Lumé — Skincare that works while you sleep",
    seoDesc: "Clinically-backed overnight skincare. Wake up to visibly brighter skin.",
    badge: "30,000+ five-star reviews",
    headline: "Wake up to skin that",
    headlineAccent: "glows.",
    sub: "Clinically-backed overnight actives that repair while you sleep. See a difference in 14 days.",
    ctaPrimary: "Shop the routine",
    ctaSecondary: "Take the skin quiz →",
    features: [
      { title: "Clinically proven", description: "Dermatologist-tested actives with published, peer-reviewed results." },
      { title: "Clean ingredients", description: "No parabens, sulfates, or synthetic fragrance — ever." },
      { title: "14-day guarantee", description: "See visible results in two weeks or your money back." },
      { title: "Refill & save", description: "Subscribe for 20% off and never run out." },
    ],
  },
  {
    slug: "pulse",
    label: "Pulse",
    industry: "Healthcare · Telehealth",
    brand: { name: "Pulse", accent: "bg-[#0d9488] hover:bg-[#0f766e]", accentText: "text-[#0d9488]", accentSoftBg: "bg-[#0d9488]/5", accentSoftBorder: "border-[#0d9488]/30", accentRing: "ring-[#0d9488]/15", gradientFrom: "from-[#0d9488]/15", heading: INK, shadow: "shadow-stripe" },
    seoTitle: "Pulse — See a doctor in minutes",
    seoDesc: "Talk to a licensed doctor from your phone, 24/7. Prescriptions delivered to your door.",
    badge: "Available in 48 states",
    headline: "A doctor in your pocket,",
    headlineAccent: "any time.",
    sub: "Connect with a licensed physician in minutes — diagnosis, prescriptions, and follow-ups, all from home.",
    ctaPrimary: "Start a visit",
    ctaSecondary: "How it works →",
    features: [
      { title: "24/7 access", description: "Board-certified doctors available day and night, including weekends." },
      { title: "Prescriptions delivered", description: "Sent to your pharmacy or your door, often same-day." },
      { title: "Transparent pricing", description: "Flat per-visit fee. No surprise bills, no insurance required." },
      { title: "Your records, secured", description: "HIPAA-compliant history you can share with any provider." },
    ],
  },
  {
    slug: "acre",
    label: "Acre",
    industry: "PropTech · Real estate",
    brand: { name: "Acre", accent: "bg-[#d97706] hover:bg-[#b45309]", accentText: "text-[#d97706]", accentSoftBg: "bg-[#d97706]/5", accentSoftBorder: "border-[#d97706]/30", accentRing: "ring-[#d97706]/15", gradientFrom: "from-[#d97706]/15", heading: INK, shadow: "shadow-stripe" },
    seoTitle: "Acre — Own property, the modern way",
    seoDesc: "Buy, manage, and grow your real-estate portfolio from one dashboard.",
    badge: "$2B+ in property managed",
    headline: "Real estate, finally",
    headlineAccent: "simple.",
    sub: "Find, finance, and manage investment properties from a single dashboard — no spreadsheets.",
    ctaPrimary: "Browse properties",
    ctaSecondary: "Calculate returns →",
    features: [
      { title: "Vetted listings", description: "Every property underwritten and inspected before it reaches you." },
      { title: "Financing built in", description: "Pre-qualified offers from lenders, compared side by side." },
      { title: "Hands-off management", description: "Tenants, maintenance, and rent collection handled for you." },
      { title: "Live portfolio view", description: "Track cash flow, equity, and ROI across every property." },
    ],
  },
  {
    slug: "signal",
    label: "Signal",
    industry: "SaaS · Product analytics",
    brand: { name: "Signal", accent: "bg-[#2563eb] hover:bg-[#1d4ed8]", accentText: "text-[#2563eb]", accentSoftBg: "bg-[#2563eb]/5", accentSoftBorder: "border-[#2563eb]/30", accentRing: "ring-[#2563eb]/15", gradientFrom: "from-[#2563eb]/15", heading: INK, shadow: "shadow-stripe" },
    seoTitle: "Signal — Know why users churn",
    seoDesc: "Product analytics that turns raw events into clear answers about retention and growth.",
    badge: "Trusted by 4,000+ teams",
    headline: "Stop guessing.",
    headlineAccent: "Start knowing.",
    sub: "Signal turns raw product events into clear answers about activation, retention, and revenue.",
    ctaPrimary: "Start free",
    ctaSecondary: "See a live dashboard →",
    features: [
      { title: "Funnels in seconds", description: "Build conversion and retention reports without writing SQL." },
      { title: "Cohort insights", description: "See exactly which users stick — and which silently churn." },
      { title: "Self-serve for everyone", description: "PMs and marketers get answers without bugging data teams." },
      { title: "Warehouse-native", description: "Syncs with your warehouse so the numbers always match." },
    ],
  },
  {
    slug: "ledger",
    label: "Ledger",
    industry: "Crypto · Payments",
    brand: { name: "Ledger", accent: "bg-[#7c3aed] hover:bg-[#6d28d9]", accentText: "text-[#7c3aed]", accentSoftBg: "bg-[#7c3aed]/5", accentSoftBorder: "border-[#7c3aed]/30", accentRing: "ring-[#7c3aed]/15", gradientFrom: "from-[#7c3aed]/15", heading: INK, shadow: "shadow-stripe" },
    seoTitle: "Ledger — Accept crypto, settle in cash",
    seoDesc: "Take stablecoin payments worldwide and settle to your bank in your local currency.",
    badge: "Live in 60+ countries",
    headline: "Accept crypto.",
    headlineAccent: "Settle in cash.",
    sub: "Take stablecoin payments from anywhere and settle to your bank in your local currency, next day.",
    ctaPrimary: "Create an account",
    ctaSecondary: "View the API →",
    features: [
      { title: "One integration", description: "A single API for dozens of chains and tokens." },
      { title: "Instant off-ramp", description: "Auto-convert to fiat and settle to your bank, no volatility." },
      { title: "Compliance built in", description: "KYC, AML, and travel-rule handled for you." },
      { title: "Low, flat fees", description: "Transparent pricing far below card networks." },
    ],
  },
  {
    slug: "scholar",
    label: "Scholar",
    industry: "EdTech · Learning",
    brand: { name: "Scholar", accent: "bg-[#0284c7] hover:bg-[#0369a1]", accentText: "text-[#0284c7]", accentSoftBg: "bg-[#0284c7]/5", accentSoftBorder: "border-[#0284c7]/30", accentRing: "ring-[#0284c7]/15", gradientFrom: "from-[#0284c7]/15", heading: INK, shadow: "shadow-stripe" },
    seoTitle: "Scholar — Learn anything, faster",
    seoDesc: "Adaptive courses that adjust to how you learn. Master new skills in weeks.",
    badge: "1M+ learners",
    headline: "Learn anything,",
    headlineAccent: "twice as fast.",
    sub: "Scholar adapts every lesson to how you learn, so you master new skills in weeks, not months.",
    ctaPrimary: "Start learning free",
    ctaSecondary: "Browse courses →",
    features: [
      { title: "Adaptive paths", description: "Lessons adjust in real time to what you already know." },
      { title: "Learn by doing", description: "Hands-on projects and quizzes, not passive video." },
      { title: "Track your progress", description: "See mastery grow with clear, motivating milestones." },
      { title: "Certificates that count", description: "Shareable credentials recognized by hiring teams." },
    ],
  },
  {
    slug: "sojourn",
    label: "Sojourn",
    industry: "Travel · Hospitality",
    brand: { name: "Sojourn", accent: "bg-[#c2410c] hover:bg-[#9a3412]", accentText: "text-[#c2410c]", accentSoftBg: "bg-[#c2410c]/5", accentSoftBorder: "border-[#c2410c]/30", accentRing: "ring-[#c2410c]/15", gradientFrom: "from-[#c2410c]/15", heading: INK, shadow: "shadow-stripe" },
    seoTitle: "Sojourn — Stays worth the trip",
    seoDesc: "Hand-picked homes and boutique stays, with concierge service on every booking.",
    badge: "Featured in Condé Nast",
    headline: "Stays worth",
    headlineAccent: "the trip.",
    sub: "A hand-picked collection of design-led homes and boutique hotels, with a concierge on every booking.",
    ctaPrimary: "Find your stay",
    ctaSecondary: "Explore destinations →",
    features: [
      { title: "Hand-picked homes", description: "Every property personally vetted for design and comfort." },
      { title: "Concierge included", description: "From dinner reservations to airport transfers — just ask." },
      { title: "Best-price promise", description: "Find it cheaper elsewhere and we'll match it, plus 10%." },
      { title: "Flexible cancellation", description: "Plans change. Cancel free up to 48 hours before." },
    ],
  },
];

/** Generic defaults shared across samples (pricing/faq/testimonials/footer). */
export function toContent(s: SampleSpec): LandingContent {
  return {
    brand: s.brand,
    seo: { title: s.seoTitle, description: s.seoDesc, url: `https://veska.studio/work/${s.slug}` },
    nav: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    hero: {
      badge: s.badge,
      headline: s.headline,
      headlineAccent: s.headlineAccent,
      sub: s.sub,
      ctaPrimary: { label: s.ctaPrimary, href: "#pricing" },
      ctaSecondary: s.ctaSecondary ? { label: s.ctaSecondary, href: "#features" } : undefined,
      trustLine: "No credit card required · Cancel anytime",
    },
    logos: { caption: "Trusted by teams at", names: ["Acme", "Globex", "Initech", "Umbrella", "Soylent"] },
    features: { eyebrow: `Why ${s.label}`, heading: "Everything you need, nothing you don't", items: s.features },
    pricing: {
      eyebrow: "Pricing",
      heading: "Simple, transparent plans",
      plans: [
        { name: "Starter", price: "$29", cadence: "/mo", description: "For getting started.", features: ["Core features", "Up to 3 seats", "Email support"], cta: s.ctaPrimary },
        { name: "Growth", price: "$99", cadence: "/mo", description: "For scaling teams.", features: ["Everything in Starter", "Unlimited seats", "Advanced analytics", "Priority support"], cta: s.ctaPrimary, highlighted: true },
        { name: "Enterprise", price: "Custom", description: "For large orgs.", features: ["SSO & advanced roles", "Dedicated success manager", "Custom integrations", "SLA"], cta: "Talk to sales" },
      ],
    },
    testimonials: {
      heading: "Loved by teams like yours",
      items: [
        { quote: `${s.label} paid for itself in the first month. We can't imagine going back.`, name: "Priya Nair", role: "Operations Lead" },
        { quote: "Setup took twenty minutes and it just worked with our stack.", name: "Marcus Lee", role: "Head of Product" },
        { quote: "The single best tool we adopted this year. Full stop.", name: "Sofia Alvarez", role: "Founder & CEO" },
      ],
    },
    faq: {
      heading: "Frequently asked questions",
      items: [
        { q: "How long does setup take?", a: "Most teams are up and running in under 20 minutes with our guided onboarding." },
        { q: "Is my data secure?", a: "Yes — data is encrypted in transit and at rest, and we maintain SOC 2 Type II compliance." },
        { q: "Can I cancel anytime?", a: "Absolutely. Plans are month-to-month with no lock-in, and you can export your data anytime." },
        { q: "Do you offer support?", a: "Every plan includes support; Growth and Enterprise get priority and a dedicated contact." },
      ],
    },
    cta: { heading: "Ready to get started?", sub: `Join the teams already winning with ${s.label}.`, button: { label: s.ctaPrimary, href: "#pricing" } },
    footer: {
      tagline: s.seoDesc,
      columns: [
        { title: "Product", links: [{ label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }, { label: "Changelog", href: "#" }] },
        { title: "Company", links: [{ label: "About", href: "#" }, { label: "Careers", href: "#" }, { label: "Contact", href: "#" }] },
        { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }] },
      ],
    },
  };
}

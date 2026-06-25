/**
 * Shared real brand + content for the InvestHER / STRIVE concepts, lifted from
 * their live site (palette, copy, the 5 Principles, pain points, founder story).
 * Every design direction imports this, so the look stays authentic and the photo
 * slots (IMG) only need to be filled once.
 */

export const C = {
  cream: "#f6f0e1",
  cream2: "#fbf7ec",
  teal: "#1e4d48",
  tealDark: "#163a36",
  ink: "#243b39",
  rasp: "#a5113f",
  blue: "#a7c3cd",
  blueSoft: "#c9dde2",
  line: "#efe6c6",
};

// ⬇️ Paste the client's real image URLs here (right-click → Copy image address).
// Empty values fall back to brand-toned placeholders. Filling these updates ALL designs.
export const IMG = {
  hero: "",     // founders, wide living-room shot
  method: "",   // founders on floor cushions
  founders: "", // founders portrait
  p1: "", p2: "", p3: "", p4: "", // B&W detail shots
};

export const HERO = {
  eyebrow: "Stop growing your portfolio alone.",
  title: "Start building wealth with the right community behind you.",
  sub: "STRIVE is a strategic framework that helps women real estate investors build wealth with more clarity, structure, and support.",
  cta: "Apply here",
};

export const WHY = {
  title: "Why Growing a Portfolio Feels So Hard",
  highlight: "Portfolio Feels So",
  subhead: "You started investing in real estate to take control of your financial future and create more freedom of choice and time.",
  intro: "Here are five common challenges women investors who have built a portfolio are currently facing:",
};

export const PAINS = [
  { t: "Lack of Visibility", q: "As the portfolio grows, I want a clearer understanding of what is truly happening across each property I own." },
  { t: "Operational Dependency", q: "I want to build a sustainable business that supports the growth of my portfolio without depending on me 24/7." },
  { t: "Decision-Making Process", q: "I want a stronger process for making decisions instead of reacting from urgency, pressure, or fear." },
  { t: "No Room to Think", q: "I’m so deep in the day-to-day that I rarely get to work on the strategy that actually grows the portfolio." },
  { t: "Going It Alone", q: "I don’t have a room of women at my level to pressure-test decisions and keep me accountable." },
];

export const METHOD = {
  title: "The STRIVE Method",
  body: "A strategic framework designed for women real estate investors who have already built a portfolio and are ready to grow more intentionally by building a stronger business behind it.",
};

export const PRINCIPLES = [
  { t: "Get a Pulse: Portfolio X-Ray™", d: "A practical framework that helps investors evaluate the financial health of each asset individually, so you can identify what is performing well, what needs attention, and where operational or financial pressure may be limiting sustainable growth." },
  { t: "Make Intentional Decisions: The Red Door Diagnosis™", d: "Designed to identify the root cause of a property, project, partnership, or business issue so the next decision can be made with more clarity and confidence." },
  { t: "Optimize the Business: Strengthening the Foundation", d: "Focus on diagnosing what is not working inside the business and building the operational foundation needed to support long-term growth without everything depending on you to hold it together." },
  { t: "Align the Vision: Strategic Alignment Planner", d: "Create an intentional roadmap for growth that aligns business decisions, priorities, and capacity with the life and lifestyle you actually want to build." },
  { t: "Execute with Support: The InvestHER Community", d: "Put it all into motion alongside a curated room of women investors and coaches — accountability, feedback and momentum, every month." },
];

export const FOUNDERS = {
  names: "Liz Faircloth & Andresa Guidelli",
  body: "We built STRIVE — and the InvestHER community of 50,000+ women — from our own turning points: realizing that success on paper isn’t the same as a life that feels like yours. Every woman has the birthright to become financially free, and no one should have to build it alone.",
};

export const TESTIMONIALS = [
  { q: "I found my people and doubled my portfolio in a year. STRIVE changed how I invest — and how I live.", who: "Member · 14 doors" },
  { q: "The systems I built here bought back my time. I run a real business now, not a second job.", who: "Member · STRIVE" },
  { q: "I went from listening to the podcast to closing my first multifamily deal in eight months.", who: "Member · first deal" },
  { q: "Self-care isn’t soft — it’s the reason I haven’t burned out while scaling. No one else teaches that.", who: "Member · 3 years" },
];

export const FAQS = [
  { q: "Who is STRIVE for?", a: "Women real estate investors who have already built a portfolio and are ready to grow more intentionally — with stronger systems, clearer decisions, and a room of peers at their level." },
  { q: "Is this for beginners?", a: "STRIVE is designed for investors who already own property. If you’re just starting, the InvestHER community and podcast are the perfect first step — and they’re free." },
  { q: "How much time does it take?", a: "STRIVE is built around busy lives. Expect a focused monthly rhythm of strategy, accountability and community — designed to give you time back, not take it." },
  { q: "What exactly do I get?", a: "The STRIVE Method and its five principles, a curated community of women investors, monthly strategic alignment, and the tools to optimize and scale your business." },
  { q: "How do I join?", a: "STRIVE is application-based so the room stays curated. Apply in a few minutes and the team will be in touch about fit and next steps." },
  { q: "What if I’m not sure it’s right for me?", a: "Take the Portfolio X-Ray on the home page for an instant read, or apply — there’s no obligation, and the conversation will tell you quickly." },
];

export const STATS = [
  { n: "50,000+", l: "Women in the community" },
  { n: "50+", l: "Local meetups" },
  { n: "#1", l: "Women’s RE podcast" },
  { n: "2018", l: "Building together since" },
];

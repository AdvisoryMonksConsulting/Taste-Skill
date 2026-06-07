import { classify } from "./classify";
import type { Signal } from "./types";

/**
 * Realistic, anonymised examples used when live fetching is unavailable
 * (e.g. offline, rate-limited, or blocked network). They are classified
 * through the same pipeline so the UI behaves identically to live data.
 */
type Seed = {
  id: string;
  sourceLabel: string;
  author: string;
  title: string;
  body: string;
  permalink: string;
  hoursAgo: number;
};

const SEEDS: Seed[] = [
  {
    id: "sample_1",
    sourceLabel: "r/nri",
    author: "u/sample_user_a",
    title: "Sold my flat in Pune, builder deducted 20% TDS — I'm an NRI in the US",
    body: "I moved to the US on H1B 3 years ago. Just sold my apartment in Pune and the buyer deducted 20%+ TDS on the full sale value, not the capital gain. Is there any way to get a lower deduction or claim a refund? Deadline for something is apparently this month and I'm stressed.",
    permalink: "/r/nri/comments/sample1/",
    hoursAgo: 2,
  },
  {
    id: "sample_2",
    sourceLabel: "r/personalfinanceindia",
    author: "u/sample_user_b",
    title: "Got an income tax notice u/s 143(1) — I haven't filed in India since moving to Dubai",
    body: "I'm an NRI based in UAE. Received a notice from the income tax department about a mismatch. I have NRO interest and some mutual funds in India. Urgent — need a CA who handles NRI notices. What do I do?",
    permalink: "/r/personalfinanceindia/comments/sample2/",
    hoursAgo: 5,
  },
  {
    id: "sample_3",
    sourceLabel: "r/IndiaInvestments",
    author: "u/sample_user_c",
    title: "DTAA between India and UK — am I being double taxed on my NRO FD interest?",
    body: "Living in the UK, OCI holder. My bank deducted 30% TDS on NRO fixed deposit interest and I also report worldwide income in the UK. How does the DTAA / foreign tax credit work here? Looking for a CA recommendation.",
    permalink: "/r/IndiaInvestments/comments/sample3/",
    hoursAgo: 9,
  },
  {
    id: "sample_4",
    sourceLabel: "r/nri",
    author: "u/sample_user_d",
    title: "How to repatriate money from NRO to my US account? Form 15CA/15CB confusion",
    body: "Settled abroad in the US. I have around 40 lakh in my NRO account from rent and want to transfer it out of India. Banker mentioned Form 15CA and 15CB from a chartered accountant. How does repatriation actually work and what are the limits?",
    permalink: "/r/nri/comments/sample4/",
    hoursAgo: 14,
  },
  {
    id: "sample_5",
    sourceLabel: "r/ABCDesis",
    author: "u/sample_user_e",
    title: "Inherited ancestral property in Chennai, want to sell — NRI, no idea about tax",
    body: "Green card holder. My father passed and I inherited a house in Chennai. If I sell it, what capital gains and TDS apply, and can I bring the money to the US? Do I need to file an ITR in India for this?",
    permalink: "/r/ABCDesis/comments/sample5/",
    hoursAgo: 20,
  },
  {
    id: "sample_6",
    sourceLabel: "r/personalfinanceindia",
    author: "u/sample_user_f",
    title: "Am I an NRI for tax this year? Moved to Singapore in October",
    body: "Relocated to Singapore for work in October. Confused about my residential status and which ITR to file — RNOR? Resident? I have salary income in India for part of the year plus foreign salary now.",
    permalink: "/r/personalfinanceindia/comments/sample6/",
    hoursAgo: 27,
  },
  {
    id: "sample_7",
    sourceLabel: "r/IndiaInvestments",
    author: "u/sample_user_g",
    title: "NRI freelancer — do I need GST for consulting income billed to US clients?",
    body: "I'm a non-resident doing consulting and bill US clients. Some income still routes through my India proprietorship. Is this export of services? Do I need GST registration? Need advice from someone who knows NRI business compliance.",
    permalink: "/r/IndiaInvestments/comments/sample7/",
    hoursAgo: 33,
  },
  {
    id: "sample_8",
    sourceLabel: "r/nri",
    author: "u/sample_user_h",
    title: "FEMA compliance — kept my resident savings account after moving abroad",
    body: "Living abroad in Canada for 4 years, just realised I never converted my resident savings account to NRO and have been investing via LRS-ish routes. Worried about FEMA violation. Is compounding needed? Looking for a CA.",
    permalink: "/r/nri/comments/sample8/",
    hoursAgo: 41,
  },
];

export function buildSampleSignals(): Signal[] {
  const now = Date.now();
  return SEEDS.map((s) => {
    const c = classify(s.title, s.body);
    const excerpt =
      s.body.length > 280 ? `${s.body.slice(0, 277).trim()}…` : s.body;
    return {
      id: s.id,
      source: "reddit" as const,
      sourceLabel: s.sourceLabel,
      author: s.author,
      title: s.title,
      excerpt,
      url: `https://www.reddit.com${s.permalink}`,
      createdAt: now - s.hoursAgo * 3600 * 1000,
      category: c.category,
      categoryLabel: c.categoryLabel,
      urgency: c.urgency,
      relevanceScore: c.relevanceScore,
      matchedTerms: c.matchedTerms,
      outreachAngle: c.outreachAngle,
    };
  });
}

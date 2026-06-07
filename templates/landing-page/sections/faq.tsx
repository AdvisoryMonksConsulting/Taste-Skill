import type { LandingContent } from "../content";

export function Faq({ brand, faq }: { brand: LandingContent["brand"]; faq: LandingContent["faq"] }) {
  // FAQPage structured data for SEO (rich results).
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <section id="faq" className="bg-white py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-3xl px-6">
        <h2 className={"text-center text-3xl font-medium tracking-[-0.01em] sm:text-4xl " + brand.heading}>{faq.heading}</h2>
        <div className="mt-12 divide-y divide-neutral-200 border-y border-neutral-200">
          {faq.items.map((i) => (
            <details key={i.q} className="group py-5">
              <summary className={"flex cursor-pointer list-none items-center justify-between text-left font-medium " + brand.heading}>
                {i.q}
                <span className="ml-4 text-neutral-400 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-neutral-600">{i.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

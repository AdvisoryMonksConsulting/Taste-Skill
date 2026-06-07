import type { Metadata } from "next";
import { content } from "./content";
import { Hero, Logos, Features, Pricing, Testimonials, Faq, Cta, Footer } from "./sections";

// SEO — driven entirely by content.seo. OG image lives at /opengraph-image (1200x630).
export const metadata: Metadata = {
  title: content.seo.title,
  description: content.seo.description,
  alternates: { canonical: content.seo.url },
  openGraph: {
    title: content.seo.title,
    description: content.seo.description,
    url: content.seo.url,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: content.seo.title, description: content.seo.description },
};

export default function LandingPage() {
  return (
    <main className="bg-white">
      <Hero brand={content.brand} hero={content.hero} nav={content.nav} />
      {content.logos && <Logos logos={content.logos} />}
      <Features brand={content.brand} features={content.features} />
      <Pricing brand={content.brand} pricing={content.pricing} />
      {content.testimonials && <Testimonials testimonials={content.testimonials} />}
      <Faq faq={content.faq} />
      <Cta brand={content.brand} cta={content.cta} />
      <Footer brand={content.brand} footer={content.footer} />
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { samples, toContent } from "../../../../templates/landing-page/samples";
import { Hero, Logos, Features, Pricing, Testimonials, Faq, Cta, Footer } from "../../../../templates/landing-page/sections";

export function generateStaticParams() {
  return samples.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = samples.find((x) => x.slug === slug);
  if (!s) return {};
  const c = toContent(s);
  return { title: c.seo.title, description: c.seo.description };
}

export default async function WorkSample({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = samples.find((x) => x.slug === slug);
  if (!s) notFound();
  const content = toContent(s);
  return (
    <main className="bg-white">
      <Hero brand={content.brand} hero={content.hero} nav={content.nav} />
      {content.logos && <Logos logos={content.logos} />}
      <Features brand={content.brand} features={content.features} />
      <Pricing brand={content.brand} pricing={content.pricing} />
      {content.testimonials && <Testimonials brand={content.brand} testimonials={content.testimonials} />}
      <Faq brand={content.brand} faq={content.faq} />
      <Cta brand={content.brand} cta={content.cta} />
      <Footer brand={content.brand} footer={content.footer} />
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { samples } from "../../../../templates/landing-page/samples";
import { getDesign, type DesignContent } from "../../../../templates/landing-page/designs";

export function generateStaticParams() {
  return samples.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = samples.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: s.seoTitle, description: s.seoDesc };
}

export default async function WorkSample({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = samples.find((x) => x.slug === slug);
  if (!s) notFound();

  const d: DesignContent = {
    name: s.label,
    industry: s.industry,
    badge: s.badge,
    headline: s.headline,
    headlineAccent: s.headlineAccent,
    sub: s.sub,
    ctaPrimary: s.ctaPrimary,
    ctaSecondary: s.ctaSecondary,
    features: s.features,
  };
  const Design = getDesign(slug);
  return <Design d={d} />;
}

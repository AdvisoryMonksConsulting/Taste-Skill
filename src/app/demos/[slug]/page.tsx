import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clinics, getClinic, ClinicDemo } from "../../../../templates/landing-page/clinic";

export function generateStaticParams() {
  return clinics.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getClinic(slug);
  if (!c) return {};
  return { title: `${c.name} — concept by Veska`, description: c.sub };
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getClinic(slug);
  if (!c) notFound();
  return <ClinicDemo c={c} />;
}

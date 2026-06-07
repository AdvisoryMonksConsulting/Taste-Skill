import Link from "next/link";
import { site } from "@/lib/site";

const NAVY = "text-[#061C33]";
const NAVY_BG = "bg-[#061C33] hover:bg-[#0b2c52]";

/** Veska wordmark (enlarged) with "Powered by Advisory Monks Consulting" beneath. */
export function Logo() {
  return (
    <span className="block leading-tight">
      <span className={"block text-2xl font-semibold tracking-tight " + NAVY}>{site.name}</span>
      <span className="block text-[11px] font-normal tracking-wide text-neutral-400">Powered by {site.legalEntity}</span>
    </span>
  );
}

export function SiteNav() {
  return (
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link href="/"><Logo /></Link>
      <div className="hidden items-center gap-8 md:flex">
        <Link href="/#work" className="text-sm text-neutral-600 hover:text-neutral-900">Work</Link>
        <Link href="/#pricing" className="text-sm text-neutral-600 hover:text-neutral-900">Pricing</Link>
        <Link href="/contact" className="text-sm text-neutral-600 hover:text-neutral-900">Contact</Link>
      </div>
      <a href={site.calLink} target="_blank" rel="noopener" className={"rounded-md px-4 py-2 text-sm font-medium text-white " + NAVY_BG}>Book a call</a>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500">
          <Link href="/start" className="hover:text-neutral-900">Start a project</Link>
          <Link href="/contact" className="hover:text-neutral-900">Contact</Link>
          <Link href="/terms" className="hover:text-neutral-900">Terms</Link>
          <Link href="/privacy" className="hover:text-neutral-900">Privacy</Link>
          <Link href="/refund" className="hover:text-neutral-900">Refunds</Link>
        </nav>
        <span className="text-sm text-neutral-500">© {new Date().getFullYear()} {site.legalEntity}</span>
      </div>
    </footer>
  );
}

/** Shared shell for legal / text pages. */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro?: string;
  sections: { h: string; p: string }[];
}) {
  return (
    <main className="bg-white text-neutral-800">
      <SiteNav />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className={"text-4xl font-semibold tracking-tight " + NAVY}>{title}</h1>
        <p className="mt-2 text-sm text-neutral-400">Last updated: {updated}</p>
        {intro && <p className="mt-6 text-neutral-600">{intro}</p>}
        <div className="mt-8 space-y-8">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className={"text-lg font-semibold " + NAVY}>{s.h}</h2>
              <p className="mt-2 whitespace-pre-line text-neutral-600">{s.p}</p>
            </section>
          ))}
        </div>
        <p className="mt-12 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          This is a starting template, not legal advice. Have a professional review it before relying on it.
        </p>
      </article>
      <SiteFooter />
    </main>
  );
}

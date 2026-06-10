import Link from "next/link";
import { site } from "@/lib/site";

/** Veska wordmark with square mark + "by Advisory Monks Consulting".
 *  `light` renders for dark (navy) backgrounds. */
export function Logo({ light = false }: { light?: boolean }) {
  const word = light ? "text-white" : "text-[#061C33]";
  const by = light ? "text-[#9bb4cf]" : "text-neutral-400";
  const markBg = light ? "bg-white" : "bg-[#061C33]";
  const markInner = light ? "bg-[#061C33]" : "bg-white";
  return (
    <span className="block leading-tight">
      <span className="flex items-center gap-2.5">
        <span className={"relative inline-block h-7 w-7 rounded-lg " + markBg}>
          <span className={"absolute inset-2 rounded-[3px] " + markInner} />
        </span>
        <span className={"block text-lg font-bold tracking-[0.16em] " + word}>{site.name.toUpperCase()}</span>
      </span>
      <span className={"mt-1 block pl-[38px] text-[10px] tracking-wide " + by}>by {site.legalEntity}</span>
    </span>
  );
}

/** Shared navy top nav for interior (Veska-branded) pages. */
export function SiteNav() {
  return (
    <header className="bg-[#061C33] text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/"><Logo light /></Link>
        <div className="hidden items-center gap-8 text-sm text-[#c4d3e4] md:flex">
          <Link href="/#work" className="transition-colors hover:text-white">Work</Link>
          <Link href="/#pricing" className="transition-colors hover:text-white">Pricing</Link>
          <Link href="/about" className="transition-colors hover:text-white">About</Link>
          <Link href="/contact" className="transition-colors hover:text-white">Contact</Link>
        </div>
        <a href={site.calLink} target="_blank" rel="noopener" className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#061C33] transition-colors hover:bg-neutral-100">Book a call</a>
      </nav>
    </header>
  );
}

/** Shared navy footer. */
export function SiteFooter() {
  return (
    <footer className="bg-[#04111f] py-12 text-[#8fa8c4]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-7 sm:flex-row sm:items-start sm:justify-between">
          <Link href="/"><Logo light /></Link>
          <nav className="flex flex-wrap gap-x-7 gap-y-2 text-sm">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/start" className="hover:text-white">Start a project</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/refund" className="hover:text-white">Refunds</Link>
          </nav>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-xs text-[#5f7790] sm:flex-row sm:justify-between">
          <span>{site.email} · {site.domain}</span>
          <span>© {new Date().getFullYear()} {site.name} — a brand of {site.legalEntity}</span>
        </div>
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
        <h1 className="font-serif text-4xl font-medium tracking-[-0.015em] text-[#0b1726]">{title}</h1>
        <p className="mt-2 text-sm text-neutral-400">Last updated: {updated}</p>
        {intro && <p className="mt-6 text-neutral-600">{intro}</p>}
        <div className="mt-8 space-y-8">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-lg font-semibold text-[#0b1726]">{s.h}</h2>
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

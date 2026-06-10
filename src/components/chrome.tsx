import Link from "next/link";
import { site } from "@/lib/site";

/** Veska wordmark — outlined square mark + tracked wordmark, editorial register. */
export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative inline-block h-6 w-6 rounded-[7px] border border-[#16243a]/25">
        <span className="absolute inset-[6px] rounded-[2px] bg-[#16243a]" />
      </span>
      <span className="text-[15px] font-semibold tracking-[0.22em] text-[#16243a]">{site.name.toUpperCase()}</span>
    </span>
  );
}

/** Shared light top nav for interior (Veska-branded) pages. */
export function SiteNav() {
  return (
    <header className="border-b border-[#e6ebf1] bg-white/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-8 py-6">
        <Link href="/"><Logo /></Link>
        <div className="hidden items-center gap-9 text-[13px] text-[#54657a] md:flex">
          <Link href="/#work" className="transition-colors hover:text-[#16243a]">Work</Link>
          <Link href="/#pricing" className="transition-colors hover:text-[#16243a]">Pricing</Link>
          <Link href="/about" className="transition-colors hover:text-[#16243a]">About</Link>
          <Link href="/contact" className="transition-colors hover:text-[#16243a]">Contact</Link>
        </div>
        <a href={site.calLink} target="_blank" rel="noopener" className="rounded-lg bg-[#0b1f33] px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#13304d]">Book a call</a>
      </nav>
    </header>
  );
}

/** Shared light editorial footer. */
export function SiteFooter() {
  return (
    <footer className="border-t border-[#e6ebf1] bg-white py-14">
      <div className="mx-auto max-w-6xl px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <Link href="/"><Logo /></Link>
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-[#5a6b7e]">
            <Link href="/about" className="hover:text-[#16243a]">About</Link>
            <Link href="/start" className="hover:text-[#16243a]">Start a project</Link>
            <Link href="/contact" className="hover:text-[#16243a]">Contact</Link>
            <Link href="/terms" className="hover:text-[#16243a]">Terms</Link>
            <Link href="/privacy" className="hover:text-[#16243a]">Privacy</Link>
            <Link href="/refund" className="hover:text-[#16243a]">Refunds</Link>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 text-[10px] uppercase tracking-[0.26em] text-[#9aa8ba] sm:flex-row sm:justify-between">
          <span>Powered by {site.legalEntity}</span>
          <span className="text-[#b6c1ce]">{site.email} · © {new Date().getFullYear()}</span>
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
    <main className="bg-white text-[#54657a]">
      <SiteNav />
      <article className="mx-auto max-w-3xl px-8 py-16">
        <h1 className="font-serif text-4xl font-medium tracking-[-0.02em] text-[#16243a]">{title}</h1>
        <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#9aa8ba]">Last updated · {updated}</p>
        {intro && <p className="mt-6 text-[#5a6b7e]">{intro}</p>}
        <div className="mt-8 space-y-8">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-[17px] font-semibold text-[#16243a]">{s.h}</h2>
              <p className="mt-2 whitespace-pre-line leading-relaxed text-[#5a6b7e]">{s.p}</p>
            </section>
          ))}
        </div>
        <p className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          This is a starting template, not legal advice. Have a professional review it before relying on it.
        </p>
      </article>
      <SiteFooter />
    </main>
  );
}

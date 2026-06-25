"use client";

import { useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crest } from "../ui";
import { C } from "../strive";
import { BackToTop } from "./widgets";

const BASE = "/demos/strive";
export const NAV = [
  { href: BASE, label: "Home" },
  { href: `${BASE}/method`, label: "The Method" },
  { href: `${BASE}/founders`, label: "Founders" },
  { href: `${BASE}/podcast`, label: "Podcast" },
  { href: `${BASE}/faq`, label: "FAQ" },
];

const strip = (p: string) => p.replace(/\/$/, "") || "/";

/** Shared chrome for every page of the STRIVE mini-site. Sticky nav that solidifies
 * on scroll, a working mobile menu, active-link state, footer, and back-to-top. */
export const SiteShell: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = strip(usePathname() || BASE);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  const active = (href: string) => strip(href) === pathname;

  return (
    <div style={{ backgroundColor: C.cream, color: C.ink }}>
      <header className="sticky top-0 z-50 transition-all" style={{ backgroundColor: solid ? C.blue : "rgba(167,195,205,0.92)", boxShadow: solid ? "0 1px 12px rgba(20,40,38,.12)" : "none", backdropFilter: "blur(6px)" }}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href={BASE} aria-label="Home"><Crest size={38} /></Link>
          <div className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-[12px] font-bold uppercase tracking-[0.16em] transition" style={{ color: C.teal, opacity: active(n.href) ? 1 : 0.65, borderBottom: active(n.href) ? `2px solid ${C.rasp}` : "2px solid transparent", paddingBottom: 2 }}>
                {n.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link href={`${BASE}/login`} className="hidden text-[12px] font-bold uppercase tracking-[0.16em] sm:inline" style={{ color: C.rasp }}>Login</Link>
            <Link href={`${BASE}/apply`} className="rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white" style={{ backgroundColor: C.rasp }}>Apply here</Link>
            <button className="md:hidden" aria-label="Menu" onClick={() => setOpen((o) => !o)} style={{ color: C.teal }}>
              <span className="block h-0.5 w-6" style={{ backgroundColor: C.teal }} />
              <span className="mt-1.5 block h-0.5 w-6" style={{ backgroundColor: C.teal }} />
              <span className="mt-1.5 block h-0.5 w-6" style={{ backgroundColor: C.teal }} />
            </button>
          </div>
        </nav>
        <div className="h-1" style={{ backgroundColor: C.line }} />
      </header>

      {/* mobile drawer */}
      <div className="fixed inset-0 z-40 transition-opacity md:hidden" style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,40,38,.5)" }} onClick={() => setOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-72 p-8 transition-transform" style={{ backgroundColor: C.cream, transform: open ? "translateX(0)" : "translateX(100%)" }}>
          <div className="mt-12 flex flex-col gap-5">
            {[...NAV, { href: `${BASE}/apply`, label: "Apply" }, { href: `${BASE}/login`, label: "Login" }].map((n) => (
              <Link key={n.href} href={n.href} className="font-serif text-xl" style={{ color: active(n.href) ? C.rasp : C.teal }}>{n.label}</Link>
            ))}
          </div>
        </div>
      </div>

      {children}

      <footer style={{ backgroundColor: C.teal, color: C.cream }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Crest size={44} color={C.cream} />
            <p className="mt-4 text-sm" style={{ opacity: 0.8 }}>A strategic framework and community for women real estate investors.</p>
          </div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: C.blue }}>Explore</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              {NAV.map((n) => <Link key={n.href} href={n.href} style={{ opacity: 0.85 }}>{n.label}</Link>)}
            </div>
          </div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: C.blue }}>Get started</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href={`${BASE}/apply`} style={{ opacity: 0.85 }}>Apply to STRIVE</Link>
              <Link href={`${BASE}/login`} style={{ opacity: 0.85 }}>Member login</Link>
              <Link href={`${BASE}/faq`} style={{ opacity: 0.85 }}>FAQ</Link>
            </div>
          </div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: C.blue }}>Listen</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href={`${BASE}/podcast`} style={{ opacity: 0.85 }}>The InvestHER Podcast</Link>
            </div>
          </div>
        </div>
        <div className="border-t px-6 py-5 text-center text-[11px] uppercase tracking-[0.2em]" style={{ borderColor: "rgba(255,255,255,.15)", opacity: 0.6 }}>
          The Real Estate InvestHER · STRIVE · Interactive concept by Veska — veskadesign.com
        </div>
      </footer>

      <BackToTop />
    </div>
  );
};

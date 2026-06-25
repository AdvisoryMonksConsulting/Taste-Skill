"use client";

import { useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crest } from "../ui";
import { C } from "../strive";
import { BackToTop } from "./widgets";

export type NavVariant = "top" | "sidebar" | "masthead" | "dark" | "minimal";

const items = (base: string) => [
  { href: base, label: "Home" },
  { href: `${base}/method`, label: "The Method" },
  { href: `${base}/founders`, label: "Founders" },
  { href: `${base}/podcast`, label: "Podcast" },
  { href: `${base}/faq`, label: "FAQ" },
];
const strip = (p: string) => p.replace(/\/$/, "") || "/";

/** Shared chrome for every STRIVE mini-site. `variant` switches the navigation
 * style so each site feels structurally different; `base` makes all links resolve
 * under that site's route. Mobile menu, active state, footer and back-to-top included. */
export const SiteShell: FC<{ children: ReactNode; base?: string; variant?: NavVariant }> = ({ children, base = "/demos/strive", variant = "top" }) => {
  const NAV = items(base);
  const pathname = strip(usePathname() || base);
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

  const MobileBtn = (color: string) => (
    <button className="md:hidden" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
      {[0, 1, 2].map((i) => <span key={i} className={i ? "mt-1.5 block h-0.5 w-6" : "block h-0.5 w-6"} style={{ backgroundColor: color }} />)}
    </button>
  );
  const apply = (
    <Link href={`${base}/apply`} className="rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white" style={{ backgroundColor: C.rasp }}>Apply</Link>
  );

  // ---- nav variants ----
  const topNav = (
    <header className="sticky top-0 z-50 transition-all" style={{ backgroundColor: solid ? C.blue : "rgba(167,195,205,.92)", boxShadow: solid ? "0 1px 12px rgba(20,40,38,.12)" : "none", backdropFilter: "blur(6px)" }}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href={base} aria-label="Home"><Crest size={38} /></Link>
        <div className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => <Link key={n.href} href={n.href} className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: C.teal, opacity: active(n.href) ? 1 : 0.65, borderBottom: active(n.href) ? `2px solid ${C.rasp}` : "2px solid transparent", paddingBottom: 2 }}>{n.label}</Link>)}
        </div>
        <div className="flex items-center gap-4"><Link href={`${base}/login`} className="hidden text-[12px] font-bold uppercase tracking-[0.16em] sm:inline" style={{ color: C.rasp }}>Login</Link>{apply}{MobileBtn(C.teal)}</div>
      </nav>
      <div className="h-1" style={{ backgroundColor: C.line }} />
    </header>
  );

  const mastheadNav = (
    <header className="sticky top-0 z-50" style={{ backgroundColor: C.cream, borderBottom: `1px solid ${C.teal}22`, boxShadow: solid ? "0 1px 10px rgba(20,40,38,.08)" : "none" }}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: C.teal }}>Est. 2018</span>
        <Link href={base} aria-label="Home"><Crest size={36} /></Link>
        <div className="flex items-center gap-4">{apply}{MobileBtn(C.teal)}</div>
      </div>
      <div className="hidden justify-center gap-8 border-t py-2.5 md:flex" style={{ borderColor: `${C.teal}22` }}>
        {NAV.map((n) => <Link key={n.href} href={n.href} className="font-serif text-sm" style={{ color: active(n.href) ? C.rasp : C.teal }}>{n.label}</Link>)}
      </div>
    </header>
  );

  const darkNav = (
    <header className="sticky top-0 z-50" style={{ backgroundColor: solid ? C.tealDark : C.teal, boxShadow: solid ? "0 2px 14px rgba(0,0,0,.25)" : "none" }}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 text-white">
        <Link href={base} className="font-serif text-xl tracking-tight">STRIVE</Link>
        <div className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => <Link key={n.href} href={n.href} className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: "#fff", opacity: active(n.href) ? 1 : 0.6 }}>{n.label}</Link>)}
        </div>
        <div className="flex items-center gap-4">{apply}{MobileBtn("#fff")}</div>
      </nav>
    </header>
  );

  const sidebar = (
    <aside className="fixed left-0 top-0 z-40 hidden h-full w-60 flex-col justify-between p-8 md:flex" style={{ backgroundColor: C.teal, color: C.cream }}>
      <div>
        <Link href={base} aria-label="Home"><Crest size={48} color={C.cream} /></Link>
        <div className="mt-12 flex flex-col gap-4">
          {NAV.map((n) => <Link key={n.href} href={n.href} className="font-serif text-lg" style={{ color: active(n.href) ? C.blue : C.cream, opacity: active(n.href) ? 1 : 0.85 }}>{n.label}</Link>)}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Link href={`${base}/login`} className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: C.blue }}>Login</Link>
        <Link href={`${base}/apply`} className="rounded-full px-5 py-2.5 text-center text-[12px] font-bold uppercase tracking-[0.14em] text-white" style={{ backgroundColor: C.rasp }}>Apply</Link>
      </div>
    </aside>
  );
  const sidebarTopbar = (
    <header className="sticky top-0 z-50 md:hidden" style={{ backgroundColor: C.teal }}>
      <nav className="flex items-center justify-between px-6 py-3 text-white">
        <Link href={base}><Crest size={34} color={C.cream} /></Link>
        <div className="flex items-center gap-4">{apply}{MobileBtn("#fff")}</div>
      </nav>
    </header>
  );

  const minimalNav = (
    <header className="fixed left-0 right-0 top-0 z-50 transition-all" style={{ backgroundColor: solid ? C.cream : "transparent", boxShadow: solid ? "0 1px 10px rgba(20,40,38,.08)" : "none" }}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
        <Link href={base} aria-label="Home"><Crest size={36} color={solid ? C.teal : "#fff"} /></Link>
        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => <Link key={n.href} href={n.href} className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: solid ? C.teal : "#fff", opacity: active(n.href) ? 1 : 0.7 }}>{n.label}</Link>)}
        </div>
        <div className="flex items-center gap-4">
          <Link href={`${base}/apply`} className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: solid ? C.rasp : "#fff" }}>Apply</Link>
          {MobileBtn(solid ? C.teal : "#fff")}
        </div>
      </nav>
    </header>
  );

  const isSidebar = variant === "sidebar";

  return (
    <div style={{ backgroundColor: C.cream, color: C.ink }}>
      {variant === "top" && topNav}
      {variant === "masthead" && mastheadNav}
      {variant === "dark" && darkNav}
      {variant === "minimal" && minimalNav}
      {isSidebar && (<>{sidebar}{sidebarTopbar}</>)}

      {/* mobile drawer (all variants) */}
      <div className="fixed inset-0 z-[60] transition-opacity md:hidden" style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,40,38,.5)" }} onClick={() => setOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-72 p-8 transition-transform" style={{ backgroundColor: C.cream, transform: open ? "translateX(0)" : "translateX(100%)" }}>
          <div className="mt-12 flex flex-col gap-5">
            {[...NAV, { href: `${base}/apply`, label: "Apply" }, { href: `${base}/login`, label: "Login" }].map((n) => (
              <Link key={n.href} href={n.href} className="font-serif text-xl" style={{ color: active(n.href) ? C.rasp : C.teal }}>{n.label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className={isSidebar ? "md:pl-60" : ""}>{children}</div>

      <footer className={isSidebar ? "md:pl-60" : ""} style={{ backgroundColor: C.teal, color: C.cream }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
          <div><Crest size={44} color={C.cream} /><p className="mt-4 text-sm" style={{ opacity: 0.8 }}>A strategic framework and community for women real estate investors.</p></div>
          <div><p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: C.blue }}>Explore</p><div className="mt-3 flex flex-col gap-2 text-sm">{NAV.map((n) => <Link key={n.href} href={n.href} style={{ opacity: 0.85 }}>{n.label}</Link>)}</div></div>
          <div><p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: C.blue }}>Get started</p><div className="mt-3 flex flex-col gap-2 text-sm"><Link href={`${base}/apply`} style={{ opacity: 0.85 }}>Apply to STRIVE</Link><Link href={`${base}/login`} style={{ opacity: 0.85 }}>Member login</Link><Link href={`${base}/faq`} style={{ opacity: 0.85 }}>FAQ</Link></div></div>
          <div><p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: C.blue }}>Listen</p><div className="mt-3 flex flex-col gap-2 text-sm"><Link href={`${base}/podcast`} style={{ opacity: 0.85 }}>The InvestHER Podcast</Link></div></div>
        </div>
        <div className="border-t px-6 py-5 text-center text-[11px] uppercase tracking-[0.2em]" style={{ borderColor: "rgba(255,255,255,.15)", opacity: 0.6 }}>The Real Estate InvestHER · STRIVE · Interactive concept by Veska — veskadesign.com</div>
      </footer>

      <BackToTop />
    </div>
  );
};

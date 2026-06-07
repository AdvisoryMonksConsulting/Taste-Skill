import type { LandingContent } from "../content";

export function Footer({ brand, footer }: Pick<LandingContent, "brand" | "footer">) {
  return (
    <footer className="border-t border-neutral-200 bg-white py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <span className={"text-lg font-semibold tracking-tight " + brand.heading}>{brand.name}</span>
          <p className="mt-3 max-w-xs text-sm text-neutral-500">{footer.tagline}</p>
        </div>
        {footer.columns.map((col) => (
          <div key={col.title}>
            <h4 className={"text-sm font-semibold " + brand.heading}>{col.title}</h4>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-neutral-500 transition-colors hover:text-neutral-900">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-neutral-100 px-6 pt-8">
        <p className="text-sm text-neutral-400">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

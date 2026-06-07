import { Radar, ShieldCheck } from "lucide-react";
import { getSignals } from "@/lib/signals/aggregate";
import { SignalFeedView } from "@/components/signal-feed";

// Cache the server render for 15 minutes; the in-card Refresh button forces a
// fresh pull on demand. Live source fetches also cache for 15 minutes.
export const revalidate = 900;

export default async function Home() {
  const feed = await getSignals();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
      <header className="mb-8 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <Radar className="size-5" />
          AdvisoryMonks · NRI Signal Radar
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          People asking for NRI tax help — right now, in public
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          A live feed of public posts where NRIs describe a tax or CA problem
          with their name attached. Each one is auto-classified by problem type
          and urgency, with a suggested, helpful first-contact angle.
        </p>
      </header>

      <SignalFeedView initial={feed} />

      <footer className="mt-12 flex items-start gap-2 border-t pt-6 text-xs text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" />
        <p>
          Reads <strong>public</strong> posts only, from sources that permit
          programmatic read access (currently Reddit&apos;s public JSON).
          Respect each platform&apos;s rules and content policy — engage
          helpfully in-thread and lead with value; do not mass-DM or spam.
          Sources are pluggable: funding announcements, job posts and review-site
          pain can be added behind the same classifier.
        </p>
      </footer>
    </main>
  );
}

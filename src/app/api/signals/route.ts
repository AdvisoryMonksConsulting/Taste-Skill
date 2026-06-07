import { NextResponse } from "next/server";
import { getSignals } from "@/lib/signals/aggregate";

// Always evaluate at request time; underlying source fetches do their own caching.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const force = new URL(request.url).searchParams.get("refresh") === "1";
  const feed = await getSignals(force);
  return NextResponse.json(feed);
}

"use client";

import { useState } from "react";
import { Loader2, Sparkles, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentCard } from "@/components/research/agent-card";
import { AGENTS } from "@/lib/research/agents";
import { useResearch } from "@/lib/research/use-research";

const EXAMPLES = [
  "An AI meeting-notes tool for therapists that auto-generates compliant session notes",
  "A Notion-style workspace built specifically for indie game studios",
  "Carbon-accounting software for small manufacturers",
];

export default function Home() {
  const [idea, setIdea] = useState("");
  const { agents, running, error, activeIdea, start, stop } = useResearch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    start(idea);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-12 sm:py-16">
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3.5" /> Multi-agent founder research
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Pitch an idea. Get the homework done.
        </h1>
        <p className="text-muted-foreground">
          Six specialist agents research the market in parallel sequence —
          competitors, pricing, funding, gaps, positioning, and a launch plan —
          with live web search. Roughly 3–4 hours of desk research from a single
          prompt.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-3">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your startup idea in a sentence or two…"
          rows={3}
          disabled={running}
          className="flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) onSubmit(e);
          }}
        />

        <div className="flex flex-wrap items-center gap-2">
          {running ? (
            <Button type="button" variant="destructive" onClick={stop}>
              <Square className="size-4" /> Stop
            </Button>
          ) : (
            <Button type="submit" disabled={!idea.trim()}>
              <Sparkles className="size-4" /> Research this idea
            </Button>
          )}
          {running && (
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Agents are working — this
              takes a few minutes.
            </span>
          )}
        </div>

        {!activeIdea && !running && (
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-xs text-muted-foreground">Try:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setIdea(ex)}
                className="rounded-full border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted"
              >
                {ex.length > 48 ? ex.slice(0, 48) + "…" : ex}
              </button>
            ))}
          </div>
        )}
      </form>

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {activeIdea && (
        <section className="space-y-4">
          <div className="rounded-md border bg-muted/30 px-4 py-3 text-sm">
            <span className="font-medium text-muted-foreground">Researching:</span>{" "}
            {activeIdea}
          </div>
          <div className="space-y-4">
            {AGENTS.map((agent) => (
              <AgentCard key={agent.id} agent={agent} state={agents[agent.id]} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

# Founder Research Agents

Pitch a startup idea and a team of six specialist AI agents does the founder's
desk research for you — automatically, with live web search.

The agents run as a pipeline, each building on the last:

1. **Competitor Research** — maps direct and indirect players
2. **Pricing Intelligence** — real pricing and monetization models
3. **Funding Landscape** — who raised, how much, investor appetite
4. **Market Gap Analysis** — underserved segments and whitespace
5. **Positioning Strategy** — sharp positioning vs named rivals
6. **Launch Strategy** — a concrete 90-day go-to-market plan

Each agent is a [Claude](https://www.anthropic.com/claude) (Opus 4.8) call with
the server-side `web_search` / `web_fetch` tools. Findings flow forward, so
positioning and launch reason over the earlier research. Results stream into
the UI live, agent by agent, with the actual search queries shown as they run.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4 + shadcn/ui
- Anthropic TypeScript SDK (`@anthropic-ai/sdk`)
- A streaming NDJSON route handler at `app/api/research`

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then add your ANTHROPIC_API_KEY
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000), describe an idea, and hit
**Research this idea**. A full run takes a few minutes — the agents make real
web searches.

## Configuration

| Variable            | Required | Default           | Notes                              |
| ------------------- | -------- | ----------------- | ---------------------------------- |
| `ANTHROPIC_API_KEY` | yes      | —                 | Your Anthropic API key             |
| `ANTHROPIC_MODEL`   | no       | `claude-opus-4-8` | Override the model used by agents  |

## How it works

```
 page.tsx ──POST /api/research──▶ route.ts
    ▲                                │  for each of 6 agents:
    │   NDJSON event stream          │    client.messages.stream({ web_search, web_fetch })
    └────────────────────────────────┘    → emits agent_start / search / delta / agent_done
```

- `src/lib/research/agents.ts` — the six agent definitions and prompts
- `src/lib/research/types.ts` — the streamed event contract
- `src/app/api/research/route.ts` — orchestrates the pipeline, streams events
- `src/lib/research/use-research.ts` — client hook that consumes the stream
- `src/components/research/*` — the dashboard UI

> **Accuracy note:** the agents are instructed to cite real sources and not to
> fabricate, but always verify specific prices, funding figures, and claims
> before relying on them.

---
name: opensre
description: Install, configure, run, and develop OpenSRE — the open-source framework for AI SRE agents that investigate production incidents (Tracer-Cloud/opensre). Use when the user wants to set up OpenSRE, run an incident investigation, wire up integrations (Datadog, Grafana, CloudWatch, Kubernetes, PagerDuty, Slack, etc.), pick an LLM provider, connect the OpenClaw bridge, deploy it, or contribute to the codebase.
---

# OpenSRE

OpenSRE (`Tracer-Cloud/opensre`, Apache-2.0, public alpha) is an open-source framework
for **AI SRE agents** that resolve production incidents on your own infrastructure. When
an alert fires it fetches alert context + correlated logs/metrics/traces, reasons across
connected systems, produces a structured root-cause report with evidence links, suggests
(or executes) remediation, and posts a summary to Slack/PagerDuty. It is also an RL
training + evaluation environment, with scored synthetic RCA suites (`tests/synthetic`)
and cloud-backed end-to-end scenarios (`tests/e2e`).

- Repo: https://github.com/Tracer-Cloud/opensre
- Docs: https://www.opensre.com/docs · Quickstart: https://www.opensre.com/docs/quickstart
- Stack: Python 3.12+ (CI/`.tool-versions` pin 3.13), FastAPI runtime, `uv` for deps,
  Click-based CLI entrypoint `opensre = app.cli.__main__:main`.

## Quick decision guide

- **"I just want to use it"** → install the released binary, then `opensre onboard`.
- **"I want to develop / contribute"** → clone, `make install` (uv editable), use `uv run opensre …`.
- **"Run one investigation"** → `opensre investigate -i <alert.json>`.
- **"Interactive session"** → bare `opensre` (needs a TTY) opens a REPL.

## Install (end users)

Root installer auto-detects shell. Add `--main` for the latest rolling build from `main`.

```bash
# Latest stable
curl -fsSL https://install.opensre.com | bash
# Latest from main
curl -fsSL https://install.opensre.com | bash -s -- --main
# Homebrew
brew tap tracer-cloud/tap && brew install tracer-cloud/tap/opensre
# Windows (PowerShell)
irm https://install.opensre.com | iex
```

## Configure & run

```bash
opensre onboard          # one-time interactive wizard (integrations + LLM provider)
opensre                  # interactive REPL (TTY required) — describe incidents in plain language
opensre investigate -i tests/e2e/kubernetes/fixtures/datadog_k8s_alert.json   # one-shot
opensre update
opensre uninstall        # removes opensre and all local data
```

REPL slash commands: `/help`, `/status`, `/clear`, `/reset`, `/trust`, `/effort`, `/exit`.
`/effort` sets reasoning depth (`low|medium|high|xhigh|max`) for OpenAI/Codex providers;
other providers ignore it. Ctrl+C cancels an in-flight investigation without losing state.

Top-level CLI command groups (from `app/cli/commands/`): `onboard`, `investigate`,
`integrations` (`setup`/`verify`/`list`/`status`), `remote` (`ops`), `doctor`, `config`,
`cron`, `agent`, `messaging`, `guardrails`, `watchdog`, `update`, `uninstall`, `version`.

## LLM providers

Bring your own model. Set `LLM_PROVIDER` plus the matching API key (see `.env.example`).
Supported: **Anthropic, OpenAI, Ollama, Google Gemini, OpenRouter, NVIDIA NIM, Bedrock**.
When the user is building or configuring against Anthropic/Claude here, follow the repo
rule: prefer the latest, most capable Claude models and consult the `claude-api` skill for
current model IDs/params rather than guessing.

## Integrations (60+ tools)

Wizard for everything: `uv run opensre onboard`. Single integration, non-interactive:

```bash
uv run opensre integrations setup <service>
uv run opensre integrations verify <service>
```

Categories: Observability (Grafana/Loki/Mimir/Tempo, Datadog, Honeycomb, Coralogix,
CloudWatch, Sentry, Elasticsearch, Better Stack), Infrastructure (Kubernetes, AWS, GCP,
Azure), Databases (PostgreSQL, MySQL/MariaDB, MongoDB/Atlas, ClickHouse, Snowflake, Azure
SQL), Data platform (Airflow, Kafka, Spark, Prefect, RabbitMQ), Dev tools (GitHub/GitHub
MCP, GitLab, Bitbucket), Incident mgmt (PagerDuty, Opsgenie, Jira, Alertmanager),
Communication (Slack, Discord, Telegram, Google Docs), Protocols (MCP, ACP, OpenClaw).

### OpenClaw bridge

There is no separate `opensre-mcp` server anymore; OpenSRE connects to the OpenClaw bridge
directly to read recent conversation context and write RCA findings back.

```bash
uv run opensre integrations setup openclaw
uv run opensre integrations verify openclaw
# Recommended local env:
OPENCLAW_MCP_MODE=stdio
OPENCLAW_MCP_COMMAND=openclaw
OPENCLAW_MCP_ARGS="mcp serve"
```

## Develop from source

Prereqs: Python 3.12+ (3.13 recommended), Git, `uv`, and Make (optional on Windows).

```bash
git clone https://github.com/Tracer-Cloud/opensre.git && cd opensre
make install                 # uv sync --frozen --extra dev + analytics install (editable)
uv run opensre onboard       # or any uv run opensre … command
```

CI-parity checks before opening a PR (`format-check` is what CI enforces):

```bash
make lint && make format-check && make typecheck && make test-cov
```

No-Make equivalents: `uv sync --frozen --extra dev`, `uv run ruff check app/ tests/`,
`uv run ruff format --check app/ tests/`, `uv run mypy app/`, then the `pytest -n auto …`
line from the `Makefile` `test-cov` target. Benchmarks: `make benchmark` /
`make benchmark-update-readme`.

**Gotcha:** if `opensre` ignores local edits, another `opensre` is ahead on `PATH`. Prefer
`uv run opensre …` from the repo root, or `eval "$(./scripts/dev-path.sh)" && hash -r`.

## Deploy

Standard Python/FastAPI runtime via the repo `Dockerfile` or a managed host (Railway, EC2,
ECS, Vercel). Set `LLM_PROVIDER` + key; persistent layouts also set `DATABASE_URI` and
`REDIS_URI`. Full steps + `opensre remote ops` in `docs/DEVELOPMENT.md#deployment`.

## Telemetry

PostHog + Sentry are **opt-out**: `export OPENSRE_NO_TELEMETRY=1`.

## Working in the OpenSRE repo

Always read the repo's own `AGENTS.md` (root `CLAUDE.md` just `@`-includes it) and the
`.cursor/rules/*.mdc` (quality, integrations, testing, live-routing-tests, graph-nodes,
code-style, tools) before writing code — they carry the current conventions. Adding a new
integration? Follow `TOOL_INTEGRATION_CHECKLIST.md`. Architecture is documented in
`AGENT_ARCHITECTURE.md`; tests taxonomy in `tests/README.md`.

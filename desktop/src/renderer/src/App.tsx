import { useCallback, useEffect, useRef, useState } from "react";
import {
  Download,
  FileText,
  Loader2,
  Plus,
  Settings as SettingsIcon,
  Sparkles,
  Square,
  Trash2,
  WifiOff,
} from "lucide-react";
import { AGENTS } from "../../shared/agents";
import type {
  AgentId,
  Report,
  ReportMeta,
  ResearchEvent,
  Settings,
} from "../../shared/types";
import { AgentCard, type AgentCardState } from "./components/AgentCard";
import { SettingsView } from "./components/SettingsView";

type AgentMap = Record<AgentId, AgentCardState>;

function initialAgents(): AgentMap {
  const map = {} as AgentMap;
  for (const a of AGENTS) {
    map[a.id] = { status: "pending", text: "", searches: [] };
  }
  return map;
}

const EXAMPLES = [
  "An AI meeting-notes tool for therapists that auto-generates compliant session notes",
  "A Notion-style workspace built specifically for indie game studios",
  "Carbon-accounting software for small manufacturers",
];

export default function App() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [view, setView] = useState<"research" | "settings">("research");
  const [reports, setReports] = useState<ReportMeta[]>([]);
  const [openReport, setOpenReport] = useState<Report | null>(null);

  // Live run state
  const [idea, setIdea] = useState("");
  const [agents, setAgents] = useState<AgentMap>(initialAgents);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIdea, setActiveIdea] = useState<string | null>(null);
  const [lastSavedId, setLastSavedId] = useState<string | null>(null);

  const [online, setOnline] = useState(navigator.onLine);
  const [exportNote, setExportNote] = useState<string | null>(null);
  const exportNoteTimer = useRef<number | null>(null);

  const refreshReports = useCallback(async () => {
    setReports(await window.founder.listReports());
  }, []);

  // Boot: load settings + library; resync run state (e.g. after window reload).
  useEffect(() => {
    (async () => {
      const s = await window.founder.getSettings();
      setSettings(s);
      if (!s.hasKey) setView("settings");
      await refreshReports();
      setRunning(await window.founder.isResearchRunning());
    })();
  }, [refreshReports]);

  // Online/offline awareness
  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  // Pipeline events from the main process
  useEffect(() => {
    const patch = (id: AgentId, fn: (s: AgentCardState) => AgentCardState) =>
      setAgents((prev) => ({ ...prev, [id]: fn(prev[id]) }));

    return window.founder.onResearchEvent((event: ResearchEvent) => {
      switch (event.type) {
        case "start":
          setRunning(true);
          break;
        case "agent_start":
          patch(event.id, (s) => ({ ...s, status: "running" }));
          break;
        case "search":
          patch(event.id, (s) => ({ ...s, searches: [...s.searches, event.query] }));
          break;
        case "delta":
          patch(event.id, (s) => ({ ...s, text: s.text + event.text }));
          break;
        case "agent_done":
          patch(event.id, (s) => ({ ...s, status: "done" }));
          break;
        case "done":
          setRunning(false);
          break;
        case "saved":
          setLastSavedId(event.reportId);
          refreshReports();
          break;
        case "error":
          setError(event.message);
          if (event.id) patch(event.id, (s) => ({ ...s, status: "error" }));
          setRunning(false);
          break;
      }
    });
  }, [refreshReports]);

  const startRun = () => {
    const trimmed = idea.trim();
    if (!trimmed || running) return;
    setAgents(initialAgents());
    setError(null);
    setActiveIdea(trimmed);
    setLastSavedId(null);
    setOpenReport(null);
    setView("research");
    window.founder.startResearch(trimmed);
  };

  const stopRun = () => {
    window.founder.stopResearch();
    setRunning(false);
  };

  const newResearch = () => {
    setOpenReport(null);
    setView("research");
    if (!running) {
      setActiveIdea(null);
      setIdea("");
      setAgents(initialAgents());
      setError(null);
      setLastSavedId(null);
    }
  };

  const viewReport = async (id: string) => {
    const r = await window.founder.getReport(id);
    if (r) {
      setOpenReport(r);
      setView("research");
    }
  };

  const removeReport = async (id: string) => {
    if (!window.confirm("Delete this report? This can't be undone.")) return;
    await window.founder.deleteReport(id);
    if (openReport?.id === id) setOpenReport(null);
    if (lastSavedId === id) setLastSavedId(null);
    await refreshReports();
  };

  const doExport = async (id: string, format: "md" | "html" | "pdf") => {
    const result = await window.founder.exportReport(id, format);
    if (exportNoteTimer.current) window.clearTimeout(exportNoteTimer.current);
    if (result.ok) {
      setExportNote(`Saved to ${result.path}`);
    } else if (!result.cancelled) {
      setExportNote(result.problem ?? "Export failed.");
    } else {
      return;
    }
    exportNoteTimer.current = window.setTimeout(() => setExportNote(null), 6000);
  };

  if (!settings) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  const firstRun = !settings.hasKey;
  const showingLive = !openReport;
  const exportTargetId = openReport?.id ?? lastSavedId;

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="flex w-64 shrink-0 flex-col border-r border-neutral-200 bg-white">
        <div className="flex items-center gap-2 px-4 py-4">
          <Sparkles className="size-4 text-neutral-700" />
          <span className="font-semibold tracking-tight">Founder Research</span>
        </div>

        <div className="px-3">
          <button
            onClick={newResearch}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-700"
          >
            <Plus className="size-4" /> New research
          </button>
        </div>

        <div className="mt-4 px-4 text-xs font-semibold tracking-wide text-neutral-400 uppercase">
          Library
        </div>
        <nav className="mt-1 flex-1 space-y-0.5 overflow-y-auto px-2 pb-2">
          {reports.length === 0 && (
            <p className="px-2 py-3 text-xs text-neutral-400">
              Finished research is saved here automatically — readable any time,
              even offline.
            </p>
          )}
          {reports.map((r) => (
            <div
              key={r.id}
              className={`group flex items-start gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors ${
                openReport?.id === r.id ? "bg-neutral-100" : "hover:bg-neutral-50"
              }`}
            >
              <button
                onClick={() => viewReport(r.id)}
                className="flex min-w-0 flex-1 cursor-pointer items-start gap-2 text-left"
              >
                <FileText className="mt-0.5 size-3.5 shrink-0 text-neutral-400" />
                <span className="min-w-0">
                  <span className="block truncate font-medium">{r.idea}</span>
                  <span className="block text-xs text-neutral-400">
                    {new Date(r.createdAt).toLocaleDateString()}
                    {!r.complete && " · partial"}
                  </span>
                </span>
              </button>
              <button
                onClick={() => removeReport(r.id)}
                title="Delete report"
                className="invisible mt-0.5 cursor-pointer text-neutral-300 group-hover:visible hover:text-red-500"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </nav>

        {!online && (
          <div className="mx-3 mb-2 flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <WifiOff className="mt-0.5 size-3.5 shrink-0" />
            You&apos;re offline. Saved reports still work; new research needs
            internet.
          </div>
        )}

        <div className="border-t border-neutral-200 p-3">
          <button
            onClick={() => setView(view === "settings" ? "research" : "settings")}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
              view === "settings"
                ? "bg-neutral-100 font-medium"
                : "text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            <SettingsIcon className="size-4" /> Settings
          </button>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 overflow-y-auto">
        {view === "settings" ? (
          <SettingsView
            settings={settings}
            firstRun={firstRun}
            onSaved={(next) => {
              setSettings(next);
              if (next.hasKey) setView("research");
            }}
          />
        ) : openReport ? (
          /* Saved report view */
          <div className="mx-auto w-full max-w-3xl space-y-4 px-6 py-10">
            <div className="rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm shadow-sm">
              <span className="font-medium text-neutral-500">Idea:</span>{" "}
              {openReport.idea}
              <span className="mt-1 block text-xs text-neutral-400">
                Researched {new Date(openReport.createdAt).toLocaleString()}
                {openReport.complete ? "" : " — partial run"}
              </span>
            </div>
            <ExportBar onExport={(f) => doExport(openReport.id, f)} note={exportNote} />
            <div className="space-y-4">
              {AGENTS.filter((a) => openReport.sections[a.id]).map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  showStatus={false}
                  state={{
                    status: "done",
                    text: openReport.sections[agent.id]!,
                    searches: [],
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* New / live research view */
          <div className="mx-auto w-full max-w-3xl space-y-8 px-6 py-10">
            {!activeIdea && (
              <header className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tight">
                  Pitch an idea. Get the homework done.
                </h1>
                <p className="text-neutral-500">
                  Six specialist AI agents research your market with live web
                  search — competitors, pricing, funding, gaps, positioning, and
                  a 90-day launch plan. Reports save automatically for offline
                  reading.
                </p>
              </header>
            )}

            <div className="space-y-3">
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your startup idea in a sentence or two…"
                rows={3}
                disabled={running}
                className="w-full resize-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-900 focus:outline-none disabled:opacity-50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) startRun();
                }}
              />
              <div className="flex flex-wrap items-center gap-3">
                {running ? (
                  <button
                    onClick={stopRun}
                    className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
                  >
                    <Square className="size-4" /> Stop
                  </button>
                ) : (
                  <button
                    onClick={startRun}
                    disabled={!idea.trim() || !online}
                    className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-50"
                  >
                    <Sparkles className="size-4" /> Research this idea
                  </button>
                )}
                {running && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-neutral-500">
                    <Loader2 className="size-4 animate-spin" />
                    Agents are working — this takes a few minutes.
                  </span>
                )}
                {!online && !running && (
                  <span className="text-sm text-amber-700">
                    New research needs an internet connection.
                  </span>
                )}
              </div>

              {!activeIdea && !running && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-xs text-neutral-400">Try:</span>
                  {EXAMPLES.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setIdea(ex)}
                      className="cursor-pointer rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-500 transition-colors hover:bg-neutral-100"
                    >
                      {ex.length > 48 ? ex.slice(0, 48) + "…" : ex}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {activeIdea && showingLive && (
              <section className="space-y-4">
                <div className="rounded-md border border-neutral-200 bg-white px-4 py-3 text-sm shadow-sm">
                  <span className="font-medium text-neutral-500">Researching:</span>{" "}
                  {activeIdea}
                </div>
                {!running && exportTargetId && (
                  <ExportBar
                    onExport={(f) => doExport(exportTargetId, f)}
                    note={exportNote}
                  />
                )}
                <div className="space-y-4">
                  {AGENTS.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} state={agents[agent.id]} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function ExportBar({
  onExport,
  note,
}: {
  onExport: (format: "md" | "html" | "pdf") => void;
  note: string | null;
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600">
          <Download className="size-4" /> Export:
        </span>
        {(["pdf", "html", "md"] as const).map((f) => (
          <button
            key={f}
            onClick={() => onExport(f)}
            className="cursor-pointer rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-100"
          >
            {f === "md" ? "Markdown" : f.toUpperCase()}
          </button>
        ))}
      </div>
      {note && <p className="text-xs text-neutral-500">{note}</p>}
    </div>
  );
}

import { app, safeStorage } from "electron";
import { promises as fs } from "fs";
import { randomUUID } from "crypto";
import path from "path";
import type { ModelChoice, Report, ReportMeta, Settings } from "../shared/types";

// Everything lives under the per-user app data folder, e.g.
//   Windows: %APPDATA%/Founder Research
//   macOS:   ~/Library/Application Support/Founder Research
//   Linux:   ~/.config/Founder Research
// No cloud, no telemetry — reports are plain JSON files the user owns.

interface SettingsFile {
  apiKey?: string; // base64 of safeStorage ciphertext, or plaintext fallback
  apiKeyEncrypted?: boolean;
  model?: ModelChoice;
}

const VALID_MODELS: ModelChoice[] = [
  "claude-opus-4-8",
  "claude-sonnet-4-6",
  "claude-haiku-4-5",
];

function dataDir() {
  return app.getPath("userData");
}
function settingsPath() {
  return path.join(dataDir(), "settings.json");
}
function reportsDir() {
  return path.join(dataDir(), "reports");
}

async function readSettingsFile(): Promise<SettingsFile> {
  try {
    return JSON.parse(await fs.readFile(settingsPath(), "utf8"));
  } catch {
    return {};
  }
}

async function writeSettingsFile(s: SettingsFile): Promise<void> {
  await fs.mkdir(dataDir(), { recursive: true });
  await fs.writeFile(settingsPath(), JSON.stringify(s, null, 2), "utf8");
}

export async function getSettings(): Promise<Settings> {
  const s = await readSettingsFile();
  return {
    hasKey: Boolean(s.apiKey),
    keyEncrypted: Boolean(s.apiKeyEncrypted),
    model: s.model && VALID_MODELS.includes(s.model) ? s.model : "claude-opus-4-8",
  };
}

export async function setApiKey(key: string): Promise<void> {
  const s = await readSettingsFile();
  const trimmed = key.trim();
  if (!trimmed) {
    delete s.apiKey;
    delete s.apiKeyEncrypted;
  } else if (safeStorage.isEncryptionAvailable()) {
    s.apiKey = safeStorage.encryptString(trimmed).toString("base64");
    s.apiKeyEncrypted = true;
  } else {
    // No OS keychain available (e.g. some Linux setups) — store as-is so the
    // app still works; the Settings screen surfaces this state to the user.
    s.apiKey = Buffer.from(trimmed, "utf8").toString("base64");
    s.apiKeyEncrypted = false;
  }
  await writeSettingsFile(s);
}

export async function getApiKey(): Promise<string | null> {
  const s = await readSettingsFile();
  if (!s.apiKey) return null;
  const buf = Buffer.from(s.apiKey, "base64");
  if (s.apiKeyEncrypted) {
    try {
      return safeStorage.decryptString(buf);
    } catch {
      return null; // keychain changed / different user — treat as no key
    }
  }
  return buf.toString("utf8");
}

export async function setModel(model: ModelChoice): Promise<void> {
  if (!VALID_MODELS.includes(model)) return;
  const s = await readSettingsFile();
  s.model = model;
  await writeSettingsFile(s);
}

// ---- Report library ----

export async function saveReport(
  report: Omit<Report, "id" | "createdAt">,
): Promise<Report> {
  const full: Report = {
    ...report,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  await fs.mkdir(reportsDir(), { recursive: true });
  await fs.writeFile(
    path.join(reportsDir(), `${full.id}.json`),
    JSON.stringify(full, null, 2),
    "utf8",
  );
  return full;
}

export async function listReports(): Promise<ReportMeta[]> {
  let files: string[];
  try {
    files = await fs.readdir(reportsDir());
  } catch {
    return [];
  }
  const metas: ReportMeta[] = [];
  for (const f of files) {
    if (!f.endsWith(".json")) continue;
    try {
      const r: Report = JSON.parse(
        await fs.readFile(path.join(reportsDir(), f), "utf8"),
      );
      metas.push({ id: r.id, idea: r.idea, createdAt: r.createdAt, complete: r.complete });
    } catch {
      // skip corrupt file rather than break the whole library
    }
  }
  metas.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return metas;
}

export async function getReport(id: string): Promise<Report | null> {
  // IDs are UUIDs we generated; basename() guards against path traversal.
  const file = path.join(reportsDir(), `${path.basename(id)}.json`);
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return null;
  }
}

export async function deleteReport(id: string): Promise<void> {
  const file = path.join(reportsDir(), `${path.basename(id)}.json`);
  await fs.rm(file, { force: true });
}

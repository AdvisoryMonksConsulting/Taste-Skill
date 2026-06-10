import { contextBridge, ipcRenderer } from "electron";
import type {
  ModelChoice,
  Report,
  ReportMeta,
  ResearchEvent,
  Settings,
} from "../shared/types";

export interface FounderApi {
  getSettings(): Promise<Settings>;
  /** Validates the key against the API before saving. */
  setApiKey(key: string): Promise<{ ok: true } | { ok: false; problem: string }>;
  setModel(model: ModelChoice): Promise<void>;

  startResearch(idea: string): Promise<void>;
  stopResearch(): Promise<void>;
  isResearchRunning(): Promise<boolean>;
  /** Subscribe to pipeline events. Returns an unsubscribe function. */
  onResearchEvent(cb: (event: ResearchEvent) => void): () => void;

  listReports(): Promise<ReportMeta[]>;
  getReport(id: string): Promise<Report | null>;
  deleteReport(id: string): Promise<void>;
  exportReport(
    id: string,
    format: "md" | "html" | "pdf",
  ): Promise<
    | { ok: true; path: string }
    | { ok: false; cancelled?: boolean; problem?: string }
  >;

  openExternal(url: string): Promise<void>;
}

const api: FounderApi = {
  getSettings: () => ipcRenderer.invoke("settings:get"),
  setApiKey: (key) => ipcRenderer.invoke("settings:set-key", key),
  setModel: (model) => ipcRenderer.invoke("settings:set-model", model),

  startResearch: (idea) => ipcRenderer.invoke("research:start", idea),
  stopResearch: () => ipcRenderer.invoke("research:stop"),
  isResearchRunning: () => ipcRenderer.invoke("research:running"),
  onResearchEvent: (cb) => {
    const listener = (_e: Electron.IpcRendererEvent, event: ResearchEvent) =>
      cb(event);
    ipcRenderer.on("research:event", listener);
    return () => ipcRenderer.removeListener("research:event", listener);
  },

  listReports: () => ipcRenderer.invoke("reports:list"),
  getReport: (id) => ipcRenderer.invoke("reports:get", id),
  deleteReport: (id) => ipcRenderer.invoke("reports:delete", id),
  exportReport: (id, format) => ipcRenderer.invoke("reports:export", id, format),

  openExternal: (url) => ipcRenderer.invoke("open-external", url),
};

contextBridge.exposeInMainWorld("founder", api);

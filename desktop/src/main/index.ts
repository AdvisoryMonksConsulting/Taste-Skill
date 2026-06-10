import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "path";
import type { ModelChoice, ResearchEvent } from "../shared/types";
import { exportReport } from "./export";
import {
  isResearchRunning,
  startResearch,
  stopResearch,
  validateApiKey,
} from "./research";
import {
  deleteReport,
  getReport,
  getSettings,
  listReports,
  setApiKey,
  setModel,
} from "./storage";

// Single source of truth for the window so research events always reach the UI.
let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1240,
    height: 840,
    minWidth: 900,
    minHeight: 600,
    title: "Founder Research",
    backgroundColor: "#fafafa",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  // External links open in the user's browser, never inside the app.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://") || url.startsWith("http://")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });
  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (url.startsWith("https://") || url.startsWith("http://")) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function sendEvent(event: ResearchEvent) {
  mainWindow?.webContents.send("research:event", event);
}

function registerIpc() {
  // Settings
  ipcMain.handle("settings:get", () => getSettings());
  ipcMain.handle("settings:set-key", async (_e, key: string) => {
    const problem = key.trim() ? await validateApiKey(key) : null;
    if (problem) return { ok: false as const, problem };
    await setApiKey(key);
    return { ok: true as const };
  });
  ipcMain.handle("settings:set-model", (_e, model: ModelChoice) => setModel(model));

  // Research
  ipcMain.handle("research:start", (_e, idea: string) => {
    const trimmed = typeof idea === "string" ? idea.trim() : "";
    if (!trimmed) return;
    if (trimmed.length > 2000) {
      sendEvent({ type: "error", message: "Idea is too long (max 2000 characters)." });
      return;
    }
    // Fire and forget — progress flows back via research:event pushes.
    void startResearch(trimmed, sendEvent);
  });
  ipcMain.handle("research:stop", () => stopResearch());
  ipcMain.handle("research:running", () => isResearchRunning());

  // Report library
  ipcMain.handle("reports:list", () => listReports());
  ipcMain.handle("reports:get", (_e, id: string) => getReport(id));
  ipcMain.handle("reports:delete", (_e, id: string) => deleteReport(id));
  ipcMain.handle(
    "reports:export",
    async (_e, id: string, format: "md" | "html" | "pdf") => {
      const report = await getReport(id);
      if (!report) return { ok: false as const, problem: "Report not found." };
      try {
        const savedTo = await exportReport(mainWindow, report, format);
        return savedTo
          ? { ok: true as const, path: savedTo }
          : { ok: false as const, cancelled: true };
      } catch (err) {
        return {
          ok: false as const,
          problem: err instanceof Error ? err.message : "Export failed.",
        };
      }
    },
  );

  // Misc
  ipcMain.handle("open-external", (_e, url: string) => {
    if (url.startsWith("https://")) shell.openExternal(url);
  });
}

app.whenReady().then(() => {
  registerIpc();
  createWindow();

  app.on("activate", () => {
    // macOS: re-create the window when the dock icon is clicked.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  stopResearch();
  if (process.platform !== "darwin") app.quit();
});

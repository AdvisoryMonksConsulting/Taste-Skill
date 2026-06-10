import { BrowserWindow, dialog } from "electron";
import { promises as fs } from "fs";
import { marked } from "marked";
import { AGENTS } from "../shared/agents";
import type { Report } from "../shared/types";

function reportToMarkdown(report: Report): string {
  const date = new Date(report.createdAt).toLocaleString();
  const parts = [
    `# Founder Research Report`,
    ``,
    `**Idea:** ${report.idea}`,
    ``,
    `**Generated:** ${date}${report.complete ? "" : " _(partial run)_"}`,
    ``,
    `---`,
  ];
  for (const agent of AGENTS) {
    const body = report.sections[agent.id];
    if (!body) continue;
    parts.push(``, `## ${agent.title}`, ``, body.trim());
  }
  parts.push(
    ``,
    `---`,
    ``,
    `_Researched automatically by AI agents with live web search. Verify specific prices, funding figures, and claims before relying on them._`,
    ``,
  );
  return parts.join("\n");
}

async function reportToHtml(report: Report): Promise<string> {
  const body = await marked.parse(reportToMarkdown(report));
  // Self-contained file: inline styles, no external assets, prints cleanly.
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Founder Research — ${escapeHtml(report.idea.slice(0, 80))}</title>
<style>
  body { font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
         color: #1a1a1a; max-width: 760px; margin: 0 auto; padding: 48px 28px; line-height: 1.6; }
  h1 { font-size: 1.7em; border-bottom: 2px solid #1a1a1a; padding-bottom: .3em; }
  h2 { font-size: 1.25em; margin-top: 2em; border-bottom: 1px solid #ddd; padding-bottom: .25em; }
  h3 { font-size: 1.05em; margin-top: 1.5em; }
  a { color: #1d4ed8; }
  table { border-collapse: collapse; width: 100%; font-size: .92em; margin: 1em 0; }
  th, td { border: 1px solid #ddd; padding: 7px 10px; text-align: left; vertical-align: top; }
  th { background: #f5f5f5; }
  code { background: #f5f5f5; padding: 2px 5px; border-radius: 4px; font-size: .9em; }
  blockquote { border-left: 3px solid #ddd; margin-left: 0; padding-left: 14px; color: #555; }
  hr { border: none; border-top: 1px solid #ddd; margin: 2em 0; }
  @media print { body { padding: 0; } a { color: inherit; } }
</style>
</head>
<body>${body}</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function defaultFilename(report: Report, ext: string): string {
  const slug = report.idea
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return `research-${slug || "report"}.${ext}`;
}

/**
 * Export a report. Shows a native Save dialog; returns the saved path, or
 * null if the user cancelled.
 */
export async function exportReport(
  parent: BrowserWindow | null,
  report: Report,
  format: "md" | "html" | "pdf",
): Promise<string | null> {
  const filters = {
    md: [{ name: "Markdown", extensions: ["md"] }],
    html: [{ name: "Web page", extensions: ["html"] }],
    pdf: [{ name: "PDF document", extensions: ["pdf"] }],
  }[format];

  const opts = { defaultPath: defaultFilename(report, format), filters };
  const { canceled, filePath } = parent
    ? await dialog.showSaveDialog(parent, opts)
    : await dialog.showSaveDialog(opts);
  if (canceled || !filePath) return null;

  if (format === "md") {
    await fs.writeFile(filePath, reportToMarkdown(report), "utf8");
  } else if (format === "html") {
    await fs.writeFile(filePath, await reportToHtml(report), "utf8");
  } else {
    // PDF: render the self-contained HTML in a hidden window and print it.
    const html = await reportToHtml(report);
    const win = new BrowserWindow({
      show: false,
      webPreferences: { sandbox: true },
    });
    try {
      await win.loadURL(
        "data:text/html;charset=utf-8," + encodeURIComponent(html),
      );
      const pdf = await win.webContents.printToPDF({
        printBackground: true,
        pageSize: "A4",
        margins: { top: 0.6, bottom: 0.6, left: 0.6, right: 0.6 },
      });
      await fs.writeFile(filePath, pdf);
    } finally {
      win.destroy();
    }
  }
  return filePath;
}

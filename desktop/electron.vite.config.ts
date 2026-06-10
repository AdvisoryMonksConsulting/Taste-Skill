import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "electron-vite";

// Note: main/preload deliberately bundle their dependencies (no
// externalizeDepsPlugin) so the packaged app ships without node_modules.
export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    plugins: [react(), tailwindcss()],
  },
});

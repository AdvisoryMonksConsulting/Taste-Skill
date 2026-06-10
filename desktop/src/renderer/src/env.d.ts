/// <reference types="vite/client" />

import type { FounderApi } from "../../preload/index";

declare global {
  interface Window {
    /** Typed IPC bridge exposed by the preload script. */
    founder: FounderApi;
  }
}

export {};

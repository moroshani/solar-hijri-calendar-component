import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoRoot = new URL("../..", import.meta.url).pathname;

export default defineConfig({
  root: new URL(".", import.meta.url).pathname,
  base: process.env.PLAYGROUND_BASE ?? "/",
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "solar-hijri-calendar-component/styles.css",
        replacement: new URL("../../src/styles.css", import.meta.url).pathname,
      },
      {
        find: "solar-hijri-calendar-component/core",
        replacement: new URL("../../src/core.ts", import.meta.url).pathname,
      },
      {
        find: "solar-hijri-calendar-component/react",
        replacement: new URL("../../src/react.ts", import.meta.url).pathname,
      },
      {
        find: "solar-hijri-calendar-component",
        replacement: new URL("../../src/index.ts", import.meta.url).pathname,
      },
    ],
  },
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
  build: {
    outDir: "../../dist-playground/react",
    emptyOutDir: true,
  },
});

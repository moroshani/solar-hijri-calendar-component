import { defineConfig } from "@playwright/test";
import fs from "node:fs";

const port = Number(process.env.PLAYGROUND_PORT ?? 5173);
const baseURL = `http://127.0.0.1:${port}`;
const isCI = Boolean(process.env.CI);
const lifecycleEvent = process.env.npm_lifecycle_event;
const outputFolderName =
  process.env.SHC_PLAYWRIGHT_OUTPUT_NAME ??
  (lifecycleEvent === "screenshots" ? "playwright-screenshots" : lifecycleEvent === "test:e2e" ? "playwright-e2e" : "playwright");
const browserExecutablePath =
  process.env.SHC_CHROMIUM_EXECUTABLE ??
  [
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
  ].find((candidate) => fs.existsSync(candidate));

const viewportProjects = [
  { name: "chromium-320", viewport: { width: 320, height: 720 } },
  { name: "chromium-390", viewport: { width: 390, height: 844 } },
  { name: "chromium-768", viewport: { width: 768, height: 1024 } },
  { name: "chromium-1024", viewport: { width: 1024, height: 768 } },
  { name: "chromium-1440", viewport: { width: 1440, height: 900 } },
];

export default defineConfig({
  testDir: ".",
  outputDir: `../../test-results/${outputFolderName}`,
  reporter: [["list"], ["html", { outputFolder: `../../playwright-report/${outputFolderName}`, open: "never" }]],
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  use: {
    baseURL,
    browserName: "chromium",
    colorScheme: "light",
    deviceScaleFactor: 1,
    locale: "fa-IR",
    launchOptions: browserExecutablePath ? { executablePath: browserExecutablePath } : undefined,
    timezoneId: "Asia/Tehran",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: `npm run dev:react -- --port ${port}`,
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
  projects: viewportProjects.map(({ name, viewport }) => ({
    name,
    use: {
      viewport,
      hasTouch: viewport.width < 768,
      isMobile: viewport.width < 768,
    },
  })),
});

import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const screenshotDir = path.resolve(process.env.SHC_SCREENSHOT_DIR ?? "artifacts/screenshots/latest");

test("react playground supports date selection", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("selected-date")).toHaveText("1403-01-15");

  await page.getByLabel("Solar Hijri calendar").getByRole("gridcell", { name: "1403-01-16 (2024-04-04)" }).click();
  await expect(page.getByTestId("selected-date")).toHaveText("1403-01-16");
});

test("react playground supports range selection", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("selected-range")).toHaveText("1403-01-11 - 1403-01-16");

  const rangeCalendar = page.getByLabel("Solar Hijri range calendar");
  await rangeCalendar.getByRole("gridcell", { name: "1403-01-18 (2024-04-06)" }).click();
  await expect(page.getByTestId("selected-range")).toHaveText("1403-01-18 - open");

  await rangeCalendar.getByRole("gridcell", { name: "1403-01-23 (2024-04-11)" }).click();
  await expect(page.getByTestId("selected-range")).toHaveText("1403-01-18 - 1403-01-23");
  await expect(page.getByTestId("range-length")).toHaveText("6");
});

test("react playground captures responsive screenshots @visual", async ({ page }, testInfo) => {
  fs.mkdirSync(screenshotDir, { recursive: true });

  await page.goto("/");
  await page.getByTestId("calendar-preview").waitFor();
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        scroll-behavior: auto !important;
      }
    `,
  });

  const prefix = testInfo.project.name.replace(/[^a-z0-9-]/gi, "-").toLowerCase();

  await page.getByTestId("calendar-preview").screenshot({
    path: path.join(screenshotDir, `${prefix}-calendar-preview.png`),
    animations: "disabled",
    caret: "hide",
  });
  await page.screenshot({
    path: path.join(screenshotDir, `${prefix}-full-page.png`),
    animations: "disabled",
    caret: "hide",
    fullPage: true,
  });
});

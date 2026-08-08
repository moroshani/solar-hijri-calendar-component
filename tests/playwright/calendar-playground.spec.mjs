import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const screenshotDir = path.resolve(process.env.SHC_SCREENSHOT_DIR ?? "artifacts/screenshots/latest");

const selectableCurrentMonthDays = (calendar) =>
  calendar.locator(
    '.shc-calendar__day:not(.shc-calendar__day--muted):not(:disabled):not([aria-selected="true"])',
  );

const dateKeyFrom = async (day) => {
  const label = await day.getAttribute("aria-label");
  const key = label?.match(/^\d{4}-\d{2}-\d{2}/)?.[0];

  expect(key).toBeTruthy();
  return key;
};

test("react playground supports date selection", async ({ page }) => {
  await page.goto("/");

  const calendar = page.getByLabel("Solar Hijri calendar");
  const initialValue = await page.getByTestId("selected-date").textContent();
  const nextDay = selectableCurrentMonthDays(calendar).first();
  const nextKey = await dateKeyFrom(nextDay);

  await expect(calendar.locator(".shc-calendar__day:disabled").first()).toBeVisible();
  await nextDay.click();
  await expect(page.getByTestId("selected-date")).toHaveText(nextKey);
  expect(nextKey).not.toBe(initialValue);
});

test("react playground supports range selection", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Range", exact: true }).click();
  await page.getByRole("checkbox", { name: /Disable Fridays/ }).uncheck();

  const rangeCalendar = page.getByLabel("Solar Hijri range calendar");
  const availableDays = selectableCurrentMonthDays(rangeCalendar);
  const startDay = availableDays.nth(1);
  const endDay = availableDays.nth(2);
  const startKey = await dateKeyFrom(startDay);
  const endKey = await dateKeyFrom(endDay);

  await startDay.click();
  await expect(page.getByTestId("selected-range")).toHaveText(`${startKey} - open`);

  await rangeCalendar.getByRole("gridcell", { name: new RegExp(`^${endKey} `) }).click();
  await expect(page.getByTestId("selected-range")).toHaveText(`${startKey} - ${endKey}`);
  await expect(page.getByTestId("range-length")).toHaveText("2");
});

test("react playground supports multiple selection", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Multiple", exact: true }).click();
  await expect(page.getByTestId("multiple-count")).toHaveText("3");

  const multipleCalendar = page.getByLabel("Solar Hijri multiple calendar");
  const extraDay = selectableCurrentMonthDays(multipleCalendar).first();
  const extraKey = await dateKeyFrom(extraDay);

  await extraDay.click();
  await expect(page.getByTestId("multiple-count")).toHaveText("4");
  await expect(page.getByTestId("selected-multiple")).toContainText(extraKey);

  await multipleCalendar.getByRole("gridcell", { name: new RegExp(`^${extraKey} `) }).click();
  await expect(page.getByTestId("multiple-count")).toHaveText("3");
  await expect(page.getByTestId("selected-multiple")).not.toContainText(extraKey);
});

test("react playground keeps controls and generated code in sync", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "English", exact: true }).click();
  await page.getByRole("button", { name: "Sunday", exact: true }).click();
  await page.getByRole("button", { name: "Range", exact: true }).click();

  const calendar = page.getByLabel("Solar Hijri range calendar");
  await expect(calendar).toHaveAttribute("dir", "ltr");
  await expect(page.getByTestId("generated-code")).toContainText('locale="en"');
  await expect(page.getByTestId("generated-code")).toContainText('weekStartsOn="sunday"');
  await expect(page.getByTestId("generated-code")).toContainText("excludeDisabled");
});

test("react playground supports direct month and year navigation", async ({ page }) => {
  await page.goto("/");

  const monthPicker = page.getByTestId("month-picker");
  const yearPicker = page.getByTestId("year-picker");
  const initialMonth = Number(await monthPicker.inputValue());
  const initialYear = Number(await yearPicker.inputValue());
  const nextMonth = initialMonth === 12 ? 1 : initialMonth + 1;
  const nextYear = initialYear + 1;

  await monthPicker.selectOption(String(nextMonth));
  await yearPicker.selectOption(String(nextYear));

  await expect(page.getByTestId("visible-month")).toHaveText(
    `${nextYear}-${String(nextMonth).padStart(2, "0")}`,
  );
  await expect(page.getByTestId("generated-code")).toContainText("month={month}");
  await expect(page.getByTestId("generated-code")).toContainText("onMonthChange={setMonth}");
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

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(hasHorizontalOverflow).toBe(false);

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

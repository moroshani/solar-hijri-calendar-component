import { describe, expect, it } from "vitest";
import { addMonths, buildCalendarDays, dateKey, getMonthLength, toIsoDate } from "./calendarMath";

describe("calendar math", () => {
  it("formats stable date keys", () => {
    expect(dateKey({ year: 1403, month: 1, day: 2 })).toBe("1403-01-02");
  });

  it("converts Nowruz 1403 to Gregorian ISO date", () => {
    expect(toIsoDate({ year: 1403, month: 1, day: 1 })).toBe("2024-03-20");
  });

  it("handles month navigation across years", () => {
    expect(addMonths({ year: 1403, month: 12 }, 1)).toEqual({ year: 1404, month: 1 });
    expect(addMonths({ year: 1404, month: 1 }, -1)).toEqual({ year: 1403, month: 12 });
  });

  it("uses correct Esfand length for leap and non-leap years", () => {
    expect(getMonthLength({ year: 1403, month: 12 })).toBe(30);
    expect(getMonthLength({ year: 1404, month: 12 })).toBe(29);
  });

  it("builds a complete six-week grid", () => {
    const days = buildCalendarDays({ year: 1403, month: 1 }, null, undefined, "saturday");
    expect(days).toHaveLength(42);
    expect(days.some((day) => day.key === "1403-01-01")).toBe(true);
  });
});

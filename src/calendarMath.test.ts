import { describe, expect, it } from "vitest";
import {
  addDays,
  addMonths,
  buildCalendarDays,
  compareDates,
  dateKey,
  differenceInCalendarDays,
  fromGregorianDate,
  getMonthLength,
  isAfterDate,
  isBeforeDate,
  isSameDate,
  toGregorianDate,
  toIsoDate,
} from "./calendarMath";
import { MAX_SOLAR_HIJRI_YEAR, MIN_SOLAR_HIJRI_YEAR } from "./validation";

describe("calendar math", () => {
  it("formats stable date keys", () => {
    expect(dateKey({ year: 1403, month: 1, day: 2 })).toBe("1403-01-02");
  });

  it("converts Nowruz 1403 to Gregorian ISO date", () => {
    expect(toIsoDate({ year: 1403, month: 1, day: 1 })).toBe("2024-03-20");
  });

  it("round-trips Gregorian dates through UTC date objects", () => {
    const jalali = { year: 1403, month: 7, day: 10 };
    expect(fromGregorianDate(toGregorianDate(jalali))).toEqual(jalali);
  });

  it("round-trips the supported year boundaries and rejects arithmetic beyond them", () => {
    const firstSupportedDate = { year: MIN_SOLAR_HIJRI_YEAR, month: 1, day: 1 };
    const lastSupportedDate = { year: MAX_SOLAR_HIJRI_YEAR, month: 12, day: 29 };

    expect(fromGregorianDate(toGregorianDate(firstSupportedDate))).toEqual(firstSupportedDate);
    expect(fromGregorianDate(toGregorianDate(lastSupportedDate))).toEqual(lastSupportedDate);
    expect(() => addDays(firstSupportedDate, -1)).toThrow(RangeError);
    expect(() => addDays(lastSupportedDate, 1)).toThrow(RangeError);
  });

  it("handles month navigation across years", () => {
    expect(addMonths({ year: 1403, month: 12 }, 1)).toEqual({ year: 1404, month: 1 });
    expect(addMonths({ year: 1404, month: 1 }, -1)).toEqual({ year: 1403, month: 12 });
    expect(addMonths({ year: 0, month: 1 }, -1)).toEqual({ year: -1, month: 12 });
  });

  it("handles day arithmetic across Jalali month boundaries", () => {
    expect(addDays({ year: 1403, month: 1, day: 31 }, 1)).toEqual({ year: 1403, month: 2, day: 1 });
    expect(addDays({ year: 1403, month: 1, day: 1 }, -1)).toEqual({ year: 1402, month: 12, day: 29 });
  });

  it("compares and measures calendar days", () => {
    expect(compareDates({ year: 1403, month: 1, day: 2 }, { year: 1403, month: 1, day: 1 })).toBeGreaterThan(0);
    expect(differenceInCalendarDays({ year: 1403, month: 1, day: 4 }, { year: 1403, month: 1, day: 1 })).toBe(3);
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

  it("rejects invalid dates across formatting, conversion, comparison, and arithmetic", () => {
    const invalidDate = { year: 1404, month: 12, day: 30 };
    const validDate = { year: 1403, month: 1, day: 1 };

    expect(() => dateKey(invalidDate)).toThrow(RangeError);
    expect(() => toGregorianDate(invalidDate)).toThrow(RangeError);
    expect(() => toIsoDate(invalidDate)).toThrow(RangeError);
    expect(() => compareDates(invalidDate, validDate)).toThrow(RangeError);
    expect(() => isBeforeDate(validDate, invalidDate)).toThrow(RangeError);
    expect(() => isAfterDate(invalidDate, validDate)).toThrow(RangeError);
    expect(() => isSameDate(invalidDate, null)).toThrow(RangeError);
    expect(() => addDays(invalidDate, 1)).toThrow(RangeError);
    expect(() => differenceInCalendarDays(validDate, invalidDate)).toThrow(RangeError);
  });

  it("rejects malformed movement, months, grids, and Gregorian dates", () => {
    expect(() => addDays({ year: 1403, month: 1, day: 1 }, 1.5)).toThrow(RangeError);
    expect(() => addMonths({ year: 1403, month: 1 }, Number.NaN)).toThrow(RangeError);
    expect(() => addMonths({ year: -61, month: 1 }, -1)).toThrow(RangeError);
    expect(() => getMonthLength({ year: 1403, month: 13 })).toThrow(RangeError);
    expect(() => buildCalendarDays({ year: 1403, month: 0 }, null, undefined, "saturday")).toThrow(RangeError);
    expect(() =>
      buildCalendarDays({ year: 1403, month: 1 }, { year: 1404, month: 12, day: 30 }, undefined, "saturday"),
    ).toThrow(RangeError);
    expect(() => buildCalendarDays({ year: 1403, month: 1 }, null, undefined, "monday" as never)).toThrow(
      RangeError,
    );
    expect(() => fromGregorianDate(new Date(Number.NaN))).toThrow(RangeError);
    expect(() => fromGregorianDate(new Date(Date.UTC(500, 0, 1)))).toThrow(RangeError);
  });

  it("keeps nullable equality behavior for absent dates", () => {
    expect(isSameDate(null, undefined)).toBe(false);
    expect(isSameDate({ year: 1403, month: 1, day: 1 }, null)).toBe(false);
  });
});

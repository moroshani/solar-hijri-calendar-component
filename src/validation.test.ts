import { describe, expect, it } from "vitest";
import {
  assertValidSolarHijriDate,
  assertValidSolarHijriMonth,
  assertValidSolarHijriRange,
  isValidSolarHijriDate,
  isValidSolarHijriMonth,
  isValidSolarHijriRange,
  MAX_SOLAR_HIJRI_YEAR,
  MIN_SOLAR_HIJRI_YEAR,
} from "./validation";

describe("Solar Hijri validation", () => {
  it("accepts real dates, leap days, and supported year boundaries", () => {
    expect(isValidSolarHijriDate({ year: 1403, month: 12, day: 30 })).toBe(true);
    expect(isValidSolarHijriDate({ year: MIN_SOLAR_HIJRI_YEAR, month: 1, day: 1 })).toBe(true);
    expect(isValidSolarHijriDate({ year: MAX_SOLAR_HIJRI_YEAR, month: 1, day: 1 })).toBe(true);
    expect(isValidSolarHijriMonth({ year: 1403, month: 12 })).toBe(true);
    expect(isValidSolarHijriRange({ from: null, to: { year: 1403, month: 1, day: 1 } })).toBe(true);
  });

  it.each([
    null,
    {},
    { year: 1403, month: 1 },
    { year: 1403, month: 0, day: 1 },
    { year: 1403, month: 13, day: 1 },
    { year: 1403, month: 1, day: 0 },
    { year: 1403, month: 1, day: 32 },
    { year: 1404, month: 12, day: 30 },
    { year: 1403.5, month: 1, day: 1 },
    { year: 1403, month: 1.5, day: 1 },
    { year: 1403, month: 1, day: Number.NaN },
    { year: MIN_SOLAR_HIJRI_YEAR - 1, month: 1, day: 1 },
    { year: MAX_SOLAR_HIJRI_YEAR + 1, month: 1, day: 1 },
  ])("rejects invalid date value %#", (value) => {
    expect(isValidSolarHijriDate(value)).toBe(false);
  });

  it("rejects malformed months and ranges", () => {
    expect(isValidSolarHijriMonth({ year: 1403, month: Number.POSITIVE_INFINITY })).toBe(false);
    expect(isValidSolarHijriRange({ from: null })).toBe(false);
    expect(isValidSolarHijriRange({ from: null, to: undefined })).toBe(false);
    expect(isValidSolarHijriRange({ from: { year: 1404, month: 12, day: 30 }, to: null })).toBe(false);
  });

  it("provides assertion APIs with one RangeError contract", () => {
    expect(() => assertValidSolarHijriDate({ year: 1404, month: 12, day: 30 })).toThrow(RangeError);
    expect(() => assertValidSolarHijriMonth({ year: 1403, month: 13 })).toThrow(RangeError);
    expect(() => assertValidSolarHijriRange({ from: null })).toThrow(RangeError);
  });
});

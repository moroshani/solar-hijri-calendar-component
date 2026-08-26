import jalaali from "jalaali-js";
import type { SolarHijriDate, SolarHijriMonth, SolarHijriRange } from "./types.js";

export const MIN_SOLAR_HIJRI_YEAR = -61;
export const MAX_SOLAR_HIJRI_YEAR = 3176;

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const hasOwn = (value: Record<string, unknown>, key: string) => {
  return Object.prototype.hasOwnProperty.call(value, key);
};

const isSupportedYear = (value: unknown): value is number => {
  return (
    Number.isSafeInteger(value) &&
    (value as number) >= MIN_SOLAR_HIJRI_YEAR &&
    (value as number) <= MAX_SOLAR_HIJRI_YEAR
  );
};

export function isValidSolarHijriMonth(value: unknown): value is SolarHijriMonth {
  if (!isRecord(value)) return false;
  const { year, month } = value;
  return isSupportedYear(year) && Number.isSafeInteger(month) && (month as number) >= 1 && (month as number) <= 12;
}

export function isValidSolarHijriDate(value: unknown): value is SolarHijriDate {
  if (!isRecord(value)) return false;
  const { year, month, day } = value;
  if (!isSupportedYear(year) || !Number.isSafeInteger(month) || !Number.isSafeInteger(day)) {
    return false;
  }

  const numericMonth = month as number;
  const numericDay = day as number;
  if (numericMonth < 1 || numericMonth > 12 || numericDay < 1) return false;
  return numericDay <= jalaali.jalaaliMonthLength(year, numericMonth);
}

export function isValidSolarHijriRange(value: unknown): value is SolarHijriRange {
  if (!isRecord(value) || !hasOwn(value, "from") || !hasOwn(value, "to")) return false;
  const fromIsValid = value.from === null || isValidSolarHijriDate(value.from);
  const toIsValid = value.to === null || isValidSolarHijriDate(value.to);
  return fromIsValid && toIsValid;
}

export function assertValidSolarHijriMonth(value: unknown, label = "month"): asserts value is SolarHijriMonth {
  if (isValidSolarHijriMonth(value)) return;
  throw new RangeError(
    `${label} must contain an integer year from ${MIN_SOLAR_HIJRI_YEAR} through ${MAX_SOLAR_HIJRI_YEAR} and a month from 1 through 12`,
  );
}

export function assertValidSolarHijriDate(value: unknown, label = "date"): asserts value is SolarHijriDate {
  if (isValidSolarHijriDate(value)) return;
  throw new RangeError(
    `${label} must be a real Solar Hijri date with integer fields and a year from ${MIN_SOLAR_HIJRI_YEAR} through ${MAX_SOLAR_HIJRI_YEAR}`,
  );
}

export function assertValidSolarHijriRange(value: unknown, label = "range"): asserts value is SolarHijriRange {
  if (isValidSolarHijriRange(value)) return;
  throw new RangeError(`${label} must contain valid "from" and "to" Solar Hijri dates or null boundaries`);
}

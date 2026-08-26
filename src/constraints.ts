import { compareDates, isAfterDate, isBeforeDate } from "./calendarMath.js";
import type { SolarHijriDate } from "./types.js";
import { assertValidSolarHijriDate } from "./validation.js";

export type DateBounds = {
  minDate?: SolarHijriDate;
  maxDate?: SolarHijriDate;
};

export type DateConstraintOptions = DateBounds & {
  isDateDisabled?: (date: SolarHijriDate) => boolean;
};

const assertValidBounds = (bounds: DateBounds) => {
  if (bounds.minDate) assertValidSolarHijriDate(bounds.minDate, "minDate");
  if (bounds.maxDate) assertValidSolarHijriDate(bounds.maxDate, "maxDate");
  if (bounds.minDate && bounds.maxDate && compareDates(bounds.minDate, bounds.maxDate) > 0) {
    throw new RangeError("minDate must not be after maxDate");
  }
};

export const isDateOutsideBounds = (date: SolarHijriDate, bounds: DateBounds = {}) => {
  assertValidSolarHijriDate(date);
  assertValidBounds(bounds);
  if (bounds.minDate && isBeforeDate(date, bounds.minDate)) return true;
  if (bounds.maxDate && isAfterDate(date, bounds.maxDate)) return true;
  return false;
};

export const isDateUnavailable = (date: SolarHijriDate, options: DateConstraintOptions = {}) => {
  return isDateOutsideBounds(date, options) || Boolean(options.isDateDisabled?.(date));
};

export const createDateDisabledMatcher = (options: DateConstraintOptions = {}) => {
  assertValidBounds(options);
  if (!options.minDate && !options.maxDate && !options.isDateDisabled) return undefined;
  return (date: SolarHijriDate) => isDateUnavailable(date, options);
};

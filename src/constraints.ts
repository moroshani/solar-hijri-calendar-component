import { isAfterDate, isBeforeDate } from "./calendarMath";
import type { SolarHijriDate } from "./types";

export type DateBounds = {
  minDate?: SolarHijriDate;
  maxDate?: SolarHijriDate;
};

export type DateConstraintOptions = DateBounds & {
  isDateDisabled?: (date: SolarHijriDate) => boolean;
};

export const isDateOutsideBounds = (date: SolarHijriDate, bounds: DateBounds = {}) => {
  if (bounds.minDate && isBeforeDate(date, bounds.minDate)) return true;
  if (bounds.maxDate && isAfterDate(date, bounds.maxDate)) return true;
  return false;
};

export const isDateUnavailable = (date: SolarHijriDate, options: DateConstraintOptions = {}) => {
  return isDateOutsideBounds(date, options) || Boolean(options.isDateDisabled?.(date));
};

export const createDateDisabledMatcher = (options: DateConstraintOptions = {}) => {
  if (!options.minDate && !options.maxDate && !options.isDateDisabled) return undefined;
  return (date: SolarHijriDate) => isDateUnavailable(date, options);
};

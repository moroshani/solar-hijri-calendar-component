import {
  addDays,
  compareDates,
  differenceInCalendarDays,
  isAfterDate,
  isBeforeDate,
  isSameDate,
} from "./calendarMath";
import type { SolarHijriDate, SolarHijriRange } from "./types";

export type DateMatcher = SolarHijriDate | SolarHijriDate[] | SolarHijriRange | ((date: SolarHijriDate) => boolean);

export type RangeSelectionOptions = {
  allowSameDay?: boolean;
  disabled?: DateMatcher | DateMatcher[];
  excludeDisabled?: boolean;
  minDays?: number;
  maxDays?: number;
};

export type RangeBoundary = "start" | "end" | "inside" | "outside";

export const emptyRange = (): SolarHijriRange => ({ from: null, to: null });

const isRangeMatcher = (matcher: SolarHijriDate | SolarHijriDate[] | SolarHijriRange): matcher is SolarHijriRange => {
  return !Array.isArray(matcher) && ("from" in matcher || "to" in matcher);
};

export const isCompleteRange = (range: SolarHijriRange | null | undefined) => Boolean(range?.from && range.to);

export const orderRange = (range: SolarHijriRange): SolarHijriRange => {
  if (!range.from || !range.to) return range;
  return compareDates(range.from, range.to) <= 0 ? range : { from: range.to, to: range.from };
};

export const isDateInRange = (
  date: SolarHijriDate,
  range: SolarHijriRange | null | undefined,
  options: { excludeEnds?: boolean } = {},
) => {
  if (!range?.from || !range.to) return false;
  const ordered = orderRange(range);
  if (!ordered.from || !ordered.to) return false;

  if (options.excludeEnds && (isSameDate(date, ordered.from) || isSameDate(date, ordered.to))) return false;
  return compareDates(date, ordered.from) >= 0 && compareDates(date, ordered.to) <= 0;
};

export const getRangeBoundary = (date: SolarHijriDate, range: SolarHijriRange | null | undefined): RangeBoundary => {
  if (!range?.from || !range.to) return "outside";
  const ordered = orderRange(range);
  if (!ordered.from || !ordered.to) return "outside";
  if (isSameDate(date, ordered.from)) return "start";
  if (isSameDate(date, ordered.to)) return "end";
  return isDateInRange(date, ordered) ? "inside" : "outside";
};

export const getRangeLength = (range: SolarHijriRange | null | undefined) => {
  if (!range?.from || !range.to) return 0;
  const ordered = orderRange(range);
  if (!ordered.from || !ordered.to) return 0;
  return Math.abs(differenceInCalendarDays(ordered.to, ordered.from)) + 1;
};

export const isDateMatched = (date: SolarHijriDate, matcher: DateMatcher): boolean => {
  if (typeof matcher === "function") return matcher(date);
  if (Array.isArray(matcher)) return matcher.some((item) => isSameDate(date, item));
  if (isRangeMatcher(matcher)) return isDateInRange(date, matcher);
  return isSameDate(date, matcher);
};

export const isDateDisabledByMatchers = (date: SolarHijriDate, matchers: DateMatcher | DateMatcher[] | undefined) => {
  if (!matchers) return false;
  const matcherList = Array.isArray(matchers) ? matchers : [matchers];
  return matcherList.some((matcher) => isDateMatched(date, matcher));
};

export const rangeContainsDisabledDate = (
  range: SolarHijriRange,
  matchers: DateMatcher | DateMatcher[] | undefined,
) => {
  const ordered = orderRange(range);
  if (!ordered.from || !ordered.to || !matchers) return false;

  let cursor = ordered.from;
  while (compareDates(cursor, ordered.to) <= 0) {
    if (isDateDisabledByMatchers(cursor, matchers)) return true;
    cursor = addDays(cursor, 1);
  }

  return false;
};

export const selectRangeDate = (
  currentRange: SolarHijriRange | null | undefined,
  date: SolarHijriDate,
  options: RangeSelectionOptions = {},
): SolarHijriRange => {
  const allowSameDay = options.allowSameDay ?? true;
  const range = currentRange ?? emptyRange();

  if (isDateDisabledByMatchers(date, options.disabled)) return range;
  if (!range.from || range.to) return { from: date, to: null };
  if (isSameDate(date, range.from) && !allowSameDay) return { from: date, to: null };
  if (isBeforeDate(date, range.from)) return { from: date, to: null };

  const nextRange = orderRange({ from: range.from, to: date });
  const length = getRangeLength(nextRange);

  if (options.minDays && length < options.minDays) return { from: range.from, to: null };
  if (options.maxDays && length > options.maxDays) return { from: date, to: null };
  if (options.excludeDisabled && rangeContainsDisabledDate(nextRange, options.disabled)) return { from: date, to: null };

  return nextRange;
};

export const createRangePreview = (
  range: SolarHijriRange | null | undefined,
  hoveredDate: SolarHijriDate | null | undefined,
): SolarHijriRange | null => {
  if (!range?.from || range.to || !hoveredDate || isAfterDate(range.from, hoveredDate)) return null;
  return orderRange({ from: range.from, to: hoveredDate });
};

import jalaali from "jalaali-js";
import type { CalendarDay, SolarHijriDate, SolarHijriMonth, WeekStart } from "./types.js";
import { assertValidSolarHijriDate, assertValidSolarHijriMonth } from "./validation.js";

const pad = (value: number) => String(value).padStart(2, "0");

const assertSafeInteger = (value: number, label: string) => {
  if (!Number.isSafeInteger(value)) throw new RangeError(`${label} must be a safe integer`);
};

const assertWeekStart = (weekStartsOn: WeekStart) => {
  if (weekStartsOn !== "saturday" && weekStartsOn !== "sunday") {
    throw new RangeError('weekStartsOn must be "saturday" or "sunday"');
  }
};

export const dateKey = (date: SolarHijriDate) => {
  assertValidSolarHijriDate(date);
  return `${date.year}-${pad(date.month)}-${pad(date.day)}`;
};

export const isSameDate = (left: SolarHijriDate | null | undefined, right: SolarHijriDate | null | undefined) => {
  if (left !== null && left !== undefined) assertValidSolarHijriDate(left, "left");
  if (right !== null && right !== undefined) assertValidSolarHijriDate(right, "right");
  return Boolean(left && right && left.year === right.year && left.month === right.month && left.day === right.day);
};

export const getToday = (): SolarHijriDate => {
  const now = new Date();
  const today = jalaali.toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const result = { year: today.jy, month: today.jm, day: today.jd };
  assertValidSolarHijriDate(result, "today");
  return result;
};

export const toGregorianDate = (date: SolarHijriDate) => {
  assertValidSolarHijriDate(date);
  const gregorian = jalaali.toGregorian(date.year, date.month, date.day);
  return new Date(Date.UTC(gregorian.gy, gregorian.gm - 1, gregorian.gd));
};

export const fromGregorianDate = (date: Date): SolarHijriDate => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new RangeError("date must be a valid JavaScript Date");
  }

  try {
    const jalali = jalaali.toJalaali(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
    const result = { year: jalali.jy, month: jalali.jm, day: jalali.jd };
    assertValidSolarHijriDate(result, "converted date");
    return result;
  } catch {
    throw new RangeError("date must convert into the supported Solar Hijri year range");
  }
};

export const toIsoDate = (date: SolarHijriDate) => {
  assertValidSolarHijriDate(date);
  const gregorian = jalaali.toGregorian(date.year, date.month, date.day);
  return `${gregorian.gy}-${pad(gregorian.gm)}-${pad(gregorian.gd)}`;
};

export const compareDates = (left: SolarHijriDate, right: SolarHijriDate) => {
  assertValidSolarHijriDate(left, "left");
  assertValidSolarHijriDate(right, "right");
  if (left.year !== right.year) return left.year - right.year;
  if (left.month !== right.month) return left.month - right.month;
  return left.day - right.day;
};

export const earlierDate = (left: SolarHijriDate, right: SolarHijriDate) => {
  return compareDates(left, right) <= 0 ? left : right;
};

export const laterDate = (left: SolarHijriDate, right: SolarHijriDate) => {
  return compareDates(left, right) >= 0 ? left : right;
};

export const isBeforeDate = (left: SolarHijriDate, right: SolarHijriDate) => compareDates(left, right) < 0;

export const isAfterDate = (left: SolarHijriDate, right: SolarHijriDate) => compareDates(left, right) > 0;

export const addDays = (date: SolarHijriDate, delta: number): SolarHijriDate => {
  assertValidSolarHijriDate(date);
  assertSafeInteger(delta, "delta");
  const gregorian = toGregorianDate(date);
  gregorian.setUTCDate(gregorian.getUTCDate() + delta);
  return fromGregorianDate(gregorian);
};

export const addWeeks = (date: SolarHijriDate, delta: number): SolarHijriDate => {
  assertValidSolarHijriDate(date);
  assertSafeInteger(delta, "delta");
  const dayDelta = delta * 7;
  assertSafeInteger(dayDelta, "resulting day delta");
  return addDays(date, dayDelta);
};

export const differenceInCalendarDays = (left: SolarHijriDate, right: SolarHijriDate) => {
  assertValidSolarHijriDate(left, "left");
  assertValidSolarHijriDate(right, "right");
  const dayMs = 24 * 60 * 60 * 1000;
  return Math.round((toGregorianDate(left).getTime() - toGregorianDate(right).getTime()) / dayMs);
};

export const addMonths = (month: SolarHijriMonth, delta: number): SolarHijriMonth => {
  assertValidSolarHijriMonth(month);
  assertSafeInteger(delta, "delta");
  const zeroBased = month.year * 12 + (month.month - 1) + delta;
  if (!Number.isSafeInteger(zeroBased)) throw new RangeError("resulting month is outside the supported range");
  const result = {
    year: Math.floor(zeroBased / 12),
    month: ((zeroBased % 12) + 12) % 12 + 1,
  };
  assertValidSolarHijriMonth(result, "resulting month");
  return result;
};

export const getMonthLength = (month: SolarHijriMonth) => {
  assertValidSolarHijriMonth(month);
  return jalaali.jalaaliMonthLength(month.year, month.month);
};

export const addYears = (date: SolarHijriDate, delta: number): SolarHijriDate => {
  assertValidSolarHijriDate(date);
  assertSafeInteger(delta, "delta");
  const targetYear = date.year + delta;
  if (!Number.isSafeInteger(targetYear)) throw new RangeError("resulting date is outside the supported range");

  const result = {
    year: targetYear,
    month: date.month,
    day: Math.min(date.day, getMonthLength({ year: targetYear, month: date.month })),
  };
  assertValidSolarHijriDate(result, "resulting date");
  return result;
};

const normalizeWeekday = (date: SolarHijriDate, weekStartsOn: WeekStart) => {
  const weekday = toGregorianDate(date).getUTCDay();
  if (weekStartsOn === "sunday") return weekday;
  return (weekday + 1) % 7;
};

export const buildCalendarDays = (
  visibleMonth: SolarHijriMonth,
  selectedDate: SolarHijriDate | null,
  isDateDisabled: ((date: SolarHijriDate) => boolean) | undefined,
  weekStartsOn: WeekStart,
): CalendarDay[] => {
  assertValidSolarHijriMonth(visibleMonth, "visibleMonth");
  if (selectedDate !== null) assertValidSolarHijriDate(selectedDate, "selectedDate");
  assertWeekStart(weekStartsOn);
  const today = getToday();
  const firstDayOffset = normalizeWeekday({ ...visibleMonth, day: 1 }, weekStartsOn);
  const previousMonth = addMonths(visibleMonth, -1);
  const nextMonth = addMonths(visibleMonth, 1);
  const previousMonthLength = getMonthLength(previousMonth);
  const currentMonthLength = getMonthLength(visibleMonth);
  const days: CalendarDay[] = [];

  for (let index = firstDayOffset - 1; index >= 0; index -= 1) {
    const date = { ...previousMonth, day: previousMonthLength - index };
    days.push(toCalendarDay(date, false, selectedDate, today, isDateDisabled));
  }

  for (let day = 1; day <= currentMonthLength; day += 1) {
    const date = { ...visibleMonth, day };
    days.push(toCalendarDay(date, true, selectedDate, today, isDateDisabled));
  }

  let nextDay = 1;
  while (days.length % 7 !== 0 || days.length < 42) {
    const date = { ...nextMonth, day: nextDay };
    days.push(toCalendarDay(date, false, selectedDate, today, isDateDisabled));
    nextDay += 1;
  }

  return days;
};

const toCalendarDay = (
  date: SolarHijriDate,
  isCurrentMonth: boolean,
  selectedDate: SolarHijriDate | null,
  today: SolarHijriDate,
  isDateDisabled: ((date: SolarHijriDate) => boolean) | undefined,
): CalendarDay => ({
  ...date,
  key: dateKey(date),
  isoDate: toIsoDate(date),
  isCurrentMonth,
  isToday: isSameDate(date, today),
  isSelected: isSameDate(date, selectedDate),
  isDisabled: Boolean(isDateDisabled?.(date)),
});

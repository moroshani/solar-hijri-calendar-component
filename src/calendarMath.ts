import jalaali from "jalaali-js";
import type { CalendarDay, SolarHijriDate, SolarHijriMonth, WeekStart } from "./types";

const pad = (value: number) => String(value).padStart(2, "0");

export const dateKey = (date: SolarHijriDate) => `${date.year}-${pad(date.month)}-${pad(date.day)}`;

export const isSameDate = (left: SolarHijriDate | null | undefined, right: SolarHijriDate | null | undefined) => {
  return Boolean(left && right && left.year === right.year && left.month === right.month && left.day === right.day);
};

export const getToday = (): SolarHijriDate => {
  const now = new Date();
  const today = jalaali.toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
  return { year: today.jy, month: today.jm, day: today.jd };
};

export const toGregorianDate = (date: SolarHijriDate) => {
  const gregorian = jalaali.toGregorian(date.year, date.month, date.day);
  return new Date(Date.UTC(gregorian.gy, gregorian.gm - 1, gregorian.gd));
};

export const toIsoDate = (date: SolarHijriDate) => {
  const gregorian = jalaali.toGregorian(date.year, date.month, date.day);
  return `${gregorian.gy}-${pad(gregorian.gm)}-${pad(gregorian.gd)}`;
};

export const addMonths = (month: SolarHijriMonth, delta: number): SolarHijriMonth => {
  const zeroBased = month.year * 12 + (month.month - 1) + delta;
  return {
    year: Math.floor(zeroBased / 12),
    month: (zeroBased % 12) + 1,
  };
};

const normalizeWeekday = (date: SolarHijriDate, weekStartsOn: WeekStart) => {
  const weekday = toGregorianDate(date).getUTCDay();
  if (weekStartsOn === "sunday") return weekday;
  return (weekday + 1) % 7;
};

export const getMonthLength = (month: SolarHijriMonth) => jalaali.jalaaliMonthLength(month.year, month.month);

export const buildCalendarDays = (
  visibleMonth: SolarHijriMonth,
  selectedDate: SolarHijriDate | null,
  isDateDisabled: ((date: SolarHijriDate) => boolean) | undefined,
  weekStartsOn: WeekStart,
): CalendarDay[] => {
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

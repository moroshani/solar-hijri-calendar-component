import type { CalendarLocale, WeekStart } from "./types";

export const monthNames: Record<CalendarLocale, string[]> = {
  fa: [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ],
  en: [
    "Farvardin",
    "Ordibehesht",
    "Khordad",
    "Tir",
    "Mordad",
    "Shahrivar",
    "Mehr",
    "Aban",
    "Azar",
    "Dey",
    "Bahman",
    "Esfand",
  ],
};

const weekdaysSaturday = {
  fa: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
  en: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
};

const weekdaysSunday = {
  fa: ["ی", "د", "س", "چ", "پ", "ج", "ش"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

export const getWeekdayLabels = (locale: CalendarLocale, weekStartsOn: WeekStart) => {
  const source = weekStartsOn === "saturday" ? weekdaysSaturday : weekdaysSunday;
  return source[locale];
};

export const formatDay = (day: number, locale: CalendarLocale) => {
  if (locale === "fa") {
    return new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(day);
  }
  return String(day);
};

export const formatMonthTitle = (year: number, month: number, locale: CalendarLocale) => {
  const monthName = monthNames[locale][month - 1];
  const formattedYear = locale === "fa" ? new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(year) : year;
  return `${monthName} ${formattedYear}`;
};

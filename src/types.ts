export type SolarHijriDate = {
  year: number;
  month: number;
  day: number;
};

export type SolarHijriMonth = {
  year: number;
  month: number;
};

export type CalendarLocale = "fa" | "en";

export type WeekStart = "saturday" | "sunday";

export type CalendarDay = SolarHijriDate & {
  key: string;
  isoDate: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
};

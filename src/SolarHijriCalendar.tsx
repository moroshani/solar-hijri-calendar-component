import { useMemo, useState } from "react";
import { addMonths, buildCalendarDays, getToday } from "./calendarMath";
import { formatDay, formatMonthTitle, getWeekdayLabels } from "./labels";
import type { CalendarLocale, SolarHijriDate, SolarHijriMonth, WeekStart } from "./types";
import "./styles.css";

export type SolarHijriCalendarProps = {
  value?: SolarHijriDate | null;
  onChange: (date: SolarHijriDate) => void;
  month?: SolarHijriMonth;
  onMonthChange?: (month: SolarHijriMonth) => void;
  locale?: CalendarLocale;
  weekStartsOn?: WeekStart;
  isDateDisabled?: (date: SolarHijriDate) => boolean;
  className?: string;
  previousLabel?: string;
  nextLabel?: string;
};

export function SolarHijriCalendar({
  value = null,
  onChange,
  month,
  onMonthChange,
  locale = "fa",
  weekStartsOn = "saturday",
  isDateDisabled,
  className,
  previousLabel,
  nextLabel,
}: SolarHijriCalendarProps) {
  const today = useMemo(() => getToday(), []);
  const [internalMonth, setInternalMonth] = useState<SolarHijriMonth>({ year: value?.year ?? today.year, month: value?.month ?? today.month });
  const visibleMonth = month ?? internalMonth;
  const direction = locale === "fa" ? "rtl" : "ltr";
  const days = useMemo(
    () => buildCalendarDays(visibleMonth, value, isDateDisabled, weekStartsOn),
    [visibleMonth, value, isDateDisabled, weekStartsOn],
  );
  const weekdayLabels = getWeekdayLabels(locale, weekStartsOn);

  const setVisibleMonth = (nextMonth: SolarHijriMonth) => {
    if (!month) setInternalMonth(nextMonth);
    onMonthChange?.(nextMonth);
  };

  return (
    <section className={["shc-calendar", className].filter(Boolean).join(" ")} dir={direction} aria-label="Solar Hijri calendar">
      <header className="shc-calendar__header">
        <button
          className="shc-calendar__nav"
          type="button"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
          aria-label={previousLabel ?? (locale === "fa" ? "ماه قبل" : "Previous month")}
        >
          {direction === "rtl" ? "‹" : "‹"}
        </button>
        <h2 className="shc-calendar__title">{formatMonthTitle(visibleMonth.year, visibleMonth.month, locale)}</h2>
        <button
          className="shc-calendar__nav"
          type="button"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
          aria-label={nextLabel ?? (locale === "fa" ? "ماه بعد" : "Next month")}
        >
          {direction === "rtl" ? "›" : "›"}
        </button>
      </header>

      <div className="shc-calendar__weekdays" role="row">
        {weekdayLabels.map((weekday) => (
          <span className="shc-calendar__weekday" key={weekday} role="columnheader">
            {weekday}
          </span>
        ))}
      </div>

      <div className="shc-calendar__grid" role="grid" aria-label={formatMonthTitle(visibleMonth.year, visibleMonth.month, locale)}>
        {days.map((day) => (
          <button
            className={[
              "shc-calendar__day",
              !day.isCurrentMonth && "shc-calendar__day--muted",
              day.isToday && "shc-calendar__day--today",
              day.isSelected && "shc-calendar__day--selected",
            ]
              .filter(Boolean)
              .join(" ")}
            type="button"
            role="gridcell"
            key={day.key}
            disabled={day.isDisabled}
            aria-selected={day.isSelected}
            aria-label={`${day.key} (${day.isoDate})`}
            onClick={() => onChange({ year: day.year, month: day.month, day: day.day })}
          >
            {formatDay(day.day, locale)}
          </button>
        ))}
      </div>
    </section>
  );
}

import { useMemo, useState, type ReactNode } from "react";
import { addMonths, buildCalendarDays, getToday } from "./calendarMath";
import { createDateDisabledMatcher } from "./constraints";
import { formatDay, formatMonthTitle, getWeekdayLabels } from "./labels";
import { isDateSelected, normalizeSelectedDates, toggleSelectedDate, type MultipleSelectionOptions } from "./selection";
import type { CalendarDay, CalendarLocale, SolarHijriDate, SolarHijriMonth, WeekStart } from "./types";

export type SolarHijriMultipleCalendarProps = {
  value?: SolarHijriDate[] | null;
  onChange: (dates: SolarHijriDate[]) => void;
  month?: SolarHijriMonth;
  onMonthChange?: (month: SolarHijriMonth) => void;
  locale?: CalendarLocale;
  weekStartsOn?: WeekStart;
  minDate?: SolarHijriDate;
  maxDate?: SolarHijriDate;
  isDateDisabled?: (date: SolarHijriDate) => boolean;
  className?: string;
  previousLabel?: string;
  nextLabel?: string;
  min?: number;
  max?: number;
  required?: boolean;
  dayClassName?: string | ((day: CalendarDay) => string | undefined);
  renderDay?: (day: CalendarDay) => ReactNode;
};

export function SolarHijriMultipleCalendar({
  value = [],
  onChange,
  month,
  onMonthChange,
  locale = "fa",
  weekStartsOn = "saturday",
  minDate,
  maxDate,
  isDateDisabled,
  className,
  previousLabel,
  nextLabel,
  min,
  max,
  required = false,
  dayClassName,
  renderDay,
}: SolarHijriMultipleCalendarProps) {
  const today = useMemo(() => getToday(), []);
  const selectedDates = useMemo(() => normalizeSelectedDates(value), [value]);
  const [internalMonth, setInternalMonth] = useState<SolarHijriMonth>({
    year: selectedDates[0]?.year ?? today.year,
    month: selectedDates[0]?.month ?? today.month,
  });
  const visibleMonth = month ?? internalMonth;
  const direction = locale === "fa" ? "rtl" : "ltr";
  const weekdayLabels = getWeekdayLabels(locale, weekStartsOn);
  const disabledMatcher = useMemo(() => {
    return createDateDisabledMatcher({ minDate, maxDate, isDateDisabled });
  }, [isDateDisabled, maxDate, minDate]);
  const selectionOptions: MultipleSelectionOptions = {
    disabled: disabledMatcher,
    max,
    min,
    required,
  };

  const days = useMemo(() => {
    return buildCalendarDays(visibleMonth, null, disabledMatcher, weekStartsOn).map((day) => ({
      ...day,
      isSelected: isDateSelected(day, selectedDates),
    }));
  }, [disabledMatcher, selectedDates, visibleMonth, weekStartsOn]);

  const setVisibleMonth = (nextMonth: SolarHijriMonth) => {
    if (!month) setInternalMonth(nextMonth);
    onMonthChange?.(nextMonth);
  };

  const resolveDayClassName = (day: CalendarDay) => {
    if (!dayClassName) return undefined;
    return typeof dayClassName === "function" ? dayClassName(day) : dayClassName;
  };

  return (
    <section
      className={["shc-calendar", "shc-calendar--multiple", className].filter(Boolean).join(" ")}
      dir={direction}
      aria-label="Solar Hijri multiple calendar"
    >
      <header className="shc-calendar__header">
        <button
          className="shc-calendar__nav"
          type="button"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
          aria-label={previousLabel ?? (locale === "fa" ? "ماه قبل" : "Previous month")}
        >
          ‹
        </button>
        <h2 className="shc-calendar__title">{formatMonthTitle(visibleMonth.year, visibleMonth.month, locale)}</h2>
        <button
          className="shc-calendar__nav"
          type="button"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
          aria-label={nextLabel ?? (locale === "fa" ? "ماه بعد" : "Next month")}
        >
          ›
        </button>
      </header>

      <div className="shc-calendar__weekdays" role="row">
        {weekdayLabels.map((weekday) => (
          <span className="shc-calendar__weekday" key={weekday} role="columnheader">
            {weekday}
          </span>
        ))}
      </div>

      <div
        className="shc-calendar__grid"
        role="grid"
        aria-label={formatMonthTitle(visibleMonth.year, visibleMonth.month, locale)}
        aria-multiselectable="true"
      >
        {days.map((day) => (
          <button
            className={[
              "shc-calendar__day",
              !day.isCurrentMonth && "shc-calendar__day--muted",
              day.isToday && "shc-calendar__day--today",
              day.isSelected && "shc-calendar__day--selected",
              resolveDayClassName(day),
            ]
              .filter(Boolean)
              .join(" ")}
            type="button"
            role="gridcell"
            key={day.key}
            disabled={day.isDisabled}
            aria-selected={day.isSelected}
            aria-label={`${day.key} (${day.isoDate})`}
            onClick={() => {
              onChange(toggleSelectedDate(selectedDates, day, selectionOptions));
            }}
          >
            {renderDay ? renderDay(day) : formatDay(day.day, locale)}
          </button>
        ))}
      </div>
    </section>
  );
}

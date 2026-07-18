import { useMemo, useState, type ReactNode } from "react";
import { addMonths, buildCalendarDays, getToday, isSameDate } from "./calendarMath";
import { formatDay, formatMonthTitle, getWeekdayLabels } from "./labels";
import { createRangePreview, isDateInRange, selectRangeDate, type RangeSelectionOptions } from "./selection";
import type { CalendarDayState, CalendarLocale, SolarHijriDate, SolarHijriMonth, SolarHijriRange, WeekStart } from "./types";

export type SolarHijriRangeCalendarProps = {
  value?: SolarHijriRange | null;
  onChange: (range: SolarHijriRange) => void;
  month?: SolarHijriMonth;
  onMonthChange?: (month: SolarHijriMonth) => void;
  locale?: CalendarLocale;
  weekStartsOn?: WeekStart;
  isDateDisabled?: (date: SolarHijriDate) => boolean;
  className?: string;
  previousLabel?: string;
  nextLabel?: string;
  allowSameDay?: boolean;
  excludeDisabled?: boolean;
  minDays?: number;
  maxDays?: number;
  dayClassName?: string | ((day: CalendarDayState) => string | undefined);
  renderDay?: (day: CalendarDayState) => ReactNode;
};

const emptyRange: SolarHijriRange = { from: null, to: null };

export function SolarHijriRangeCalendar({
  value = emptyRange,
  onChange,
  month,
  onMonthChange,
  locale = "fa",
  weekStartsOn = "saturday",
  isDateDisabled,
  className,
  previousLabel,
  nextLabel,
  allowSameDay = true,
  excludeDisabled = false,
  minDays,
  maxDays,
  dayClassName,
  renderDay,
}: SolarHijriRangeCalendarProps) {
  const today = useMemo(() => getToday(), []);
  const [hoveredDate, setHoveredDate] = useState<SolarHijriDate | null>(null);
  const [internalMonth, setInternalMonth] = useState<SolarHijriMonth>({
    year: value?.from?.year ?? today.year,
    month: value?.from?.month ?? today.month,
  });
  const activeRange = value ?? emptyRange;
  const visibleMonth = month ?? internalMonth;
  const direction = locale === "fa" ? "rtl" : "ltr";
  const weekdayLabels = getWeekdayLabels(locale, weekStartsOn);
  const rangePreview = createRangePreview(activeRange, hoveredDate);
  const rangeSelectionOptions: RangeSelectionOptions = {
    allowSameDay,
    disabled: isDateDisabled,
    excludeDisabled,
    minDays,
    maxDays,
  };

  const days = useMemo(() => {
    return buildCalendarDays(visibleMonth, null, isDateDisabled, weekStartsOn).map((day): CalendarDayState => {
      const isRangeStart = Boolean(activeRange.from && isSameDate(day, activeRange.from));
      const isRangeEnd = Boolean(activeRange.to && isSameDate(day, activeRange.to));
      const isInRange = isDateInRange(day, activeRange, { excludeEnds: true });
      const isRangePreview = !isInRange && isDateInRange(day, rangePreview, { excludeEnds: true });

      return {
        ...day,
        isSelected: isRangeStart || isRangeEnd,
        isRangeStart,
        isRangeEnd,
        isInRange,
        isRangePreview,
      };
    });
  }, [activeRange, isDateDisabled, rangePreview, visibleMonth, weekStartsOn]);

  const setVisibleMonth = (nextMonth: SolarHijriMonth) => {
    if (!month) setInternalMonth(nextMonth);
    onMonthChange?.(nextMonth);
  };

  const resolveDayClassName = (day: CalendarDayState) => {
    if (!dayClassName) return undefined;
    return typeof dayClassName === "function" ? dayClassName(day) : dayClassName;
  };

  return (
    <section
      className={["shc-calendar", "shc-calendar--range", className].filter(Boolean).join(" ")}
      dir={direction}
      aria-label="Solar Hijri range calendar"
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

      <div className="shc-calendar__grid" role="grid" aria-label={formatMonthTitle(visibleMonth.year, visibleMonth.month, locale)}>
        {days.map((day) => (
          <button
            className={[
              "shc-calendar__day",
              !day.isCurrentMonth && "shc-calendar__day--muted",
              day.isToday && "shc-calendar__day--today",
              day.isSelected && "shc-calendar__day--selected",
              day.isRangeStart && "shc-calendar__day--range-start",
              day.isRangeEnd && "shc-calendar__day--range-end",
              day.isInRange && "shc-calendar__day--in-range",
              day.isRangePreview && "shc-calendar__day--range-preview",
              resolveDayClassName(day),
            ]
              .filter(Boolean)
              .join(" ")}
            type="button"
            role="gridcell"
            key={day.key}
            disabled={day.isDisabled}
            aria-selected={day.isSelected || day.isInRange}
            aria-label={`${day.key} (${day.isoDate})`}
            onClick={() => {
              onChange(selectRangeDate(activeRange, day, rangeSelectionOptions));
            }}
            onMouseEnter={() => setHoveredDate(day)}
            onFocus={() => setHoveredDate(day)}
            onMouseLeave={() => setHoveredDate(null)}
          >
            {renderDay ? renderDay(day) : formatDay(day.day, locale)}
          </button>
        ))}
      </div>
    </section>
  );
}


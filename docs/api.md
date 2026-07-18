# API Reference

This page tracks the exported API that examples and framework packages should use.

## Import Paths

Use the root import for the complete React package surface:

```ts
import { SolarHijriCalendar, SolarHijriRangeCalendar } from "solar-hijri-calendar-component";
```

Use the core subpath for framework-neutral logic:

```ts
import { dateKey, selectRangeDate, type SolarHijriDate } from "solar-hijri-calendar-component/core";
```

Use the React subpath when you only want React components and React-facing types:

```ts
import { SolarHijriRangeCalendar } from "solar-hijri-calendar-component/react";
```

## Components

### `SolarHijriCalendar`

Inline Solar Hijri single-date calendar.

Key props:

- `value?: SolarHijriDate | null`
- `onChange: (date: SolarHijriDate) => void`
- `month?: SolarHijriMonth`
- `onMonthChange?: (month: SolarHijriMonth) => void`
- `locale?: "fa" | "en"`
- `weekStartsOn?: "saturday" | "sunday"`
- `isDateDisabled?: (date: SolarHijriDate) => boolean`
- `dayClassName?: string | ((day: CalendarDay) => string | undefined)`
- `renderDay?: (day: CalendarDay) => React.ReactNode`

### `SolarHijriRangeCalendar`

Inline Solar Hijri range calendar built on the same core grid and pure range selection helpers.

Key props:

- `value?: SolarHijriRange | null`
- `onChange: (range: SolarHijriRange) => void`
- `month?: SolarHijriMonth`
- `onMonthChange?: (month: SolarHijriMonth) => void`
- `locale?: "fa" | "en"`
- `weekStartsOn?: "saturday" | "sunday"`
- `isDateDisabled?: (date: SolarHijriDate) => boolean`
- `allowSameDay?: boolean`
- `excludeDisabled?: boolean`
- `minDays?: number`
- `maxDays?: number`
- `dayClassName?: string | ((day: CalendarDayState) => string | undefined)`
- `renderDay?: (day: CalendarDayState) => React.ReactNode`

## Types

- `SolarHijriDate`: `{ year: number; month: number; day: number }`
- `SolarHijriMonth`: `{ year: number; month: number }`
- `SolarHijriRange`: `{ from: SolarHijriDate | null; to: SolarHijriDate | null }`
- `CalendarDay`: generated day cell data for month grids.
- `CalendarDayState`: `CalendarDay` plus optional range state flags.
- `DateMatcher`: exact date, list of dates, range, or predicate.
- `RangeSelectionOptions`: options for pure range selection.

## Date Math

- `dateKey(date)`
- `compareDates(left, right)`
- `isBeforeDate(left, right)`
- `isAfterDate(left, right)`
- `isSameDate(left, right)`
- `addDays(date, delta)`
- `addMonths(month, delta)`
- `differenceInCalendarDays(left, right)`
- `getMonthLength(month)`
- `getToday()`
- `toGregorianDate(date)`
- `fromGregorianDate(date)`
- `toIsoDate(date)`
- `buildCalendarDays(visibleMonth, selectedDate, isDateDisabled, weekStartsOn)`

## Selection Core

- `emptyRange()`
- `isCompleteRange(range)`
- `orderRange(range)`
- `isDateInRange(date, range, options)`
- `getRangeBoundary(date, range)`
- `getRangeLength(range)`
- `isDateMatched(date, matcher)`
- `isDateDisabledByMatchers(date, matchers)`
- `rangeContainsDisabledDate(range, matchers)`
- `selectRangeDate(currentRange, date, options)`
- `createRangePreview(range, hoveredDate)`

The selection helpers are framework-neutral and should remain independent from React, Vue, Svelte, Angular, and Web Components.

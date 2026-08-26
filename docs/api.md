# API Reference

This page tracks the exported API that examples and framework packages should use.

## Import Paths

Use the root import for the complete React package surface:

```ts
import { SolarHijriCalendar, SolarHijriMultipleCalendar, SolarHijriRangeCalendar } from "solar-hijri-calendar-component";
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
- `minDate?: SolarHijriDate`
- `maxDate?: SolarHijriDate`
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
- `minDate?: SolarHijriDate`
- `maxDate?: SolarHijriDate`
- `isDateDisabled?: (date: SolarHijriDate) => boolean`
- `allowSameDay?: boolean`
- `excludeDisabled?: boolean`
- `minDays?: number`
- `maxDays?: number`
- `dayClassName?: string | ((day: CalendarDayState) => string | undefined)`
- `renderDay?: (day: CalendarDayState) => React.ReactNode`

### `SolarHijriMultipleCalendar`

Inline Solar Hijri multiple-date calendar.

Key props:

- `value?: SolarHijriDate[] | null`
- `onChange: (dates: SolarHijriDate[]) => void`
- `month?: SolarHijriMonth`
- `onMonthChange?: (month: SolarHijriMonth) => void`
- `locale?: "fa" | "en"`
- `weekStartsOn?: "saturday" | "sunday"`
- `minDate?: SolarHijriDate`
- `maxDate?: SolarHijriDate`
- `isDateDisabled?: (date: SolarHijriDate) => boolean`
- `min?: number`
- `max?: number`
- `required?: boolean`
- `dayClassName?: string | ((day: CalendarDay) => string | undefined)`
- `renderDay?: (day: CalendarDay) => React.ReactNode`

## Types

- `SolarHijriDate`: `{ year: number; month: number; day: number }`
- `SolarHijriMonth`: `{ year: number; month: number }`
- `SolarHijriRange`: `{ from: SolarHijriDate | null; to: SolarHijriDate | null }`
- `CalendarDay`: generated day cell data for month grids.
- `CalendarDayState`: `CalendarDay` plus optional range state flags.
- `DateMatcher`: exact date, list of dates, range, or predicate.
- `DateBounds`: `{ minDate?: SolarHijriDate; maxDate?: SolarHijriDate }`
- `DateConstraintOptions`: date bounds plus an optional disabled callback.
- `RangeSelectionOptions`: options for pure range selection.
- `MultipleSelectionOptions`: options for pure multiple-date selection.

## Validity Contract

Supported Solar Hijri years are `-61` through `3176`, inclusive. Every date in
that full-year range is supported by validation, Gregorian conversion, and
date arithmetic. A valid value has safe-integer fields, a month from `1`
through `12`, and a real day for that month and year. Leap-day validity is
checked against the actual Esfand length.

Use these framework-neutral exports at runtime boundaries:

- `MIN_SOLAR_HIJRI_YEAR`
- `MAX_SOLAR_HIJRI_YEAR`
- `isValidSolarHijriDate(value)`
- `isValidSolarHijriMonth(value)`
- `isValidSolarHijriRange(value)`
- `assertValidSolarHijriDate(value, label?)`
- `assertValidSolarHijriMonth(value, label?)`
- `assertValidSolarHijriRange(value, label?)`

The three `isValid*` predicates accept `unknown`, return `false` for malformed,
impossible, fractional, non-finite, or out-of-range values, and narrow valid
values to their public TypeScript type. The three `assertValid*` functions
narrow valid values and otherwise throw `RangeError`.

All other public date math, conversion, constraint, and selection helpers throw
`RangeError` when a supplied date, month, or range is invalid. Details:

- `null` and `undefined` remain absence only for signatures that explicitly
  permit them, such as nullable ranges and optional selected dates.
- A present range must contain both `from` and `to` keys; each boundary must be
  a valid date or `null`.
- `fromGregorianDate` rejects invalid JavaScript dates and Gregorian dates that
  convert outside the supported Solar Hijri years.
- Day and month movement deltas must be safe integers, and movement that leaves
  the supported years throws.
- Constraint bounds must be valid and `minDate` must not be after `maxDate`.
- Date arrays and matcher collections are validated completely before matching,
  so an early match cannot hide a later invalid value.
- `formatDay` accepts integer day labels from `1` through `31`, and
  `formatMonthTitle` requires a valid supported month.

This is a deliberate pre-1.0 contract tightening targeted at `0.2.0`. Results
for valid values remain backward compatible; code that relied on malformed
values being formatted, sorted, or normalized must validate first.

## Date Math

- `dateKey(date)`
- `compareDates(left, right)`
- `isBeforeDate(left, right)`
- `isAfterDate(left, right)`
- `isSameDate(left, right)`
- `earlierDate(left, right)`
- `laterDate(left, right)`
- `addDays(date, delta)`
- `addWeeks(date, delta)`
- `addMonths(month, delta)`
- `addYears(date, delta)`
- `differenceInCalendarDays(left, right)`
- `getMonthLength(month)`
- `getToday()`
- `toGregorianDate(date)`
- `fromGregorianDate(date)`
- `toIsoDate(date)`
- `buildCalendarDays(visibleMonth, selectedDate, isDateDisabled, weekStartsOn)`
- `isDateWithinBounds(date, bounds)`
- `isDateOutsideBounds(date, bounds)`
- `clampDate(date, bounds)`
- `isDateUnavailable(date, options)`
- `createDateDisabledMatcher(options)`

### Arithmetic And Bounds Behavior

- `addWeeks` moves by exactly `delta * 7` calendar days. Deltas must be safe
  integers, and movement outside the supported full-year range throws
  `RangeError`.
- `addYears` keeps the original month and day when that date exists in the
  target year. If it does not, the day clamps to the target month's final real
  day. The same rule applies to positive and negative movement; for example,
  moving from Esfand 30 into a non-leap year produces Esfand 29.
- `earlierDate` and `laterDate` return one of their input values. Equal dates
  return the left input, providing deterministic tie behavior.
- `isDateWithinBounds` treats `minDate` and `maxDate` as inclusive.
  `isDateOutsideBounds` is its logical complement.
- `clampDate` returns the minimum for earlier values, the maximum for later
  values, and the original input when it is already inside the inclusive
  interval. One-sided and empty bounds are supported.
- Invalid dates, unsafe deltas, movement outside supported years, invalid
  bounds, and reversed min/max intervals throw `RangeError`.

## Selection Core

- `emptyRange()`
- `isCompleteRange(range)`
- `orderRange(range)`
- `isDateInRange(date, range, options)`
- `getRangeBoundary(date, range)`
- `getRangeLength(range)`
- `isDateMatched(date, matcher)`
- `isDateDisabledByMatchers(date, matchers)`
- `isDateSelected(date, selectedDates)`
- `normalizeSelectedDates(selectedDates)`
- `toggleSelectedDate(currentSelection, date, options)`
- `rangeContainsDisabledDate(range, matchers)`
- `selectRangeDate(currentRange, date, options)`
- `createRangePreview(range, hoveredDate)`

The selection helpers are framework-neutral and should remain independent from React, Vue, Svelte, Angular, and Web Components.

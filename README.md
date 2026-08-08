# Solar Hijri Calendar Component

A lightweight React calendar component for Solar Hijri / Jalali dates.

[![CI](https://github.com/moroshani/solar-hijri-calendar-component/actions/workflows/ci.yml/badge.svg)](https://github.com/moroshani/solar-hijri-calendar-component/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

The goal is to provide a practical, accessible date picker foundation for Persian and RTL applications while keeping the core API small enough to adapt inside real products.

> Status: `0.1.0` release candidate. The implementation and package tarball are verified locally. npm publication is still pending, so the npm installation command below will become active only after the first public package release.

Try the responsive playground: https://moroshani.github.io/solar-hijri-calendar-component/

## Features

- Solar Hijri month grid.
- Persian and English labels.
- RTL-friendly UI.
- Controlled selected date.
- Controlled range selection.
- Controlled multiple-date selection.
- Disabled-date support.
- Custom day rendering and day class hooks.
- Keyboard-accessible buttons.
- Small TypeScript API.

## Install

The package name was still available on npm when checked on 2026-08-08, but the package is not published yet. Until the first release is announced, use a source checkout for evaluation:

```bash
git clone https://github.com/moroshani/solar-hijri-calendar-component.git
cd solar-hijri-calendar-component
npm ci
npm run verify
```

After npm publication:

```bash
npm install solar-hijri-calendar-component
```

React is a peer dependency.

## Usage

```tsx
import { useState } from "react";
import {
  SolarHijriCalendar,
  SolarHijriMultipleCalendar,
  SolarHijriRangeCalendar,
  type SolarHijriDate,
  type SolarHijriRange,
} from "solar-hijri-calendar-component";
import "solar-hijri-calendar-component/styles.css";

export function Example() {
  const [value, setValue] = useState<SolarHijriDate | null>(null);
  const [range, setRange] = useState<SolarHijriRange>({ from: null, to: null });
  const [dates, setDates] = useState<SolarHijriDate[]>([]);

  return (
    <>
      <SolarHijriCalendar
        value={value}
        onChange={setValue}
        locale="fa"
        weekStartsOn="saturday"
        minDate={{ year: 1403, month: 1, day: 4 }}
        maxDate={{ year: 1403, month: 1, day: 28 }}
      />

      <SolarHijriRangeCalendar
        value={range}
        onChange={setRange}
        locale="fa"
        weekStartsOn="saturday"
        minDate={{ year: 1403, month: 1, day: 4 }}
        maxDate={{ year: 1403, month: 1, day: 28 }}
        excludeDisabled
      />

      <SolarHijriMultipleCalendar
        value={dates}
        onChange={setDates}
        locale="fa"
        weekStartsOn="saturday"
        minDate={{ year: 1403, month: 1, day: 4 }}
        maxDate={{ year: 1403, month: 1, day: 28 }}
        max={5}
      />
    </>
  );
}
```

Core-only imports are available for framework-neutral logic:

```ts
import { dateKey, selectRangeDate } from "solar-hijri-calendar-component/core";
```

## API

### `SolarHijriCalendar`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `SolarHijriDate \| null` | `null` | Selected date. |
| `onChange` | `(date: SolarHijriDate) => void` | required | Called when a day is selected. |
| `month` | `SolarHijriMonth` | current Jalali month | Controlled visible month. |
| `onMonthChange` | `(month: SolarHijriMonth) => void` | optional | Called when the visible month changes. |
| `locale` | `"fa" \| "en"` | `"fa"` | Calendar labels. |
| `weekStartsOn` | `"saturday" \| "sunday"` | `"saturday"` | First day of week. |
| `minDate` | `SolarHijriDate` | optional | Earliest selectable date, inclusive. |
| `maxDate` | `SolarHijriDate` | optional | Latest selectable date, inclusive. |
| `isDateDisabled` | `(date: SolarHijriDate) => boolean` | optional | Disable specific dates. |
| `className` | `string` | optional | Additional root class. |
| `dayClassName` | `string \| (day: CalendarDay) => string \| undefined` | optional | Add custom day classes. |
| `renderDay` | `(day: CalendarDay) => React.ReactNode` | optional | Render custom day content. |

### `SolarHijriRangeCalendar`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `SolarHijriRange \| null` | open range | Selected range. |
| `onChange` | `(range: SolarHijriRange) => void` | required | Called when the range changes. |
| `month` | `SolarHijriMonth` | current Jalali month | Controlled visible month. |
| `onMonthChange` | `(month: SolarHijriMonth) => void` | optional | Called when the visible month changes. |
| `locale` | `"fa" \| "en"` | `"fa"` | Calendar labels. |
| `weekStartsOn` | `"saturday" \| "sunday"` | `"saturday"` | First day of week. |
| `minDate` | `SolarHijriDate` | optional | Earliest selectable date, inclusive. |
| `maxDate` | `SolarHijriDate` | optional | Latest selectable date, inclusive. |
| `isDateDisabled` | `(date: SolarHijriDate) => boolean` | optional | Disable specific dates. |
| `allowSameDay` | `boolean` | `true` | Allow same-day ranges. |
| `excludeDisabled` | `boolean` | `false` | Restart selection when a completed range crosses disabled dates. |
| `minDays` | `number` | optional | Minimum inclusive range length. |
| `maxDays` | `number` | optional | Maximum inclusive range length. |
| `className` | `string` | optional | Additional root class. |
| `dayClassName` | `string \| (day: CalendarDayState) => string \| undefined` | optional | Add custom day classes. |
| `renderDay` | `(day: CalendarDayState) => React.ReactNode` | optional | Render custom day content. |

### `SolarHijriMultipleCalendar`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `SolarHijriDate[] \| null` | `[]` | Selected dates. |
| `onChange` | `(dates: SolarHijriDate[]) => void` | required | Called when selected dates change. |
| `month` | `SolarHijriMonth` | current Jalali month | Controlled visible month. |
| `onMonthChange` | `(month: SolarHijriMonth) => void` | optional | Called when the visible month changes. |
| `locale` | `"fa" \| "en"` | `"fa"` | Calendar labels. |
| `weekStartsOn` | `"saturday" \| "sunday"` | `"saturday"` | First day of week. |
| `minDate` | `SolarHijriDate` | optional | Earliest selectable date, inclusive. |
| `maxDate` | `SolarHijriDate` | optional | Latest selectable date, inclusive. |
| `isDateDisabled` | `(date: SolarHijriDate) => boolean` | optional | Disable specific dates. |
| `min` | `number` | optional | Minimum selected date count. |
| `max` | `number` | optional | Maximum selected date count. |
| `required` | `boolean` | `false` | Prevent clearing the final selected date. |
| `className` | `string` | optional | Additional root class. |
| `dayClassName` | `string \| (day: CalendarDay) => string \| undefined` | optional | Add custom day classes. |
| `renderDay` | `(day: CalendarDay) => React.ReactNode` | optional | Render custom day content. |

## Local Development

```bash
npm ci
npm run verify
```

Run the local playground:

```bash
npm run dev
```

Capture responsive screenshots:

```bash
npm run screenshots
```

## Project Direction

The current package exposes a small React calendar. The planned direction is a framework-neutral core plus idiomatic packages for React, Web Components, Vue, Svelte, Angular, and adapters for common date libraries.

Research and planning docs:

- [Ecosystem research](./docs/research/ecosystem-research-2026-07-18.md)
- [Product vision](./docs/product-vision.md)
- [API reference](./docs/api.md)
- [Theming](./docs/theming.md)
- [Architecture and roadmap](./docs/architecture-roadmap.md)
- [Playgrounds and screenshots](./docs/playgrounds-and-screenshots.md)
- [Demo deployment](./docs/demo-deployment.md)
- [AI documentation maintenance](./docs/ai-maintenance.md)
- [Release process](./docs/release-process.md)

## Contributing

Contributions are welcome. Start with [CONTRIBUTING.md](./CONTRIBUTING.md), review the [Code of Conduct](./CODE_OF_CONDUCT.md), and use the repository issue templates for reproducible bugs or scoped feature proposals.

AI-assisted contributions are welcome when the contributor reviews and understands the result, discloses material assistance, follows project conventions, and runs the relevant verification.

## Maintainer

Mohammad Mehdi Roshani ([@moroshani](https://github.com/moroshani)). See [MAINTAINERS.md](./MAINTAINERS.md).

## License

MIT

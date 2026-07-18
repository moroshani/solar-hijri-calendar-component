# Solar Hijri Calendar Component

A lightweight React calendar component for Solar Hijri / Jalali dates.

The goal is to provide a practical, accessible date picker foundation for Persian and RTL applications while keeping the core API small enough to adapt inside real products.

> Restart note, 2026-07-18: this repository is being shaped into a professional open-source project for Solar Hijri calendar primitives and components across frontend stacks. See [docs/README.md](./docs/README.md), [docs/product-vision.md](./docs/product-vision.md), and [docs/architecture-roadmap.md](./docs/architecture-roadmap.md).

## Features

- Solar Hijri month grid.
- Persian and English labels.
- RTL-friendly UI.
- Controlled selected date.
- Controlled range selection.
- Disabled-date support.
- Custom day rendering and day class hooks.
- Keyboard-accessible buttons.
- Small TypeScript API.

## Install

```bash
npm install solar-hijri-calendar-component
```

React is a peer dependency.

## Usage

```tsx
import { useState } from "react";
import {
  SolarHijriCalendar,
  SolarHijriRangeCalendar,
  type SolarHijriDate,
  type SolarHijriRange,
} from "solar-hijri-calendar-component";
import "solar-hijri-calendar-component/styles.css";

export function Example() {
  const [value, setValue] = useState<SolarHijriDate | null>(null);
  const [range, setRange] = useState<SolarHijriRange>({ from: null, to: null });

  return (
    <>
      <SolarHijriCalendar
        value={value}
        onChange={setValue}
        locale="fa"
        weekStartsOn="saturday"
      />

      <SolarHijriRangeCalendar
        value={range}
        onChange={setRange}
        locale="fa"
        weekStartsOn="saturday"
        excludeDisabled
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
| `isDateDisabled` | `(date: SolarHijriDate) => boolean` | optional | Disable specific dates. |
| `allowSameDay` | `boolean` | `true` | Allow same-day ranges. |
| `excludeDisabled` | `boolean` | `false` | Restart selection when a completed range crosses disabled dates. |
| `minDays` | `number` | optional | Minimum inclusive range length. |
| `maxDays` | `number` | optional | Maximum inclusive range length. |
| `className` | `string` | optional | Additional root class. |
| `dayClassName` | `string \| (day: CalendarDayState) => string \| undefined` | optional | Add custom day classes. |
| `renderDay` | `(day: CalendarDayState) => React.ReactNode` | optional | Render custom day content. |

## Local Development

```bash
npm install
npm test
npm run build
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

## License

MIT

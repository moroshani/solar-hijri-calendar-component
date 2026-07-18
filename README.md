# Solar Hijri Calendar Component

A lightweight React calendar component for Solar Hijri / Jalali dates.

The goal is to provide a practical, accessible date picker foundation for Persian and RTL applications while keeping the core API small enough to adapt inside real products.

## Features

- Solar Hijri month grid.
- Persian and English labels.
- RTL-friendly UI.
- Controlled selected date.
- Disabled-date support.
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
  type SolarHijriDate,
} from "solar-hijri-calendar-component";
import "solar-hijri-calendar-component/styles.css";

export function Example() {
  const [value, setValue] = useState<SolarHijriDate | null>(null);

  return (
    <SolarHijriCalendar
      value={value}
      onChange={setValue}
      locale="fa"
      weekStartsOn="saturday"
    />
  );
}
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

## Local Development

```bash
npm install
npm test
npm run build
```

## License

MIT

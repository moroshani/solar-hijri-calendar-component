# Theming

The default components ship plain CSS and can be styled without a runtime theme provider.

Import the default styles:

```tsx
import "solar-hijri-calendar-component/styles.css";
```

Override CSS variables on the calendar root, a wrapping container, or a theme class:

```css
.booking-calendar {
  --shc-color-accent: #0f766e;
  --shc-color-accent-hover: #115e59;
  --shc-color-accent-ring: #14b8a6;
  --shc-color-range: #ccfbf1;
  --shc-color-range-preview: #f0fdfa;
  --shc-radius: 6px;
  --shc-day-radius: 4px;
}
```

Then attach the class:

```tsx
<SolarHijriRangeCalendar className="booking-calendar" value={range} onChange={setRange} />
```

## Custom Day Rendering

Use `renderDay` when the day cell needs custom markup:

```tsx
<SolarHijriCalendar
  value={value}
  onChange={setValue}
  renderDay={(day) => (
    <span>
      {day.day}
      {day.isToday ? <span aria-hidden="true">.</span> : null}
    </span>
  )}
/>
```

Use `dayClassName` for state-driven styling:

```tsx
<SolarHijriCalendar
  value={value}
  onChange={setValue}
  dayClassName={(day) => (day.isCurrentMonth && day.day === 1 ? "month-start" : undefined)}
/>
```

These hooks are intentionally small. Future headless APIs should expose the same day state without requiring the default DOM.

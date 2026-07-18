# User Signals: Jalali Calendar UI

Research date: 2026-07-18.

This note captures demand signals from public GitHub repositories, topic pages, and issue/search results. It should be refreshed with a new dated note when product direction changes.

## Repeating User Needs

- Single, range, multiple, multiple-range, week, month, and date-time selection modes.
- Deep customization through CSS variables, custom day rendering, custom input slots, and framework-native composition.
- Persian-first localization with RTL, Persian digits, Persian month/week labels, and English fallback.
- Strong TypeScript types and predictable controlled APIs.
- Form integration and field/input modes, not only inline calendars.
- Mobile-friendly layouts and touch interactions.
- Date/timezone correctness without leaking JavaScript `Date` timezone surprises into app state.
- Accessibility and keyboard navigation as expected product behavior.
- Framework reach beyond React, especially Vue, Svelte, Angular, plain HTML, and Web Components.

## Product Implications

- The core package must be framework-neutral and independently testable.
- Range and matcher behavior should live in pure selection helpers, not inside React components.
- React components should expose `renderDay` and `dayClassName` hooks immediately, then evolve toward headless hooks.
- The default UI should be attractive enough for quick adoption but styled with class hooks and CSS variables so teams can own the look.
- The demo/playground must test interaction and responsiveness at multiple widths because layout quality is part of the product.
- Future packages should let users install only the core, only their framework package, and only optional adapters they need.

## Sources Checked

- MUI Jalali issue: https://github.com/mui/mui-x/issues/7487
- GitHub Jalali date picker topic: https://github.com/topics/jalali-date-picker
- `react-multi-date-picker`: https://github.com/shahabyazdi/react-multi-date-picker
- `shadcn-persian-calendar`: https://github.com/MehhdiMarzban/shadcn-persian-calendar
- `persian-range-picker`: https://github.com/hamidrezafallahi/persian-range-picker
- `devmahdi/jalali-date-picker`: https://github.com/devmahdi/jalali-date-picker
- `react-calendar-datetime-picker`: https://github.com/mmehdinasiri/react-calendar-datetime-picker
- `vue-jalali-datetime-picker`: https://github.com/RezaTabrizii/vue-jalali-datetime-picker
- `svelte-persian-datepicker`: https://github.com/hamedf62/svelte-persian-datepicker
- `persian-datepicker-element`: https://github.com/mehrabix/persian-datepicker-element
- `date-fns-jalali`: https://github.com/date-fns-jalali/date-fns-jalali


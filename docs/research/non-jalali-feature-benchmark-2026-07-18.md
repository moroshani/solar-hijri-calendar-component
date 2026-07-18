# Non-Jalali Calendar Feature Benchmark

Research date: 2026-07-18.

This note tracks product patterns from mature Gregorian-first calendar systems. The goal is not to copy their surface APIs one-for-one; it is to make sure the Solar Hijri project competes with the best expectations users already have.

## Feature Standards To Match Or Exceed

| Area | Strong external pattern | Project implication |
| --- | --- | --- |
| Selection modes | DayPicker documents single, multiple, range, and custom selection rules. Mantine exposes default, multiple, and range picker modes. | Keep selection engines pure and mode-specific. Ship single, multiple, range, then multiple-range and week/month modes. |
| Selection constraints | DayPicker supports required selection plus min/max counts or range lengths. Mantine and Mobiscroll emphasize min/max dates. | Support required values, min/max selected dates, min/max range nights, min/max selectable dates, and arbitrary matchers. |
| Disabled handling | DayPicker issue history shows users expect ranges not to silently include disabled days. React Aria separates unavailable dates from keyboard focus. | Make disabled-range behavior explicit: either reset, reject, or optionally allow but mark invalid. Preserve keyboard navigation consistency. |
| Keyboard and ARIA | React Aria, WAI-ARIA APG, USWDS, MUI, and Kendo all treat keyboard support as core behavior. | Add roving focus, arrow navigation, Home/End/Page Up/Page Down, Enter/Space selection, live month announcements, and regression tests. |
| Field and popover UX | MUI and Mantine treat inline calendar, input field, popover, modal/mobile, action bar, and clearable flows as related pieces. | Build components in layers: core calendar, field parser/formatter, popover picker, mobile dialog, action bar, and shortcuts. |
| Shortcuts | MUI range picker docs highlight preset shortcuts for faster range selection. | Add typed shortcut APIs for common Jalali ranges: today, this week, this month, last 7/30 days, current season, current year, and custom callbacks. |
| Layout scale | Mantine supports multiple columns; React Aria discussions show demand for multi-month range displays. | Add single-month, multi-month, paged month, month grid, and year grid views with responsive auto layout. |
| Theming | Mantine, MUI, and DayPicker all expose styling hooks or slot-level customization. | Preserve CSS variables and class hooks, then add headless hooks and slot/render props for design-system users. |
| Framework reach | Mature ecosystems provide package-specific idioms rather than one generic wrapper. | Keep `core` framework-neutral. Add React first, then Web Component, Vue, Svelte, and Angular adapters with small entry points. |

## Near-Term Product Requirements

- Add a first-class multiple calendar component with `min`, `max`, `required`, disabled matchers, controlled value, and render hooks.
- Keep range behavior deterministic around disabled dates and test it with pure unit tests.
- Make local playgrounds dense and functional, not marketing-first, so Playwright can interact with every selection mode.
- Maintain responsive screenshots at 320, 390, 768, 1024, and 1440 widths.
- Document every public API in a way that AI coding agents can consume without scraping examples from prose.

## Later Differentiators

- Multiple-range selection for scheduling and blackout windows.
- Business-calendar rules such as weekends, holidays, fiscal periods, and workdays.
- Jalali-aware parsing and formatting for input fields, including Persian and Latin digits.
- Time selection and date-time range selection without forcing a Gregorian `Date` into app state.
- Virtualized decade/year navigation for birth-date and historical workflows.
- Form-associated Web Component for framework-agnostic native forms.
- Adapters for React Hook Form, TanStack Form, Formik, VeeValidate, Angular forms, and Svelte forms.

## Source Links

- React DayPicker selection modes: https://daypicker.dev/docs/selection-modes
- React DayPicker Persian calendar: https://daypicker.dev/localization/persian
- React DayPicker accessibility guide: https://daypicker.dev/guides/accessibility
- React Aria DatePicker: https://react-spectrum.adobe.com/react-aria/DatePicker.html
- React Aria date/time pickers accessibility article: https://react-aria.adobe.com/blog/date-and-time-pickers-for-all
- MUI X Date Range Picker API: https://mui.com/x/api/date-pickers/date-range-picker/
- MUI X custom components and action bar: https://mui.com/x/react-date-pickers/custom-components/
- MUI X shortcuts: https://mui.com/x/react-date-pickers/shortcuts/
- MUI X accessibility: https://mui.com/x/react-date-pickers/accessibility/
- Mantine DatePicker: https://mantine.dev/dates/date-picker/
- Mantine DatePickerInput: https://mantine.dev/dates/date-picker-input/
- Flatpickr examples: https://flatpickr.js.org/examples/
- Flatpickr options: https://flatpickr.js.org/options/
- KendoReact calendar accessibility: https://www.telerik.com/kendo-react-ui/components/dateinputs/calendar/accessibility/wai-aria-support
- USWDS date range picker accessibility tests: https://designsystem.digital.gov/components/date-range-picker/accessibility-tests/
- DayPicker disabled-range issue: https://github.com/gpbl/react-day-picker/issues/1885
- React Aria multi-month discussion: https://github.com/adobe/react-spectrum/discussions/4568
- Mantine controlled range clearing issue: https://github.com/mantinedev/mantine/issues/6092

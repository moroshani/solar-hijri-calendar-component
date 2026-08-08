# Ecosystem Research: Solar Hijri Calendar Components

Research date: 2026-07-18.

## Executive Summary

There is real demand for Jalali calendar UI, but the ecosystem is fragmented. Existing libraries tend to be one of three things:

- Feature-rich React/Vue/Svelte pickers that solve many product cases but are tied to one framework.
- Large mainstream picker systems that support Jalali through adapters, but are not focused on Persian-first UX.
- Small or legacy packages that cover basic date picking but are stale or thinly documented.

The opportunity for this project is not just "another React calendar." The stronger path is a framework-neutral Solar Hijri core plus idiomatic packages for React, Web Components, Vue, Svelte, and Angular.

## Current Repository Baseline

The local repository currently contains:

- One React component: `SolarHijriCalendar`.
- Framework-coupled date grid usage, but mostly framework-neutral date math.
- Single-date selection only.
- Persian and English labels.
- Saturday or Sunday week starts.
- Disabled-date callback.
- Basic CSS.
- Five date math tests.
- Vite library build and GitHub Actions CI.

The current baseline is healthy for a seed package. It is not yet the full product described in the project mission.

## Competitor And Ecosystem Notes

| Package or project | Stack | Research signal on 2026-07-18 | Relevance |
| --- | --- | --- | --- |
| `react-multi-date-picker` | React | npm description advertises Gregorian, Persian, Arabic, Indian calendars and single, multiple, range, and multiple-range selection. Latest npm version seen: 4.5.2, modified 2024-06-15. | Strong React feature benchmark. |
| `react-day-picker` plus `@daypicker/persian` | React | Official docs include Persian calendar support via `react-day-picker/persian`; npm showed `@daypicker/react` and `@daypicker/persian` version 10.0.1 modified 2026-05-15. | Mainstream React competitor and possible API inspiration for selection modes and accessibility docs. |
| MUI X Date Pickers | React/MUI | Official docs document support for Jalali using `date-fns-jalali` adapters; npm showed `@mui/x-date-pickers` version 9.10.0 modified 2026-07-17. | Strong enterprise benchmark, especially for fields, adapters, and design-system integration. |
| `@hamedf/svelte-persian-datepicker` | Svelte 5 | npm description advertises Jalali, Gregorian, Hijri, single, range, multiple, and customization. Latest npm version seen: 1.4.0, modified 2026-07-07. | Active Svelte signal; shows cross-calendar feature expectations. |
| `vue-jalali-datetime-picker` | Vue | npm showed version 1.2.0 modified 2026-04-30. | Active Vue-specific signal. |
| `vue-persian-datetime-picker` | Vue | npm showed version 2.10.4 modified 2022-06-28. | Legacy Vue benchmark. |
| `@alireza-ab/vue3-persian-datepicker` | Vue 3 | npm showed version 1.0.6 modified 2025-09-30. | Vue 3 niche benchmark. |
| `jalali-angular-datepicker` / `@danaboy/ng-persian-date-picker` | Angular | npm package metadata for `@danaboy/ng-persian-date-picker` showed modified 2022-04-05. | Angular demand exists, but modern maintained choices appear thinner. |
| `antd-jalali` and `antd-jalali-plus` | React/Ant Design | npm descriptions identify them as Ant Design DatePicker/Calendar wrappers for Jalali. Latest metadata seen: `antd-jalali` 2.0.1 modified 2024-06-30; `antd-jalali-plus` 1.4.7 modified 2025-09-19. | Shows adapter/wrapper demand around major UI kits. |
| `react-datepicker2`, `react-modern-calendar-datepicker`, `react-advance-jalaali-datepicker` | React | npm metadata shows older modification dates from 2022 to 2024. | Useful legacy API/feature reference, but not the bar for current project quality. |

## Standards And Platform Findings

- Native `Intl.DateTimeFormat` can format with calendar extensions such as Persian calendar locale tags, but it is a formatting API, not a complete date-picker interaction model.
- Native HTML date inputs serialize dates as normalized `yyyy-mm-dd` values, which is useful for forms but not sufficient for a Persian-first calendar UI.
- WAI-ARIA date picker guidance treats a production date picker as more than a grid: focus management, keyboard navigation, dialog labeling, live regions, and predictable month/year navigation all matter.
- Modern browser Custom Elements can help provide broad framework reach. Form-associated custom elements can improve native form integration, though package docs should document support and fallbacks.
- JavaScript `Date` should not be the internal source of truth for Jalali values because timezone conversion and Gregorian assumptions can leak into the API. Jalali value objects should be primary.

## Feature Benchmark

The advanced product surface should eventually include:

- Single date selection.
- Required single selection.
- Multiple date selection with min/max counts.
- Range selection with open range, hover preview, min/max nights, disabled handling, and optional exclude-disabled behavior.
- Multiple ranges.
- Week, month, and year selection.
- Multi-month display.
- Month and year navigation dropdowns.
- Date input parsing and formatting.
- Popover, modal dialog, and inline modes.
- Mobile-friendly picker presentation.
- Clear, today, apply, cancel, and shortcut actions.
- Disabled/read-only/loading/invalid states.
- Min/max dates and arbitrary disabled matchers.
- Weekend and holiday highlighting hooks.
- Persian and English labels, RTL/LTR, configurable digits, and extensible locale packs.
- Dark mode and CSS variables.
- Headless APIs for design-system users.
- SSR-safe behavior and ESM-first packaging.

## Strategic Recommendation

Build in this order:

1. Stabilize the core Jalali date model and selection engines.
2. Turn the existing React component into a production-quality React package with headless hooks and styled components.
3. Add a Web Component package for broad integration.
4. Add idiomatic Vue 3, Svelte 5, and Angular packages.
5. Add adapters and design-system recipes.

This order preserves momentum from the current code while avoiding the trap of hard-coding all behavior into React.

## Source Links

- jalaali-js: https://github.com/jalaali/jalaali-js
- date-fns-jalali: https://www.npmjs.com/package/date-fns-jalali
- react-multi-date-picker: https://www.npmjs.com/package/react-multi-date-picker
- React DayPicker Persian calendar docs: https://daypicker.dev/localization/persian
- React DayPicker selection modes docs: https://daypicker.dev/docs/selection-modes
- React DayPicker accessibility docs: https://daypicker.dev/guides/accessibility
- MUI X Date Pickers Jalali docs: https://mui.com/x/react-date-pickers/calendar-systems/#jalali
- MDN Intl.DateTimeFormat: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
- MDN HTML date input: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date
- WAI-ARIA Date Picker Dialog example: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/
- MDN Custom Elements: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
- MDN ElementInternals: https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals
- Svelte Persian datepicker package: https://www.npmjs.com/package/@hamedf/svelte-persian-datepicker
- Vue Jalali datetime picker package: https://www.npmjs.com/package/vue-jalali-datetime-picker
- Vue Persian datetime picker package: https://www.npmjs.com/package/vue-persian-datetime-picker
- Ant Design Jalali wrapper package: https://www.npmjs.com/package/antd-jalali
- Ant Design Jalali Plus wrapper package: https://www.npmjs.com/package/antd-jalali-plus

# Architecture And Roadmap

## Current Baseline On 2026-08-09

The current repository is a compact React package:

- `src/calendarMath.ts`: Jalali conversion, comparison, date arithmetic, key formatting, today, month length, month navigation, and month grid generation.
- `src/constraints.ts`: pure min/max date bounds and disabled matcher composition.
- `src/SolarHijriCalendar.tsx`: one inline controlled single-date calendar.
- `src/SolarHijriMultipleCalendar.tsx`: inline controlled multiple-date calendar.
- `src/SolarHijriRangeCalendar.tsx`: inline controlled range calendar.
- `src/selection.ts`: pure range, multiple selection, and matcher helpers.
- `src/labels.ts`: Persian and English month/weekday labels and digit formatting.
- `src/types.ts`: date, month, locale, week-start, and calendar-day types.
- `src/styles.css`: default component styles.
- `src/core.ts`, `src/react.ts`, and `src/index.ts`: framework-neutral, React,
  and compatibility package entry points.
- `src/calendarMath.test.ts` and `src/selection.test.ts`: Vitest coverage for date math, conversions, grid output, and range selection.
- `playground/react`: deployed interactive testing lab with controlled month/year
  navigation and responsive browser QA.
- Build tooling: Vite library mode, TypeScript declarations, React peer dependencies, GitHub Actions CI, CodeQL, and Pages deployment.

## Recommended Package Architecture

Move toward a workspace that separates correctness, behavior, styling, and framework bindings:

```text
packages/
  core/
    Pure Solar Hijri date math, grids, formatting contracts, selection state machines.
  react/
    React hooks and components built on core.
  web-component/
    Framework-neutral custom element, ideally form-associated where browser support allows.
  vue/
    Vue 3 components and composables built on core.
  svelte/
    Svelte 5 components and stores built on core.
  angular/
    Angular components, directives, and ControlValueAccessor integration built on core.
  adapters/
    Optional integrations for date-fns-jalali, dayjs/jalaliday, Intl, and Temporal.
apps/
  docs/
    Documentation site, API docs, examples, and playground.
examples/
  react-vite/
  next/
  vue-vite/
  nuxt/
  sveltekit/
  angular/
```

This structure should be introduced gradually. A framework-neutral `core` entry
point already exists inside the current package; splitting it into independent
workspace packages should wait until the API surface justifies the added release
complexity.

## Public API Direction

Use explicit Jalali value objects as the primary API:

```ts
type SolarHijriDate = { year: number; month: number; day: number };
type SolarHijriRange = { from: SolarHijriDate | null; to: SolarHijriDate | null };
```

Expose Gregorian and ISO conversions as adapters, not as the internal source of truth. This avoids timezone surprises from JavaScript `Date` and keeps Jalali semantics visible.

## Milestones

### Phase 0: Repository Restart

- [x] Record research and roadmap.
- [x] Decide the initial unscoped package name before first publish.
- [x] Add issue templates, pull request template, code of conduct, release notes policy, and docs maintenance rules.
- [x] Document the provenance and release automation plan.
- [x] Publish GitHub source release `v0.1.0`.
- [x] Deploy and verify the public GitHub Pages testing lab.
- [ ] Publish `0.1.0` to npm and verify installation from the registry.
- [x] Keep CI and the public demo passing after the source release.

### Phase 1: Core Correctness

- [x] Expose a framework-neutral core entry point.
- [ ] Complete date arithmetic and validation beyond the current compare,
  conversion, add-day/add-month, and difference helpers.
- [x] Add range, multiple, and disabled matcher engines.
- [x] Add shared min/max date constraints across all selection modes.
- Add deterministic today/timezone injection for tests.
- Add broad conversion fixtures, including leap years and boundary cases.
- Add property-style tests for round-trip conversion and grid invariants.

### Phase 2: React Production Surface

- Keep a simple `SolarHijriCalendar` component.
- Add headless hooks: `useSolarHijriCalendar`, `useSolarHijriRange`, `useSolarHijriDatePicker`.
- Add styled components: `Calendar`, `DatePicker`, `DateRangePicker`, `MonthPicker`, `YearPicker`.
- Add multi-month, min/max, disabled matchers, presets, clear/today/apply actions, and controlled/uncontrolled modes.
- Implement WAI-ARIA keyboard behavior and focus management.
- Add Playwright tests for keyboard navigation, RTL, popover/dialog focus, and mobile layouts.

### Phase 3: Documentation Site

- Add a docs app with live examples.
- Add API reference generated from TypeScript.
- Add framework pages with installation, controlled/uncontrolled examples, theming, forms, SSR, accessibility, and migration notes.
- Add `llms.txt` and compact AI context pages.

### Phase 4: Cross-Framework Packages

- Ship Web Component package for broad reach.
- Ship Vue 3 and Svelte 5 packages.
- Ship Angular package after ControlValueAccessor and date adapter design are settled.
- Add examples for each framework.

### Phase 5: Ecosystem Integrations

- Adapters for date-fns-jalali, dayjs/jalaliday, and native Intl formatting.
- Optional design-system recipes for Tailwind, CSS Modules, Radix/shadcn-style composition, MUI field integration, and Ant Design field integration.
- Optional holiday/preset package if there is enough demand.

## Testing Strategy

- Unit tests for all date math and selection engines.
- Fixture tests against known Jalali/Gregorian conversions.
- Accessibility tests with Testing Library, axe, and Playwright.
- Visual regression tests for RTL/LTR, dark mode, small screens, multi-month layouts, and disabled/range states.
- Package tests for ESM, CJS where supported, type declarations, tree-shaking, and CSS exports.
- Example-app smoke tests in CI.

## Release Strategy

- Use Changesets or semantic-release for versioning.
- Publish packages independently if a workspace is adopted.
- Use provenance-enabled npm publishing from GitHub Actions.
- Maintain a changelog with migration notes for public API changes.
- Treat pre-1.0 releases as API-learning releases but document breaking changes clearly.

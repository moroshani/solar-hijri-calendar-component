# Architecture And Roadmap

This file describes strategic direction. Use
[`implementation-plan.md`](./implementation-plan.md) for the active release
sequence, work-package status, dependencies, and acceptance criteria.

## Current Baseline On 2026-08-19

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
- `src/calendarMath.test.ts`, `src/constraints.test.ts`, and
  `src/selection.test.ts`: Vitest coverage for date math, conversions, grid
  output, constraints, and selection behavior.
- `playground/react`: deployed interactive testing lab with controlled month/year
  navigation and responsive browser QA.
- Build tooling: Vite library mode, TypeScript declarations, React peer dependencies, GitHub Actions CI, CodeQL, and Pages deployment.
- Release state: GitHub source release `v0.1.0` exists, `main` includes verified
  dependency maintenance through `8bfafed4`, and npm publication is pending a
  new reviewed version and tag.

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
- [x] Repair the post-release grouped dependency update and restore a clean audit.
- [ ] Create a new reviewed version/tag, publish it to npm, and verify a clean
  consumer installation from the registry.
- [x] Keep CI and the public demo passing after the source release.

### Phase 1: Core Correctness

- [x] Expose a framework-neutral core entry point.
- [x] Add comparison, conversion, day/month arithmetic, difference, month-length,
  and calendar-grid helpers.
- [x] Add range, multiple, disabled matcher, and shared min/max constraint engines.
- [ ] Complete date arithmetic and validation beyond the current compare,
  conversion, add-day/add-month, and difference helpers: validation, clamp,
  min/max, week/year arithmetic, and explicit invalid-date behavior remain.
- [ ] Add deterministic today/timezone injection for tests.
- [ ] Add broad conversion fixtures, including leap years and boundary cases.
- [ ] Add property-style tests for round-trip conversion and grid invariants.

### Phase 2: React Production Surface

- [x] Keep a simple controlled `SolarHijriCalendar` component.
- [x] Add controlled range and multiple-date calendar components.
- [x] Add controlled month navigation, min/max bounds, disabled matchers, range
  length rules, and multiple-selection count rules.
- [x] Add basic grid roles, labels, selected state, RTL presentation, and mobile
  interaction/visual coverage.
- [ ] Add headless hooks: `useSolarHijriCalendar`, `useSolarHijriRange`, and
  `useSolarHijriDatePicker`.
- [ ] Add styled picker surfaces: `DatePicker`, `DateRangePicker`, `MonthPicker`,
  and `YearPicker`.
- [ ] Add multi-month layouts, presets, clear/today/apply actions, and
  controlled/uncontrolled modes.
- [ ] Implement complete WAI-ARIA grid keyboard behavior, roving focus, and
  popover/dialog focus management. Current day buttons do not implement arrow-key
  navigation.
- [ ] Add Playwright tests for keyboard navigation, RTL focus order,
  popover/dialog focus, and picker workflows.

### Phase 3: Documentation Site

- [x] Deploy an interactive React testing lab with generated integration code.
- [x] Maintain a handwritten API reference and `llms.txt` context index.
- [ ] Add a dedicated docs app with structured live examples.
- [ ] Generate API reference material from TypeScript.
- [ ] Add framework pages with installation, controlled/uncontrolled examples,
  theming, forms, SSR, accessibility, and migration notes.
- [ ] Add compact per-surface AI context pages if the package splits.

### Phase 4: Cross-Framework Packages

- [ ] Ship a Web Component package for broad reach.
- [ ] Ship Vue 3 and Svelte 5 packages.
- [ ] Ship Angular after ControlValueAccessor and date adapter design settle.
- [ ] Add examples and smoke tests for each framework.

### Phase 5: Ecosystem Integrations

- [ ] Add adapters for date-fns-jalali, dayjs/jalaliday, and native Intl formatting.
- [ ] Add optional design-system recipes for Tailwind, CSS Modules,
  Radix/shadcn-style composition, MUI fields, and Ant Design fields.
- [ ] Add an optional holiday/preset package only if demand justifies it.

## Recommended Next Sequence

1. Decide the first npm release boundary, bump from `0.1.0`, create a matching
   reviewed tag, publish, and run clean consumer smoke tests.
2. Finish date validation and boundary/property fixtures before broadening the
   component surface.
3. Implement the WAI-ARIA keyboard/focus model and prove it in Playwright.
4. Extract headless React hooks, then add date/range/month/year picker surfaces.
5. Build generated documentation around the stabilized API.
6. Start cross-framework packages only after the core and accessibility
   contracts have held through real use.

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

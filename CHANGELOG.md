# Changelog

All notable changes to this project are documented here.

The project follows semantic versioning after `1.0.0`. Pre-1.0 releases may refine the public API, with breaking changes called out explicitly.

## [Unreleased]

### Added

- Added public date, month, and range validation predicates and assertion APIs,
  plus explicit `-61..3176` full-year support constants.
- Added exact week movement, clamping year movement, earlier/later selection,
  inclusive bound checks, and reusable date clamping helpers.

### Changed

- Defined one invalid-input contract across date math, conversion, grids,
  constraints, selections, and date labels: validation predicates return
  `false`; other helpers throw `RangeError` for supplied invalid values.
- Validated complete date and matcher collections before evaluation, rejected
  reversed min/max bounds, and preserved `null`/`undefined` only as documented
  absence.
- Corrected negative-year month arithmetic and rejected fractional or
  out-of-range movement instead of relying on JavaScript normalization.
- Emitted ESM-compatible `.js` specifiers in declarations so strict TypeScript
  `NodeNext` consumers can resolve every public entry point.
- Defined symmetric positive/negative year movement: preserve month and day
  when valid, otherwise clamp to the target month's final real day.

These invalid-input changes are a deliberate pre-1.0 behavior tightening for
the planned `0.2.0` release. Existing valid-date results remain compatible.

## [0.1.1] - 2026-08-26

### Added

- Rebuilt the public GitHub Pages testing lab with explicit month/year selectors,
  single/range/multiple mode switching, localization and constraint controls, a
  live state inspector, and generated React integration code.
- Added responsive browser coverage for controlled month/year navigation.

### Changed

- Expanded the responsive interaction matrix from 15 to 25 Playwright checks.
- Reworked the lab layout for focused desktop and mobile component evaluation.
- Updated the grouped frontend dependency graph and raised the explicit Nano ID
  security override to `3.3.18`.
- Reconciled the roadmap with the implemented package and added an execution
  plan with release boundaries, ordered work packages, acceptance criteria, and
  durable agent handoff state.

### Security

- Restored a zero-vulnerability `npm audit --audit-level=high` result after the
  grouped dependency update exposed an outdated Nano ID override.

## [0.1.0] - 2026-08-08

### Added

- Controlled single-date React calendar.
- Controlled range calendar with range constraints and disabled-date handling.
- Controlled multiple-date calendar with count limits and required selection support.
- Framework-neutral Solar Hijri date math, conversion, constraints, and selection helpers.
- Persian and English labels with RTL-aware presentation.
- React playground with responsive interaction and visual verification.
- ESM, CommonJS, TypeScript declaration, and CSS package exports.
- CI for lint, unit tests, builds, Playwright interaction tests, and responsive screenshots.

### Changed

- Hardened package output, contributor guidance, security contact, and release documentation for the first public release.

[Unreleased]: https://github.com/moroshani/solar-hijri-calendar-component/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/moroshani/solar-hijri-calendar-component/releases/tag/v0.1.1
[0.1.0]: https://github.com/moroshani/solar-hijri-calendar-component/releases/tag/v0.1.0

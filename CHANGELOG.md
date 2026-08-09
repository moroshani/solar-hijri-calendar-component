# Changelog

All notable changes to this project are documented here.

The project follows semantic versioning after `1.0.0`. Pre-1.0 releases may refine the public API, with breaking changes called out explicitly.

## [Unreleased]

### Added

- Rebuilt the public GitHub Pages testing lab with explicit month/year selectors,
  single/range/multiple mode switching, localization and constraint controls, a
  live state inspector, and generated React integration code.
- Added responsive browser coverage for controlled month/year navigation.

### Changed

- Expanded the responsive interaction matrix from 15 to 25 Playwright checks.
- Reworked the lab layout for focused desktop and mobile component evaluation.

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

[Unreleased]: https://github.com/moroshani/solar-hijri-calendar-component/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/moroshani/solar-hijri-calendar-component/releases/tag/v0.1.0

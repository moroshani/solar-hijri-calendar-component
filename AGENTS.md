# Agent Instructions

## Project Purpose

Build trustworthy, accessible Solar Hijri and Jalali date primitives and frontend components, beginning with React and a framework-neutral core.

## Start Here

1. Read `README.md` and `docs/README.md`.
2. Read `docs/api.md` before changing exports.
3. Read `docs/architecture-roadmap.md` before changing package boundaries.
4. Search existing issues and pull requests before starting public work.

## Architecture

- `src/calendarMath.ts`: pure conversion, date arithmetic, and month grids.
- `src/constraints.ts`: min/max bounds and disabled-date composition.
- `src/selection.ts`: range and multiple selection behavior.
- `src/SolarHijri*Calendar.tsx`: React components.
- `src/core.ts`, `src/react.ts`, `src/index.ts`: package entry points.
- `playground/react`: interactive development and visual QA surface.
- `tests/playwright`: responsive browser interaction and screenshots.

Prefer codebase-memory graph tools for code discovery when available. Use direct text search for configuration and documentation.

## Verification

Run:

```bash
npm ci
npm run verify
npm run package:check
git diff --check
```

For narrow changes, run focused tests during development and the complete verification before release or review.

## Contribution Rules

- Preserve framework-neutral date behavior below framework adapters.
- Use explicit Solar Hijri value objects instead of implicit JavaScript `Date` state.
- Keep Persian, RTL, keyboard, and screen-reader behavior first-class.
- Add regression tests for date math and selection behavior.
- Update public docs and the changelog with public API changes.
- Do not commit credentials, private data, package tokens, or generated release archives.
- AI-assisted changes must be reviewed, understood, disclosed when material, and tested by the contributor.


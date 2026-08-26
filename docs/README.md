# Solar Hijri Calendar Docs

This directory is the source-controlled planning and maintenance memory for the project.

The project goal is to provide professional, accessible Solar Hijri / Jalali calendar primitives and components across frontend stacks, from single-date calendars to advanced date pickers, ranges, multiple selection, adapters, and framework integrations.

## Current Status

- Repository baseline date: 2026-08-26.
- Current implementation: React single, range, and multiple calendar components;
  framework-neutral validation, date math, constraints, and selection entry
  points; Persian/English labels; CSS; Vitest coverage; Vite library packaging;
  and an interactive React testing lab.
- Current package state: `v0.1.1` is published on
  [npm](https://www.npmjs.com/package/solar-hijri-calendar-component/v/0.1.1)
  and as a [GitHub release](https://github.com/moroshani/solar-hijri-calendar-component/releases/tag/v0.1.1)
  from tagged commit `644085f`. The testing lab is live at
  `https://moroshani.github.io/solar-hijri-calendar-component/`.
- Current verification: the exact `0.1.1` tag passed a clean install, zero known
  audit vulnerabilities, TypeScript checks, 22 unit tests, library and lab
  builds, 25 responsive Playwright interaction checks, 5 visual captures,
  package inspection, and clean tarball consumers. A second clean consumer gate
  passed against the package downloaded from npm, including ESM, CommonJS,
  TypeScript, React SSR, core, react, and CSS exports. CI, CodeQL, and Demo are
  green on tagged commit `644085f`; `REL-101` is complete.
- Future `v*` tags use `.github/workflows/publish.yml`, which is bound to the npm
  package as its GitHub Actions Trusted Publisher. The workflow runs the full
  release gate and publishes through short-lived OIDC credentials without a
  stored npm token.
- `CORE-101` is complete in PR `#3`: runtime date/month/range predicates and
  assertions now cover malformed values, leap days, supported
  full-year boundaries (`-61..3176`), and invalid-input behavior across core
  entry points. The focused suite currently passes 48 tests, and a clean local
  tarball consumer passes ESM, CommonJS, strict TypeScript `NodeNext`, React
  SSR, core, and CSS checks.
- `CORE-102` is active on `core/arithmetic-and-bounds`: exact week movement,
  clamping year movement, deterministic earlier/later helpers, and inclusive
  bound/clamp primitives are implemented with focused boundary coverage. The
  full unit suite now contains 53 tests. The npm and GitHub release remain at
  `v0.1.1`; these changes are planned for `0.2.0` and have not been published.

## Documentation Map

- [Product Vision](./product-vision.md): product thesis, users, principles, scope, and feature pillars.
- [API Reference](./api.md): exported components, types, date math, and selection helpers.
- [Theming](./theming.md): CSS variables and custom day rendering.
- [Implementation Plan](./implementation-plan.md): active release sequence,
  work packages, dependencies, acceptance criteria, and handoff state.
- [Architecture And Roadmap](./architecture-roadmap.md): recommended package architecture, phases, release strategy, and testing strategy.
- [Playgrounds And Screenshots](./playgrounds-and-screenshots.md): local stack playgrounds, Playwright screenshots, and hosting recommendation.
- [Demo Deployment](./demo-deployment.md): GitHub Pages deployment and future custom-domain guidance.
- [Release Process](./release-process.md): versioning, verification, package inspection, publication, and rollback.
- [v0.1.1 Release Notes](./releases/v0.1.1.md): publication metadata and verification record for the first npm release.
- [Ecosystem Research 2026-07-18](./research/ecosystem-research-2026-07-18.md): competitor and standards research with source links.
- [User Signals 2026-07-18](./research/user-signals-2026-07-18.md): public repository and issue signals that influence feature priorities.
- [Non-Jalali Feature Benchmark 2026-07-18](./research/non-jalali-feature-benchmark-2026-07-18.md): mature date-picker feature and UX patterns to match or exceed.
- [AI Maintenance](./ai-maintenance.md): rules for keeping documentation useful for maintainers and coding agents.

## Maintenance Rules

- Update docs in the same pull request as public API, feature, architecture, or packaging changes.
- Keep dated research documents immutable except for typo fixes. Add new dated research notes when the ecosystem changes.
- Keep `docs/README.md`, `README.md`, and `llms.txt` aligned whenever docs are moved or renamed.
- Prefer concrete dates over relative terms like "now", "recent", or "latest".
- Keep examples runnable and tied to exported APIs.

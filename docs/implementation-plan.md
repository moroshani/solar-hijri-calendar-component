# Implementation Plan

Status: active

Baseline audited: 2026-08-26

Code baseline: `644085f` (`v0.1.1` tagged release)

Next work package: `CORE-101`

This document turns the strategic roadmap into ordered, testable work. It is the
execution source of truth for maintainers and coding agents. Update it whenever
a work package starts, finishes, changes scope, or becomes blocked.

## Source Of Truth

- `docs/implementation-plan.md`: execution order, package status, dependencies,
  and acceptance criteria.
- `docs/architecture-roadmap.md`: long-term architecture and product phases.
- `docs/api.md`: APIs that actually exist.
- `CHANGELOG.md`: behavior delivered to users.
- GitHub issues and pull requests: discussion and review records, not a
  substitute for keeping this plan current.

When these disagree, verify the implementation and tests, then correct all
affected documents in the same change.

## Current Baseline

The repository currently provides:

- Framework-neutral conversion, comparison, date arithmetic, month grids,
  constraints, and selection helpers.
- Controlled React calendars for single, range, and multiple selection.
- Persian and English labels, RTL presentation, explicit month/year navigation,
  and responsive component styles.
- 22 Vitest checks, 25 Playwright interaction checks, 5 visual captures, and
  ESM/CommonJS/TypeScript/React/CSS consumer verification.
- A live GitHub Pages testing lab and matching GitHub release `v0.1.1`.
- A verified npm package at
  `solar-hijri-calendar-component@0.1.1`, installed and tested from the public
  registry in a clean consumer project.

The first registry package was published on 2026-08-26 from annotated tag
`v0.1.1` at commit `644085f`. Version `0.1.0` remains the earlier source-only
GitHub release and must never be reused for a different tree.

## Release Map

| Milestone | Outcome | Included work | Exit condition |
| --- | --- | --- | --- |
| `0.1.1` Foundation | Establish the existing package on npm without expanding its API. | `REL-101` | Registry install and all consumer checks pass for the tagged tree. |
| `0.2.0` Production core | Make date behavior and inline calendar accessibility dependable. | `CORE-101` through `CORE-104`, `A11Y-201` through `A11Y-203`, `REL-200` | Correctness fixtures, keyboard model, browser proofs, and release checks pass. |
| `0.3.0` Picker suite | Add headless React behavior and production picker surfaces. | `PICKER-301` through `PICKER-305`, `REL-300` | Date, range, month, and year picker workflows pass package and browser gates. |
| Documentation expansion | Replace scattered examples with generated, structured documentation. | `DOCS-401` through `DOCS-403` | Public APIs and examples are generated or compile-tested. |
| Cross-framework expansion | Reuse the stable core outside React. | `XFW-501` onward | Each adapter has idiomatic examples, tests, and an independent release contract. |

Version targets are working boundaries. Changing one requires an explicit note
in this file and `CHANGELOG.md`; never silently move shipped behavior between
releases.

## Delivery Rules

1. Work on one package at a time unless a package is blocked by an external
   owner action.
2. Search issues and pull requests before starting, then record the chosen issue
   or branch beside the package status.
3. Keep framework-neutral behavior in `src/calendarMath.ts`,
   `src/constraints.ts`, or `src/selection.ts`; React files should adapt that
   behavior rather than duplicate it.
4. Every behavior change needs a focused regression test. Visual or interaction
   changes also need Playwright evidence at desktop and mobile widths.
5. Public API changes update `docs/api.md`, README examples, `llms.txt`, and the
   changelog in the same pull request.
6. Finish every release or review candidate with:

   ```bash
   npm ci
   npm run verify
   npm run package:check
   git diff --check
   ```

7. Publishing requires a clean worktree at the exact reviewed tag. Never move
   or reuse a release tag.

## Work Packages

Statuses: `next`, `ready`, `blocked`, `in progress`, or `done`.

### REL-101: First npm Publication

Status: `done` on 2026-08-26

Target: `0.1.1`

Scope rule: release the current foundation; do not add new component APIs.

#### REL-101A: Release Audit And Candidate

Status: `done` on 2026-08-26 at candidate commit `7fe0721`

- Confirm the package name immediately before publication.
- Review all runtime exports, peer dependencies, metadata, README installation
  text, license, and packed files.
- Bump `package.json` and `package-lock.json` together to `0.1.1`.
- Move current unreleased maintenance notes under a `0.1.1` changelog entry.
- Run the complete verification and package-consumer matrix from a clean tree.
- Prepare release notes and a candidate commit without creating the tag yet.

Acceptance criteria:

- The tarball contains only intended runtime files, declarations, CSS, package
  metadata, README, and license material.
- ESM, CommonJS, TypeScript, React, core, and CSS consumers pass.
- CI, CodeQL, and Demo workflows are green on the candidate commit.
- No code or package metadata differs between the candidate commit and the tree
  selected for publication.

#### REL-101B: Registry Publication

Status: `done` on 2026-08-26 at tagged commit `644085f`

- Create signed or annotated tag `v0.1.1` at the reviewed candidate.
- Publish from a clean worktree at that tag.
- Install `solar-hijri-calendar-component@0.1.1` in clean consumer projects.
- Repeat the ESM, CommonJS, TypeScript, React, core, and CSS checks against the
  registry artifact.
- Publish the matching GitHub release and update installation notices.
- Configure trusted publishing with provenance as a follow-up when available.

Acceptance criteria:

- npm, GitHub tag, GitHub release, changelog, and package metadata identify the
  same version and commit.
- A clean machine can install and render the package from npm.
- Registry metadata and integrity are recorded in the release notes. Trusted
  publishing with provenance remains an explicit release-infrastructure
  follow-up and does not require a long-lived npm token.

### CORE-101: Date Validity Contract

Status: `next`

- Define valid year, month, and day behavior for all public helpers.
- Add an explicit validation API and document whether invalid inputs return a
  value, return `false`, or throw.
- Apply one consistent contract to conversion, comparison, arithmetic, grid,
  constraint, and selection entry points.
- Add leap-year, month-boundary, malformed-value, and out-of-range tests.

Acceptance criteria:

- No public helper depends on accidental JavaScript normalization.
- Invalid-input behavior is documented and covered for every export family.
- Existing valid-date behavior remains backward compatible or the breaking
  change is explicitly assigned to `0.2.0`.

### CORE-102: Arithmetic And Bounds

Status: `ready after CORE-101`

- Add week and year arithmetic.
- Add reusable clamp, earlier/later, and inclusive bound helpers.
- Define leap-day and end-of-month behavior before implementation.
- Reuse these primitives in constraints and selection where appropriate.

Acceptance criteria:

- Boundary behavior is symmetric for positive and negative movement.
- Tests cover leap years, year rollover, short months, and min/max edges.
- React components do not carry duplicate date arithmetic.

### CORE-103: Deterministic Clock Boundary

Status: `ready after CORE-101`

- Make today-dependent behavior injectable without leaking JavaScript `Date`
  into Solar Hijri state.
- Define local-time and timezone expectations in the API reference.
- Add deterministic tests around Gregorian day and year transitions.

Acceptance criteria:

- Tests never depend on the machine's current wall clock.
- Consumers can supply a stable notion of today for SSR, testing, and fixed
  business timezones.

### CORE-104: Correctness Evidence

Status: `ready after CORE-101`

May proceed alongside `CORE-102` and `CORE-103` once the validity contract is
fixed.

- Add trusted Jalali/Gregorian fixtures for leap years and historical/future
  boundaries supported by the underlying conversion engine.
- Add property-style round-trip, monotonicity, month-grid, and selection
  invariants.
- Record fixture provenance and supported-range assumptions.

Acceptance criteria:

- Round-trip conversion and grid invariants cover broad deterministic samples.
- Fixture provenance is reviewable and does not rely on a single undocumented
  online converter.
- Failures report the offending date and invariant clearly.

### A11Y-201: Keyboard And Focus Model

Status: `ready after CORE-101`

- Document the WAI-ARIA grid interaction model before changing components.
- Define roving focus, initial focus, arrow keys, Home/End, Page Up/Down,
  selection keys, disabled dates, RTL behavior, and month transitions.
- Define visible focus and screen-reader announcement requirements.

Acceptance criteria:

- The model covers single, range, and multiple calendars without contradictory
  behavior.
- Expected behavior is represented as a test matrix before implementation.

### A11Y-202: Shared Accessible Calendar Behavior

Status: `ready after A11Y-201`

- Implement the shared focus/navigation engine once.
- Apply it to all three React calendars.
- Preserve controlled selection and controlled visible-month behavior.
- Add component-level tests for roles, names, focus, selection, and disabled
  behavior.

Acceptance criteria:

- Only one day is in the tab sequence at a time.
- Keyboard navigation works across month/year boundaries and in RTL.
- Disabled dates cannot be selected and do not trap focus.
- Screen-reader labels include an unambiguous full date and state.

### A11Y-203: Browser Accessibility Proof

Status: `ready after A11Y-202`

- Add desktop and mobile Playwright keyboard workflows.
- Cover Persian/RTL and English/LTR modes.
- Add automated accessibility checks where they provide stable signal.
- Capture focused, selected, range, disabled, and month-transition visual states.

Acceptance criteria:

- Keyboard-only users can reach, operate, and leave every inline calendar.
- Browser tests prove focus order and selection in all three modes.
- No serious automated accessibility violations remain in the testing lab.

### REL-200: Production Core Release

Status: `blocked by CORE-101..104 and A11Y-201..203`

Target: `0.2.0`

- Review compatibility and migration notes.
- Run the full package, browser, visual, and clean-consumer matrix.
- Publish a matching tag, GitHub release, and npm release.

### PICKER-301: Headless React Contracts

Status: `ready after REL-200`

- Design headless calendar, range, and date-picker hooks around the stabilized
  core and focus model.
- Support controlled and uncontrolled state without duplicating selection
  engines.
- Test hooks independently from presentation.

### PICKER-302: Month And Year Pickers

Status: `ready after PICKER-301`

- Add accessible month and year selection surfaces.
- Support bounds, disabled periods, localization, controlled values, and clear
  focus return.

### PICKER-303: Date Picker

Status: `ready after PICKER-301 and PICKER-302`

- Add input/trigger, popover or dialog, parsing/display boundaries, clear,
  today, apply, and cancellation behavior.
- Cover focus entry, focus trap where applicable, Escape, outside interaction,
  and focus restoration.

### PICKER-304: Date Range Picker

Status: `ready after PICKER-303`

- Add range input/display behavior, presets, range constraints, and optional
  multi-month presentation.
- Preserve explicit partial-range semantics.

### PICKER-305: Advanced Composition

Status: `ready after PICKER-304`

- Add multi-month layouts, reusable presets, render hooks, and form examples.
- Verify SSR and hydration behavior in a clean example application.

### REL-300: Picker Suite Release

Status: `blocked by PICKER-301..305`

Target: `0.3.0`

- Publish the stabilized headless and styled picker APIs with migration notes,
  complete examples, and consumer tests.

### DOCS-401 Through DOCS-403: Documentation Expansion

Status: `ready after public APIs stabilize`

1. `DOCS-401`: create a dedicated docs application with structured examples.
2. `DOCS-402`: generate API material from TypeScript and compile all examples.
3. `DOCS-403`: add installation, theming, forms, SSR, accessibility, migration,
   and AI-context pages for every public surface.

### XFW-501 And Later: Cross-Framework Expansion

Status: `deferred until React/core contracts stabilize`

1. Web Component with form-associated behavior where support permits.
2. Vue 3 and Svelte 5 adapters with idiomatic state bindings.
3. Angular component and `ControlValueAccessor` integration.
4. Optional date-library and design-system adapters.

Each framework package needs its own smoke application, accessibility checks,
package inspection, and release contract. Framework work must not fork the date
or selection semantics.

## Definition Of Done

A work package is `done` only when:

- Its acceptance criteria are demonstrated by code, tests, or a recorded owner
  action.
- Focused tests and the complete applicable verification gate pass.
- Public API and behavior documentation match the implementation.
- `CHANGELOG.md` records user-visible changes.
- The testing lab demonstrates relevant interactive behavior.
- No unrelated generated files, secrets, screenshots, or release archives are
  committed.
- This plan records the completion date and names the next package.

## Handoff Record

At the end of a work session, update this section instead of leaving progress
only in chat.

- Last audited: 2026-08-26.
- Last completed: `REL-101B`, npm publication and registry-consumer verification.
- Verification: the exact `v0.1.1` tag passed on 2026-08-26: clean
  install, zero known audit vulnerabilities, TypeScript checks, 22 unit tests,
  package and playground builds, 25 interaction tests, 5 visual captures,
  publish dry-run, 34-file tarball inspection, clean ESM/CommonJS/TypeScript/
  React/core/CSS tarball consumers, and diff checks. A fresh install from npm
  repeated the consumer checks and audit successfully.
- Hosted verification: CI, CodeQL, and Demo are green on tagged commit
  `644085f`. npm `latest`, the annotated tag, and the GitHub release all identify
  `0.1.1`.
- Active package: none; `CORE-101` is ready to start.
- Next package: `CORE-101`, date validity contract.
- External blocker: none.
- Known deferred work: core correctness, complete keyboard/focus behavior,
  headless hooks, picker surfaces, generated docs, cross-framework packages,
  and trusted publishing with provenance.

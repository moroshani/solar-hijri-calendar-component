# Solar Hijri Calendar Docs

This directory is the source-controlled planning and maintenance memory for the project.

The project goal is to provide professional, accessible Solar Hijri / Jalali calendar primitives and components across frontend stacks, from single-date calendars to advanced date pickers, ranges, multiple selection, adapters, and framework integrations.

## Current Status

- Repository baseline date: 2026-08-08.
- Current implementation: small React library package with inline single, range, and multiple calendar components, date math helpers, selection engines, labels, CSS, Vitest tests, Vite library build, and a React playground.
- Current package state: `0.1.0` release candidate. `npm view solar-hijri-calendar-component` returned 404 on 2026-08-08, so the package name remains unpublished.
- Release-candidate checks on 2026-08-08: clean dependency install, zero known audit vulnerabilities, TypeScript lint, 22 unit tests, library and playground builds, 15 responsive Playwright interaction tests, 5 visual captures, npm tarball inspection, and separate ESM, CommonJS, TypeScript, React, and CSS consumer checks all passed.

## Documentation Map

- [Product Vision](./product-vision.md): product thesis, users, principles, scope, and feature pillars.
- [API Reference](./api.md): exported components, types, date math, and selection helpers.
- [Theming](./theming.md): CSS variables and custom day rendering.
- [Architecture And Roadmap](./architecture-roadmap.md): recommended package architecture, phases, release strategy, and testing strategy.
- [Playgrounds And Screenshots](./playgrounds-and-screenshots.md): local stack playgrounds, Playwright screenshots, and hosting recommendation.
- [Demo Deployment](./demo-deployment.md): GitHub Pages deployment and future custom-domain guidance.
- [Release Process](./release-process.md): versioning, verification, package inspection, publication, and rollback.
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

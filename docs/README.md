# Solar Hijri Calendar Docs

This directory is the source-controlled planning and maintenance memory for the project.

The project goal is to provide professional, accessible Solar Hijri / Jalali calendar primitives and components across frontend stacks, from single-date calendars to advanced date pickers, ranges, multiple selection, adapters, and framework integrations.

## Current Status

- Repository baseline date: 2026-08-26.
- Current implementation: React single, range, and multiple calendar components; framework-neutral date math, constraints, and selection entry points; Persian/English labels; CSS; Vitest coverage; Vite library packaging; and an interactive React testing lab.
- Current package state: GitHub source release `v0.1.0` is published and the testing lab is live at `https://moroshani.github.io/solar-hijri-calendar-component/`. Version `0.1.1` is the reviewed candidate for the first npm publication; the registry package remains unpublished until `REL-101B` finishes.
- Current verification: the local `0.1.1` candidate gate passed on 2026-08-26
  with a clean install, zero known audit vulnerabilities, TypeScript checks, 22
  unit tests, library and lab builds, 25 responsive Playwright interaction
  checks, 5 visual captures, npm publish dry-run, tarball inspection, and clean
  ESM, CommonJS, TypeScript, React, core, and CSS consumers. CI, CodeQL, and Demo
  must still pass on the candidate commit before `REL-101A` is complete.

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
- [v0.1.1 Release Notes](./releases/v0.1.1.md): prepared notes and verification record for the first npm release.
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

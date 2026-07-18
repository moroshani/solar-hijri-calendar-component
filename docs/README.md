# Solar Hijri Calendar Docs

This directory is the source-controlled planning and maintenance memory for the project.

The project goal is to provide professional, accessible Solar Hijri / Jalali calendar primitives and components across frontend stacks, from single-date calendars to advanced date pickers, ranges, multiple selection, adapters, and framework integrations.

## Current Status

- Repository baseline date: 2026-07-18.
- Current implementation: small React library package with one inline calendar component, date math helpers, labels, CSS, Vitest tests, and Vite library build.
- Current package state: local package only. `npm view solar-hijri-calendar-component` returned 404 on 2026-07-18, so the package name was not published to npm at that time.
- Checks at restart baseline: `npm run lint`, `npm test`, and `npm run build` passed on 2026-07-18.

## Documentation Map

- [Product Vision](./product-vision.md): product thesis, users, principles, scope, and feature pillars.
- [API Reference](./api.md): exported components, types, date math, and selection helpers.
- [Theming](./theming.md): CSS variables and custom day rendering.
- [Architecture And Roadmap](./architecture-roadmap.md): recommended package architecture, phases, release strategy, and testing strategy.
- [Playgrounds And Screenshots](./playgrounds-and-screenshots.md): local stack playgrounds, Playwright screenshots, and hosting recommendation.
- [Demo Deployment](./demo-deployment.md): GitHub Pages deployment and future custom-domain guidance.
- [Ecosystem Research 2026-07-18](./research/ecosystem-research-2026-07-18.md): competitor and standards research with source links.
- [User Signals 2026-07-18](./research/user-signals-2026-07-18.md): public repository and issue signals that influence feature priorities.
- [AI Maintenance](./ai-maintenance.md): rules for keeping documentation useful for maintainers and coding agents.

## Maintenance Rules

- Update docs in the same pull request as public API, feature, architecture, or packaging changes.
- Keep dated research documents immutable except for typo fixes. Add new dated research notes when the ecosystem changes.
- Keep `docs/README.md`, `README.md`, and `llms.txt` aligned whenever docs are moved or renamed.
- Prefer concrete dates over relative terms like "now", "recent", or "latest".
- Keep examples runnable and tied to exported APIs.

# Product Vision

## Mission

Make high-quality Solar Hijri / Jalali calendar UI available to frontend teams without forcing them into one framework, one design system, or one date library.

## Problem

Frontend teams that need Jalali calendars usually face one of these tradeoffs:

- A feature-rich date picker that is tied to a single framework or styling model.
- A mainstream calendar library with partial Persian calendar support but limited Jalali-specific product polish.
- A date math library without accessible, production-ready UI.
- Legacy packages that still work for basic cases but are stale, thinly typed, or hard to integrate in modern apps.

This project should close that gap with reliable calendar logic, accessible interaction models, idiomatic framework packages, and documentation that is easy for humans and AI agents to maintain.

## Target Users

- Product teams building Persian, Iranian, Afghan, Tajik, or RTL-first web applications.
- Design-system maintainers who need calendar primitives they can theme.
- SaaS and admin-panel teams that need date filters, reporting ranges, bookings, deadlines, billing dates, and form fields.
- Open-source contributors who want a clear, testable, multi-package roadmap.

## Product Principles

- Calendar correctness is a core feature, not an implementation detail.
- Persian and RTL behavior are first-class, not bolt-ons.
- Accessibility is part of the API contract.
- Headless primitives and styled components should coexist.
- Framework packages should feel idiomatic in their own ecosystems.
- No single UI framework dependency should be required for the core packages.
- Documentation should be source-controlled, dated, and friendly to coding agents.

## Scope

### Core Capabilities

- Solar Hijri date type, month type, date range type, and serialized date keys.
- Conversion to and from Gregorian dates.
- Date comparison, validation, clamp, min/max, add/subtract day/week/month/year.
- Month grid generation with configurable week start.
- Locale-aware labels, number systems, direction, and formatting hooks.
- Selection engines for single, multiple, range, multiple ranges, week, month, and year selection.
- Disabled-date matchers, including exact dates, date ranges, weekdays, min/max, and custom predicates.

### Component Capabilities

- Inline calendar.
- Date picker with input and popover/dialog.
- Date range picker.
- Multiple-date picker.
- Multi-month calendar.
- Month picker and year picker.
- Presets and shortcuts.
- Today, clear, apply, and cancel actions.
- Controlled and uncontrolled modes.
- Form integration and validation states.
- Headless hooks/state machines for design-system integration.
- Styled default components with CSS variables and dark mode.

### Framework Targets

Recommended package path:

- Core TypeScript package first.
- React package second, because the current implementation is already React.
- Web Component package early, because it provides broad framework reach.
- Vue 3, Svelte 5, and Angular packages after the core API is stable.
- Optional adapters for date-fns-jalali, dayjs/jalaliday, Temporal where practical, and native Intl formatting.

## Non-Goals

- Do not become a full date-time business rules engine.
- Do not bundle large UI frameworks into the core package.
- Do not depend on one app framework such as Next.js, Nuxt, SvelteKit, or Angular CLI for core behavior.
- Do not hide Jalali date semantics behind JavaScript `Date` objects.

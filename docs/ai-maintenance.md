# AI-Friendly Documentation Maintenance

This project should be easy for coding agents to inspect, update, and verify without guessing.

## Required AI Entry Points

- `README.md`: human overview, install, quick start, and links.
- `llms.txt`: compact machine-readable index of the docs.
- `docs/README.md`: canonical docs map and maintenance policy.
- `docs/product-vision.md`: product goal and scope.
- `docs/architecture-roadmap.md`: package architecture and milestones.
- `docs/research/*.md`: dated, source-linked ecosystem research.

## Documentation Rules For Code Changes

When a change affects public behavior, update all matching docs in the same pull request:

- Public props, types, hooks, components, exports: update README and API docs.
- Package names, install commands, import paths: update README, docs index, examples, and `llms.txt`.
- Architecture/package layout: update architecture roadmap and docs index.
- Selection behavior, accessibility, keyboard commands, or localization: update feature docs and tests.
- Research-sensitive claims: add a dated research note instead of overwriting old research context.

## AI Agent Workflow

Agents working in this repository should:

- Read `docs/README.md` and `llms.txt` first.
- Prefer the codebase knowledge graph for code discovery when available.
- Run `npm run lint`, `npm test`, and `npm run build` after changes unless the change is docs-only.
- Use concrete dates in docs and issue summaries.
- Keep docs examples aligned with actual exported APIs.
- Avoid making claims about current external packages without checking current sources.

## Good AI Context Shape

Each durable doc should make these answers obvious:

- What problem does this project solve?
- What is the current implementation state?
- Which APIs are stable, experimental, or planned?
- Which files should change when a feature changes?
- Which tests prove the behavior?
- Which external sources support ecosystem or standards claims?

## Maintenance Checklist

Before merging meaningful changes:

- [ ] Public API docs match exported TypeScript.
- [ ] Examples compile against package exports.
- [ ] Accessibility behavior is documented and tested.
- [ ] Framework-specific docs use idiomatic examples for that framework.
- [ ] `llms.txt` links are still valid.
- [ ] Dated research claims are not presented as timeless facts.


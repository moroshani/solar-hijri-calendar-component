# Contributing

Thanks for helping improve this component.

## Before Starting

- Search existing issues and pull requests for overlapping work.
- Open an issue before broad API, architecture, or dependency changes.
- Keep Persian, RTL, accessibility, and framework-neutral core behavior first-class.

## Development

```bash
npm ci
npm run verify
```

For focused work, run the relevant command first and finish with the full verification command before requesting review.

## Pull Requests

- Keep the public API small and typed.
- Add or update tests for date logic.
- Keep Persian/RTL behavior first-class.
- Do not add large UI frameworks unless they are clearly justified.
- Update the README, API reference, changelog, and examples when public behavior changes.
- Confirm `npm run package:check` does not include tests, fixtures, secrets, or generated development artifacts.

## AI-Assisted Contributions

AI tools may assist with research, implementation, tests, and documentation. Contributors remain responsible for the submitted change.

- Review and understand every generated change.
- Disclose material AI assistance in the pull request.
- Do not submit unreviewed bulk output.
- Run the same checks required for manually written changes.
- Never provide private data, credentials, or third-party confidential code to an AI tool.

## Reporting Security Issues

Follow [SECURITY.md](./SECURITY.md) instead of opening a public issue with exploit details.

# Release Process

## Release Principles

- Release only from a clean `main` branch with successful CI.
- Keep version, changelog, tag, GitHub release, and npm package aligned.
- Inspect the exact package contents before publication.
- Use applicant-controlled npm authentication and never store npm credentials in the repository.
- Prefer npm trusted publishing with provenance after the initial package is established.

## Verification

```bash
npm ci
npm run verify
npm run package:check
git diff --check
```

Confirm that the package contains only runtime JavaScript, TypeScript declarations, CSS, package metadata, the README, and the license. Test declarations, fixtures, screenshots, and source-control artifacts must not be present.

## First npm Publication

Completed on 2026-08-26 as `v0.1.1` from commit `644085f`. The following record
is retained as the reproducible process used for the initial publication.

1. Confirm the npm package name is still available.
2. Authenticate through an applicant-controlled npm account with two-factor authentication.
3. Create a new reviewed package version and GitHub tag. Current `main` includes
   dependency maintenance after `v0.1.0`, so the first registry release must not
   reuse version `0.1.0` for a different tree.
4. Create a clean temporary worktree at the new tag, rerun the release gate, and run
   `npm publish --access public` there.
5. Install the package from npm in a clean temporary consumer project.
6. Verify ESM, CommonJS, TypeScript declarations, React peer dependencies, core exports, and CSS exports.
7. Record the registry URL and verification result, then remove the README's
   pending-publication notice in a follow-up documentation commit.

If package code or publishable metadata must change after `v0.1.0`, bump the
version and create a new reviewed tag instead of moving the existing tag or
publishing a tree that does not match it.

## Trusted Publishing And Provenance

Configured on 2026-08-26 for:

- Package: `solar-hijri-calendar-component`
- Provider: GitHub Actions
- Repository: `moroshani/solar-hijri-calendar-component`
- Workflow: `.github/workflows/publish.yml`
- Permission: `npm publish`

The tag-triggered workflow uses a GitHub-hosted runner, Node 24, and
`id-token: write`. It repeats the release gate before publishing through
short-lived OIDC credentials. Do not add a long-lived npm token.

Version `0.1.1` was the manually authenticated initial publication and cannot
gain provenance retroactively. The first later release published by this
workflow is the end-to-end verification of the trusted-publisher path and will
receive npm provenance automatically.

## Failed Publication

Do not move or reuse a release tag after consumers could have fetched it. If npm publication succeeds but a later verification fails, deprecate the affected version with a clear message and publish a corrected patch version. Record the incident in the changelog.

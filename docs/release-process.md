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

1. Confirm the npm package name is still available.
2. Authenticate through an applicant-controlled npm account with two-factor authentication.
3. Verify that GitHub tag `v0.1.0` still identifies the exact reviewed package
   intended for the registry; do not publish a different tree under the same
   version.
4. Create a clean temporary worktree at that tag, rerun the release gate, and run
   `npm publish --access public` there.
5. Install the package from npm in a clean temporary consumer project.
6. Verify ESM, CommonJS, TypeScript declarations, React peer dependencies, core exports, and CSS exports.
7. Record the registry URL and verification result, then remove the README's
   pending-publication notice in a follow-up documentation commit.

If package code or publishable metadata must change after `v0.1.0`, bump the
version and create a new reviewed tag instead of moving the existing tag or
publishing a tree that does not match it.

## Provenance Follow-Up

After the package exists on npm, configure npm trusted publishing for this GitHub repository and add a minimal tag-triggered workflow with `id-token: write`. Do not add a long-lived npm token to GitHub unless trusted publishing is unavailable and the risk is explicitly accepted.

## Failed Publication

Do not move or reuse a release tag after consumers could have fetched it. If npm publication succeeds but a later verification fails, deprecate the affected version with a clear message and publish a corrected patch version. Record the incident in the changelog.

# Demo Deployment

The public demo is built from `playground/react` and deployed with GitHub Pages.

## GitHub Pages

Workflow:

```text
.github/workflows/demo.yml
```

The workflow runs on pushes to `main` and manual dispatch. It installs dependencies, runs lint, unit tests, the library build, and the playground build, then uploads `dist-playground/react` to GitHub Pages.

The default Pages base path is:

```text
/solar-hijri-calendar-component/
```

That supports the standard repository URL:

```text
https://moroshani.github.io/solar-hijri-calendar-component/
```

## Custom Domain

No custom domain is currently owned or configured for this project. Keep the reproducible GitHub Pages URL as the canonical demo until the maintainer intentionally chooses and controls a domain. When that happens, configure GitHub Pages and change the build base to `/` in the same reviewed release.

## VPS Position

A VPS is useful later for dynamic previews, saved playground states, API examples, analytics, nightly branch builds, and private previews. It is not the best first public demo host because the open-source demo should be reproducible from repository history.

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

For a custom domain, configure the domain in GitHub Pages settings and change the build base to `/`.

Recommended public domain:

```text
calendar.moroshani.com
```

Recommended DNS shape:

- `calendar.moroshani.com` as the stable public GitHub Pages demo.
- `preview.calendar.moroshani.com` as an optional VPS-backed preview environment later.

## VPS Position

A VPS is useful later for dynamic previews, saved playground states, API examples, analytics, nightly branch builds, and private previews. It is not the best first public demo host because the open-source demo should be reproducible from repository history.


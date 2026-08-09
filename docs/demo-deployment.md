# Demo Deployment

The public testing lab is built from `playground/react` and deployed with GitHub
Pages at `https://moroshani.github.io/solar-hijri-calendar-component/`.

The deployed surface includes explicit month/year selectors, single/range/multiple
selection, locale and week-start controls, disabled-date scenarios, a state
inspector, and generated React integration code.

## GitHub Pages

Workflow:

```text
.github/workflows/demo.yml
```

The workflow runs on pushes to `main` and manual dispatch. It installs locked
dependencies, runs TypeScript checks, unit tests, the library build, and the lab
build, then uploads `dist-playground/react` to GitHub Pages.

The default Pages base path is:

```text
/solar-hijri-calendar-component/
```

That supports the standard repository URL:

```text
https://moroshani.github.io/solar-hijri-calendar-component/
```

Before pushing a lab change, run `npm run verify`; this covers the 320, 390, 768,
1024, and 1440 px browser matrix used for interaction and screenshot QA. After
the push, verify that the Pages workflow succeeded and that the live HTML points
to the newly hashed JavaScript and CSS assets.

## Custom Domain

No custom domain is currently owned or configured for this project. Keep the reproducible GitHub Pages URL as the canonical demo until the maintainer intentionally chooses and controls a domain. When that happens, configure GitHub Pages and change the build base to `/` in the same reviewed release.

## VPS Position

A VPS is useful later for dynamic previews, saved playground states, API examples, analytics, nightly branch builds, and private previews. It is not the best first public demo host because the open-source demo should be reproducible from repository history.

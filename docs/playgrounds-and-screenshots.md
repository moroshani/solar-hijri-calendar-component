# Playgrounds And Screenshots

This project needs a fast local feedback loop for every supported frontend stack and a deterministic screenshot system for responsive QA.

## Local Playground System

Each framework gets its own playground under `playground/<stack>` and imports local source through package-name aliases. This keeps examples realistic while avoiding publish/link friction during development.

Current playground:

```bash
npm run dev
```

`npm run dev` currently runs the React playground at `http://127.0.0.1:5173`.

The public React lab exposes the three selection engines from one focused test
surface. Explicit month and year selects drive the package's controlled `month`
and `onMonthChange` API. The lab also includes Persian/English locale,
Saturday/Sunday week starts, disabled-date scenarios, normalized Solar Hijri and
Gregorian output, and generated React integration code.

Direct command:

```bash
npm run dev:react
```

Build the playground for static hosting:

```bash
npm run build:playground
```

Recommended future structure:

```text
playground/
  react/
  web-component/
  vue/
  svelte/
  angular/
```

Each playground should:

- Import from the local package name, not deep relative source paths.
- Cover the stack's idiomatic integration style.
- Include controlled and uncontrolled examples.
- Include form integration once the picker APIs exist.
- Include dense responsive states instead of marketing pages.
- Be usable by Playwright without login, external APIs, or network calls.

## Screenshot System

The screenshot runner uses Playwright with deterministic settings:

- Chromium for stable visual capture.
- Fixed viewport matrix: 320, 390, 768, 1024, and 1440 pixel widths.
- `deviceScaleFactor: 1`.
- `locale: fa-IR`.
- `timezoneId: Asia/Tehran`.
- Animations and transitions disabled before capture.
- Screenshots written to `artifacts/screenshots/latest`.

If Playwright's bundled Chromium cannot be installed, the config tries common Linux browser paths. You can override the browser path:

```bash
SHC_CHROMIUM_EXECUTABLE=/path/to/chrome npm run screenshots
```

When working inside WSL, prefer a native Linux Chrome/Chromium install. Windows Chrome can be launched from WSL for normal browsing, but it is not reliable for Playwright's remote debugging pipe.

Run:

```bash
npm run screenshots
```

The command starts the React playground automatically, visits it at each
viewport, and captures the complete lab in each responsive layout.

The generated screenshots are ignored by git. Commit curated visual baselines separately only when the team chooses to add strict regression snapshots.

Playwright writes interaction artifacts and visual artifacts to separate output folders when run through npm:

- `npm run test:e2e`: `test-results/playwright-e2e`
- `npm run screenshots`: `test-results/playwright-screenshots`

This keeps traces, videos, and screenshots from colliding if a contributor starts both commands at the same time.

CI runs the same screenshot command and uploads `artifacts/screenshots/latest` as a workflow artifact named `responsive-screenshots`.

## E2E Smoke Tests

Run non-visual browser checks:

```bash
npm run test:e2e
```

These checks use the same local playground server and viewport matrix, but skip screenshot capture.

## When A New Stack Is Added

For each new stack:

- Add `playground/<stack>`.
- Add `dev:<stack>` script.
- Add a Playwright route or spec that opens the stack playground.
- Add screenshots to the same viewport matrix.
- Add docs that explain install, imports, controlled usage, SSR notes, and form integration.

The package architecture should stay modular: users should be able to install only `core`, only their framework package, and only optional adapters they need.

## Hosting Recommendation

The canonical public lab is deployed through GitHub Pages at
`https://moroshani.github.io/solar-hijri-calendar-component/`. Keep Pages as the
default host while the lab remains a static Vite application so deployments stay
tied to reviewed repository history.

Use a VPS as an optional preview and operations layer when the project needs server behavior that GitHub Pages cannot provide, such as:

- Dynamic playground persistence.
- API-backed examples.
- Analytics or telemetry that needs a backend.
- Server-rendered demos.
- Nightly builds from multiple branches.
- Private preview environments.

Possible future domain split, only after the maintainer owns and configures a
domain:

- `calendar.moroshani.com`: public docs and stable playground on GitHub Pages.
- `preview.calendar.moroshani.com`: optional VPS deployment for experimental builds.

This avoids putting maintainability at risk while still leaving room for a serious live playground.

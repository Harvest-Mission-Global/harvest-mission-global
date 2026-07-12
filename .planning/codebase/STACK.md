# Technology Stack

**Analysis Date:** 2026-07-12

## Languages

**Primary:**
- JavaScript (ES2020+) — All source code in `src/` uses JS (no TypeScript). React JSX syntax throughout.

**Secondary:**
- CSS — `src/App.css`, `src/index.css` for global styles. Chakra UI handles most styling inline.
- HTML — `public/index.html` as SPA shell.

## Runtime

**Environment:**
- Node.js v22.18.0 (matched via `node --version` in development)
- Lockfile: `yarn.lock` (10837 lines, committed)

**Package Manager:**
- Yarn 1.22.22 (classic)
- Lockfile: `yarn.lock` present and committed

## Frameworks

**Core:**
- **React 19.2.4** — UI library; root render via `src/index.js` using `createRoot`.
- **Create React App (react-scripts 5.0.1)** — Build toolchain, dev server, test runner, and bundler. Config is implicit (no ejected configs).

**UI Component Library:**
- **Chakra UI v3 (^3.34.0)** — Component system using `createSystem` / `defineConfig` API (Panda CSS-based in v3). No custom tokens yet; uses `defaultConfig` merged with empty custom config. Theme file at `src/theme/index.js`.
  - Depends on **@ark-ui/react** (seen in lockfile as transitive dep of Chakra v3).
  - Depends on **@emotion/react ^11.14.0** and **@emotion/styled ^11.14.1** for CSS-in-JS.

**Animation:**
- **framer-motion ^12.37.0** — Imported as transitive dependency through Chakra UI's internal usage. Not directly imported in current application code.

**Fonts:**
- **@fontsource/dm-sans ^4.5.9** — Self-hosted DM Sans font via npm. Imported at `src/index.js` line 3.
- Also fetched via Google Fonts link in `src/App.css` line 1 (`@import url(...)`).

**Icons:**
- **react-icons ^5.6.0** — Used for `FiArrowRight` (Feather icons) in `src/pages/HmgDesktop.js` and `src/pages/HmgMobile.js`.

**Testing:**
- **@testing-library/react ^16.1.0** — Component rendering in tests.
- **@testing-library/jest-dom ^6.6.3** — Custom DOM matchers (`toBeInTheDocument`, etc.).
- **@testing-library/dom ^10.4.0** — DOM query utilities.
- **@testing-library/user-event ^13.2.1** — User event simulation.
- **Jest** — Included via `react-scripts test` (jest config managed by CRA).

**Build/Dev:**
- **react-scripts 5.0.1** (CRA) — Dev server, build, test, and eject scripts.
- **Webpack** — Bundler (transitive via react-scripts).
- **Babel** — JS transpilation (transitive via react-scripts).
- **PostCSS** — CSS processing (transitive via react-scripts).

## Key Dependencies

**Critical:**
- `react` / `react-dom` ^19.2.4 — Foundation of the entire UI.
- `@chakra-ui/react` ^3.34.0 — All UI components, layout, theming, responsive breakpoints.
- `react-scripts` 5.0.1 — Build pipeline, dev server, test runner. No TypeScript; pure JS project.

**Infrastructure:**
- `gh-pages` ^6.3.0 (devDependency) — Deploy script: `yarn deploy` publishes `build/` directory to GitHub Pages.
- `web-vitals` ^2.1.0 — Performance metrics reporting (CLS, FID, FCP, LCP, TTFB). Called in `src/reportWebVitals.js`.

## Configuration

**Environment:**
- No `.env` files committed (all in `.gitignore`). No environment variables used in source.
- No environment-specific configuration; fully static site.

**Build:**
- Implicit CRA configuration — No ejected configs. `browserslist` in `package.json` controls autoprefixer/babel targets.
- Production: `>0.2%, not dead, not op_mini all`
- Development: `last 1 chrome version, last 1 firefox version, last 1 safari version`

**Linting:**
- ESLint via `react-scripts` with `eslintConfig` extending `react-app` and `react-app/jest`.
- No custom ESLint config files; no Prettier config.

**Theme:**
- Chakra UI theme: `src/theme/index.js` — Uses `createSystem(defaultConfig, customConfig)`. No custom tokens defined yet.

## Platform Requirements

**Development:**
- Node.js >= 14 (CRA 5 requires Node 14+)
- Yarn or npm
- Browser with ES2020 support for dev server

**Production:**
- **GitHub Pages** — Deployed via `gh-pages` npm package. Custom domain: `hmccglobal.org` (set via `public/CNAME`).
- Fully static SPA — no server-side rendering, no API server.
- Build output in `build/` directory (gitignored).

---

*Stack analysis: 2026-07-12*

# Codebase Concerns

**Analysis Date:** 2026-07-12

## Tech Debt

### Stale CRA Boilerplate Artifacts

- **Issue:** Several files contain default Create React App boilerplate that is no longer used by the actual application, creating dead code and confusion.
- **Files:** `src/App.css` (entire file — logo spin animation, `.App-header`, `.App-link` styles never used), `src/App.test.js` (tests for "learn react" text that doesn't exist), `src/reportWebVitals.js` (web vitals reporting not invoked from `src/index.js`)
- **Impact:** Dead code increases maintenance surface area. The test is misleading and will always fail.
- **Fix approach:** Delete `src/App.css`, `src/App.test.js`, `src/reportWebVitals.js`. Remove unused imports from `src/App.js` and `src/index.js`.

### Commented-Out Code Blocks

- **Issue:** Both page components contain large commented-out button blocks (the "10 Year Commitment" CTA button), left in-place rather than removed.
- **Files:** `src/pages/HmgDesktop.js` (lines 125–152), `src/pages/HmgMobile.js` (lines 120–150)
- **Impact:** Adds noise to the codebase; unclear intent (feature pending? dead code?). If the button is needed later, it should be tracked as a task, not stashed in comments.
- **Fix approach:** Remove commented-out blocks entirely. If the feature is desired, add a GitHub issue or task.

### Empty Custom Theme

- **Issue:** `src/theme/index.js` defines a custom config with empty `tokens: {}` and `semanticTokens: {}`, with a comment saying "Add your customizations here when ready." Meanwhile, all components use hardcoded color hex values directly.
- **Files:** `src/theme/index.js`
- **Impact:** The Chakra UI theming system is unused despite being the correct abstraction for colors, spacing, and typography. Any future color change requires finding and replacing every hex literal across components.
- **Fix approach:** Define brand colors (`#0025a3`, `#e0e8ff`, etc.) as theme tokens and reference them in components via `colorPalette` or `semanticTokens`.

### Duplicated Component Code Between Desktop and Mobile

- **Issue:** `HmgDesktop.js` and `HmgMobile.js` share nearly identical structures — hero section with background image, two location CTA buttons, and a footer — but the button and layout code is duplicated with only minor prop differences (width, font sizes).
- **Files:** `src/pages/HmgDesktop.js`, `src/pages/HmgMobile.js`
- **Impact:** ~380 lines of code where ~150 would suffice. Changes to shared UI (e.g., button hover color, footer content) require editing both files, creating a maintenance risk.
- **Fix approach:** Extract shared components (e.g., `LocationButton`, `Footer`) into their own files. Use responsive props or a single responsive component instead of two separate page files.

### Redundant Font Loading

- **Issue:** DM Sans is loaded via two mechanisms simultaneously: the `@fontsource/dm-sans` npm import in `src/index.js` (line 3), and a Google Fonts `@import` in `src/App.css` (line 1). The `@fontsource` package includes the font as a self-hosted bundle, making the Google Fonts import redundant and potentially causing a FOUC (flash of unstyled text).
- **Files:** `src/index.js` (line 3), `src/App.css` (line 1)
- **Impact:** Duplicate network requests, increased page load time, potential flash of unstyled text.
- **Fix approach:** Remove the `@import` from `App.css`; keep only the `@fontsource` import in `index.js`.

## Known Bugs

### Broken Default Test

- **Symptoms:** The only test file (`src/App.test.js`) asserts `screen.getByText(/learn react/i)`, but the app no longer contains the text "learn react". This test will always fail.
- **Files:** `src/App.test.js` (line 6)
- **Trigger:** Running `yarn test` or `npm test`
- **Workaround:** None — the test suite will report a failure on every run, reducing developer trust in the test runner.
- **Fix approach:** Update the test to match actual rendered content, or remove the test file.

## Security Considerations

### Missing HTTP Security Headers

- **Risk:** The production `index.html` (`public/index.html`) does not include a `<meta http-equiv="Content-Security-Policy">` tag or any security-oriented headers. As a static React app served via GitHub Pages, there is no server-side header configuration, making the site potentially vulnerable to XSS if user-generated content were ever rendered.
- **Files:** `public/index.html`
- **Current mitigation:** None. The app is purely static with no user input rendering, so current risk is low.
- **Recommendations:** Add a CSP `<meta>` tag. If GitHub Pages allows, configure custom headers via a `_headers` file (Cloudflare Pages model) or use a CDN in front.

### Hardcoded Email Address

- **Risk:** The email `admin@hmccglobal.org` is embedded directly in the source code (`src/pages/HmgDesktop.js` line 172, `src/pages/HmgMobile.js` line 170). This is publicly visible but also makes changing the contact email require a code push and redeploy.
- **Files:** `src/pages/HmgDesktop.js` (line 172), `src/pages/HmgMobile.js` (line 170)
- **Current mitigation:** Email is intended to be public (contact address), so exposure is by design.
- **Recommendations:** Extract to an environment variable or config object so it can be changed without a code modification.

## Performance Bottlenecks

### Large Background Image

- **Problem:** The background image `src/images/BG_top.png` is 117 KB (PNG format). For a hero background that renders on page load, this adds unnecessary weight.
- **Files:** `src/images/BG_top.png`
- **Cause:** PNG format used for a photographic-style background. WebP typically achieves 50-70% size reduction for the same visual quality.
- **Improvement path:** Convert to WebP format. Configure the build pipeline to auto-generate WebP variants. Add a `<picture>` element or CSS-based WebP fallback.

### Build Bundle Size

- **Problem:** The production JS bundle (`build/static/js/main.eaed2c10.js`) is 431 KB minified. For a two-page static site with minimal interactivity, this is large.
- **Cause:** The entire Chakra UI library, framer-motion, and react-icons are bundled. The `react-scripts` (Webpack) build does not perform advanced tree-shaking for UI library internals.
- **Improvement path:** Audit which Chakra UI components are actually used and consider tree-shaking. Evaluate whether framer-motion is needed (it is imported but not explicitly used in animation code — only `ChakraProvider` and standard components are used). Consider lazy-loading if more pages are added.

## Fragile Areas

### Responsive Layout Breakpoint Logic

- **Files:** `src/App.js` (line 7)
- **Why fragile:** The mobile/desktop split is determined by `useBreakpointValue({ base: true, md: false })`. This single breakpoint at the `md` tier (48em / 768px) controls which entire component tree renders. At exactly the breakpoint, there is no graceful transition. Any new responsive behavior requires editing both component files.
- **Safe modification:** When adding new pages or sections, extract shared components first. Consider moving to a single responsive component with Chakra's responsive style props instead of separate render trees.
- **Test coverage:** No tests exist for responsive behavior or breakpoint logic.

### External URL Dependency

- **Files:** `src/pages/HmgDesktop.js` (lines 63, 94), `src/pages/HmgMobile.js` (lines 59, 90)
- **Why fragile:** Two external URLs (`https://www.atx.hmccglobal.org/` and `https://hk.hmccglobal.org/`) are hardcoded in multiple places. If either domain changes or goes down, the buttons link to dead pages. There is no error handling for failed navigation.
- **Safe modification:** Extract URLs to a constants/config file. Add `target="_blank"` and `rel="noopener noreferrer"` (already present). Consider adding link validation in CI.
- **Test coverage:** No link-checking tests.

## Scaling Limits

**Not applicable** — This is a static landing page with no backend, database, or user-generated content. The app is deployed via GitHub Pages and will scale trivially to any expected traffic volume for an organizational homepage. The primary constraint is the GitHub Pages bandwidth limit (100 GB/month), which is unlikely to be approached.

## Dependencies at Risk

### react-scripts 5.0.1

- **Risk:** `react-scripts` 5.0.1 is no longer actively maintained by the Create React App team (CRA was officially deprecated in 2023). It has known outdated transitive dependencies (webpack-dev-server, css-loader, etc.) and no path to React 19's new features like Server Components or the new compiler.
- **Impact:** No security patches for the build toolchain. Cannot use modern React features. Migration will become harder over time.
- **Migration plan:** Migrate to Vite or Next.js. Vite is the simplest path for an existing CRA app (use `vite` with `@vitejs/plugin-react`). This would also reduce build times and enable HMR.

### Outdated @fontsource/dm-sans (v4 vs v5)

- **Risk:** `@fontsource/dm-sans` is on v4 (v5 is available). The v5 release includes breaking changes to the import path structure.
- **Impact:** If dependencies are bulk-updated, font imports may break without documentation.
- **Migration plan:** Update to `@fontsource/dm-sans@5` and update the import path in `src/index.js`.

### web-vitals v2 (v5 available)

- **Risk:** `web-vitals` is on v2 but v5 is available. The package is imported but the `reportWebVitals` function exported from `src/reportWebVitals.js` is never called from `src/index.js`, so the version doesn't actually matter — the library is unused dead code.
- **Impact:** None currently (dead code), but if analytics is added, the stale import would need updating.
- **Migration plan:** Remove `reportWebVitals.js` and the `web-vitals` dependency unless analytics tracking is planned.

## Missing Critical Features

### No Analytics or Performance Monitoring

- **Problem:** The website has no analytics integration (Google Analytics, Plausible, etc.). There is no way to track page views, user engagement, or traffic sources for the organization's primary web presence.
- **Blocks:** Unable to measure website effectiveness, track visitor demographics, or make data-driven content decisions.
- **Priority:** Medium — depends on whether the organization needs analytics data.

### No SEO Meta Tags

- **Problem:** The HTML `<head>` contains only basic meta tags (charset, viewport, theme-color, description). No Open Graph tags, Twitter Card tags, canonical URL, or structured data (JSON-LD) are present.
- **Files:** `public/index.html`
- **Blocks:** Social media shares will show minimal previews. Search engine ranking potential is not maximized.
- **Priority:** Medium — important for an organizational homepage that drives discoverability.

### No Error Boundary

- **Problem:** The app is not wrapped in a React error boundary. If any component throws during rendering, the entire page will unmount and show nothing (white screen).
- **Files:** `src/index.js` (no error boundary wrapping `<App />`)
- **Priority:** High — a single unhandled error makes the entire site unusable.

### Missing Favicon

- **Problem:** `public/manifest.json` references `favicon.ico`, but no favicon file exists in `public/`. Browser tabs will show a default empty icon.
- **Files:** `public/manifest.json`
- **Priority:** Medium — cosmetic but affects brand presentation in browser tabs.

## Test Coverage Gaps

### No Meaningful Tests

- **What's not tested:** Everything. The only test file (`src/App.test.js`) tests for text that doesn't exist in the application. There are no unit tests for components, no integration tests, no accessibility tests, and no visual regression tests.
- **Files:** `src/App.test.js` (broken), `src/pages/HmgDesktop.js`, `src/pages/HmgMobile.js`
- **Risk:** Any refactoring (e.g., extracting shared components, updating the Chakra UI version, changing the responsive breakpoint strategy) cannot be validated by automated tests. Regression risk is high for even minor changes.
- **Priority:** High — the app is simple enough that manual testing is viable now, but any growth in complexity will make the lack of tests painful.

### Accessibility Testing Gap

- **What's not tested:** No accessibility audits. No `jest-axe` or `@testing-library/jest-dom` accessibility matchers used. No keyboard navigation, ARIA label, or screen reader testing.
- **Files:** N/A (no accessibility testing infrastructure exists)
- **Risk:** The app may have accessibility issues that go undetected (missing `alt` text on images, insufficient color contrast, missing focus indicators on buttons).

---

*Concerns audit: 2026-07-12*

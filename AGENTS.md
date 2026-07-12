<!-- GSD:project-start source:PROJECT.md -->

## Project

**Harvest Mission Global**

The central web presence for Harvest Mission Global (HMCC) — an informational hub about the global organization's identity, mission, beliefs, history, and leadership, with links to its Austin and Hong Kong location churches. Serves as the organization's front door for visitors seeking to understand who they are and how to connect.

**Core Value:** Visitors can understand what Harvest Mission Global is, what it believes, and where to find it.

### Constraints

- **Stack**: React 19 + Chakra UI v3 + CRA (no migration planned)
- **Deployment**: GitHub Pages via `gh-pages` — fully static, no server
- **Content**: Static/hardcoded — no CMS, no database
- **Domain**: hmccglobal.org with custom domain via CNAME
- **Brand**: DM Sans font, navy blue (#0025a3) primary color

<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->

## Technology Stack

## Languages

- JavaScript (ES2020+) — All source code in `src/` uses JS (no TypeScript). React JSX syntax throughout.
- CSS — `src/App.css`, `src/index.css` for global styles. Chakra UI handles most styling inline.
- HTML — `public/index.html` as SPA shell.

## Runtime

- Node.js v22.18.0 (matched via `node --version` in development)
- Lockfile: `yarn.lock` (10837 lines, committed)
- Yarn 1.22.22 (classic)
- Lockfile: `yarn.lock` present and committed

## Frameworks

- **React 19.2.4** — UI library; root render via `src/index.js` using `createRoot`.
- **Create React App (react-scripts 5.0.1)** — Build toolchain, dev server, test runner, and bundler. Config is implicit (no ejected configs).
- **Chakra UI v3 (^3.34.0)** — Component system using `createSystem` / `defineConfig` API (Panda CSS-based in v3). No custom tokens yet; uses `defaultConfig` merged with empty custom config. Theme file at `src/theme/index.js`.
- **framer-motion ^12.37.0** — Imported as transitive dependency through Chakra UI's internal usage. Not directly imported in current application code.
- **@fontsource/dm-sans ^4.5.9** — Self-hosted DM Sans font via npm. Imported at `src/index.js` line 3.
- Also fetched via Google Fonts link in `src/App.css` line 1 (`@import url(...)`).
- **react-icons ^5.6.0** — Used for `FiArrowRight` (Feather icons) in `src/pages/HmgDesktop.js` and `src/pages/HmgMobile.js`.
- **@testing-library/react ^16.1.0** — Component rendering in tests.
- **@testing-library/jest-dom ^6.6.3** — Custom DOM matchers (`toBeInTheDocument`, etc.).
- **@testing-library/dom ^10.4.0** — DOM query utilities.
- **@testing-library/user-event ^13.2.1** — User event simulation.
- **Jest** — Included via `react-scripts test` (jest config managed by CRA).
- **react-scripts 5.0.1** (CRA) — Dev server, build, test, and eject scripts.
- **Webpack** — Bundler (transitive via react-scripts).
- **Babel** — JS transpilation (transitive via react-scripts).
- **PostCSS** — CSS processing (transitive via react-scripts).

## Key Dependencies

- `react` / `react-dom` ^19.2.4 — Foundation of the entire UI.
- `@chakra-ui/react` ^3.34.0 — All UI components, layout, theming, responsive breakpoints.
- `react-scripts` 5.0.1 — Build pipeline, dev server, test runner. No TypeScript; pure JS project.
- `gh-pages` ^6.3.0 (devDependency) — Deploy script: `yarn deploy` publishes `build/` directory to GitHub Pages.
- `web-vitals` ^2.1.0 — Performance metrics reporting (CLS, FID, FCP, LCP, TTFB). Called in `src/reportWebVitals.js`.

## Configuration

- No `.env` files committed (all in `.gitignore`). No environment variables used in source.
- No environment-specific configuration; fully static site.
- Implicit CRA configuration — No ejected configs. `browserslist` in `package.json` controls autoprefixer/babel targets.
- Production: `>0.2%, not dead, not op_mini all`
- Development: `last 1 chrome version, last 1 firefox version, last 1 safari version`
- ESLint via `react-scripts` with `eslintConfig` extending `react-app` and `react-app/jest`.
- No custom ESLint config files; no Prettier config.
- Chakra UI theme: `src/theme/index.js` — Uses `createSystem(defaultConfig, customConfig)`. No custom tokens defined yet.

## Platform Requirements

- Node.js >= 14 (CRA 5 requires Node 14+)
- Yarn or npm
- Browser with ES2020 support for dev server
- **GitHub Pages** — Deployed via `gh-pages` npm package. Custom domain: `hmccglobal.org` (set via `public/CNAME`).
- Fully static SPA — no server-side rendering, no API server.
- Build output in `build/` directory (gitignored).

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

## Naming Patterns

- PascalCase for component files: `HmgDesktop.js`, `HmgMobile.js`, `App.js`
- camelCase for utility files: `reportWebVitals.js`, `setupTests.js`, `index.js`
- Lowercase with dots for config/css: `index.css`, `App.css`, `.gitignore`
- Named function declarations for page components: `export default function HmgDesktop() { ... }`
- Arrow function for stored callbacks: `const reportWebVitals = onPerfEntry => { ... }`
- PascalCase for component names matching file names
- camelCase throughout: `isMobile`, `linkElement`, `customConfig`, `root`
- `const` preferred over `let`; no `var` usage detected
- Not applicable — codebase uses plain JavaScript, no TypeScript

## Code Style

- No Prettier config detected (`.prettierrc` absent)
- Default Create React App formatting via `react-scripts`
- Inconsistent quote usage: single quotes in `src/` (React files), double quotes in `src/theme/index.js` (Chakra config)
- 2-space indentation used throughout
- Inline ESLint config in `package.json` via `eslintConfig` field
- Extends `"react-app"` and `"react-app/jest"` presets (Create React App defaults)
- No custom `.eslintrc` file; no custom rules defined
- Extensions like `jsx-a11y` not explicitly declared but inherited via `react-app`
- Used consistently across all source files (except `src/theme/index.js` which omits them — inconsistency)

## Import Organization

- Not configured — all imports use relative paths with `./` and `../` prefixes

## Error Handling

- No explicit error handling patterns detected (`try/catch`, error boundaries, or error callbacks)
- No error boundaries implemented
- No custom error classes or error utility functions
- `React.StrictMode` in `index.js` provides development-time warnings only
- `reportWebVitals` captures performance data but does not include error context

## Logging

- No `console.log`, `console.error`, or `console.warn` calls in source files
- No logging library dependency in `package.json`

## Comments

- Section comments with `{/* Section Name */}` for JSX component regions (e.g., `{/* Hero Section */}`, `{/* Footer */}`)
- Header comment in `src/theme/index.js` explaining customization approach with a multi-line `/** */` block
- Commented-out UI code preserved in source (e.g., "Main CTA Button" sections in both `HmgDesktop.js` and `HmgMobile.js`)
- Used sparingly — only in `src/theme/index.js` with a JSDoc-style comment block documenting the theme configuration approach
- No JSDoc on component functions, props, or other exports

## Function Design

- Components are single large render functions (192 lines in `HmgDesktop.js`, 188 lines in `HmgMobile.js`)
- No extraction of sub-components, hooks, or helper functions
- Utility functions kept small (`reportWebVitals.js` at 13 lines)
- Component functions use no parameters (no destructured props — components have no custom props)
- Utility functions receive single callback parameter: `onPerfEntry`
- Components return JSX directly (no early returns, no loading/error states)
- Utility functions return values where appropriate

## Module Design

- Single default export per file: `export default App;` or `export default function HmgDesktop()`
- Named export in `src/theme/index.js`: `export const system = createSystem(...)`
- No barrel (`index.js`) files used for page components
- `src/theme/index.js` serves as the theme module entry point

## JSX Conventions

- Closing tags on same line for self-closing: `<Box>...</Box>`
- Multi-line JSX attributes indented 2 spaces from opening tag
- Arrow icon inline in button text: `Austin <FiArrowRight />`
- Inline Chakra UI props for all styling: `fontSize="2.5rem"`, `fontWeight="extrabold"`
- Direct hex color values as strings: `color="#0025a3"`
- No CSS modules, CSS-in-JS via `@emotion/react` (Chakra dependency), or styled-components
- `App.css` contains boilerplate CRA styles that are no longer referenced by components

## State Management

- No state management library detected
- No React hooks used (`useState`, `useEffect`, etc.)
- No context providers beyond Chakra's `ChakraProvider`

<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

## System Overview

```text

```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| `index.js` | React root mount, ChakraProvider setup, font import | `src/index.js` |
| `App` | Breakpoint detection, desktop/mobile branch | `src/App.js` |
| `HmgDesktop` | Desktop hero layout, CTA buttons, external links, footer | `src/pages/HmgDesktop.js` |
| `HmgMobile` | Mobile hero layout, stacked CTA buttons, external links, footer | `src/pages/HmgMobile.js` |
| Theme system | Chakra UI v3 design token config | `src/theme/index.js` |

## Pattern Overview

- No routing library — single-page app with no client-side navigation
- No state management library — no props drilling beyond one level, no Redux/Context
- No backend or API layer — fully static site deployed to GitHub Pages
- Responsive via `useBreakpointValue` hook — two separate component trees for mobile vs desktop
- Static content with external link-out buttons only (no internal navigation)
- Deployed via `gh-pages` to `https://hmccglobal.org`

## Layers

- Purpose: React root initialization and global providers
- Location: `src/index.js`
- Contains: ReactDOM.createRoot, ChakraProvider, React.StrictMode
- Depends on: `react`, `react-dom`, `@chakra-ui/react`, `@fontsource/dm-sans`
- Used by: Browser runtime entry
- Purpose: Responsive branch logic between mobile and desktop render trees
- Location: `src/App.js`
- Contains: useBreakpointValue hook, conditional rendering
- Depends on: `@chakra-ui/react` (Box, useBreakpointValue)
- Used by: ChakraProvider (imported in index.js)
- Purpose: Page-level UI composition with hero, CTAs, and footer
- Location: `src/pages/`
- Contains: Two page components (HmgDesktop, HmgMobile)
- Depends on: `@chakra-ui/react` (Box, VStack, HStack, Text, Button, Image), `react-icons/fi`, static images
- Used by: App.js
- Purpose: Design token configuration via Chakra UI v3 system API
- Location: `src/theme/index.js`
- Contains: createSystem, defaultConfig, defineConfig with empty token overrides
- Depends on: `@chakra-ui/react`
- Used by: ChakraProvider in index.js

## Data Flow

### Primary Rendering Path

- No application state — only Chakra UI's internal responsive breakpoint state via `useBreakpointValue`
- All content is static markup, no dynamic data fetching

## Key Abstractions

- Purpose: Centralized design token management for the Chakra UI component library
- Location: `src/theme/index.js`
- Pattern: Factory functions (`createSystem`, `defineConfig`) from Chakra UI v3
- Current state: Uses `defaultConfig` with empty custom tokens placeholder
- Upgrade path: Add brand colors, spacing, and typography tokens to `customConfig.theme.tokens`
- Purpose: Deliver optimized layouts per viewport without CSS media queries in Chakra
- Location: `src/App.js` (line 7) — `useBreakpointValue({ base: true, md: false })`
- Pattern: Component-level conditional rendering (two distinct component trees)

## Entry Points

- Location: `public/index.html` — HTML shell with `<div id="root">`
- Triggers: Browser navigation to domain
- Responsibilities: Load bundled JS/CSS, provide root mount point
- Location: `src/index.js`
- Triggers: React script execution after HTML loads
- Responsibilities: Mount React tree, initialize Chakra UI theme provider, import font

## Architectural Constraints

- **No routing:** The app is a single-page static site. There are no routes, no React Router, and no navigation between pages. All content is on one view.
- **No backend:** All data is hardcoded in components. No fetch, no API calls, no database.
- **Single-level component tree:** Only two levels deep from root (App → Pages). No nested layouts, no shared child components.
- **Deployment target:** GitHub Pages via `gh-pages` package. `homepage` field in `package.json` set to `https://hmccglobal.org`.
- **No TypeScript:** Pure JavaScript (.js only), no TypeScript configuration or type definitions.

## Anti-Patterns

### Duplicated Markup Between Desktop and Mobile

### Empty Theme Tokens with Customization Scaffolding

### Dead Code in Components

## Error Handling

- React error boundaries not implemented (relying on default React error overlay in dev)
- No try/catch anywhere in the codebase

## Cross-Cutting Concerns

<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->

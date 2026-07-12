# Codebase Structure

**Analysis Date:** 2026-07-12

## Directory Layout

```
harvest-mission-global/
├── build/                          # Production build output (generated, committed)
│   ├── index.html                  # Built HTML
│   ├── static/                     # Bundled JS/CSS/media
│   │   ├── css/                    # Minified CSS bundle
│   │   ├── js/                     # Minified JS bundle
│   │   └── media/                  # Optimized image assets
│   ├── CNAME                       # Custom domain for GitHub Pages
│   ├── manifest.json               # PWA manifest
│   ├── robots.txt                  # Crawl rules
│   ├── logo192.png                 # Favicon (192x192)
│   └── logo512.png                 # Favicon (512x512)
├── public/                         # Static files served directly (no bundling)
│   ├── index.html                  # HTML template with <div id="root">
│   ├── CNAME                       # Custom domain config
│   ├── manifest.json               # PWA manifest
│   └── robots.txt                  # Search engine crawl rules
├── src/                            # Application source code
│   ├── index.js                    # Entry point — React root mount
│   ├── index.css                   # Global body styles
│   ├── App.js                      # Root component — responsive branch logic
│   ├── App.css                     # App-level CSS (legacy Create React App styles)
│   ├── App.test.js                 # Smoke test for App
│   ├── setupTests.js               # Jest setup — imports @testing-library/jest-dom
│   ├── reportWebVitals.js          # Core Web Vitals reporter
│   ├── logo.svg                    # Create React App default logo (unused)
│   ├── pages/                      # Page-level components
│   │   ├── HmgDesktop.js           # Desktop hero + CTA + footer layout
│   │   └── HmgMobile.js            # Mobile hero + CTA + footer layout
│   ├── theme/                      # Chakra UI theme configuration
│   │   └── index.js                # createSystem with defaultConfig + empty overrides
│   └── images/                     # Static image assets imported by components
│       ├── BG_top.png              # Hero background image
│       └── ripple.png              # Ripple decorative image
├── .planning/                      # Planning and documentation artifacts
│   └── codebase/                   # Codebase analysis documents
├── node_modules/                   # Dependencies (gitignored)
├── package.json                    # Project manifest, dependencies, scripts
├── yarn.lock                       # Dependency lockfile
├── .gitignore                      # Git ignore rules
└── README.md                       # Project description
```

## Directory Purposes

**`src/` (Source Root):**
- Purpose: All application source code
- Contains: Entry point, root component, page components, theme config, images, CSS, tests
- Key files: `index.js` (entry), `App.js` (root component)
- Structure: Flat organization with two subdirectories (`pages/`, `theme/`, `images/`)

**`src/pages/`:**
- Purpose: Page-level React components, one per viewport variant
- Contains: Two components — `HmgDesktop.js` and `HmgMobile.js`
- Key files: `HmgDesktop.js` (desktop layout), `HmgMobile.js` (mobile layout)
- Naming: PascalCase prefixed with "Hmg"

**`src/theme/`:**
- Purpose: Chakra UI v3 design system configuration
- Contains: Single `index.js` exporting the `system` object
- Key files: `index.js` — `createSystem(defaultConfig, customConfig)`

**`src/images/`:**
- Purpose: Static image assets imported directly by components
- Contains: `BG_top.png` (hero background), `ripple.png` (decorative element)
- Import pattern: `import background from '../images/BG_top.png'`

**`public/`:**
- Purpose: Static assets served verbatim (no webpack processing)
- Contains: `index.html`, `CNAME`, `manifest.json`, `robots.txt`
- Key files: `index.html` — HTML template with `<div id="root">`

**`build/`:**
- Purpose: Production output from `yarn build` / `npm run build`
- Contains: Optimized bundles, static media, CNAME, manifest
- Generated: Yes (by `react-scripts build`)
- Committed: Yes (required for GitHub Pages deployment via `gh-pages`)

## Key File Locations

**Entry Points:**
- `public/index.html`: HTML shell, serves as the browser entry point
- `src/index.js`: JavaScript/React entry point, mounts `<App />`

**Configuration:**
- `package.json`: Project metadata, dependencies, scripts, browserslist, ESLint config
- `.gitignore`: Ignored files and directories

**Core Logic:**
- `src/App.js`: Root component — responsive branching between mobile/desktop
- `src/pages/HmgDesktop.js`: Desktop page component
- `src/pages/HmgMobile.js`: Mobile page component
- `src/theme/index.js`: Chakra UI theme system configuration

**Testing:**
- `src/setupTests.js`: Jest setup — imports `@testing-library/jest-dom`
- `src/App.test.js`: App smoke test

## Naming Conventions

**Files:**
- PascalCase for React components: `App.js`, `HmgDesktop.js`, `HmgMobile.js`
- camelCase for utilities/reporters: `reportWebVitals.js`, `setupTests.js`
- lowercase for CSS files: `index.css`, `App.css`
- lowercase for directories: `pages/`, `theme/`, `images/`
- Appended `.test.js` for test files: `App.test.js`

**Functions:**
- PascalCase for React components (function declarations): `function App()`, `export default function HmgDesktop()`
- camelCase for non-component functions: `reportWebVitals`

**Variables:**
- camelCase for all variables: `const root`, `const isMobile`, `const customConfig`
- PascalCase for imported components

**Exports:**
- Default exports for components: `export default App;`, `export default function HmgDesktop()`
- Named export for theme: `export const system = createSystem(...)`

## Where to Add New Code

**New Feature (e.g., new section on the landing page):**
- Primary code: `src/pages/HmgDesktop.js` and `src/pages/HmgMobile.js` (both must be updated)
- If extracting shared components: `src/components/` (no such directory yet — create it)

**New Page / Route (future state with routing):**
- Implementation: `src/pages/NewPage.js`
- Add React Router dependency and `BrowserRouter` in `src/index.js`
- Update `src/App.js` to render routes instead of conditional branching

**New Component / Module:**
- Implementation: `src/components/ComponentName.js`
- Tests: Co-located at `src/components/ComponentName.test.js`
- Convention: PascalCase filename, default export

**New Theme Token:**
- Location: `src/theme/index.js` — add to `customConfig.theme.tokens`
- Pattern: Follow Chakra UI v3 token specification (scales, values)

**Shared Utilities:**
- Shared helpers: `src/utils/` (no such directory yet — create it)
- Naming: camelCase filenames, named exports

**New Image Asset:**
- Location: `src/images/asset-name.png`
- Import in component: `import assetName from '../images/asset-name.png'`

## Special Directories

**`build/`:**
- Purpose: Production build output
- Generated: Yes (by `yarn build`)
- Committed: Yes — required for GitHub Pages deployment
- Regeneration: `yarn build` then `yarn deploy` (gh-pages)

**`node_modules/`:**
- Purpose: Installed npm dependencies
- Generated: Yes (by `yarn install`)
- Committed: No (gitignored)

**`.planning/`:**
- Purpose: GSD workflow planning artifacts and codebase analysis
- Generated: Yes (by GSD workflow tools)
- Committed: Yes

---

*Structure analysis: 2026-07-12*

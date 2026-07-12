<!-- refreshed: 2026-07-12 -->
# Architecture

**Analysis Date:** 2026-07-12

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                         │
├─────────────────────────┬───────────────────────────────────┤
│   HmgDesktop            │   HmgMobile                       │
│  `src/pages/HmgDesktop.js`│  `src/pages/HmgMobile.js`        │
└─────────────┬───────────┴───────────┬───────────────────────┘
              │                       │
              └───────────┬───────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Root / Composition                         │
│                    `src/App.js`                               │
│              (responsive branch: mobile vs desktop)           │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    Bootstrap Layer                            │
│                    `src/index.js`                             │
│              ChakraProvider + React.StrictMode                │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  Theme System                                                │
│  `src/theme/index.js`                                        │
│  (createSystem + defineConfig)                               │
└─────────────────────────────────────────────────────────────┘
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

**Overall:** Single-page React application with component-based rendering and responsive branching.

**Key Characteristics:**
- No routing library — single-page app with no client-side navigation
- No state management library — no props drilling beyond one level, no Redux/Context
- No backend or API layer — fully static site deployed to GitHub Pages
- Responsive via `useBreakpointValue` hook — two separate component trees for mobile vs desktop
- Static content with external link-out buttons only (no internal navigation)
- Deployed via `gh-pages` to `https://hmccglobal.org`

## Layers

**Bootstrap Layer:**
- Purpose: React root initialization and global providers
- Location: `src/index.js`
- Contains: ReactDOM.createRoot, ChakraProvider, React.StrictMode
- Depends on: `react`, `react-dom`, `@chakra-ui/react`, `@fontsource/dm-sans`
- Used by: Browser runtime entry

**Root / Composition Layer:**
- Purpose: Responsive branch logic between mobile and desktop render trees
- Location: `src/App.js`
- Contains: useBreakpointValue hook, conditional rendering
- Depends on: `@chakra-ui/react` (Box, useBreakpointValue)
- Used by: ChakraProvider (imported in index.js)

**Presentation Layer:**
- Purpose: Page-level UI composition with hero, CTAs, and footer
- Location: `src/pages/`
- Contains: Two page components (HmgDesktop, HmgMobile)
- Depends on: `@chakra-ui/react` (Box, VStack, HStack, Text, Button, Image), `react-icons/fi`, static images
- Used by: App.js

**Theme Layer:**
- Purpose: Design token configuration via Chakra UI v3 system API
- Location: `src/theme/index.js`
- Contains: createSystem, defaultConfig, defineConfig with empty token overrides
- Depends on: `@chakra-ui/react`
- Used by: ChakraProvider in index.js

## Data Flow

### Primary Rendering Path

1. Browser loads `public/index.html` → `<div id="root">`
2. `src/index.js` mounts React via `createRoot`, wraps `<App />` in `<ChakraProvider>` and `<React.StrictMode>`
3. `src/App.js` executes `useBreakpointValue({ base: true, md: false })` to detect viewport
4. If mobile (base breakpoint) → renders `<HmgMobile />` (`src/pages/HmgMobile.js`)
5. If desktop (md+) → renders `<HmgDesktop />` (`src/pages/HmgDesktop.js`)
6. Each page component renders static hero section with styled CTA buttons linking to external URLs

**State Management:**
- No application state — only Chakra UI's internal responsive breakpoint state via `useBreakpointValue`
- All content is static markup, no dynamic data fetching

## Key Abstractions

**Theme System:**
- Purpose: Centralized design token management for the Chakra UI component library
- Location: `src/theme/index.js`
- Pattern: Factory functions (`createSystem`, `defineConfig`) from Chakra UI v3
- Current state: Uses `defaultConfig` with empty custom tokens placeholder
- Upgrade path: Add brand colors, spacing, and typography tokens to `customConfig.theme.tokens`

**Responsive Branching:**
- Purpose: Deliver optimized layouts per viewport without CSS media queries in Chakra
- Location: `src/App.js` (line 7) — `useBreakpointValue({ base: true, md: false })`
- Pattern: Component-level conditional rendering (two distinct component trees)

## Entry Points

**Application Entry:**
- Location: `public/index.html` — HTML shell with `<div id="root">`
- Triggers: Browser navigation to domain
- Responsibilities: Load bundled JS/CSS, provide root mount point

**JavaScript Entry:**
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

**What happens:** `HmgDesktop.js` and `HmgMobile.js` share ~90% identical JSX structure (hero, ripple image, CTA buttons, footer). Only styling values differ (font size, spacing, layout orientation).

**Why it's wrong:** Any content change (new CTA, updated footer text, different hero image) must be applied in two files. This doubles maintenance surface area and increases risk of drift.

**Do this instead:** Use a single `HmgPage` component with Chakra responsive props (`fontSize={{ base: "1.5rem", md: "2.5rem" }}`) instead of branching into separate page components. Example pattern at `src/App.js:7` already demonstrates `useBreakpointValue` — push responsive values into a shared component rather than duplicating the entire tree.

### Empty Theme Tokens with Customization Scaffolding

**What happens:** `src/theme/index.js` has a fully wired `defineConfig` with empty `tokens` and `semanticTokens` objects and a long comment block explaining how to customize.

**Why it's wrong:** The scaffolding suggests customization is intended but none is implemented. The `App.css` file also imports DM Sans via `@import` (legacy CSS `@import`), while `src/index.js` imports the same font via `@fontsource/dm-sans` npm package. Both approaches coexist.

**Do this instead:** Either use the `@fontsource` npm import only and remove the CSS `@import` from `App.css`, or populate the `customConfig` with actual brand tokens.

### Dead Code in Components

**What happens:** Both `HmgDesktop.js` (lines 125-152) and `HmgMobile.js` (lines 121-150) contain large commented-out JSX blocks for a "Main CTA Button" that references a "10 Year Commitment".

**Why it's wrong:** Commented-out code is dead code. It increases file size, confuses intent, and is version-controlled history that should live in git.

**Do this instead:** Remove commented-out code blocks. If needed later, recover from git history.

## Error Handling

**Strategy:** No explicit error handling. The app has no API calls, form submissions, or user interactions beyond clicking external links (handled natively by browser).

**Patterns:**
- React error boundaries not implemented (relying on default React error overlay in dev)
- No try/catch anywhere in the codebase

## Cross-Cutting Concerns

**Logging:** `reportWebVitals.js` captures Core Web Vitals and could pipe them to an analytics endpoint, but is not wired to any provider in `index.js`.

**Validation:** None — no forms, no user input.

**Authentication:** None — public static site.

---

*Architecture analysis: 2026-07-12*

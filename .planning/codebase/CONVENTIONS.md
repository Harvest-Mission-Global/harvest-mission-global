# Coding Conventions

**Analysis Date:** 2026-07-12

## Naming Patterns

**Files:**
- PascalCase for component files: `HmgDesktop.js`, `HmgMobile.js`, `App.js`
- camelCase for utility files: `reportWebVitals.js`, `setupTests.js`, `index.js`
- Lowercase with dots for config/css: `index.css`, `App.css`, `.gitignore`

**Components/Functions:**
- Named function declarations for page components: `export default function HmgDesktop() { ... }`
- Arrow function for stored callbacks: `const reportWebVitals = onPerfEntry => { ... }`
- PascalCase for component names matching file names

**Variables:**
- camelCase throughout: `isMobile`, `linkElement`, `customConfig`, `root`
- `const` preferred over `let`; no `var` usage detected

**Types:**
- Not applicable — codebase uses plain JavaScript, no TypeScript

## Code Style

**Formatting:**
- No Prettier config detected (`.prettierrc` absent)
- Default Create React App formatting via `react-scripts`
- Inconsistent quote usage: single quotes in `src/` (React files), double quotes in `src/theme/index.js` (Chakra config)
- 2-space indentation used throughout

**Linting:**
- Inline ESLint config in `package.json` via `eslintConfig` field
- Extends `"react-app"` and `"react-app/jest"` presets (Create React App defaults)
- No custom `.eslintrc` file; no custom rules defined
- Extensions like `jsx-a11y` not explicitly declared but inherited via `react-app`

**Semicolons:**
- Used consistently across all source files (except `src/theme/index.js` which omits them — inconsistency)

## Import Organization

**Order:**
1. React import: `import React from 'react';`
2. Chakra UI (framework) imports: `import { Box, VStack } from '@chakra-ui/react';`
3. Icon library imports: `import { FiArrowRight } from 'react-icons/fi';`
4. Local relative imports (with `../` prefix): `import App from './App';`
5. Static asset imports: `import background from '../images/BG_top.png';`
6. CSS imports: `import '@fontsource/dm-sans';`

**Path Aliases:**
- Not configured — all imports use relative paths with `./` and `../` prefixes

## Error Handling

**Patterns:**
- No explicit error handling patterns detected (`try/catch`, error boundaries, or error callbacks)
- No error boundaries implemented
- No custom error classes or error utility functions
- `React.StrictMode` in `index.js` provides development-time warnings only
- `reportWebVitals` captures performance data but does not include error context

## Logging

**Framework:** None detected

**Patterns:**
- No `console.log`, `console.error`, or `console.warn` calls in source files
- No logging library dependency in `package.json`

## Comments

**When to Comment:**
- Section comments with `{/* Section Name */}` for JSX component regions (e.g., `{/* Hero Section */}`, `{/* Footer */}`)
- Header comment in `src/theme/index.js` explaining customization approach with a multi-line `/** */` block
- Commented-out UI code preserved in source (e.g., "Main CTA Button" sections in both `HmgDesktop.js` and `HmgMobile.js`)

**JSDoc/TSDoc:**
- Used sparingly — only in `src/theme/index.js` with a JSDoc-style comment block documenting the theme configuration approach
- No JSDoc on component functions, props, or other exports

## Function Design

**Size:**
- Components are single large render functions (192 lines in `HmgDesktop.js`, 188 lines in `HmgMobile.js`)
- No extraction of sub-components, hooks, or helper functions
- Utility functions kept small (`reportWebVitals.js` at 13 lines)

**Parameters:**
- Component functions use no parameters (no destructured props — components have no custom props)
- Utility functions receive single callback parameter: `onPerfEntry`

**Return Values:**
- Components return JSX directly (no early returns, no loading/error states)
- Utility functions return values where appropriate

## Module Design

**Exports:**
- Single default export per file: `export default App;` or `export default function HmgDesktop()`
- Named export in `src/theme/index.js`: `export const system = createSystem(...)`

**Barrel Files:**
- No barrel (`index.js`) files used for page components
- `src/theme/index.js` serves as the theme module entry point

## JSX Conventions

**Spacing:**
- Closing tags on same line for self-closing: `<Box>...</Box>`
- Multi-line JSX attributes indented 2 spaces from opening tag
- Arrow icon inline in button text: `Austin <FiArrowRight />`

**Styling:**
- Inline Chakra UI props for all styling: `fontSize="2.5rem"`, `fontWeight="extrabold"`
- Direct hex color values as strings: `color="#0025a3"`
- No CSS modules, CSS-in-JS via `@emotion/react` (Chakra dependency), or styled-components
- `App.css` contains boilerplate CRA styles that are no longer referenced by components

## State Management

- No state management library detected
- No React hooks used (`useState`, `useEffect`, etc.)
- No context providers beyond Chakra's `ChakraProvider`

---

*Convention analysis: 2026-07-12*

# AGENTS.md

## Project

**Harvest Mission Global** — static front door for HMCC at [hmccglobal.org](https://hmccglobal.org).

**Shipped today:** branded landing page with Austin / Hong Kong CTAs and a contact footer.

**Core value:** Visitors understand what Harvest Mission Global is and where to find local churches.

## Current architecture

```
src/index.js          → ChakraProvider + DM Sans
src/App.js            → useBreakpointValue → HmgMobile | HmgDesktop
src/pages/HmgDesktop.js
src/pages/HmgMobile.js
src/theme/index.js    → createSystem(defaultConfig) — empty custom tokens
src/images/           → BG_top.png, ripple.png
public/CNAME          → hmccglobal.org
```

- No router, CMS, API, or app state beyond Chakra breakpoints
- Desktop and mobile are duplicated page trees (not one responsive component)
- Commented-out “10 Year Commitment” CTA remains in both page files
- Brand: DM Sans, navy `#0025a3`
- External links: `https://www.atx.hmccglobal.org/`, `https://hk.hmccglobal.org/`
- Footer: `admin@hmccglobal.org`, © 1996–2026

## Stack

| Piece | Version / note |
|-------|----------------|
| React | 19.2.x |
| Chakra UI | v3 (`createSystem` / `defineConfig`) |
| Tooling | CRA `react-scripts` 5.0.1 (not ejected) |
| Package manager | Yarn classic (`yarn.lock`) |
| Deploy | `gh-pages` → GitHub Pages, `homepage` = `https://hmccglobal.org` |
| Language | JavaScript only (no TypeScript) |

Node used in development: v22.x.

## Conventions

- PascalCase components (`HmgDesktop.js`); camelCase utilities
- 2-space indent; single quotes in most `src/` files
- Inline Chakra props for layout/style; hex colors as strings
- Default export per page file; named `system` export from theme
- No Redux/Context beyond Chakra; no logging in source

## Constraints

- Fully static — no backend, env-driven config, or CMS
- Stay on CRA + Chakra v3; no framework migration unless requested
- Content is hardcoded in components

## Planned (not implemented)

Earlier GSD planning (`.planning/` removed from tree) targeted a multi-page site:

1. Theme tokens + shared responsive components + content constants
2. HashRouter + shared footer (GitHub Pages–friendly)
3. Nav (Home, Mission & Vision, What We Believe)
4–6. Home intro, Mission & Vision, Statement of Faith pages

Until those land, treat the repo as the single-page landing above.

## Agent notes

- Prefer editing both `HmgDesktop.js` and `HmgMobile.js` for UI that must stay in sync
- `src/App.css` still has unused CRA boilerplate + a Google Fonts import; font is also loaded via `@fontsource/dm-sans` in `index.js`
- Do not add dependencies for what CRA/Chakra already cover

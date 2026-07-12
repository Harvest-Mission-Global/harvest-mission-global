# External Integrations

**Analysis Date:** 2026-07-12

## APIs & External Services

**No backend APIs consumed.**
- This is a **fully static, client-side React SPA**. There are zero `fetch()`, `axios`, `XMLHttpRequest`, or GraphQL calls anywhere in `src/`.
- No third-party SaaS or API integrations (no Stripe, Supabase, Firebase, AWS, etc.).

**External links (hardcoded navigation, not integrations):**
| Label | URL | Location |
|-------|-----|----------|
| Austin CTA | `https://www.atx.hmccglobal.org/` | `src/pages/HmgDesktop.js:63`, `src/pages/HmgMobile.js:59` |
| Hong Kong CTA | `https://hk.hmccglobal.org/` | `src/pages/HmgDesktop.js:94`, `src/pages/HmgMobile.js:90` |
| Contact email | `admin@hmccglobal.org` | `src/pages/HmgDesktop.js:172`, `src/pages/HmgMobile.js:170` |

These are simple `<a>` links (`Button as="a"`) that navigate away from the SPA — no API calls, no webhook triggers.

## Data Storage

**Databases:**
- None. No database client or ORM dependency.
- No local storage, session storage, IndexedDB, or cookies used.

**File Storage:**
- Local filesystem only. Static images stored at `src/images/BG_top.png` and `src/images/ripple.png`, imported as JS module assets.

**Caching:**
- None. No caching layer, service worker, or cache-control configuration.

## Authentication & Identity

**Auth Provider:**
- None. No login, no authentication flow, no user identity management.
- No auth tokens, JWTs, OAuth, or session management.

## Monitoring & Observability

**Error Tracking:**
- None. No Sentry, Datadog, LogRocket, or similar.
- No error boundaries implemented in React tree.

**Analytics:**
- None detected. No Google Analytics, Segment, or other tracking scripts.
- `public/index.html` has no analytics or tracking snippets.
- `web-vitals` library is imported in `src/reportWebVitals.js` but not connected to any analytics endpoint (default CRA boilerplate).

**Logs:**
- `console.*` usage only (none present in current code).

## CI/CD & Deployment

**Hosting:**
- **GitHub Pages** — Deployed via `gh-pages` npm package (`yarn deploy` script in `package.json`).
- Custom domain: `hmccglobal.org` — configured via `public/CNAME` file (contents: `hmccglobal.org`).
- DNS is assumed to point GitHub Pages IPs to the custom domain.
- No other hosting provider (no Vercel, Netlify, AWS S3, etc.).

**CI Pipeline:**
- None. No `.github/` workflows, no CI configuration files.
- Deployment is manual: `yarn deploy` builds and pushes `build/` to the `gh-pages` branch.

**SSL/TLS:**
- Provided by GitHub Pages (automatic via custom domain + GitHub Pages).

## Environment Configuration

**Required env vars:**
- None. The app has zero environment variable dependencies.

**Secrets location:**
- Not applicable — no secrets, no API keys, no tokens.

## Webhooks & Callbacks

**Incoming:**
- None. No webhook endpoints (no server to receive them).

**Outgoing:**
- None. No webhook dispatches.

## External Fonts

**Google Fonts:**
- **DM Sans** — Loaded via CSS `@import url(...)` in `src/App.css` line 1. Also self-hosted via `@fontsource/dm-sans` npm package.

## External Dependencies (CDN / Registry)

- All dependencies sourced from **npm registry** via `yarn.lock`.
- No CDN-loaded scripts or stylesheets in `public/index.html`.

---

*Integration audit: 2026-07-12*

# Stack Research

**Domain:** Church / ministry organization informational website — static React SPA
**Researched:** 2026-07-12
**Confidence:** HIGH

## Recommended Stack

### Core Technologies (already in place, extend don't replace)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | ^19.2.4 | UI library | Already in use. React 19's native `<title>` / `<meta>` support (document head via components) matters for SEO — it allows per-section metadata without a third-party Helmet library in SSR contexts. For our CSR-only CRA setup, `react-helmet-async` is still needed since React 19's native head tags only benefit server-rendered output. |
| Chakra UI v3 | ^3.34.0 | Component system | Already in use. v3's Panda CSS-based system gives responsive props (`{ base: "...", md: "..." }`), built-in `Container`, `VStack`, `Heading`, `Text`, `Icon` components that directly map to content-section needs. No migration needed. |
| CRA (react-scripts) | 5.0.1 | Build toolchain | Already in use. Adequate for a single-page site with ~5-6 content sections. Not worth migrating to Vite for this scale — the build time difference is negligible for a project this small. |
| GitHub Pages | — | Static hosting | Already in use at hmccglobal.org. Zero cost, HTTPS, custom domain via CNAME, CDN-cached. For a fully static single-page site with no API backend, this is still the right hosting choice in 2026. |

### New Additions for Content Sections

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| `react-helmet-async` | ^2.0 | Per-section meta tags | **The standard for CRA SEO.** React 19's built-in `<title>`/`<meta>` components only inject into `<head>` during SSR (Next.js, Remix). In a CSR app like ours, they render as DOM nodes in the page body. `react-helmet-async` updates `<head>` at runtime and is the de facto standard for non-SSR React apps (6M+ weekly downloads). Needed because all sections share one URL — we must tell crawlers what each section's content is about. |
| IntersectionObserver | native browser API | Scroll-spy active nav | **Zero dependencies.** Chakra UI's own docs site uses a ~30-line `useScrollSpy` hook built on IntersectionObserver (see [chakra-ui-docs/src/hooks/use-scrollspy.ts](https://github.com/chakra-ui/chakra-ui-docs/blob/main/src/hooks/use-scrollspy.ts)). No need for `react-scroll` (30KB) or `react-scrollspy` (15KB) — a custom hook is simpler, more predictable, and avoids dependency churn. |
| JSON-LD schema | inline in `<head>` | Rich search results | Inline Organization + WebSite schema in `<script type="application/ld+json">` via `react-helmet-async`. Zero dependencies. Required for rich snippets (knowledge panel, site links search box). |

### Supporting Libraries — None Needed

Everything required to add content sections already exists in the current dependency tree:

| Library | Purpose | Why Not to Add |
|---------|---------|----------------|
| `react-router-dom` | Multi-page routing | Not needed — this is a single-page site with 5-6 content sections. Introducing routing means 5-6 separate URLs, a sitemap, SSR/SSG complexity for SEO, and the `BrowserRouter` vs `HashRouter` problem on GitHub Pages. For an organizational identity page, all sections belong on one URL. |
| `react-scroll` | Smooth scroll animation | Overkill. Native `element.scrollIntoView({ behavior: 'smooth' })` works in all modern browsers (Safari 15.4+, Chrome 61+, Firefox 36+). The CSS property `scroll-behavior: smooth` on `html` also works. No 30KB dependency needed. |
| `next.js` / `gatsby` / `astro` | SSR/SSG framework | Not justified for 5 content sections. Migration cost: 2-4 weeks. SEO benefit for a single-page site is minimal — Google crawls CSR SPAs adequately (though slower). The gap between "good enough SEO" and "perfect SEO" doesn't justify framework migration at this scale. |
| `react-snap` | Pre-rendering | Adds Puppeteer as a build dependency (~300MB in node_modules), breaks frequently on Node version bumps, and only pre-renders one page for a SPA anyway. The marginal SEO gain over CSR for a single-page site is not worth the maintenance burden. |
| `framer-motion` | Animations | Already in node_modules as a Chakra v3 transitive dep. Do NOT add a direct import unless section reveal animations are explicitly requested. Animations are a nice-to-have, not a requirement. |
| `react-icons` | Icons | Already in use. Enough for section chevrons, social links, etc. |
| `@fontsource/dm-sans` | Font loading | Already in use. Keep the npm-package import path; remove the CSS `@import` duplicate (anti-pattern noted in codebase ARCHITECTURE.md). |

## Installation

```bash
# Only new dependency needed for SEO
npm install react-helmet-async

# No other installations required — everything else is in place
```

## Alternatives Considered

| Our Choice | Alternative | When to Use Alternative |
|------------|-------------|-------------------------|
| **Single-page with anchor sections** | Multi-page (separate /mission, /beliefs URLs) | If the org had 15+ content sections that are independent (sermons, events, blog, ministries). For 5 tightly-related identity sections, one URL is correct. |
| **CRA + Chakra v3** (existing) | Next.js static export | If SEO traffic was the primary growth channel AND metrics showed the CSR setup was losing rankings. At this scale, Next.js adds build complexity (SSG configuration, image optimization, route handlers) that isn't offset by observable SEO gains. |
| **Custom `useScrollSpy` hook** | `react-scroll` library | If the site needed complex scroll orchestration (horizontal scroll sections, parallax-triggered animations, multi-axis scroll containers). For simple vertical scroll with nav highlighting, 30 lines of native API code is the right call. |
| **`react-helmet-async`** | React 19 native `<title>` in components | React 19's native document head components only hoist to `<head>` when rendered on a server (SSR). In a CRA/CSR app, they render as regular DOM nodes in `<body>`. `react-helmet-async` is the standard workaround for CSR apps. |
| **Hardcoded content in JSX** | Markdown/MDX content files (via `react-markdown`) | If content volume grew to 15+ sections or if non-developers needed to edit content. For ~5 sections of ~200 words each, JSX is simpler and avoids an AST parsing dependency. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **React Router** | Single-page site with no pages to navigate between. Adding BrowserRouter would require 404.html fallback hacks on GitHub Pages. HashRouter would add `#/` to URLs for no benefit. | Native anchor links (`id="mission"`) and `scrollIntoView()`. |
| **`react-scroll`** (or any scroll library) | 30KB+ for `element.scrollIntoView({ behavior: 'smooth', block: 'start' })`. Native browser support covers 98%+ of users. The remaining 2% (Safari < 15.4) get instant jump — acceptable degradation. | Native `scrollIntoView()`. One-liner in a click handler: `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })`. |
| **Next.js / Gatsby / Astro** | Framework migration for 5 content sections is disproportionate. At this project size, the build toolchain change introduces more risk than value. Google indexes CRA SPAs (though with a delay). | Keep CRA. If SEO becomes critical later, prerender just the single `index.html` with `react-snap` — a cheaper intervention than full migration. |
| **TypeScript** | The codebase is pure JS. Forcing TS into an existing JS project adds a build config layer (`tsconfig.json`, CRA TS support) and type-annotation overhead for ~5 content components with zero business logic. | Keep JS with JSDoc comments for any shared data shapes (e.g., content section schema). |
| **Markdown/MDX rendering** | `react-markdown` + plugins adds ~50KB to bundle. For 5 short content sections written by the same developer who writes the JSX, there's no maintenance benefit. | JSX template literals or component-level string constants. |
| **CMS (Strapi, Contentful, Sanity)** | No admin panel is needed. Content is edited by the developer, deployed via git. A CMS adds a hosted backend, API calls, loading states, and admin maintenance. | Hardcoded content in components. Content changes = code changes = git push = deploy. |
| **`react-snap` pre-rendering** | Breaks on Node 22+ (Puppeteer compatibility issues), adds 300MB+ to `node_modules`, and only pre-renders one page for a SPA anyway. The maintenance cost exceeds the SEO benefit for this scale. | Skip pre-rendering. If needed later, use `prerender-cli` (lightweight) or a GitHub Action with Playwright. |
| **Hash-based routing** (`#/mission`) | Hash fragments are not sent to servers by crawlers, making every section appear as the same URL. This collapses all sections into one indexed page. | Anchor links (`#mission`) — these ARE sent to crawlers as URL fragments in the rendered page and are used by browsers for scroll positioning. |
| **Google Analytics / tracking pixels** | Not requested, not needed. Adds third-party JS, increases bundle. No data-driven decisions are being made about this site. | Nothing. If analytics are needed later, use a privacy-first option like Plausible (self-hosted, 1KB script). |

## Stack Patterns by Variant

**If the site grew to 15+ sections (multiple pages like events, sermons, blog):**
- Add React Router with BrowserRouter + GitHub Pages 404.html fallback (`cp build/index.html build/404.html`).
- Evaluate prerendering via a GitHub Action + Playwright for the most-visited pages.
- Consider migrating to Next.js static export — the ROI becomes justified at this scale.

**If SEO performance was measurably poor (search console shows indexing issues):**
- Add `react-snap` or `prerender-cli` as a predeploy step (generate `build/index.html` with full content).
- The single-page nature means only one file needs pre-rendering, making this trivial.
- Measure before/after with Search Console's URL Inspection tool.

**If a non-developer needs to edit content:**
- Extract content into a single `src/content/sections.js` constants file with a clear schema.
- This keeps content editing isolated from component logic without introducing a CMS.
- A JSON file import would also work: `import sections from './content/sections.json'`.

**If scroll animations are explicitly requested (not yet):**
- Use Chakra's built-in fade/slide support via the `animation` prop or Chakra v3's `framer-motion` integration.
- Keep animations opt-in and non-blocking. Respect `prefers-reduced-motion`.

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `react-helmet-async` ^2.0 | React ^19.2.4 | Confirmed compatible. Wrap `<App />` in `<HelmetProvider>`. |
| `@chakra-ui/react` ^3.34.0 | React ^19.2.4 | Already in use and confirmed. |
| `react-scripts` 5.0.1 | Node 14-22 | Already in use. CRA 5 works on Node 22 (dev machine). No upgrade needed. |
| `gh-pages` ^6.3.0 | Any Node | Already in use. Deploy script works. |
| `framer-motion` ^12.x | React ^19.x | Already installed as transitive dep. Do NOT add as direct dep unless animations are requested. |
| `react-icons` ^5.x | React ^19.x | Already in use. Works. |

## Section Content Architecture

For the 4 new sections (Mission, Beliefs, History, Leadership), the recommended structure:

```
src/
  content/
    mission.js        # Mission & Vision text content
    beliefs.js        # Statement of Faith content
    history.js        # Organization history timeline/content
    leadership.js     # Leadership team data
  components/
    Nav.js            # Sticky navigation with scroll spy
    Section.js        # Reusable section wrapper (heading + content)
    sections/
      MissionSection.js
      BeliefsSection.js
      HistorySection.js
      LeadershipSection.js
  hooks/
    useScrollSpy.js   # ~30-line IntersectionObserver hook
    useSmoothScroll.js  # click handler helper (one-liner)
  pages/
    HmgDesktop.js     # Extend with new sections and nav
    HmgMobile.js      # Extend with new sections and nav
```

**Key structural decisions:**

1. **Single shared `Section` component** — Each content section wraps in `<Box as="section" id="mission">` with consistent padding, max-width via `Container`, heading with `textStyle` from theme. This eliminates the desktop/mobile duplication anti-pattern flagged in ARCHITECTURE.md.

2. **Content extracted to `src/content/`** — Constants files (not markdown, not CMS) keep prose separate from component code. Each file exports a plain object/array. This refactor can be done without changing the rendering pattern.

3. **Sticky nav in a shared component** — `<Nav />` renders Chakra `Box` (or `Flex`) with anchor links, uses `useScrollSpy` to highlight active section, and sticks to the top on scroll via `position="sticky"` + `top="0"` with a `zIndex` to layer over content. On mobile, either collapse to a hamburger or show a horizontal scrollable nav.

4. **Hero section stays** — The existing hero with CTA buttons (Austin, Hong Kong) remains above the content sections as the primary entry point. Content sections appear below the fold.

## Performance Budget

For the expanded site, target:

| Metric | Target | How |
|--------|--------|-----|
| Bundle size | < 200KB gzipped | No new heavy deps. `react-helmet-async` is ~5KB. New components are thin wrappers around Chakra primitives. |
| LCP | < 2.5s | Hero image optimized to WebP, preloaded. Content sections below the fold load without blocking. |
| CLS | < 0.1 | Chakra v3 handles layout stability. Sticky nav has explicit height. All dimensions set on images. |
| INP | < 200ms | No heavy computations. Smooth scroll is native. |

## Sources

- Chakra UI v3 docs — component API, theme system (`createSystem`/`defineConfig`)
- Chakra UI docs site source — `useScrollSpy` hook pattern (public GitHub repo)
- `react-helmet-async` npm — 6M+ weekly downloads, standard for CRA SEO
- GitHub Pages deployment guide for React SPAs (2026) — static hosting constraints confirmed
- Fokal SEO guide (2026) — CSR vs SSR/SSG decision framework, confirms `react-helmet-async` as correct choice for non-SSR apps
- SPA vs MPA 2026 research — single-page correct for org identity sites with tightly related content
- IntersectionObserver MDN — native browser API, 98%+ support
- Google Search Central — JS SEO basics, confirms Google indexes CSR content with JS pass

---

*Stack research for: Harvest Mission Global content sections expansion*
*Researched: 2026-07-12*

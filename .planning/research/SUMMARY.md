# Project Research Summary

**Project:** Harvest Mission Global
**Domain:** Church/Ministry Organization Informational Website (Global Network Hub)
**Researched:** 2026-07-12
**Confidence:** HIGH

## Executive Summary

Harvest Mission Global (HMCC) is expanding its existing React SPA landing page into a multi-section organizational hub covering mission, beliefs, history, and leadership — linking out to independent location sites in Austin and Hong Kong. The research converges on a **keep-it-simple, extend-don't-replace** strategy: stay on the existing CRA + Chakra UI v3 + GitHub Pages stack, add zero new frameworks, and rely on native browser APIs for scroll-spy and smooth navigation. Only one new npm dependency (`react-helmet-async` for per-section SEO metadata) is justified.

The central tension across research is **CSR SEO viability vs. pragmatic simplicity**. STACK research concludes CRA CSR is adequate for a single-page hub with <10 content sections. PITFALLS research flags that crawlers receive an empty HTML shell and Google's second-wave JS rendering introduces indexing delays. The synthesis: **CRA CSR is acceptable for v1** because all sections share one URL (no routing), but content must be separated from components immediately so that prerendering (via `react-snap` or a Playwright GH Action) can be added as a zero-migration step if SEO metrics show problems.

**Key risks:**
1. **CSR SEO gap** — mitigated by `react-helmet-async`, content-extraction pattern, and a prerendering escape hatch
2. **Content maintenance trap** — mitigated by extracting all copy to `src/content/*.js` constants files from Phase 1
3. **Mobile UX neglect** — mitigated by consolidating HmgDesktop/HmgMobile into single responsive components using Chakra v3's `{ base, md }` props
4. **No content governance** — mitigated by assigning section owners and review cadences during content creation

## Key Findings

### Recommended Stack

The stack is already in place and battle-tested. Extend it with surgical additions, not framework migrations. Full detail in [STACK.md](./STACK.md).

**Core technologies:**
- **React 19 + CRA 5.0.1**: Already in use. Adequate for a 5-section SPA. No migration needed.
- **Chakra UI v3 (`@chakra-ui/react` ^3.34.0)**: Already in use. Responsive props (`{ base, md }`) eliminate the need for separate mobile/desktop components.
- **GitHub Pages**: Already in use at hmccglobal.org. Zero cost, HTTPS, custom domain via CNAME.
- **`react-helmet-async` ^2.0**: The standard for per-section `<title>` and `<meta>` tags in CSR CRA apps. React 19's native head elements only work during SSR.
- **IntersectionObserver (native)**: Custom `useActiveSection` hook for scroll-spy. Zero dependencies.
- **JSON-LD schema**: Inline Organization + WebSite schema via `react-helmet-async`. Zero dependencies.

**What NOT to use:** React Router (single page, no routes), `react-scroll` (native `scrollIntoView` suffices), Next.js/Gatsby/Astro (not justified for 5 sections), TypeScript (existing JS codebase, no complex logic), CMS (content is edited by the developer, deployed via git).

**Performance budget target:** Bundle < 200KB gzipped, LCP < 2.5s, CLS < 0.1, INP < 200ms.

### Expected Features

Full detail in [FEATURES.md](./FEATURES.md).

**Must have (table stakes, P1 — launch):**
- **Mission & Vision section** — core identity statement, #1 priority
- **What We Believe / Statement of Faith** — doctrinal foundation, requires leadership review
- **Our Story / History section** — establishes credibility
- **Leadership Team section** — headshots, names, roles
- **Updated navigation** — scroll-spy sticky nav linking to all sections
- **Brand theme tokens** — populate Chakra theme with brand navy (#0025a3) + DM Sans
- **Service times & locations** — already exist; ensure mobile-visible without scrolling
- **Contact information** — email + physical address in footer

**Should have (differentiators, P2 — v1.x):**
- **Photo gallery** — authentic photos from Austin and Hong Kong congregations (bottleneck: content gathering)
- **"Our Global Family" visual section** — diagram/map showing Austin ↔ Hong Kong connection
- **Newsletter signup** — third-party embed (Mailchimp, etc.), low effort
- **"Get Involved" section** — clear next steps (visit, prayer request, contact)
- **Testimonials / stories** — member quotes from both locations

**Defer (v2+):**
- Blog / news feed (needs content commitment cadence)
- Multilingual support (i18n translation overhead)
- Dark mode toggle (nice-to-have, Chakra supports it natively)
- Interactive history timeline (richer presentation, not essential)

### Architecture Approach

Full detail in [ARCHITECTURE.md](./ARCHITECTURE.md).

A single-page scrollable layout with 5 `<section>` content blocks, a sticky nav with scroll-spy, and a footer. No routing, no state management library, no API data flow. The architecture is intentionally flat and static.

**Major components:**
1. **`App`** — Root orchestrator. Renders Navbar → StickyNav → HeroSection → [4 new sections] → Footer. No props drilling.
2. **`StickyNav`** — Anchor link nav with active-section highlighting via the `useActiveSection` custom hook (IntersectionObserver-based). Reads section IDs, writes active state.
3. **Content Sections** (`HeroSection`, `MissionSection`, `BeliefsSection`, `HistorySection`, `LeadershipSection`) — Self-contained, zero inter-dependencies. Each owns its layout and imports content from `src/content/*.js`. Accept no props.
4. **`Navbar` / `Footer`** — Static layout chrome. No data dependencies.
5. **Theme layer** (`src/theme/index.js`) — Populated tokens for brand colors and fonts. Replaces hardcoded hex codes.

**Key architectural patterns:**
- **Consolidated responsive components** — replace HmgDesktop/HmgMobile duplication with single components using Chakra v3 responsive props
- **Content/code separation** — all copy lives in `src/content/*.js` constants files, not embedded in JSX
- **Native scroll behavior** — CSS `scroll-behavior: smooth` + `scroll-padding-top: 80px` for anchor scrolling

### Critical Pitfalls

Full detail in [PITFALLS.md](./PITFALLS.md).

1. **CSR → SEO invisibility** — Crawlers receive an empty HTML shell. Mitigation: `react-helmet-async` for meta tags, content-extraction pattern enables future prerendering. Verify with `curl` before launch.
2. **GitHub Pages SPA 404 on fresh loads** — Only triggers IF routing is added (not applicable to our single-page design). Avoid by staying single-page in v1.
3. **Hardcoded content maintenance trap** — Changing content requires developer edits. Mitigation: extract all copy to `src/content/*.js` from Phase 1. Document update process in README.
4. **Accessibility failures** — Church visitors are disproportionately older adults. Mitigation: WCAG 2.2 AA baseline, axe DevTools in CI, minimum 16px font, 44x44px tap targets, no accessibility overlays.
5. **Performance regressions** — Bundle grows with content sections. Mitigation: lazy-load below-fold images, convert hero to WebP, audit bundle after adding sections, remove unused `framer-motion`.
6. **Mobile UX driving visitors away** — 70%+ of first-time visitors use mobile. Mitigation: single responsive components, service times visible without scrolling, 44px tap targets, font ≥ 16px.
7. **No content governance** — Content goes stale without ownership. Mitigation: assign section owners, set review cadence (quarterly leadership, annually beliefs/history), document in content files.

## Implications for Roadmap

Based on research, the suggested phase structure aligns the content expansion with architectural refactoring, SEO setup, and accessibility foundations happening in parallel.

### Phase 0: Foundation & Refactoring
**Rationale:** Architectural debt (HmgDesktop/HmgMobile duplication, empty theme tokens, font loading anti-pattern) must be cleaned up before new sections are built. Every new section built on the old patterns multiplies future refactoring cost.
**Delivers:**
- Consolidated responsive `HeroSection` (replaces HmgDesktop + HmgMobile)
- Populated Chakra theme tokens (brand navy #0025a3, DM Sans font)
- Fixed font loading (remove `@import` Google Fonts, use `@fontsource` only)
- `src/content/` directory with initial content files
- `react-helmet-async` installed and `HelmetProvider` wrapping App
- `useActiveSection` hook implemented
- Hero image converted to WebP
- Removed unused `framer-motion` dependency
**Addresses features:** Brand theme consistency (P1), Performance foundations
**Avoids pitfalls:** Anti-pattern 2 (empty tokens), Anti-pattern 4 (premature abstraction)
**Research flag:** Standard patterns — well-documented, low risk

### Phase 1: Content Sections (4 sections in parallel)
**Rationale:** All 4 new content sections (Mission, Beliefs, History, Leadership) have zero inter-dependencies. They can be built concurrently after Phase 0 establishes the theme and content pattern. Content must be written and approved by HMCC leadership — this is the critical path.
**Delivers:**
- `MissionSection` with mission/vision text
- `BeliefsSection` with statement of faith
- `HistorySection` with org narrative/timeline
- `LeadershipSection` with headshots, names, roles
- `SectionHeading` reusable sub-component
- Per-section `<title>` and `<meta name="description">` via `react-helmet-async`
- Per-section JSON-LD schema in `<head>`
- All content extracted to `src/content/*.js` files
- Content owners documented and review cadence established
**Addresses features:** Mission & Vision (P1), Beliefs (P1), History (P1), Leadership (P1)
**Avoids pitfalls:** Pitfall 3 (hardcoded content trap), Pitfall 7 (no content governance)
**Research flag:** Needs deeper research during planning — content copy must be gathered from HMCC leadership. Parallel section development is technically feasible but gated on content approval.

### Phase 2: Navigation & Integration
**Rationale:** StickyNav depends on `useActiveSection` hook (built in Phase 0) and section IDs (set in Phase 1). It's the final integration layer that ties the page together. Mobile-first navigation decisions must be finalized here.
**Delivers:**
- `StickyNav` component with scroll-spy highlighting
- Native smooth scroll via CSS (`scroll-behavior: smooth` + `scroll-padding-top`)
- Responsive nav: visible tabs on desktop, hamburger on mobile
- Service times visible above-the-fold on mobile
- "Skip to main content" accessibility link
- WCAG 2.2 AA audit (axe DevTools)
- External link extraction to constants file with link-checking CI
**Addresses features:** Updated navigation (P1), Global + Local navigation pattern (P1)
**Avoids pitfalls:** Pitfall 4 (accessibility), Pitfall 6 (mobile UX)
**Research flag:** Standard patterns — native scroll-spy is well-documented. Accessibility audit needs a known toolchain (axe DevTools, WAVE).

### Phase 3: Polish & Differentiators (v1.x)
**Rationale:** P2 features depend on content gathering (photos, testimonials) and introduce no architectural risk. They ship after the core informational site is stable and correct.
**Delivers:**
- Photo gallery section (once real photos are gathered from Austin and Hong Kong)
- "Our Global Family" visual section
- Newsletter signup embed
- "Get Involved" section with CTAs
- Testimonials / stories section
- Performance audit: PageSpeed Insights, bundle analysis
- Final SEO verification: `curl` check, Search Console setup, sitemap submission
**Addresses features:** Photo gallery (P2), Global Family (P2), Newsletter (P2), Get Involved (P2), Testimonials (P2)
**Avoids pitfalls:** Pitfall 5 (performance regressions — last phase can audit without blocking)
**Research flag:** Needs deeper research during planning — Photo gathering logistics with Austin and Hong Kong congregations. Newsletter provider selection (Mailchimp vs. alternatives).

### Phase 4: Governance & Maintenance (v2 consideration)
**Rationale:** Content governance is established in Phase 1 (owners assigned), but a formal review cadence and update documentation is completed after all sections are live and the maintenance workflow is clear.
**Delivers:**
- Content review schedule (quarterly leadership, annually beliefs/history)
- README documentation for content update process
- "Last reviewed" dates in content files
- Calendar reminder automation
- Optional: Decap CMS or Tina CMS evaluation if content changes become frequent
**Addresses features:** Content governance
**Avoids pitfalls:** Pitfall 7 (stale content)
**Research flag:** Standard patterns for documentation. CMS migration research only if triggered.

### Phase Ordering Rationale

- **Phase 0 first** because theme tokens, the `useActiveSection` hook, and the content-extraction pattern are shared infrastructure that all 4 content sections depend on. Building on the refactored foundation avoids duplicating the HmgDesktop/HmgMobile anti-pattern.
- **Phase 1 before Phase 2** because the StickyNav needs section IDs and content to scroll to. Content sections must exist (at least with placeholder IDs) before navigation can highlight them.
- **Phase 2 middle** because navigation is the connective tissue that makes the single-page design work. It completes the user-facing experience.
- **Phase 3 after** because P2 features are enhancement-layer — they add polish but don't affect the core informational mission.
- **Phase 4 ongoing** because content governance is a continuous practice, not a build task.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1 (Content Sections):** Content copy gathering from HMCC leadership — this is the critical path bottleneck. Research needed on content approval workflow and whether sections can be shipped incrementally.
- **Phase 3 (Differentiators):** Newsletter provider evaluation (Mailchimp vs. alternatives). Photo gathering logistics with two congregations across continents.

Phases with standard patterns (skip research-phase):
- **Phase 0 (Foundation):** Well-documented patterns — Chakra theme configuration, CRA font loading fix, IntersectionObserver usage.
- **Phase 2 (Navigation):** Native scroll-spy and smooth scroll are browser API standards.
- **Phase 4 (Governance):** Content inventory + review cadence is a documentation exercise. CMS migration research only if triggered by future requirements.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies verified against current codebase and official docs. CRA + Chakra v3 + GitHub Pages is confirmed stable. |
| Features | HIGH | Feature prioritization based on church website research standards (multiple sources, 2024-2026). P1 set aligns exactly with PROJECT.md requirements. |
| Architecture | HIGH | Patterns verified against Chakra UI v3 API, Chakra docs site source code (public), and established React patterns. No speculative abstractions. |
| Pitfalls | HIGH | Every pitfall sourced from church website post-mortems, a11y guides, SEO research, and GitHub Pages deployment case studies. Recovery strategies costed. |

**Overall confidence:** HIGH

### Gaps to Address

- **Content copy (Phase 1 gating item):** Research assumes Mission, Beliefs, History, and Leadership text will be provided by HMCC leadership. If content is delayed or incomplete, Phase 1 must ship sections incrementally (e.g., Mission + Beliefs first, then History + Leadership in a follow-up). The architecture supports this — sections have zero inter-dependencies.
- **Photo gathering logistics (Phase 3):** Real photos require coordination with Austin and Hong Kong congregations. If photos are not available, Phase 3 ships without the gallery — the site is still complete and correct.
- **Newsletter provider (Phase 3):** Assumes a third-party embed (Mailchimp, ConvertKit, Buttondown) is acceptable. If HMCC has no email marketing account, this section is deferred.
- **SEO measurement baseline:** No current Search Console or PageSpeed data exists. A baseline should be captured before Phase 0 changes to measure improvement. This could affect the decision to add prerendering in v1.x.

## Sources

### Primary (HIGH confidence)
- Chakra UI v3 official docs — component API, `defineConfig`, responsive props
- `react-helmet-async` npm — confirmed compatible with React 19, 6M+ weekly downloads
- React 19 release notes — `<title>`/`<meta>` SSR-only behavior confirmed
- GitHub Pages deployment guides (2026) — static hosting constraints, CNAME, 404.html pattern
- IntersectionObserver MDN — browser API support at 98%+
- Lifeway Research — church website best practices (2025)
- Fokal SEO Guide (2026) — CSR vs SSR decision framework

### Secondary (MEDIUM confidence)
- Church website post-mortems — ChurchCreation, WPHeadliner (2026)
- a11y guides — A11yFix Religious Organization Guide (2026), ChurchCreation ADA Guide
- SPA SEO research — Google Search Central JS SEO, ScreamingCAT JS SEO Guide (2026)
- Church website design examples — Hillsong.com, AustinStone.org, Redeemer.com (direct analysis)
- WCAG 2.2 AA and EAA legal context — European Accessibility Act (effective June 2025)

### Tertiary (LOW confidence)
- Content governance case studies — Content.One Salvation Army, Ghost Sherpa Temple Terrace
- Newsletter provider comparison — Mailchimp vs. alternatives (project context specific, needs HMCC input)

---

*Research completed: 2026-07-12*
*Ready for roadmap: yes*

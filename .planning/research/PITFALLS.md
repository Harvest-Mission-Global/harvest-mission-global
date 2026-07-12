# Domain Pitfalls

**Domain:** Church/ministry organization informational website
**Researched:** 2026-07-12
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Building a Content Site on Client-Side Rendered React (CSR → SEO Invisibility)

**What goes wrong:**
The site expands from a simple landing page into a multi-page content site (Mission, Beliefs, History, Leadership) but stays on pure client-side rendering. Googlebot, Bingbot, and all AI crawlers (GPTBot, ClaudeBot, PerplexityBot) receive an empty HTML shell. Content only appears after JavaScript downloads and executes. The site is effectively invisible outside of Google's second-wave rendering — and even Google can delay indexing by days or weeks.

**Why it happens:**
Create React App ships a CSR architecture by default. It's the fastest path from zero to deployed. The landing page works fine because it has minimal content and one route. The developer assumes "it works on my machine, it works for crawlers" and doesn't check what `curl` returns. By the time SEO issues surface, the site has 5+ pages and a content restructuring is painful.

**How to avoid:**
- Before expanding beyond a single page, verify what a crawler sees: run `curl https://hmccglobal.org/` and inspect the HTML — check whether `<title>`, `<meta name="description">`, `<h1>`, and body text exist in the raw HTML or only after JS executes.
- For a content site with 5+ pages, use a framework that produces static HTML at build time. Options in order of fit:
  1. **Astro** — best fit for content-heavy, low-interactivity sites. Ships zero JS by default, opt-in React islands for interactive components.
  2. **Next.js with `output: 'export'`** — SSG output, still uses React/Chakra but produces real HTML files per route. Handles routing correctly on GitHub Pages.
  3. **react-snap** — Puppeteer-based prerendering that snapshots CSR output to HTML. Minimal migration but another moving part.
- If staying on CRA+CSR is non-negotiable: implement the 404.html SPA redirect hack (rafgraph/spa-github-pages pattern) AND add `<meta name="description">` and Open Graph tags to the static `index.html` as a minimum. Accept that deep pages will have poor SEO.

**Warning signs:**
- `curl <any-non-root-url>` returns only a `<div id="root"></div>` shell with no content
- Lighthouse "SEO" score is 70-80 despite good content
- Google Search Console shows pages submitted but "discovered - currently not indexed" for weeks
- Sharing a page on Slack/Facebook generates a preview with no description or wrong image

**Phase to address:**
Phase 1 (Content Expansion) — decide the rendering architecture before adding pages. Retrofitting SSG after 10 pages are built costs more time than choosing it upfront.

---

### Pitfall 2: SPA Routing Breaks on GitHub Pages — Fresh Page Loads Return 404

**What goes wrong:**
The site adds routes for `/mission`, `/beliefs`, `/leadership`, etc. using React Router's `BrowserRouter`. Navigating between pages in-app works fine. But when a user (or crawler) loads `https://hmccglobal.org/beliefs` directly — by typing the URL, clicking a search result, or opening a bookmark — GitHub Pages returns a 404. The server has no file at `/beliefs` and serves nothing.

**Why it happens:**
GitHub Pages is a static file server. It doesn't know about client-side routing. It looks for a folder/file matching the URL path. There is no `beliefs/index.html`, so it returns 404. React Router can only handle routes once the JavaScript has loaded, but the server never serves the JavaScript because it's looking for `/beliefs`.

**How to avoid:**
- Use the **HashRouter** (React Router with `createHashRouter`). URLs become `https://hmccglobal.org/#/beliefs`. Crawlers still index the home page content. Downside: URLs look uglier, and some crawlers treat `#` fragments differently. Acceptable for a small org site.
- Use the **spa-github-pages pattern** (rafgraph): copy `404.html` with a redirect script that converts paths to query strings, and add a companion script in `index.html` that reverses the redirect. This gives clean URLs with BrowserRouter.
- **Best fix**: Generate static HTML per route (SSG) so each URL has a real file. Then GitHub Pages serves `/beliefs/index.html` naturally — no routing hacks needed.

**Warning signs:**
- Internal navigation works but refreshing on any sub-page shows the 404 GitHub Pages error screen.
- Search engine results for `site:hmccglobal.org/beliefs` return nothing or show a 404.
- The `gh-pages` deploy log shows only `index.html` and asset files — no per-route HTML directories.

**Phase to address:**
Phase 1 (Content Expansion) — must be resolved as soon as a second route is added. The current single-page site has no routing issue; this triggers on the first additional page.

---

### Pitfall 3: Static Content That Nobody Can Maintain — The Hardcoded Content Trap

**What goes wrong:**
All content (Mission text, Beliefs, Leadership bios, History) is hardcoded in React components. Changing a pastor's bio, updating a belief statement, or fixing a typo requires:
1. Opening the React source code
2. Finding the right JSX file
3. Editing hardcoded strings
4. Building and deploying via `gh-pages`
5. Waiting for CI/CD

The volunteer communications director or pastor cannot make updates. Every content change becomes a developer ticket. Content goes stale because the friction is too high. The site becomes a static artifact instead of a living organizational front door.

**Why it happens:**
"Content is static, no CMS needed" sounds reasonable at landing-page scale. A single page with 200 words of hero text doesn't need a CMS. But as content grows to 5+ pages with 2,000+ words, the maintenance burden shifts. The developer who built the site moves on, and nobody left can (or wants to) edit React components.

**How to avoid:**
- Separate content from code: put all copy in a single JSON or Markdown file (e.g., `src/content/mission.json`, `src/content/leadership.json`). Components import content — they don't hardcode text. This way, editing content only requires editing a data file, not touching JSX.
- Use a lightweight, Git-backed CMS like **Decap CMS** (formerly Netlify CMS) or **CloudCannon**. Editors log into a browser UI, edit content, and saves commit to the repo as a PR. The static build picks up the changes.
- For the current project specifically: extract all hardcoded strings to a single `src/content/index.js` file. This makes content visible in a single place and simplifies any future CMS migration. Even without a CMS, this is the minimum viable pattern.
- Document the content update process in a README: "To update the leadership page, edit `src/content/leadership.json` and commit to `main`."

**Warning signs:**
- Content typos are reported via email but take 2+ weeks to fix because "someone needs to update the code"
- The leadership page still lists a pastor who left 6 months ago
- Service times or contact info are wrong and nobody has time to fix them
- The person who built the site is the only one who can update content

**Phase to address:**
Phase 1 (Content Expansion) — implement content/code separation before writing content for the new pages. Retrofitting extraction is harder than starting with it.

---

### Pitfall 4: Church Website Accessibility That Excludes the Congregation It Serves

**What goes wrong:**
The site fails WCAG 2.2 AA on multiple dimensions: poor color contrast (white text on light photo backgrounds for hero sections), missing alt text on images, keyboard navigation gaps, no captions on embedded videos, forms with invisible labels, and reliance on color alone to convey information. Blind congregants cannot use the site. Deaf members cannot access sermon content. Older members with low vision struggle to read light-gray body text. Neurodivergent visitors are overwhelmed by auto-playing content or flashing animations.

**Why it happens:**
Four factors compound: (1) the team building the site has no accessibility training and assumes "it looks good" = "it works"; (2) WCAG knowledge in the React/CRA ecosystem is less widely disseminated than in CMS-based church sites; (3) Chakra UI v3 has good defaults, but custom overrides (hero overlays, custom color tokens) easily break them; (4) accessibility is deferred because "nobody has complained" — but users who can't use the site don't complain, they leave.

**Why it matters for this project specifically:** Church members are disproportionately older adults — exactly the demographic most affected by low contrast, small text, and poor keyboard navigation. Additionally, HMCC is a global organization with potential EU visitors: the European Accessibility Act (EAA, effective June 2025) applies to any digital service offered to EU residents, including diaspora congregations accessing livestreams or content.

**How to avoid:**
- Run the WAVE tool (wave.webaim.org) and axe DevTools on every new page before shipping. Fix all contrast and label issues.
- Maintain WCAG 2.2 AA as the minimum standard. For a Chakra-based site, this means:
  - Verify all color combinations meet 4.5:1 contrast ratio for body text, 3:1 for large text
  - Never use white text over light photo backgrounds without a dark overlay
  - Add `alt` text to every image (decorative images get `alt=""`)
  - Ensure keyboard tab order matches visual order
  - Add "Skip to main content" link at the top of every page
  - Use 16px minimum font size for body text, 1.5+ line height
- Test with a screen reader (VoiceOver on Mac, NVDA on Windows) at least once per phase.
- Do NOT use accessibility overlays (widgets that claim to fix accessibility via JavaScript) — they don't fix underlying issues and interfere with real assistive technology.

**Warning signs:**
- Lighthouse accessibility score below 85
- Any image lacks alt text
- Text is smaller than 16px for body copy
- Navigation requires a mouse (keyboard tab stops don't work)
- Color is the only way information is conveyed (e.g., red/green indicators)
- Contrast ratio below 3.0:1 for any text element

**Phase to address:**
Phase 1 (Content Expansion) — establish accessibility baseline before adding new pages. Each new page must pass axe DevTools before merging. Phase 2 (Media/Video) — ensure all video content has captions.

---

### Pitfall 5: Performance Regressions from Content-Heavy React Pages

**What goes wrong:**
As pages are added (Mission, Beliefs, History, Leadership), the bundle grows. Each page imports additional Chakra components, more react-icons, more inline SVG, and larger images. The production JS bundle, already at ~431 KB for the landing page, grows to 600-800 KB. LCP (Largest Contentful Paint) time exceeds 3 seconds on mobile. The hero image loads after the page is already visible. Google's tightened Core Web Vitals thresholds (LCP ≤ 2.0s, INP ≤ 150ms as of 2026) are missed.

**Why it happens:**
CRA bundles the entire dependency tree. Importing one component from Chakra often pulls in the whole module. Image-heavy content pages compound the problem: large hero images, leadership headshots, and historical photos are loaded eagerly. React's default behavior evaluates all component code upfront. No code splitting, no lazy loading, no image optimization.

**How to avoid:**
- Audit the bundle after adding pages: use `source-map-explorer` or `webpack-bundle-analyzer` to see what's inflating the JS.
- Lazy-load route components: `const Mission = React.lazy(() => import('./pages/Mission'))`. This splits the bundle per route so users only download the JS for the page they visit.
- For images:
  - Apply `priority` to the hero image (above-fold LCP element) — never lazy-load your LCP candidate
  - Use `loading="lazy"` on all images below the fold
  - Convert `BG_top.png` (117 KB) to WebP/AVIF — expect 50-70% reduction
  - Set explicit `width` and `height` on every image to prevent CLS
- Evaluate whether framer-motion is actually used. If not, remove it from dependencies — it adds significant bundle weight.

**Warning signs:**
- Lighthouse performance score drops below 70 when new pages are added
- `build/static/js/main.*.js` exceeds 500 KB
- Mobile LCP in PageSpeed Insights exceeds 3 seconds
- Hero image doesn't appear until 2+ seconds after navigation
- Scroll jank when images load (CLS)

**Phase to address:**
Phase 1 (Content Expansion) — implement code splitting and image optimization as foundational infrastructure before building content pages. Don't add content first and optimize later.

---

### Pitfall 6: Mobile UX That Drives Away the 70% Who Visit on Phone First

**What goes wrong:**
Over 70% of first-time church visitors check the website on their phone before attending. The mobile experience is neglected: navigation is a hamburger menu with 10+ items, the hero image takes 5 seconds to load on 4G, CTAs are too small to tap, text is crammed with 14px font, and the "Service Times" information is buried three clicks deep. First-time visitors bounce.

**Why it happens:**
The desktop-first approach: the site is designed on a 27-inch monitor, and mobile is an afterthought. The mobile component (`HmgMobile.js`) is a separate file that mirrors the desktop version but rarely receives the same design attention. Information architecture decisions prioritize what looks good on desktop (a large hero image, multi-column layout) over what mobile users need (quick access to service times, location, and a "Plan Your Visit" CTA).

**Why this matters for HMCC specifically:** HMCCGlobal.org serves as the central hub linking to Austin and Hong Kong locations. A mobile visitor is likely looking for service times or directions to one of these locations. If the information is hard to find, they visit a competitor church instead.

**How to avoid:**
- Mobile-first content priority: above the fold on mobile should show, in order:
  1. Organization name + tagline
  2. Service times (most critical information for a visitor)
  3. Location links (Austin, Hong Kong)
  4. Clear "I'm New" or "Plan Your Visit" CTA
  5. Everything else (Mission, Beliefs, Leadership)
- Use a single responsive component, not separate mobile/desktop files. Use Chakra's responsive style props (`base`, `md`, `lg`) to adjust layout per breakpoint. This prevents the maintenance drift that causes mobile neglect.
- Navigation: for 4 or fewer links, show them as visible tabs. For 5+ links, use a hamburger menu — but ensure it passes accessibility testing (keyboard open/close, focus management).
- Minimum tap target size: 44x44px (Apple HIG / WCAG 2.5.8). Verify all buttons and links meet this.
- Service times and location must be reachable within 2 taps from any page.
- Test on a real phone: open the site on 4G throttling, ask "can I find service time in 5 seconds?"

**Warning signs:**
- Mobile PageSpeed Insights score below 50
- Desktop and mobile use separate component files with duplicated logic
- The mobile menu has 8+ items
- Font size is below 16px on mobile
- CTA buttons are smaller than 44px tall
- Service times or location are not visible on the home page without scrolling

**Phase to address:**
Phase 1 (Content Expansion) — adopt a single responsive component model and define mobile content priority before adding pages. Phase 2 (Navigation) — implement mobile-first navigation structure.

---

### Pitfall 7: No Content Governance — The "Who Owns This Page?" Problem

**What goes wrong:**
Content is added for Mission, Beliefs, History, and Leadership during the expansion. Six months later, a belief statement is revised by the church leadership, but nobody updates the site. A pastor leaves, but their bio remains online. The History section still says "founded in 2005" but the organization's 20-year anniversary was last year and the text wasn't updated. The site slowly drifts away from accuracy. Each inaccuracy erodes trust.

**Why it happens:**
Content governance is invisible during the build phase. Everyone is focused on getting the initial content written and looking good on the page. No owner is assigned to each content section. No review cadence is established. The assumption is "we'll keep it updated" — but without assigning responsibility and process, updates don't happen. This is the #1 cited failure mode in church website post-mortems.

**For a static site without a CMS, this is amplified** because every content change requires a code push. The friction means updates happen even less frequently than on a CMS-based site.

**How to avoid:**
- Create a content section inventory: for each section (Mission, Beliefs, History, Leadership), document:
  - Last reviewed date
  - Review cadence (quarterly for leadership, annually for beliefs/history)
  - Owner (by role, not name — e.g., "Lead Pastor" for beliefs, "Communications Director" for history)
- Add review dates as code comments in the content file so they're visible in the editor
- Set up a recurring calendar reminder (every 3 months) to review all content
- For the static site, choose a format that makes content changes easy:
  - Markdown content files in `src/content/` with frontmatter for metadata
  - A brief README in `src/content/` explaining how to make updates
- If content changes are frequent (monthly+), migrate to a Git-backed CMS (Decap CMS, Tina CMS) that provides a web editor while keeping the static generation pipeline

**Warning signs:**
- The leadership page lists someone who left the organization
- Beliefs or mission statements don't match the current printed materials used at services
- The History section says "currently X locations" but the count has changed
- A "last updated" date on any page hasn't changed in 12+ months
- Nobody can answer "who is responsible for updating the website content?"

**Phase to address:**
Phase 1 (Content Expansion) — assign content owners during the content creation process. Phase 3 (Maintenance) — establish review cadence and documentation.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoding content in JSX | Fastest path to render on page | Content changes require developer; no non-technical editors can update | Never for content that changes (leadership, beliefs, events) |
| Separate mobile/desktop components | Quick responsive implementation | Double maintenance; changes need both files edited; drifts over time | Never — use a single responsive component from the start |
| Using HashRouter for GitHub Pages | Avoids 404 routing bug | URLs include `#/` — slightly worse for SEO, less shareable | Acceptable as temporary fix; prefer SSG for clean URLs |
| Not extracting Chakra theme tokens | Fast initial development (hex codes everywhere) | Every color change requires find-and-replace across files; design system drift | Never — define tokens before building any new pages |
| Using PNG instead of WebP for images | No conversion step needed | 2-3x larger file sizes; slower LCP and CLS risk | Never for hero/background images; small icons are acceptable |
| Keeping framer-motion as dependency even if unused | Avoids breaking changes | 30-50 KB of unused bundle JS | Only if actively used for animations; otherwise remove |
| Importing entire Chakra component library | Convenient, no auditing needed | Larger bundle; unused components still compiled | Acceptable for MVP; audit and tree-shake in a later phase |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| GitHub Pages + React Router | Assuming BrowserRouter works out of the box | Use HashRouter, or deploy the spa-github-pages 404.html redirect pattern, or (best) generate static HTML via SSG |
| Google Search Console | Not verifying the domain | Verify hmccglobal.org in Search Console; submit sitemap; monitor "coverage" reports for SPA-only pages |
| YouTube/Vimeo embedded videos | Auto-playing with sound; no captions | Set `autoplay=0`; use `<iframe title="...">` for accessibility; add captions or provide transcripts |
| External location links (atx.hmccglobal.org, hk.hmccglobal.org) | Hardcoded URLs in multiple components with no error handling | Extract to a constants file; add link-checking CI to detect 404s on external links |
| Google Business Profile | Not keeping service times synced with website | Assign someone to verify GBP service times match website; this is the #1 source of first-time visitor frustration |
| Font loading (DM Sans) | Google Fonts @import + @fontsource npm simultaneously | Use @fontsource only (self-hosted, no external request). Remove the @import from App.css |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Lazy-loading the hero image (LCP element) | LCP > 3s on mobile; Lighthouse flags "LCP image was lazily loaded" | Use `priority` prop / `fetchpriority="high"` on the hero; never add `loading="lazy"` to above-fold images | Immediately — first paint of any page with a hero image |
| No image dimensions on `<img>` | CLS > 0.1; content jumps as images load | Always set explicit `width` and `height` on every `<img>` tag | First page view — every image without dimensions |
| Large PNG hero background | 117 KB BG_top.png loads before anything else | Convert to WebP (40-60 KB); use `<picture>` with WebP + PNG fallback | Every slow 4G connection |
| No code splitting on route components | 600+ KB JS bundle loaded before any page content renders | Use `React.lazy()` + `<Suspense>` per route | After adding 3+ content pages |
| Bundling all of Chakra UI + react-icons | Bundle grows 200-300 KB even though only 20% of components are used | Audit imports; use direct imports from `@chakra-ui/react` subpaths (Chakra v3 supports tree-shaking better); trim unused icon imports | Scales with every new component added |
| No HTTP caching on GitHub Pages | Repeat visitors download the same 400+ KB JS bundle | GitHub Pages sets `Cache-Control: max-age=600` by default; use service worker or move to a CDN with better cache config | Every repeat visit within the same session |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| No CSP (Content Security Policy) meta tag | XSS if any user-generated content is ever rendered (even comments, prayer requests) | Add `<meta http-equiv="Content-Security-Policy">` to `public/index.html` |
| Hardcoded email address `admin@hmccglobal.org` | Harvested by spammers; change requires code push | Extract to an env variable or config constant; consider a contact form instead (or use a contact form service) |
| Exposed CRA dev info in production | Default CRA favicon, title "React App", or debug headers reveal tech stack | Clean up `public/index.html` title and meta; remove unused CRA boilerplate |
| Third-party widgets (giving, form) without VPAT | Embedded widgets may leak data or fail accessibility | Before embedding any widget (Tithe.ly, Planning Center, etc.), request their VPAT (Voluntary Product Accessibility Template) |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Service times buried in navigation | Visitor cannot find when to attend — they leave and visit another church | Show service times in the hero section or a persistent top banner on every page |
| Hamburger menu with 8+ items | Under-50% discoverability; visitors miss key pages | 3-5 links max in main nav; consider a secondary footer nav for less important links |
| "Church speak" / insider jargon | New visitors don't understand terms like "fellowship," "small groups," "discipleship track" | Use plain language for new-visitor-facing content; reserve insider terms for internal pages |
| Auto-playing video with sound | Startles mobile user; inaccessible; high data usage | Never auto-play. Use a poster image with a play button overlay |
| PDF bulletins as primary format | Inaccessible to screen readers; poor mobile experience | Publish content as HTML pages; provide tagged PDF as secondary format only |
| Stock photos instead of real congregation photos | Feels impersonal and generic — visitors don't know if the church is diverse or what the actual community looks like | Use real photos of the building, congregation, and events |
| No "What to Expect" for first-time visitors | Anxiety about visiting a new church — not knowing dress code, parking, service length, kids' check-in | Create a dedicated "Plan Your Visit" page answering practical questions |
| Contact form without confirmation | User submits a prayer request or question and doesn't know if it was received | Show a clear "Thanks, we received your message" state after form submission (accessible announcement) |
| Leadership page without photos or bios | Impersonal; visitors can't connect names to faces before attending | Include headshot, role, and 2-3 sentence bio for each leader |

---

## "Looks Done But Isn't" Checklist

- [ ] **New content page:** Verify the route works on a fresh page load (not just in-app navigation). On GitHub Pages, test `https://hmccglobal.org/mission` directly in a browser.
- [ ] **New content page:** Run `curl` command to verify content (title, h1, body text) appears in the raw HTML, not just after JS renders.
- [ ] **New image:** Has `alt` text been added? If decorative, is `alt=""` set?
- [ ] **New image:** Have explicit `width` and `height` attributes been set to prevent CLS?
- [ ] **New image:** Is it in WebP format (or using `<picture>` with fallback)?
- [ ] **New section:** Is the text stored in a content file (e.g., `src/content/`), not hardcoded in a component?
- [ ] **Navigation change:** Can you reach "Service Times" and "Location" within 2 taps/clicks from the homepage?
- [ ] **Accessibility:** Does the page pass axe DevTools with zero violations?
- [ ] **Accessibility:** Tab through the entire page — is focus visible on every interactive element?
- [ ] **Mobile:** Open the page on a real phone (or Chrome DevTools device emulation). Is font size at least 16px? Are tap targets at least 44x44px?
- [ ] **SEO:** Does the page have a unique `<title>` and `<meta name="description">`?
- [ ] **SEO:** Does the page have Open Graph tags for social sharing?
- [ ] **Link check:** Are all hardcoded URLs (location links, external resources) still valid? Run a broken-link check.
- [ ] **Content review:** Has the content owner approved the final text?
- [ ] **Content review date:** Has a "next review" date been set for this page?
- [ ] **Bundle check:** Has the production JS bundle size been checked against the pre-expansion baseline? Did it grow significantly?
- [ ] **Performance:** Run PageSpeed Insights mobile test — is LCP < 2.5s?

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| CSRed site needs SEO (content invisible to crawlers) | MEDIUM (2-4 days) | 1. Extract all content to JSON files. 2. Add react-snap for prerendering OR migrate to Next.js SSG. 3. Resubmit URLs to Search Console. 4. Verify with `curl`. |
| GitHub Pages 404 on page refresh | LOW (hours) | 1. Implement the 404.html redirect pattern (rafgraph/spa-github-pages). 2. Or switch to HashRouter. 3. Test all routes. |
| Content has gone stale (6+ months no updates) | LOW to MEDIUM | 1. Audit all pages — mark which content is outdated. 2. Assign owners. 3. Schedule updates. 4. If changes are frequent, add a CMS layer. |
| Large JS bundle (600+ KB) | MEDIUM (2-3 days) | 1. Run bundle analyzer to find bloat. 2. Implement route-level code splitting. 3. Remove unused dependencies (framer-motion, unused icons). 4. Verify performance improvement. |
| Mobile UX broken (navigation, tap targets) | MEDIUM (1-2 days) | 1. Audit mobile-specific issues: font size, tap targets, nav usability. 2. Merge separate Desktop/Mobile components into one responsive component. 3. Test on real devices. |
| Accessibility violations discovered late | HIGH (depends on scope) | 1. Run full axe DevTools audit on every page. 2. Fix contrast issues first (highest user impact). 3. Add alt text to all images. 4. Fix keyboard navigation. 5. Test with screen reader. Do NOT use an accessibility overlay. |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| CSR → SEO invisibility | Phase 1 (Content Expansion) — choose SSG/astro/next before adding pages | `curl` output contains full HTML with content, title, meta |
| SPA routing 404 on GitHub Pages | Phase 1 — implement routing fix before second route is added | Fresh page load on every route returns 200, not 404 |
| Hardcoded content maintenance trap | Phase 1 — separate content from code before writing new pages | Non-developer can update content by editing a single JSON file |
| Accessibility failures | Phase 1 — add axe DevTools to CI; Phase 2 (Media) — captions on video | Lighthouse accessibility ≥ 90; axe violations = 0 |
| Performance regressions | Phase 1 — code splitting and image optimization as infrastructure | LCP < 2.0s mobile (PageSpeed Insights); bundle < 500 KB |
| Mobile UX that drives visitors away | Phase 1 — adopt a single responsive component; mobile-first content priority | Service times found within 2 taps on mobile; font ≥ 16px; tap targets ≥ 44px |
| No content governance | Phase 1 — assign content owners during content creation; Phase 3 — establish review cadence | Every page has a documented owner and next review date |

---

## Sources

- **Church website content strategy post-mortems:** ChurchCreation (2026), WPHeadliner (2026), Ad Crucem / Substack (2023)
- **SPA on GitHub Pages routing issues:** rafgraph/spa-github-pages (GitHub), Stack Overflow multiple threads, Dev Avatar (2024)
- **Church website accessibility failures:** A11yFix Religious Organization Guide (2026), ChurchCreation ADA Guide (2026), Social Animal Design Guide (2026), ResourceUMC (2024)
- **React SPA SEO pitfalls:** Google Search Central JS SEO docs, Fokal SPA SEO Guide (2026), ScreamingCAT JS SEO Guide (2026), SEOhead JS Rendering Guide (2026)
- **Image optimization and Core Web Vitals:** Cloudinary (2026), WebGaro LCP Guide (2026), Pagepro Next.js Image Guide (2026), DEV.to Lazy Loading vs LCP (2026)
- **Mobile UX for church websites:** NN Group Hamburger Menu Study (2016), Social Animal Church Design Guide (2026), NewCulture Church Mistakes (2026), REACHRIGHT Navigation (2021)
- **Content governance models:** Content.One Salvation Army Case Study, Ghost Sherpa Temple Terrace Case Study (2026), Hillsong Church Case Study (4mation)
- **WCAG requirements and legal context:** European Accessibility Act (2025), US ADA Title III, California Unruh Act, Section 504 Rehabilitation Act

---

*Pitfalls research for: Harvest Mission Global — church org website expansion*
*Researched: 2026-07-12*

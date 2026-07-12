# Architecture Research

**Domain:** Church organization content website (React SPA)
**Researched:** 2026-07-12
**Confidence:** HIGH

## Standard Architecture

### Recommended Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Bootstrap Layer                              │
│  src/index.js: ChakraProvider + React.StrictMode + font import       │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Layout / Shell Layer                            │
│  src/App.js                                                          │
│  ┌────────────┐  ┌──────────────────┐  ┌──────────────┐            │
│  │  <Navbar/> │  │  <StickyNav/>    │  │  <Footer/>   │            │
│  │  (hero)    │  │  (scroll spy)    │  │  (bottom)    │            │
│  └────────────┘  └──────────────────┘  └──────────────┘            │
├─────────────────────────────────────────────────────────────────────┤
│                        Content Sections                              │
│  Single scrollable page, one <section> per content block             │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  <HeroSection />           — Brand hero + CTAs               │   │
│  ├──────────────────────────────────────────────────────────────┤   │
│  │  <MissionSection />        — Mission & Vision                │   │
│  ├──────────────────────────────────────────────────────────────┤   │
│  │  <BeliefsSection />        — Statement of Faith              │   │
│  ├──────────────────────────────────────────────────────────────┤   │
│  │  <HistorySection />        — Our Story / Timeline            │   │
│  ├──────────────────────────────────────────────────────────────┤   │
│  │  <LeadershipSection />     — Global Leadership Team          │   │
│  └──────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│                         Theme Layer                                  │
│  src/theme/index.js: populated tokens (brand colors, fonts, spacing) │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Implementation |
|-----------|----------------|----------------|
| `App` | Render page shell: Navbar, sections, Footer | `src/App.js` — orchestrates layout |
| `Navbar` | Sticky top bar with logo, nav links, mobile hamburger menu | `src/components/layout/Navbar.js` |
| `Footer` | Contact info, copyright, social links | `src/components/layout/Footer.js` |
| `StickyNav` | Anchor link navigation with scroll-spy highlighting | `src/components/layout/StickyNav.js` |
| `HeroSection` | Brand hero with background image, title, CTA buttons | `src/sections/HeroSection.js` |
| `MissionSection` | Mission & Vision content block | `src/sections/MissionSection.js` |
| `BeliefsSection` | Statement of Faith content block | `src/sections/BeliefsSection.js` |
| `HistorySection` | Organization history / timeline | `src/sections/HistorySection.js` |
| `LeadershipSection` | Leadership team grid/cards | `src/sections/LeadershipSection.js` |

## Recommended Project Structure

```
src/
├── index.js                  # Entry point — React root mount, ChakraProvider
├── index.css                 # Global body styles (minimal)
├── App.js                    # Root component — composes Navbar + sections + Footer
├── components/
│   ├── layout/               # Shared layout components
│   │   ├── Navbar.js         # Sticky navigation bar
│   │   ├── StickyNav.js      # Anchor link nav with scroll-spy
│   │   └── Footer.js         # Site footer
│   └── ui/                   # Reusable UI primitives (if extracted)
│       └── SectionHeading.js # Reusable heading pattern for sections
├── sections/                 # Content section components (one per content block)
│   ├── HeroSection.js        # Hero with brand + CTAs (consolidated from HmgDesktop/Mobile)
│   ├── MissionSection.js     # Mission & Vision
│   ├── BeliefsSection.js     # What We Believe / Statement of Faith
│   ├── HistorySection.js     # Our Story / History
│   └── LeadershipSection.js  # Leadership Team
├── hooks/                    # Custom React hooks
│   └── useActiveSection.js   # Scroll-spy via IntersectionObserver
├── theme/
│   └── index.js              # Chakra UI v3 theme — populated tokens
├── images/                   # Static image assets
│   ├── BG_top.png            # Hero background (keep, maybe convert to WebP)
│   ├── ripple.png            # Decorative element (keep)
│   └── (new section images)  # Images for history, leadership, etc.
├── App.css                   # Legacy CRA styles (prune, keep minimal)
├── reportWebVitals.js        # CWV reporter (keep)
├── setupTests.js             # Jest setup
└── App.test.js               # Smoke test
```

### Structure Rationale

- **`src/sections/` over `src/pages/`:** This is a single-page site. "Sections" better describes the content blocks than "pages." Each section maps 1:1 to a content area on the scrollable page. Avoids the mental model that these are separate routes.

- **`src/components/layout/`:** Layout components (Navbar, Footer) are structurally different from content sections. They appear once, frame the page, and have no content variant. Separating them from sections prevents layout/config bloat in content components.

- **`src/components/ui/`:** Only extract when a pattern repeats 3+ times. The `SectionHeading` (consistent heading style shared across sections) would qualify. Do not create this directory preemptively — YAGNI until the third repetition.

- **`src/hooks/`:** One custom hook (`useActiveSection`) for the IntersectionObserver-based scroll-spy. This is the only non-trivial logic that justifies extraction from a component.

## Architectural Patterns

### Pattern 1: Consolidated Responsive Component (Replacing HmgDesktop/HmgMobile)

**What:** A single component uses Chakra UI v3 responsive props (`{ base: value, md: value }`) instead of two separate desktop/mobile components. This is the standard Chakra v3 pattern — the framework's responsive style props are designed precisely for this.

**When to use:** Any component where the difference between mobile and desktop is only layout/spacing values, not fundamentally different content or structure.

**Trade-offs:** More prop declarations in one file vs. two separate files. The single file is shorter in total lines (no duplicated structure), eliminates drift risk, and changes need one edit instead of two.

**Example (HeroSection consolidation pattern):**

```jsx
// Instead of HmgDesktop.js + HmgMobile.js → one HeroSection.js
export default function HeroSection() {
  return (
    <Box
      // Responsive background — same image, different sizing
      backgroundSize={{ base: "cover", md: "80% auto" }}
      minH={{ base: "43.75rem", md: "45rem" }}
      // ...shared hero markup
    >
      <Text
        fontSize={{ base: "1.5rem", md: "2.5rem" }}
        letterSpacing={{ base: "0.125rem", md: "0.25rem" }}
        // ...shared title
      />
      <VStack
        // Responsive layout: stacked on mobile, horizontal on desktop
        flexDirection={{ base: "column", md: "row" }}
        spacing={{ base: "1rem", md: "0.5rem" }}
      >
        <Button w={{ base: "70%", md: "auto" }}>Austin</Button>
        <Button w={{ base: "70%", md: "auto" }}>Hong Kong</Button>
      </VStack>
    </Box>
  );
}
```

### Pattern 2: Scroll-Spy via Native IntersectionObserver

**What:** A custom hook tracks which content section is currently scrolled into view. The sticky navigation reads this to highlight the active link. No library needed — the browser API is sufficient.

**When to use:** Any single-page content site with anchor navigation where the nav should indicate the current section.

**Trade-offs:** No IE11 support (irrelevant — GitHub Pages audience doesn't use it). Zero dependencies. ~40 lines of code vs. adding a 30KB library.

**Example:**

```jsx
// hooks/useActiveSection.js
import { useState, useEffect, useRef } from 'react';

export function useActiveSection(sectionIds, options = {}) {
  const { offset = 80 } = options; // sticky nav height
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first section that's entering from the top
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: `-${offset}px 0px -50% 0px`, threshold: 0 }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [sectionIds, offset]);

  return activeId;
}
```

```jsx
// Used in StickyNav.js:
const SECTIONS = [
  { id: 'mission', label: 'Mission' },
  { id: 'beliefs', label: 'Beliefs' },
  { id: 'history', label: 'History' },
  { id: 'leadership', label: 'Leadership' },
];
const activeSection = useActiveSection(SECTIONS.map(s => s.id));

// <Link> components use activeSection === s.id for styling
```

### Pattern 3: Section Component as Content Unit

**What:** Each content section (Mission, Beliefs, History, Leadership) is a self-contained component in `src/sections/`. It owns its layout, heading, and content. It accepts no props (content is static). A standard `SectionHeading` sub-component enforces visual consistency.

**When to use:** Any content block that appears as a distinct scrollable section on a single-page site.

**Trade-offs:** Content is hardcoded (as required — no CMS). If content grows beyond ~100 lines, extract the body text into a `src/content/` constants file. Do not create that file preemptively.

**Example:**

```jsx
// sections/MissionSection.js
import { Box, VStack, Text } from '@chakra-ui/react';
import SectionHeading from '../components/ui/SectionHeading';

export default function MissionSection() {
  return (
    <Box as="section" id="mission" py={{ base: 12, md: 20 }} px={{ base: 4, md: 8 }}>
      <VStack maxW="4xl" mx="auto" gap={6}>
        <SectionHeading>Our Mission & Vision</SectionHeading>
        <Text fontSize={{ base: "md", md: "lg" }} textAlign="center">
          {/* Static content — inline for now, extract to /content/ if it grows */}
        </Text>
      </VStack>
    </Box>
  );
}
```

### Pattern 4: Anchor Scrolling via Native HTML

**What:** Anchor navigation uses `scroll-behavior: smooth` (CSS) and `<a href="#section-id">` (HTML). No JavaScript library needed for smooth scrolling.

**When to use:** Any single-page site with anchor links. Covers >95% of use cases. Only add `element.scrollIntoView({ behavior: 'smooth' })` JS if you need custom offset logic for the sticky header.

**Trade-offs:** No custom easing curves, no scroll duration control. If the default `smooth` behavior looks wrong, a one-line JS scroll handler is still simpler than a library.

**CSS (add to index.css):**
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* sticky nav height */
}
```

## Data Flow

### Primary Rendering Path

```
Browser loads index.html
    ↓
React mounts via createRoot in index.js
    ↓
ChakraProvider wraps App (theme system initialized)
    ↓
App renders:
  ├── <Navbar />           (static, no data dependencies)
  ├── <StickyNav />        (reads activeSection from hook)
  ├── <HeroSection />      (static content + external link CTAs)
  ├── <MissionSection />   (static content)
  ├── <BeliefsSection />   (static content)
  ├── <HistorySection />   (static content)
  ├── <LeadershipSection /> (static content)
  └── <Footer />           (static content)
```

### Navigation Flow

```
User clicks nav link (e.g., "Beliefs")
    ↓
<a href="#beliefs"> triggers native smooth scroll
    ↓
Scroll position changes → IntersectionObserver fires
    ↓
useActiveSection returns "beliefs"
    ↓
StickyNav re-renders: "Beliefs" link gets active styling
    ↓
(No URL hash update needed unless deep linking is desired)
```

### State Management

**No application state library.** All content is static. The only dynamic state is:

| State | Location | Mechanism |
|-------|----------|-----------|
| Active section (scroll spy) | `useActiveSection` hook | `useState` in hook, returned to `StickyNav` |
| Mobile menu open/closed | `Navbar` | `useState` — local toggling |
| Breakpoint detection | Chakra `useBreakpointValue` | Chakra internal, no app state needed |

### Key Data Flows

1. **Content rendering:** Static data flows top-down from each section component. No props drilling — each section is self-contained.
2. **Scroll tracking:** DOM position → IntersectionObserver → custom hook → sticky nav re-render. One-way, read-only.
3. **External navigation:** CTA buttons in HeroSection → direct `<a>` tags → browser navigates to location site. No app involvement.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current (1 page, 5 sections) | Recommended structure. No changes needed. |
| 2-3 pages (e.g., separate About page) | Add React Router. Move sections into route-specific groups. App.js becomes `<Routes>`. |
| 10+ sections or CMS-driven content | Extract content into `src/content/` constants or a headless CMS. Add build-time data fetching (e.g., Markdown files parsed at build). |

### Scaling Priorities

1. **First bottleneck:** Content length in section components. When a section file exceeds ~150 lines of JSX content, extract the text body into a `src/content/mission.js` constants file. This keeps the component slim while the content grows.

2. **Second bottleneck:** Scroll-spy performance with many sections. At 5-8 sections, IntersectionObserver is free. At 20+ observed elements, consider batching or `rootMargin` tuning. Not a concern here.

## Anti-Patterns

### Anti-Pattern 1: HmgDesktop/HmgMobile Duplication

**What people do:** Maintain two entirely separate page components for desktop and mobile, duplicating 90% of structure with only spacing/layout differences.

**Why it's wrong:** Every content change requires edits in two files. The files drift over time (e.g., footer separator differs between desktop and mobile). Doubles the maintenance surface area for zero benefit.

**Do this instead:** One component. Use Chakra's `{ base: val, md: val }` responsive props for layout differences. For the rare case where layout structure fundamentally differs (e.g., horizontal vs. vertical button group), use responsive props on the container (`flexDirection={{ base: "column", md: "row" }}`) rather than duplicating the entire tree. See Pattern 1 above.

### Anti-Pattern 2: Empty Theme Token Scaffolding

**What people do:** Configure `defineConfig` with empty `tokens: {}` and `semanticTokens: {}`, leaving comments about how to customize but never actually customizing.

**Why it's wrong:** Hardcoded color values (`#0025a3` repeated in 4+ components) defeat the purpose of a design system. Changing the brand color requires grep-and-replace across multiple files instead of one token update.

**Do this instead:** Populate theme tokens immediately when you add the first content section:

```js
const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          500: { value: "#0025a3" },     // Primary navy
          200: { value: "#e0e8ff" },     // Light blue (footer bg)
        },
      },
      fonts: {
        heading: { value: "'DM Sans', sans-serif" },
        body: { value: "'DM Sans', sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        "brand.fg": { value: "{colors.brand.500}" },
        "brand.bg": { value: "{colors.brand.200}" },
      },
    },
  },
});
```

### Anti-Pattern 3: Adding a Library for One Feature

**What people do:** Install `react-scroll`, `react-scrollspy`, or `react-router` for what native browser APIs handle.

**Why it's wrong:** Adds bundle weight, version management, and API surface for a ~40-line hook (`IntersectionObserver`) or a one-line CSS declaration (`scroll-behavior: smooth`). The native APIs have >95% browser support and zero maintenance cost.

**Do this instead:** Use `IntersectionObserver` for scroll-spy and `scroll-behavior: smooth` + `scroll-padding-top` for anchor scrolling. Only reach for a library when you need custom easing curves or complex scroll orchestration.

### Anti-Pattern 4: Premature Abstraction of "Content Repository"

**What people do:** Create `src/content/` directories, data files, and mapping layers for what is currently 5 hardcoded text blocks.

**Why it's wrong:** Adds indirection without benefit. Every content change requires editing a data file AND a component file. The content is static and edited by developers in the codebase — there is no CMS integration, no translation system, no multi-source pipeline.

**Do this instead:** Hardcode content in section components. When a section exceeds ~150 lines of JSX, extract the text body into a constants file. The rule: 3 repetitions or 150+ lines of content before extracting.

## Integration Points

### External Services

None. The site is fully static with no backend, API, or external service dependencies. External links (Austin, Hong Kong church sites) are plain `<a>` tags with `target="_blank"` and `rel="noopener noreferrer"`.

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `App` ↔ `Navbar` | Direct rendering | Navbar is a child of App, no props |
| `App` ↔ `sections/*` | Direct rendering | Sections are direct children |
| `App` ↔ `Footer` | Direct rendering | Footer is a child of App, no props |
| `StickyNav` ↔ `useActiveSection` | Hook return value | One-way read |
| `Sections` ↔ `IntersectionObserver` | DOM `id` attributes | Observer reads `document.getElementById` |
| `a[href="#section"]` ↔ Browser | Native smooth scroll | CSS `scroll-behavior` handles animation |

## Build Order (Dependencies between Components)

```
Phase 1 — Foundation
  ├── Theme tokens (theme/index.js) — no deps
  ├── useActiveSection hook (hooks/useActiveSection.js) — no deps
  └── Navbar, Footer (components/layout/) — depend on theme tokens

Phase 2 — Content Sections (in any order, no inter-dependencies)
  ├── HeroSection (consolidates HmgDesktop/HmgMobile)
  ├── MissionSection
  ├── BeliefsSection
  ├── HistorySection
  └── LeadershipSection

Phase 3 — Navigation Integration
  └── StickyNav — depends on useActiveSection + sections having ids
```

### Dependency Map

```
useActiveSection (hook)
    ↑ (used by)
StickyNav ──→ (reads section ids from nav link data)
    ↑ (composed by)
App ──→ renders sections ←── (each section has id="" attribute)
         renders Navbar
         renders Footer
```

No section depends on any other section. All sections are siblings composed by `App`. This means they can be built and tested independently, in any order.

---

*Architecture research for: Harvest Mission Global — content section expansion*
*Researched: 2026-07-12*

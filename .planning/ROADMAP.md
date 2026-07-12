# Roadmap: Harvest Mission Global

## Overview

Transform HMCC's existing landing page into a multi-page informational site covering the organization's mission, beliefs, and identity. Build from the foundation up: first establish the design system and component architecture, then add routing and navigation, then deliver each content page as an independent, verifiable phase.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Theme tokens, component consolidation, content constants, react-helmet-async
- [ ] **Phase 2: Routing & Layout Shell** - HashRouter setup and persistent footer
- [ ] **Phase 3: Navigation Bar** - Nav bar with active highlighting and mobile responsiveness
- [ ] **Phase 4: Home Page** - Hero, location CTAs, and welcoming intro text
- [ ] **Phase 5: Mission & Vision Page** - Mission statement and vision section
- [ ] **Phase 6: What We Believe Page** - Statement of Faith with organized presentation

## Phase Details

### Phase 1: Foundation
**Goal**: Design system tokens are populated, responsive components replace duplicated desktop/mobile patterns, content constants structure is established, and HelmetProvider wraps the app for SEO metadata.
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04
**Success Criteria** (what must be TRUE):
  1. Brand colors (#0025a3) and DM Sans font are defined in Chakra theme tokens
  2. Hero section renders responsively as a single component (no separate HmgDesktop/HmgMobile)
  3. All hardcoded text is extracted to `src/content/` constants files
  4. Every page can set its own `<title>` and `<meta>` tags via react-helmet-async
**Plans**: TBD
**UI hint**: yes

### Phase 2: Routing & Layout Shell
**Goal**: HashRouter enables multi-page navigation, and the footer is a shared persistent element across all routes.
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-05
**Success Criteria** (what must be TRUE):
  1. HashRouter is configured and page loads via hash routes work on GitHub Pages
  2. Footer displaying admin@hmccglobal.org and copyright appears on every page
**Plans**: TBD
**UI hint**: yes

### Phase 3: Navigation Bar
**Goal**: Users can navigate between all pages via a responsive nav bar with active route highlighting.
**Depends on**: Phase 2
**Requirements**: NAV-02, NAV-03, NAV-04
**Success Criteria** (what must be TRUE):
  1. Navigation bar shows links to Home, Mission & Vision, and What We Believe
  2. Active route is visually highlighted in the nav bar
  3. On mobile, nav bar collapses into a hamburger menu that reveals links on tap
**Plans**: TBD
**UI hint**: yes

### Phase 4: Home Page
**Goal**: Home page loads with the existing hero, location CTAs, and welcoming intro text describing HMCC.
**Depends on**: Phase 2
**Requirements**: HOME-01, HOME-02, HOME-03
**Success Criteria** (what must be TRUE):
  1. Hero section displays HMCC branding with background image (unchanged from existing site)
  2. CTA buttons link correctly to atx.hmccglobal.org and hk.hmccglobal.org
  3. Intro text welcomes visitors and describes HMCC as a global family of churches
**Plans**: TBD
**UI hint**: yes

### Phase 5: Mission & Vision Page
**Goal**: Users can view HMCC's mission statement and vision on a brand-consistent page.
**Depends on**: Phase 2, Phase 3
**Requirements**: MISS-01, MISS-02, MISS-03
**Success Criteria** (what must be TRUE):
  1. Mission page displays HMCC's purpose and mission statement
  2. Vision section describes the organization's direction and goals
  3. Page design matches the home page theme (colors, fonts, spacing)
**Plans**: TBD
**UI hint**: yes

### Phase 6: What We Believe Page
**Goal**: Users can read HMCC's Statement of Faith in a clear, organized layout.
**Depends on**: Phase 2, Phase 3
**Requirements**: BELIEF-01, BELIEF-02, BELIEF-03
**Success Criteria** (what must be TRUE):
  1. Statement of Faith page displays core doctrinal beliefs
  2. Content is organized with sections or accordion for readability
  3. Page design matches the home page theme (colors, fonts, spacing)
**Plans**: TBD
**UI hint**: yes

## Execution Order

Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

Phases 4, 5, and 6 depend only on Phase 2 (or Phase 3 for 5 and 6), so planning and content work can overlap when appropriate.

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/0 | Not started | - |
| 2. Routing & Layout Shell | 0/0 | Not started | - |
| 3. Navigation Bar | 0/0 | Not started | - |
| 4. Home Page | 0/0 | Not started | - |
| 5. Mission & Vision Page | 0/0 | Not started | - |
| 6. What We Believe Page | 0/0 | Not started | - |

# Requirements: Harvest Mission Global

**Defined:** 2026-07-12
**Core Value:** Visitors can understand what Harvest Mission Global is, what it believes, and where to find it.

## v1 Requirements

### Navigation & Routing

- [ ] **NAV-01**: Install and configure React Router with HashRouter for GitHub Pages compatibility
- [ ] **NAV-02**: Navigation bar with links to Home, Mission & Vision, What We Believe
- [ ] **NAV-03**: Active route highlighting in navigation
- [ ] **NAV-04**: Mobile-responsive navigation (hamburger menu or similar)
- [ ] **NAV-05**: Footer with contact email (admin@hmccglobal.org) and copyright

### Home Page

- [ ] **HOME-01**: Maintain existing hero section with HMCC branding and background image
- [ ] **HOME-02**: CTA buttons linking to Austin (atx.hmccglobal.org) and Hong Kong (hk.hmccglobal.org)
- [ ] **HOME-03**: Brief intro text welcoming visitors and describing HMCC as a global family of churches

### Mission & Vision

- [ ] **MISS-01**: Mission page with HMCC's purpose and mission statement
- [ ] **MISS-02**: Vision section describing the organization's direction and goals
- [ ] **MISS-03**: Brand-consistent design matching home page theme

### What We Believe

- [ ] **BELIEF-01**: Statement of Faith page with core doctrinal beliefs
- [ ] **BELIEF-02**: Clear, organized presentation of beliefs (sections or accordion)
- [ ] **BELIEF-03**: Brand-consistent design matching home page theme

### Foundation

- [ ] **FOUND-01**: Populate Chakra UI theme tokens with brand colors (#0025a3) and DM Sans font
- [ ] **FOUND-02**: Consolidate HmgDesktop/HmgMobile into single responsive component
- [ ] **FOUND-03**: Extract hardcoded text to content constants in `src/content/`
- [ ] **FOUND-04**: Install and configure `react-helmet-async` for per-page SEO metadata

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content

- **HIST-01**: Our Story / History page with HMCC's background and timeline
- **LEAD-01**: Leadership Team page with global leadership profiles
- **CONTACT-01**: Contact page or section with inquiry form

### Polish

- **GALLERY-01**: Photo gallery with real images from Austin and Hong Kong congregations
- **FAMILY-01**: "Our Global Family" section visualizing the Austin + Hong Kong connection
- **TESTIM-01**: Testimonials or story cards from members
- **NEWS-01**: Newsletter signup via third-party embed

## Out of Scope

| Feature | Reason |
|---------|--------|
| Admin panel / CMS | 5 static pages updated in code — unnecessary complexity |
| Blog / news feed | Requires ongoing content production; stale blog worse than none |
| Online giving / donations | Financial processing, PCI compliance — HMCC is informational |
| User accounts / member portal | Auth system misaligned with static site architecture |
| Sermon archive / media library | Location-specific; link to location church sites |
| Live streaming | Location-specific; link to location streams |
| Chatbot / live chat | Third-party JS, requires monitoring |
| Multilingual support | Deferred until demand is clear |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| NAV-01 | Phase 2 | Pending |
| NAV-02 | Phase 3 | Pending |
| NAV-03 | Phase 3 | Pending |
| NAV-04 | Phase 3 | Pending |
| NAV-05 | Phase 2 | Pending |
| HOME-01 | Phase 4 | Pending |
| HOME-02 | Phase 4 | Pending |
| HOME-03 | Phase 4 | Pending |
| MISS-01 | Phase 5 | Pending |
| MISS-02 | Phase 5 | Pending |
| MISS-03 | Phase 5 | Pending |
| BELIEF-01 | Phase 6 | Pending |
| BELIEF-02 | Phase 6 | Pending |
| BELIEF-03 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0 ✓

---
*Requirements defined: 2026-07-12*
*Last updated: 2026-07-12 after initial definition*

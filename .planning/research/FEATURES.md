# Feature Research

**Domain:** Church / Ministry Organization Website (Global Network Hub)
**Researched:** 2026-07-12
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = site feels incomplete or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Mission & Vision | Visitors need to immediately understand what this org is about and why it exists | LOW | 1–2 paragraphs + maybe a compact statement; the single most important content block after the hero |
| What We Believe / Statement of Faith | Core doctrinal identity — visitors evaluating whether this church aligns with their beliefs expect this | MEDIUM | Can be a few paragraphs on key beliefs or a full creed; must be accurate and reviewed |
| Our Story / History | Establishes credibility, shows roots, explains how Austin and Hong Kong locations relate | LOW | Timeline or narrative format; ~300-500 words |
| Leadership / Team | Who leads the global org — visitors want to know who's in charge | LOW | Photos + names + roles; no bios required for MVP |
| Service Times & Locations | #1 thing first-time visitors seek — "when and where" must be zero clicks away | LOW | Already exists as location buttons; ensure times are visible without scrolling |
| Contact Information | Email, physical address for the global org (distinct from location addresses) | LOW | Footer + dedicated contact section |
| "New Here" / Welcome Path | Clear entry point for first-time visitors explaining what HMCC is and how to engage | LOW | Can be a section on the homepage or a simple "Plan Your Visit"-style button |
| Clear Navigation | Users expect to find About, Beliefs, Locations, Contact in a recognizable menu | MEDIUM | May require adding a routing library or scroll-nav if staying single-page |
| Mobile Responsive Design | ~60%+ of church site traffic is mobile; already present | DONE | Existing — maintain |
| High-Quality Authentic Photography | Stock photos feel fake; visitors want to see real people from the actual church community | MEDIUM | Needs real photography from Austin and Hong Kong congregations |
| Footer with Copyright + Social Links | Standard footer pattern; already partially present | LOW | Existing — enhance with social media links |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable for a global church network hub.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Global + Local Navigation Pattern | HMCC is a "global family of churches with locations." The site must clearly communicate: this is the global hub, here are the locations. Pattern seen on Hillsong.com and AustinStone.org — distinct "About the Org" section separate from "Find a Location" | MEDIUM | Best pattern: homepage hero describes global org → "About HMCC" sections (mission, beliefs, history, leadership) → prominent "Our Locations" with cards linking to Austin and Hong Kong |
| Elegant Scroll-Based Single-Page Layout | Many church network sites (e.g., Hillsong, Austin Stone) use single-page scroll with distinct visual sections — keeps content digestible | MEDIUM | Stays within current SPA architecture; no router needed if using scroll sections with smooth nav |
| Warm, Brand-Consistent Visual Design | Color psychology: navy blue (#0025a3) conveys trust and stability; DM Sans is clean and modern. The visual tone should feel welcoming, not corporate | LOW | Already have brand tokens — ensure they're applied consistently |
| Authentic Photo Grid / Gallery | Real photos from both Austin and Hong Kong congregations showing worship, community, service | MEDIUM | Differentiator because most church org sites use generic photos. Show the actual global family |
| Map or Location Finder | Interactive map showing Austin and Hong Kong with pins, addresses, service info | LOW | Two locations only — a simple embedded map or styled visual marker works |
| "Our Global Family" Section | Visual representation showing the connection between Austin and Hong Kong — a diagram, map, or photo pairing that illustrates "one family, two locations" | LOW | Unique to HMCC's structure; reinforces the global identity |
| Testimonials / Stories | Short quotes or story cards from members in both locations — shows real community | MEDIUM | Requires gathering content from locations; powerful social proof |
| Newsletter Signup | Email capture for updates about the global ministry | LOW | Static site can use third-party embed (Mailchimp, etc.) |
| "Get Involved" Path | Clear next steps: visit a location, prayer request, contact form | LOW | Can be a section with CTAs |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems — things to deliberately NOT build.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Admin Panel / CMS** | "Someone should be able to edit content without touching code" | Overkill for 5 static pages updated once a quarter; adds auth, hosting complexity, maintenance burden | Edit content in code — it's React components, not raw HTML. Simple and auditable. Already out of scope. |
| **Blog / News Feed** | "We need to share updates" | Requires ongoing content production; stale blog is worse than no blog. Creates pressure for regular updates. | A static "News" or "Announcements" page is fine if needed later. Currently out of scope. |
| **Event Calendar** | "People need to know about events" | Two locations with different calendars — whose events? Requires per-location filtering, ongoing maintenance. | Each location likely has its own site for events. Link to location sites. |
| **Online Giving / Donations** | "Churches need to receive tithes" | Financial processing, PCI compliance, legal/finance overhead. HMCC's scope is informational. | Link to each location's giving page if they have one. Out of scope per PROJECT.md. |
| **User Accounts / Member Portal** | "Members want personalized content" | Auth system, session management, password resets, privacy policy. Zero alignment with static site architecture. | Use the location churches' own systems. Out of scope per PROJECT.md. |
| **Sermon Archive / Media Library** | "People want to listen to past sermons" | Which location's sermons? Requires media hosting, player, search, categorization. | Link to location church streaming/sermon pages. |
| **Chatbot / Live Chat** | "Visitors want immediate answers" | Adds third-party JS, ongoing monitoring needed, feels impersonal for a church site. | Clear FAQ section + contact form. |
| **Live Streaming Embed** | "Watch services online" | Which location's stream? Multi-stream UI complexity. Buffer/blur issues reflect poorly. | Link to each location's livestream page. |
| **"Christianese" Jargon Labels** | "Fellowship Hall", "Discipleship Track", ministry acronyms feel normal internally | Confusing to first-time visitors. Research shows this drives disengagement. | Use plain language: "Our Beliefs", "Get Connected", youth/young adult instead of program names. |
| **Overloaded Navigation** | "Every ministry wants a nav item" | More than 5–7 nav items overwhelms visitors. Church website research consistently shows simpler nav performs better. | Group into dropdowns or consolidate. If it's not mission-critical, don't put it in the nav. |

## Feature Dependencies

```
Locations Section
    └──requires──> Per-location info (service times, address, site link)

Mission & Vision
    └──requires──> Reviewed/approved org copy

Statement of Beliefs
    └──requires──> Reviewed/approved doctrinal text from leadership

Leadership Section
    └──requires──> Headshots + role info from each leader

Photo Gallery
    └──requires──> Real photos from Austin and Hong Kong congregations

Newsletter Signup
    └──requires──> Email marketing account (Mailchimp, etc.)

Smooth Scroll Navigation
    └──requires──> Section IDs + scroll-to behavior on same page
    └───or───> React Router if going multi-page
```

### Dependency Notes

- **Locations require per-location info:** The site needs confirmed details (service times, addresses, location-specific links) from each church before this section is accurate.
- **Mission, Beliefs, History, Leadership all require approved copy:** All content needs review by HMCC leadership before going live. This is the critical path.
- **Photo gallery requires real photos:** Must coordinate with Austin and Hong Kong to get authentic images. This is the likely differentiator bottleneck.
- **Newsletter signup is lower priority:** Can be added independently at any time via embed.

## MVP Definition

### Launch With (v1)

Minimum viable product — what validates the organizational hub concept.

- [x] **Hero section with HMCC branding** — existing
- [x] **Location CTA buttons** (Austin, Hong Kong) — existing
- [x] **Footer with copyright + contact** — existing
- [ ] **Mission & Vision section** — core identity statement (top priority)
- [ ] **Our Story / History section** — establishes credibility
- [ ] **What We Believe section** — doctrinal foundation
- [ ] **Leadership section** — who leads the global org
- [ ] **Updated navigation** — scroll-to sections or nav links
- [ ] **Brand theme update** — ensure DM Sans + navy blue applied consistently across all new sections

### Add After Validation (v1.x)

Features to add once core content is live and correct.

- [ ] **Photo gallery** — once real photos are gathered from both locations
- [ ] **"Our Global Family" visual section** — reinforcing the Austin + Hong Kong connection
- [ ] **Newsletter signup** — if email capture is desired
- [ ] **"Get Involved" section** — clear next steps for visitors
- [ ] **Testimonials / stories** — once member stories are collected

### Future Consideration (v2+)

Features to defer until the informational site is stable.

- [ ] **Mini blog / announcements page** — only if there's a clear content commitment cadence
- [ ] **Multilingual support** — if Chinese-language audience from Hong Kong needs it
- [ ] **Dark mode toggle** — nice-to-have visual feature, low effort
- [ ] **Interactive timeline for history** — richer presentation of HMCC's story

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Mission & Vision | HIGH | LOW (text section) | P1 |
| What We Believe | HIGH | MEDIUM (requires doctrinal review) | P1 |
| Our Story / History | HIGH | LOW (narrative text) | P1 |
| Leadership | HIGH | LOW (photos + names + roles) | P1 |
| Global + Local Navigation Pattern | HIGH | MEDIUM (dependent on scroll nav or router) | P1 |
| Updated Navigation | HIGH | MEDIUM (requires scroll/routing behavior) | P1 |
| Brand Theme Consistency | MEDIUM | LOW (Chakra theme tokens) | P1 |
| Photo Gallery | MEDIUM | MEDIUM (requires real photos) | P2 |
| "Our Global Family" Section | MEDIUM | LOW (design + text) | P2 |
| Newsletter Signup | LOW | LOW (third-party embed) | P2 |
| Testimonials / Stories | MEDIUM | MEDIUM (content gathering) | P2 |
| "Get Involved" Section | MEDIUM | LOW (CTA buttons + text) | P2 |
| Multilingual Support | LOW | HIGH (translation + i18n) | P3 |
| Dark Mode | LOW | LOW (Chakra supports this) | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor / Reference Feature Analysis

| Feature | Hillsong | Austin Stone | Redeemer NYC | Our Approach (HMCC) |
|---------|----------|-------------|-------------|-------------------|
| **Org Identity** | "About" with leadership, beliefs, history | "About Us" with team, locations | "Redeemer Network" with separate location sites | Single-page scroll sections: Mission, Beliefs, History, Leadership |
| **Locations** | Region-based finder with sub-locations | "One Church, Six Congregations" | Separate domains per location (downtown.redeemer.com, etc.) | Two prominent cards linking out to existing location sites |
| **Navigation** | Mega menu with regions, ministries, media | Single row: About, Media, Ministries, Get Involved, Locations | Hamburger: Churches, Ministries, Resources | Simple top nav: About, Beliefs, Locations, Contact (or scroll sections) |
| **Global + Local** | Central hillsong.com with location subpages | Central austinstone.org with location microsites | Central redeemer.com with separate per-location sites | Central hub → external location sites (Austin, Hong Kong) |
| **Content Model** | Multi-page with mega menus | Single-page + media separate pages | Multi-site with central hub | Single-page scroll with external links |
| **Brand Colors** | Black + white + accent | Navy + white + red | Navy + white + gold | Navy blue (#0025a3) + DM Sans |

## Sources

- Lifeway Research, "7 Best Practices for an Effective Church Website" (2025) — conference.digital
- ChurchSpring blog, "Best Practices for Church Website Navigation and UX" (2025)
- The Church Co, "12 Things Every Church Website Must Have" (2024)
- ChurchLeaders, "3 Secrets of Best Practices for Church Websites" (2024)
- Outreach blog, "7 Church Website Mistakes to Avoid" (2020/updated)
- ChurchTrac, "5 Common Church Website Mistakes" (2026)
- Moonlit Media, "Common Mistakes to Avoid When Designing a Church Website" (2026)
- Site Builder Report, "Church Websites: 40+ Inspiring Examples" (2026)
- One Eighty Digital, "Top Church Website Design Trends for 2025"
- Hillsong.com, AustinStone.org, Redeemer.com — direct analysis of navigation patterns and content structure
- Wegic, "12 Church Website Examples — Patterns from Cathedrals to Global Congregations" (2026)
- CCG Network, Calvary Global Network — global church network site patterns
- Fishhook, "The Ultimate Guide to the Best Church Websites"
- Social Animal, "Church Website Design Guide 2026"

---

*Feature research for: Harvest Mission Global organizational hub website*
*Researched: 2026-07-12*

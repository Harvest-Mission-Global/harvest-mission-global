# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Production target: existing CRA + React 19 + Chakra v3 app (see AGENTS.md), deployed to GitHub Pages at hmccglobal.org.
Current phase deliverable: standalone static HTML mockups under `mockups/` for executive review — not production code.

## Users

- Primary: visitors arriving at hmccglobal.org (search, word of mouth) who need to understand what Harvest Mission Global is and find its local churches (Austin, Hong Kong).
- Secondary (current phase): church executives reviewing the content plan and mockups to decide whether to implement.

## Product Purpose

The umbrella site for Harvest Mission Global, the family overseeing Harvest Mission Community Churches. It answers: what is HMG, where did it come from, what does it believe, where are its churches — then routes visitors to the local church sites. Success: Google no longer flags the domain as placeholder/thin content, and a first-time visitor understands the organization within one page.

## Positioning

The global family identity above the local churches: one shared mission, vision, and statement of faith, a heritage of church planting, and the 10-10 vision — content no local church site can carry alone.

## Operating Context

Fully static site on GitHub Pages (custom domain hmccglobal.org, CNAME). Local church sites (atx.hmccglobal.org — WordPress; hk.hmccglobal.org — custom) remain separate and keep sermons, events, life groups, and local giving. HMG site links out to them.

## Capabilities and Constraints

- Fully static; no backend, CMS, or env-driven config. Content hardcoded in components.
- Google flagged the current one-page placeholder as thin content; remedy is substantive unique content per page.
- **HMCC of Ann Arbor must not be mentioned anywhere** — that church is no longer associated with HMG. Heritage copy says "1996 — Harvest Mission founded" without location.
- Local sites stay as-is; hmccglobal.org does not duplicate their functions.
- Multi-page site: Home, Mission & Vision, What We Believe, Our Churches (confirmed).

## Brand Commitments

- Navy `#0025a3`, DM Sans, white ground; flat navy/white/wash band edges. Hero: world dotmap (`mockups/assets/world-dots.svg`) with Austin and Hong Kong marked. Site name appears as a text lockup — the HMCC ripple logo was retired by user decision and no logo assets ship.
- Tagline: "Transforming Lives. Transforming the World."
- Mission: "To transform lost people into Christ's disciples who will then transform the world."
- Vision: "Multiplying churches in campuses and cities to transform the next generation among the nations."
- Footer line: © 1996–2026, contact admin@hmccglobal.org.
- 10-10 vision (10 churches, 10 cities, 10 years): gets a clear section; for now temporarily mirrors Austin's copy and uses the HMG Prayer Card image from atx.hmccglobal.org/about/mission-vision/.

## Evidence on Hand

- Full Mission & Vision, Values (SALT COMMAND), Strategy (Transformation Pathways), 9-article Statement of Faith, and Our Story copy fetched from atx.hmccglobal.org (2026-10-06).
- HK homepage content fetched via browser (2026-10-06): founding story (2015, team of 20), Saturate Vision 2024–2029, service details, contact hk@hmccglobal.org.
- Assets in `mockups/assets/`: world-dots.svg (generated), austin-skyline.webp + victoria-harbour.webp (city imagery, 900×563 q78), hmg-prayer-card.webp (from the atx site), bg-top.png (original repo hero art — superseded by the dotmap, kept for reference; ripple logo SVGs deleted).
- Absences: no photography of either congregation exists — current imagery is city scenes (the Victoria Harbour shot is stock; licensing flagged in docs/content-plan.md §5 #8), so congregation photos remain wanted for launch. No real membership/giving numbers exist; do not invent.

## Product Principles

1. Copy is sourced from the two existing church sites — nothing invented; anything unverified carries a visible fact-check flag for executives.
2. The umbrella site earns its existence with HMG-level content (heritage, 10-10 vision, family identity) rather than duplicating local church functions.
3. Every page carries substantive unique content — the Google remedy is content, not SEO tricks.
4. Brand continuity with the church family (navy/DM Sans/clean sans world) over novel visual identity.

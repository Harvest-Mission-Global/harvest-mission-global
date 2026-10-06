---
version: 1
slug: "mockups-home-html"
primary_target: "mockups/home.html"
related_targets: ["mockups/mission-vision.html","mockups/beliefs.html","mockups/churches.html"]
---

# Surface brief — hmccglobal.org mockups (mockups/*.html)

Scope: static HTML presentation mockups of the 4-page umbrella site (Home, Mission & Vision, What We Believe, Our Churches). Visitor mode: **Persuade** on Home; **Read** on the three content pages. Not production code — the artifact executives approve before implementation.

Audience: first-time visitors who need to know what Harvest Mission Global is and where its churches are; executives reviewing for decision. Job: understand the family, its mission and beliefs, reach a local church. Proof: every word sourced from atx.hmccglobal.org or hk.hmccglobal.org; nothing invented; unverified items flagged in docs/content-plan.md, not on the page. Constraints: brand-pinned navy #0025a3 + DM Sans + white; no mention of HMCC of Ann Arbor; photo gaps shown as labeled placeholders; standalone files, no build step.

## Direction contract

THESIS: One family across the map: a world dotmap anchors the brand — the founding point, with the planted churches in Austin and Hong Kong marked on it — and a stated commitment to keep planting (10 churches, 10 cities, 10 years). Flat navy/white/wash bands carry the story. Refuses the generic church landing (stock hero photo, three same-size ministry cards, pastor welcome) and the retired ripple identity (logo, ring/scallop ornaments — user revisions, Oct 2026).

OWN-WORLD: White ground with large committed navy fields alternating (footer deep-ink `#0a1a4f`); DM Sans everywhere, weight and scale carry hierarchy; flat band edges — no scallops or decorative rings; nav and footer carry the text lockup "Harvest Mission Global" (no logo). 20px radius language from the current brand; city photography (Austin skyline, Victoria Harbour) grounds the churches pages. Light world — visitors reading for trustworthy information, often daytime, often phones.

STORY: The visitor lands on a full-viewport statement — "Transforming Lives. Transforming the World." — and knows within seconds this is a family of churches with one shared mission. Scrolling Home shows the mission and vision in the family's own words, meets both churches with real service details, and ends on the 10-10 commitment. Content pages answer the three big questions — what we're here for, what we believe, where we are — in calm editorial layouts. Every exit either routes to a local church or leaves the visitor knowing exactly what HMG is.

FIRST VIEWPORT (Home): full viewport, white. Thin top nav: text name left, four text links right (single line on mobile). Centered: the brand line "Harvest Mission Global" above the display tagline H1 — exactly two lines at every width (block spans + nowrap + fluid clamp ~6.6vw), no framing paragraph — then two actions: solid navy "Find a Church" and outlined "What We Believe". Behind the text, the world dotmap (navy pins at Austin/HK; object-fit cover on desktop, contained on mobile). The one authored motion moment is the hero content's rise-in, exponential ease-out, disabled under prefers-reduced-motion.

FORM: Extension of the established HMCC family world (brand-pinned during brainstorming; no concept-seed run — precisely specified request inside an established world). Code-led build (recorded in .impeccable/config.json). Revision history: the original ripple-direction contract above was superseded in place by user revision rounds (Oct 2026) — dotmap hero, ripple logo retired (text lockup), scallops/rings removed, real city imagery, framing lede removed.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

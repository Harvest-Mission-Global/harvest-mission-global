# hmccglobal.org — Content Plan & Mockup Guide

**Prepared for:** Harvest Mission Global executive team
**Purpose:** Decision packet for rebuilding hmccglobal.org from a placeholder landing page into the organization's real front door.
**Date:** October 2026

---

## 1. Why this change

Google flagged hmccglobal.org as containing only placeholder/thin content. The current site is a single page with a title, two outbound links, and a footer — no indexable substance about the organization itself.

**The remedy is content, not SEO tricks.** The new site gives Google (and visitors) four pages of substantive, original material about Harvest Mission Global: who it is, what it's committed to, what it believes, and where its churches are.

**Positioning:** hmccglobal.org is the *umbrella* site — the only place that tells the whole-family story. The local church sites (Austin, Hong Kong) keep sermons, events, life groups, and local giving. Nothing is duplicated; the global site adds what no local site can carry: shared mission and vision, the heritage of church planting, the 10 Year Commitment, and the family-wide Statement of Faith.

**Design concept (one family across the map):** The hero carries a world dotmap — a field of light dots forming the continents, with Austin and Hong Kong pinned in brand navy — because the family's story is geographic: one founding in 1996, churches planted outward (Austin 2008, Hong Kong 2015), and a stated commitment to keep going — 10 churches in 10 cities in 10 years. The visual system is flat navy/white/wash bands in the existing brand (navy `#0025a3`, DM Sans, white); the earlier ripple motif and logo mark have been retired. This direction supersedes the current site's `BG_top.png` hero art; the asset is kept in `mockups/assets/bg-top.png` for possible future use.

---

## 2. Sitemap

```
Home  ·  Mission & Vision  ·  What We Believe  ·  Our Churches
```

| Page | Answers the visitor's question | Primary action |
|---|---|---|
| **Home** | What is this organization? | Find a church / learn the mission |
| **Mission & Vision** | What is it here to do? | Support the 10 Year Commitment |
| **What We Believe** | What does it teach? | Read the Statement of Faith |
| **Our Churches** | Where can I go? | Visit Austin or Hong Kong site |

**Navigation detail:** the nav stays a single line at mobile widths by omitting the site name there (an accepted trade-off — Home carries the name in its hero line, and each inner page is identified by its own headline). On desktop the text lockup "Harvest Mission Global" is always visible.

---

## 3. Page-by-page content

All copy is sourced from the two existing church sites. **Nothing is invented.** Items marked ⚑ need executive confirmation (§ 5).

### 3.1 Home (`mockups/home.html`)

| Section | Copy | Source |
|---|---|---|
| Hero brand line | **Harvest Mission Global** — set above the tagline (framing lede removed; the founding story lives on Mission & Vision) | user decision |
| Hero heading | **Transforming Lives. Transforming the World.** | Tagline, both sites |
| Hero actions | Find a Church · What We Believe | — |
| Mission & Vision teaser | "Get to know the family — our mission, our story, and what drives us" → Mission & Vision | links to the full statements |
| Churches section | "Visit one of our churches to experience who we are." Austin: Sundays 9:45 AM · 556 W 22nd St, Austin, TX. Hong Kong: Sundays 10 AM HKT · Crocodile Center, Kwun Tong + Online. Each links out to the local site. | atx homepage; hk homepage |
| 10-10 strip (navy) | "10 churches. 10 cities. 10 years." → Mission & Vision | atx /about/mission-vision |

### 3.2 Mission & Vision (`mockups/mission-vision.html`)

| Section | Copy | Source |
|---|---|---|
| Mission | "To transform lost people into Christ's disciples who will then transform the world." | atx /about/mission-vision |
| Vision | "Multiplying churches in campuses and cities to transform the next generation among the nations." | atx /about/mission-vision |
| Our Heritage (timeline) | **1996** — Harvest Mission founded. **2008** — Austin church planted. **2015** — Hong Kong church planted by a team of 20. **Today** — one family, two churches — and a commitment to plant more in the next ten years. | © line (both sites); atx /about/who-we-are; hk homepage. ⚑ Founding year and no-location phrasing need confirmation |
| The 10 Year Commitment | "As a family, we have committed to our 10-10 vision — to plant 10 churches in 10 cities in the next 10 years." + HMG Prayer Card image | atx /about/mission-vision — adapted into the family voice (Austin's original: "we have also committed to our 10-10 vision, which is to plant…"); temporarily mirrored per user instruction, grows into a dedicated section later |
| Giving note (small) | Not shown in the current mockup. Available if wanted: "Want to support financially? Support our 10 year commitment by giving via Zelle to **HarvestMissionGlobal**." (verbatim) | atx /about/mission-vision ⚑ confirm publishing this on the global site |
| Values — SALT COMMAND | Spirit-led ministry · Leadership development · Transculturalism · Community · Ministry inside and outside · Missions through church planting · Discipleship (each with its one-line definition, verbatim) | atx /about/values-strategy ⚑ confirm HMG-wide, not Austin-only |

### 3.3 What We Believe (`mockups/beliefs.html`)

The nine-article **Statement of Faith**, verbatim, in normal theological order (source page order differs ⚑):

1. About God — one God, Creator of all things, infinitely perfect and eternally existing in three persons: Father, Son, and Holy Spirit.
2. About Jesus Christ — true God and true man, conceived of the Holy Spirit, born of the virgin Mary; died on the cross as the complete and final sacrifice for our sins; arose bodily; ascended; intercedes and rules.
3. About The Holy Spirit — glorifies Christ, convicts the world of sin, regenerates the believing sinner, indwelling, guiding, instructing, empowering.
4. About The Bible — the only inspired, infallible, and authoritative Word of God; supreme source of truth for Christian faith and living.
5. About Man — created in God's image, fell into sin, destined for eternal death; salvation only through regeneration by the Holy Spirit.
6. About Salvation — the shed blood and resurrection of Jesus Christ provide the only grounds for justification; only those who receive Christ by faith are born of the Spirit.
7. About The Church — all persons regenerated through saving faith, united in the body of Christ; Christ is Head; every local church governs its own affairs under Christ.
8. About Ordinances — water baptism and the Lord's Supper observed by the Church; not means of salvation.
9. About Future Events — the visible, personal, glorious, imminent return of Christ; bodily resurrection; judgment; the new heavens and new earth.

*(Full article text as published at atx /about/beliefs is used in the mockup.)* ⚑ confirm this is the HMG-wide statement

### 3.4 Our Churches (`mockups/churches.html`)

| Church | Profile content | Source |
|---|---|---|
| **HMCC of Austin** | Planted 2008. A church impacting the University of Texas campus and the city of Austin — from students to families. Sundays 9:45 AM, 556 W 22nd St, Austin, TX. | atx /about/who-we-are + homepage |
| **HMCC of Hong Kong** | An international church planted in 2015 when a team of 20 came to the city. Valuing transculturalism; reaching students, working adults, and families. Sundays 10 AM HKT, Transformation Center (Unit 2, 22/F Crocodile Center, Kwun Tong) + online. Contact: hk@hmccglobal.org | hk homepage |
| Page-head line (under the Our Churches heading) | One family, two churches today — and a commitment to plant more. | 10-10 vision |

Each church links to its local site. Section imagery: Austin skyline (from the ATX site's own theme background, `austin-background.jpeg`) and Victoria Harbour, Hong Kong — both web-optimized as 900×563 WebP (q78). Replaceable with congregation photos later. ⚑ The Victoria Harbour shot is a stock photo — confirm licensing before launch.

---

## 4. Deliberately excluded

- **HMCC of Ann Arbor** — not mentioned anywhere (per decision, no longer associated).
- **Local church content** — sermons, events, life groups, local giving, Saturate Vision (HK 2024–2029), Transformation Pathways (Austin's strategy): these belong to the local sites. ⚑ confirm Saturate Vision stays local.
- **Leadership/team pages** — no HMG-level team content exists to source; add when the organization provides it.

---

## 5. Fact-check & decision list for executives

| # | Item | Question |
|---|---|---|
| 1 | Founding, 1996 | Confirm the year and approve "Harvest Mission founded" phrasing without a location. |
| 2 | SALT COMMAND values | Published on Austin's site — are these the family's values, to appear on the global site? |
| 3 | Statement of Faith | Published on Austin's site — confirm as HMG-wide; article order normalized in our layout. |
| 4 | Zelle giving line | Austin publishes it; should the global site repeat it? |
| 5 | Prayer Card image | Confirm HMG owns the artwork and approves its use here. |
| 6 | Photography | The mockups use city imagery (Austin skyline, Victoria Harbour — see §3.4). Real congregation photos are still wanted for authenticity at launch. |
| 7 | Saturate Vision (HK) | Confirm it stays on the HK local site only. |
| 8 | Victoria Harbour photo | The churches-page image is a stock photo (downloaded copy). Confirm license/rights before launch, or swap for a photo the church owns. |

---

## 6. Google remedy — implementation notes (for the build, after approval)

- Unique `<title>` and meta description per page (e.g., "Harvest Mission Global — A Family of Churches").
- Real content per route — the four pages above each carry substantive original text.
- Add `sitemap.xml`, `robots.txt`, `manifest.json` in `public/`.
- 404 page for the router (GitHub Pages).
- Once content lands, request re-indexing in Google Search Console.

## 7. Implementation outline (after approval)

1. Map each mockup to a Chakra page component (`src/pages/`), one shared `Nav` and `Footer`.
2. `HashRouter` (GitHub Pages–friendly) with routes `/`, `/mission-vision`, `/beliefs`, `/churches`; page titles set per route.
3. Theme tokens in `src/theme/index.js`: navy `#0025a3`, wash `#e0e8ff`, radius `1.25rem`, DM Sans.
4. Content constants extracted to `src/content/` so copy edits never touch layout.
5. Keep Austin / Hong Kong external links exactly as today (`https://www.atx.hmccglobal.org/`, `https://hk.hmccglobal.org/`).

## 8. Viewing the mockups

Open `mockups/home.html` in any browser — no server, no build step. Nav links between the four pages work. Desktop-first; resize to see mobile behavior.

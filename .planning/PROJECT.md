# Harvest Mission Global

## What This Is

The central web presence for Harvest Mission Global (HMCC) — an informational hub about the global organization's identity, mission, beliefs, history, and leadership, with links to its Austin and Hong Kong location churches. Serves as the organization's front door for visitors seeking to understand who they are and how to connect.

## Core Value

Visitors can understand what Harvest Mission Global is, what it believes, and where to find it.

## Requirements

### Validated

- ✓ Landing page with HMCC branding and hero — existing
- ✓ CTA buttons linking to Austin and Hong Kong location pages — existing
- ✓ Responsive layout (mobile + desktop) — existing
- ✓ Footer with contact email and copyright — existing
- ✓ Chakra UI v3 design system — existing
- ✓ GitHub Pages deployment at hmccglobal.org — existing

### Active

- [ ] Add Mission & Vision section explaining the organization's purpose and direction
- [ ] Add What We Believe / Statement of Faith section covering core beliefs
- [ ] Add Our Story / History section with the organization's background
- [ ] Add Leadership Team section with global leadership information
- [ ] Maintain location links (Austin, Hong Kong) as primary actions
- [ ] Update design tokens (brand colors, typography) in Chakra theme

### Out of Scope

- Admin panel / CMS — content is static, edited in code
- Additional locations beyond Austin and Hong Kong — not planned
- Backend or API — fully static site
- User accounts, authentication, or member portal — not needed
- Blog or news feed — not currently planned
- E-commerce or giving — not requested

## Context

Harvest Mission Global is a global family of churches with locations in Austin, TX and Hong Kong. The current site at hmccglobal.org is a simple React SPA landing page built with Create React App and Chakra UI v3, deployed to GitHub Pages. The goal is to expand it from a minimal landing page into a comprehensive informational site covering the organization's identity, beliefs, history, and leadership.

## Constraints

- **Stack**: React 19 + Chakra UI v3 + CRA (no migration planned)
- **Deployment**: GitHub Pages via `gh-pages` — fully static, no server
- **Content**: Static/hardcoded — no CMS, no database
- **Domain**: hmccglobal.org with custom domain via CNAME
- **Brand**: DM Sans font, navy blue (#0025a3) primary color

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static content (no CMS) | Current site is fully static; no admin complexity needed | — Pending |
| Keep CRA + Chakra UI v3 | Existing stack works, no migration needed | — Pending |
| Single-page design | No routing library or navigation needed currently | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-07-12 after initialization*

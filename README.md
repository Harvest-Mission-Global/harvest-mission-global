# Harvest Mission Global

Public website for [Harvest Mission Global](https://hmccglobal.org) (HMCC): a static landing page with branding, links to the Austin and Hong Kong churches, and contact info.

Live site: **https://hmccglobal.org**

## Stack

React 19, Chakra UI v3, Create React App. Deployed to GitHub Pages via `gh-pages`.

## Setup

Requires Node.js 14+ (repo developed on Node 22) and Yarn.

```bash
yarn install
yarn start
```

Opens the app at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
|---------|----------------|
| `yarn start` | Dev server |
| `yarn build` | Production build → `build/` |
| `yarn test` | Jest (CRA) |
| `yarn deploy` | Build, then publish `build/` to GitHub Pages |

Custom domain is set in `public/CNAME` (`hmccglobal.org`).

# Testing Patterns

**Analysis Date:** 2026-07-12

## Test Framework

**Runner:**
- Jest (bundled via `react-scripts 5.0.1`)
- Config: Inline in `package.json` — `eslintConfig` extends `"react-app/jest"`
- No separate `jest.config.js` file

**Assertion Library:**
- Jest built-in `expect` with `@testing-library/jest-dom` custom DOM matchers

**Run Commands:**
```bash
yarn test              # Run tests in watch mode (react-scripts test)
CI=true yarn test      # Run tests once (CI mode)
```

## Test File Organization

**Location:**
- Co-located in `src/` alongside source files
- No separate `__tests__/` directories
- Single test file exists: `src/App.test.js`

**Naming:**
- `*.test.js` suffix (e.g., `App.test.js`)
- Matches source file name with `.test` inserted before extension

**Structure:**
```
src/
├── App.js
├── App.test.js         # Test file for App.js
├── setupTests.js       # Global test setup
└── ...
```

## Test Structure

**Suite Organization:**
```javascript
// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

**Patterns:**
- **Setup:** `render(<Component />)` from `@testing-library/react`
- **Query:** `screen.getByText(...)`, `screen.getByRole(...)`, etc.
- **Assertion:** `expect(element).toBeInTheDocument()` using jest-dom matchers
- **Test definition:** `test('description', () => { ... })` pattern (not `it(...)`)
- No `describe` blocks used
- No `beforeEach`/`afterEach` hooks

## Mocking

**Framework:** Jest built-in mocking (via `react-scripts`)

**Patterns:**
- No mocks used in the existing test
- No `jest.mock()`, `jest.fn()`, or `jest.spyOn()` calls detected

**What to Mock:**
- No established conventions (no real-world test patterns to reference)
- Guidelines from `react-app/jest` ESLint config would apply

**What NOT to Mock:**
- No established conventions

## Fixtures and Factories

**Test Data:**
- No test fixtures or data factories detected
- The single existing test uses inline expectations only

**Location:**
- Not applicable — no test data files found

## Coverage

**Requirements:** None enforced — no coverage thresholds configured

**View Coverage:**
```bash
yarn test -- --coverage     # Generate coverage report
```

Coverage output is gitignored (`/coverage` in `.gitignore`)

## Test Types

**Unit Tests:**
- Single test file only (`src/App.test.js`)
- Tests component rendering with `@testing-library/react`
- Covers basic render/smoke test pattern

**Integration Tests:**
- Not present

**E2E Tests:**
- Not used — no Cypress, Playwright, or similar detected

## Common Patterns

**Async Testing:**
```javascript
// Anticipated pattern (not yet used in codebase):
await screen.findByText(/some text/i);
```

**Error Testing:**
- No error testing patterns exist in the codebase

## Test Infrastructure

**Global Setup:**
- `src/setupTests.js` imports `@testing-library/jest-dom` to register custom DOM matchers
- Runs before each test file automatically (CRA convention)

**Dependencies:**
- `@testing-library/react` ^16.1.0 — component render utilities
- `@testing-library/jest-dom` ^6.6.3 — custom DOM matchers (`toBeInTheDocument`, `toHaveTextContent`, etc.)
- `@testing-library/user-event` ^13.2.1 — user event simulation (installed but not used)
- `@testing-library/dom` ^10.4.0 — DOM query utilities

## Testing Gaps

- Only a single boilerplate test exists (the default CRA "learn react" test that no longer passes — `App.js` no longer renders a "learn react" link)
- No tests for `HmgDesktop.js` or `HmgMobile.js`
- No tests for `src/theme/index.js`
- No tests for responsive behavior (mobile vs desktop rendering)
- No tests for external link buttons
- No snapshot tests
- No accessibility tests

---

*Testing analysis: 2026-07-12*

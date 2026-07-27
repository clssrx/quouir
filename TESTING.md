# Testing Strategy for Quouir

This document outlines the comprehensive testing strategy to catch regressions and ensure core flows don't break when adding features or editing code.

## Overview

The test suite uses a **two-layer approach**:

### 1. **Component & Unit Tests** (React Testing Library + Vitest)

- ✅ **Fast execution** - Tests run in milliseconds
- ✅ **Isolated testing** - Tests individual components and utilities
- ✅ **Developer experience** - Instant feedback while coding
- **Location:** `tests/components/` and `tests/utils/`

### 2. **End-to-End & Integration Tests** (Playwright)

- ✅ **Real browser testing** - Tests actual user interactions
- ✅ **Cross-page flows** - Tests navigation and multi-step workflows
- ✅ **Accessibility** - Uses axe-core for accessibility checks
- **Location:** `tests/*.spec.ts` (Playwright tests)

## Test Structure

```
tests/
├── setup.ts                           # Vitest setup and mocks
├── components/
│   ├── AuthorsList.test.tsx          # AuthorsList component tests
│   ├── PostCard.test.tsx             # PostCard component tests
│   └── Navbar.test.tsx               # Navigation component tests
├── utils/
│   └── formatting.test.ts            # Utility function tests
├── a11y.spec.ts                      # Playwright accessibility tests
├── e2e-pages.spec.ts                 # Playwright page rendering tests
├── sanity-queries.spec.ts            # Playwright Sanity query tests
└── user-flows.spec.ts                # Playwright user journey tests
```

## Running Tests

### Install Dependencies

```bash
npm install
```

### Component Tests (Vitest)

```bash
# Run all component tests
npm test

# Run in watch mode (auto-rerun on file changes)
npm test -- --watch

# Run with UI dashboard
npm test:ui

# Debug specific test
npm test:debug
```

### E2E Tests (Playwright)

```bash
# Run all Playwright tests
npm run test:e2e

# Run specific test suite
npm run test:a11y          # Accessibility tests
npm run test:queries       # Sanity query tests
npm run test:pages         # Page rendering tests
npm run test:flows         # User flow tests
```

## Test Coverage

### Component Tests (Vitest)

#### 1. **AuthorsList Component** (`tests/components/AuthorsList.test.tsx`)

- ✅ Renders fallback text when no authors
- ✅ Renders single author with correct link
- ✅ Renders multiple authors separated by commas
- ✅ Displays authors in uppercase when `isUppercase={true}`
- ✅ Applies proper styling classes
- ✅ No comma after last author

**Why it matters:** AuthorsList is used in PostCards and post pages. Changes here affect the entire site's author display.

#### 2. **PostCard Component** (`tests/components/PostCard.test.tsx`)

- ✅ Renders title in uppercase
- ✅ Generates correct post link URL
- ✅ Formats and displays publish date
- ✅ Displays excerpt text
- ✅ Prefers thumbnailImage over image
- ✅ Handles missing data gracefully (no image, no authors, no date)
- ✅ Renders with different category slugs

**Why it matters:** PostCard is the core component for displaying content across all category pages. Regressions here break the user's primary interaction with the site.

#### 3. **Navbar Component** (`tests/components/Navbar.test.tsx`)

- ✅ Renders logo link to homepage
- ✅ Renders all categories as navigation links
- ✅ Filters out categories without valid slugs
- ✅ Mobile menu toggle functionality
- ✅ Closes menu on Escape key
- ✅ Closes menu when category link is clicked
- ✅ Proper ARIA labels for accessibility
- ✅ Correct styling classes applied

**Why it matters:** Navbar is the critical navigation hub. If navigation breaks, users can't access any pages.

#### 4. **Utility Functions** (`tests/utils/formatting.test.ts`)

- ✅ Formats dates to Italian locale correctly
- ✅ Returns null for undefined/null/empty dates
- ✅ Parses various ISO date formats

**Why it matters:** Date formatting affects all content display. Changes here impact the entire site's appearance.

### E2E Tests (Playwright)

#### 1. **Accessibility Tests** (`tests/a11y.spec.ts`)

- Tests all main pages for WCAG violations using axe-core

#### 2. **Page Navigation** (`tests/e2e-pages.spec.ts`)

- Homepage loads and displays navigation
- All category pages load successfully
- Posts can be opened from category pages
- Post pages display content correctly

#### 3. **Sanity Queries** (`tests/sanity-queries.spec.ts`)

- All posts fetch successfully
- Posts can be fetched by slug
- Posts by category work correctly
- Authors by slug with their posts works
- Categories fetch and display correctly

#### 4. **User Flows** (`tests/user-flows.spec.ts`)

- **Post Discovery:** Browse categories → Open post → Read content
- **Author Discovery:** View author info from post → Navigate to author page
- **Site Accessibility:** Navigate through all main sections
- **Editorial Guidelines:** Access editorial guidelines page
- **Performance:** Pages load within reasonable time

## Integration with CI/CD

To add tests to your CI/CD pipeline (GitHub Actions, etc.):

```yaml
- name: Run Component Tests
  run: npm test

- name: Run E2E Tests
  run: npm run test:e2e

- name: Run Accessibility Tests
  run: npm run test:a11y
```

## Debugging Tests

### Component Tests

```bash
# Run in UI mode to visualize test execution
npm run test:ui

# Debug with Chrome DevTools
npm run test:debug
```

### E2E Tests

```bash
# Run with Playwright Inspector
npx playwright test --debug

# Run specific test file
npx playwright test tests/e2e-pages.spec.ts

# Headed mode (see browser)
npx playwright test --headed
```

## Best Practices

### When to Add Tests

1. **Before fixing a bug:** Write a test that reproduces the bug, then fix the code
2. **After adding a component:** Write tests for the new component's behaviors
3. **Before refactoring:** Ensure tests pass before and after refactoring
4. **For critical user flows:** Test the happy path and error cases

### Test Naming Convention

- Component tests: Describe what the component does
  - ✅ `should render author links with correct hrefs`
  - ❌ `test author links`
- E2E tests: Describe the user journey
  - ✅ `user should be able to navigate from category to post`
  - ❌ `navigation test`

### Writing Tests

- **Focus on behavior, not implementation**
  - ✅ `screen.getByRole('link', { name: /author name/i })`
  - ❌ `wrapper.find('.author-link')`
- **Test user-facing interactions**
  - ✅ `fireEvent.click(menuButton)` then `screen.getByText('category')`
  - ❌ `setMenuOpen(true)`
- **Keep tests isolated**
  - Each test should be independent and not rely on other tests

## Adding New Tests

### Template for Component Test

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '../src/components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });
});
```

### Template for E2E Test

```typescript
test('user journey description', async ({ page }) => {
	await page.goto('/starting-page');
	await page.waitForLoadState('networkidle');

	// Perform actions
	await page.click('button');

	// Assert expectations
	expect(await page.url()).toContain('/expected-path');
});
```

## Troubleshooting

### Tests Fail with "Cannot find module"

- Ensure `vitest.config.ts` has correct path aliases
- Check that `@/` is aliased to `./src/`

### Playwright Tests Fail with "Page unreachable"

- Ensure dev server is running: `npm run dev`
- Check `playwright.config.ts` has correct `baseURL`

### Component Tests with Next.js Specific Code

- Components using `next/image` and `next/link` are mocked in `tests/setup.ts`
- Add additional mocks as needed for other Next.js features

## Continuous Improvement

- Monitor test performance and optimize slow tests
- Increase coverage for critical paths when you find bugs
- Refactor tests as the codebase evolves
- Keep tests close to the components they test

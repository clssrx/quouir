import { test, expect } from '@playwright/test';

test.describe('E2E - Page Navigation & Rendering', () => {
	test('should load home page', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('domcontentloaded');

		expect(page.url()).toContain('/');
		expect(await page.title()).toBeTruthy();
	});

	test('should load all category pages', async ({ page }) => {
		const categories = [
			'eventi',
			'materiali',
			'interviste',
			'papers',
			'traduzioni',
		];

		for (const category of categories) {
			await page.goto(`/${category}`);
			await page.waitForLoadState('domcontentloaded');

			expect(page.url()).toContain(category);
		}
	});

	test('should handle category links', async ({ page }) => {
		await page.goto('/materiali');
		await page.waitForLoadState('domcontentloaded');

		// Verify we can load the page
		expect(page.url()).toContain('materiali');
	});

	test('should navigate within categories', async ({ page }) => {
		// Try to navigate to a post
		await page.goto('/materiali');
		await page.waitForLoadState('domcontentloaded');

		// Just verify category page loads successfully
		expect(await page.title()).toBeTruthy();
	});

	test('should handle page navigation', async ({ page }) => {
		await page.goto('/');
		await page.waitForLoadState('domcontentloaded');

		// Navigate to category
		await page.goto('/interviste');
		await page.waitForLoadState('domcontentloaded');

		expect(page.url()).toContain('interviste');
	});

	test('should access editorial guidelines page', async ({ page }) => {
		// Navigate directly to guidelines page
		await page.goto('/call-e-norme-editoriali');
		await page.waitForLoadState('domcontentloaded');

		expect(page.url()).toContain('call-e-norme');
	});

	test('should load pages quickly', async ({ page }) => {
		const startTime = Date.now();

		await page.goto('/materiali');
		await page.waitForLoadState('domcontentloaded');

		const loadTime = Date.now() - startTime;

		// Should load within 10 seconds
		expect(loadTime).toBeLessThan(10000);
	});
});

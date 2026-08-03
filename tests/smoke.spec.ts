import { expect, test } from '@playwright/test';

test.describe('Core reader flows', () => {
	test('reader can browse a category and open an article', async ({ page }) => {
		await page.goto('/');

		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

		const navigation = page.getByRole('navigation', {
			name: 'Navigazione principale',
		});

		await navigation
			.getByRole('link', {
				name: 'Materiali',
				exact: true,
			})
			.click();

		await expect(page).toHaveURL(/\/materiali$/);

		await expect(
			page.getByRole('heading', {
				level: 1,
				name: /materiali/i,
			}),
		).toBeVisible();

		const firstArticle = page.getByRole('main').getByRole('article').first();

		const articleLink = firstArticle
			.getByRole('heading', { level: 2 })
			.getByRole('link');

		const articleTitle = (await articleLink.textContent())?.trim();

		expect(articleTitle).toBeTruthy();

		await articleLink.click();

		await expect(page).toHaveURL(/\/materiali\/[^/]+$/);

		await expect(
			page.getByRole('heading', {
				level: 1,
				name: articleTitle!,
			}),
		).toBeVisible();

		await expect(page.getByRole('article')).toBeVisible();
	});

	test('reader can open an author archive', async ({ page }) => {
		await page.goto('/materiali');

		const authorLink = page
			.getByRole('main')
			.locator('a[href^="/authors/"]')
			.first();

		const authorName = (await authorLink.textContent())?.trim();

		expect(authorName).toBeTruthy();

		await authorLink.click();

		await expect(page).toHaveURL(/\/authors\/[^/]+$/);

		await expect(
			page.getByRole('heading', {
				level: 1,
				name: authorName!,
			}),
		).toBeVisible();

		await expect(
			page.getByRole('heading', {
				level: 2,
				name: /scritti/i,
			}),
		).toBeVisible();
	});
});

test.describe('Mobile navigation', () => {
	test.use({
		viewport: {
			width: 390,
			height: 844,
		},
	});

	test('menu supports keyboard closing and navigation', async ({ page }) => {
		await page.goto('/');

		const menuButton = page.getByRole('button', {
			name: 'Menu',
		});

		await menuButton.click();

		await expect(
			page.getByRole('button', {
				name: 'Chiudi',
			}),
		).toBeVisible();

		const navigation = page.getByRole('navigation', {
			name: 'Navigazione principale',
		});

		await expect(navigation).toBeVisible();

		const firstLink = navigation.getByRole('link').first();

		await expect(firstLink).toBeFocused();

		await page.keyboard.press('Escape');

		await expect(navigation).toBeHidden();
		await expect(menuButton).toBeFocused();

		await menuButton.click();

		await navigation
			.getByRole('link', {
				name: 'Materiali',
				exact: true,
			})
			.click();

		await expect(page).toHaveURL(/\/materiali$/);
		await expect(navigation).toBeHidden();

		await expect(
			page.getByRole('heading', {
				level: 1,
				name: /materiali/i,
			}),
		).toBeVisible();
	});
});

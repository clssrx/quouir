import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
	'/',
	'/eventi',
	'/materiali',
	'/interviste',
	'/papers',
	'/traduzioni',
	'/call-e-norme-editoriali',
];

test.describe('Accessibility checks', () => {
	for (const route of routes) {
		test(`should not have automatically detectable accessibility issues on ${route}`, async ({
			page,
		}) => {
			await page.goto(route);

			// Wait until the streamed page content has replaced loading.tsx.
			await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

			const accessibilityScanResults = await new AxeBuilder({
				page,
			}).analyze();

			expect(accessibilityScanResults.violations).toEqual([]);
		});
	}

	for (const path of ['/miao', '/materiali/miao']) {
		test(`${path} has no detectable accessibility violations`, async ({
			page,
		}) => {
			await page.goto(path);

			await expect(
				page.getByRole('heading', {
					name: "Qui non c'è niente.",
				}),
			).toBeVisible();

			const results = await new AxeBuilder({ page }).analyze();

			expect(results.violations).toEqual([]);
		});
	}
});

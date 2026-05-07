import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pagesToTest = [
	'/',
	'/eventi',
	'/materiali',
	'/interviste',
	'/papers',
	'/traduzioni',
];

test.describe('Accessibility checks', () => {
	for (const path of pagesToTest) {
		test(`should not have automatically detectable accessibility issues on ${path}`, async ({
			page,
		}) => {
			await page.goto(path);

			const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

			expect(accessibilityScanResults.violations).toEqual([]);
		});
	}
});

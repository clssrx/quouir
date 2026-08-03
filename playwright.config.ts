import { defineConfig } from '@playwright/test';

const isCI = Boolean(process.env.CI);

export default defineConfig({
	testDir: './tests',

	retries: isCI ? 1 : 0,
	workers: isCI ? 1 : undefined,

	reporter: isCI ? [['list'], ['html', { open: 'never' }]] : 'list',

	use: {
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},

	webServer: {
		command: isCI ? 'npm run build && npm run start' : 'npm run dev',
		url: 'http://localhost:3000',
		reuseExistingServer: !isCI,
		timeout: 180_000,
	},
});

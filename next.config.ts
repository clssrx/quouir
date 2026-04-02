import type { NextConfig } from 'next';

const securityHeaders = [
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	{
		key: 'Referrer-Policy',
		value: 'strict-origin-when-cross-origin',
	},
	{
		key: 'X-Frame-Options',
		value: 'DENY',
	},
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=()',
	},
	{
		key: 'Content-Security-Policy',
		value: [
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval'",
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data: blob: https://cdn.sanity.io",
			"font-src 'self' data:",
			"connect-src 'self' https://*.sanity.io https://*.apicdn.sanity.io",
			"frame-ancestors 'none'",
			"object-src 'none'",
			"base-uri 'self'",
			"form-action 'self'",
			'upgrade-insecure-requests',
		].join('; '),
	},
];

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: securityHeaders,
			},
		];
	},
};

export default nextConfig;

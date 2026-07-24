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

	async redirects() {
		return [
			{
				source: '/materiali/risveglio-di-primavera-736d4',
				destination: '/materiali/risveglio-di-primavera',
				permanent: true,
			},
			{
				source: '/pillole/la-questione-dellidentita',
				destination:
					'/materiali/la-questione-dell-identita-gleichheit-e-selbigkeit',
				permanent: true,
			},
			{
				source: '/pillole',
				destination: '/materiali',
				permanent: true,
			},
		];
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

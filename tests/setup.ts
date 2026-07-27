import React from 'react';
import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
	cleanup();
});

// Mock Next.js Image component
vi.mock('next/image', () => ({
	default: ({ src, alt, ...props }: any) => {
		return React.createElement('img', { src, alt, ...props });
	},
}));

// Mock Next.js Link component
vi.mock('next/link', () => ({
	default: ({ children, href, ...props }: any) => {
		return React.createElement('a', { href, ...props }, children);
	},
}));

// Mock Sanity image URL function
vi.mock('@/sanity/lib/image', () => ({
	urlFor: (source: any) => ({
		width: (w: number) => ({
			height: (h: number) => ({
				url: () => 'https://example.com/image.jpg',
			}),
		}),
	}),
}));

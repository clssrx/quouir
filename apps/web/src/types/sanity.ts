import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface SanitySlug {
	current: string;
}

export interface Author {
	_id: string;
	name: string;
	bio?: string;
	image?: SanityImageSource;
	slug: SanitySlug;
}

export interface Post {
	_id: string;
	title: string;
	slug: SanitySlug;
	publishedAt: string;
	image?: SanityImageSource;
	author?: {
		_id: string;
		name: string;
		slug: SanitySlug;
	};
	body?: string;
}

export interface Category {
	_id: string;
	name: string;
	description?: string;
}

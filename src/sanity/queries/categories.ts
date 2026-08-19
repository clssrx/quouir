import { defineQuery } from 'next-sanity';

import { client } from '../lib/client';
import type {
	CATEGORIES_LIST_QUERY_RESULT,
	CATEGORY_BY_SLUG_QUERY_RESULT,
	NAVIGATION_CATEGORIES_QUERY_RESULT,
} from '../types';

const fetchOptions = {
	next: {
		revalidate: 86400,
	},
};

export const CATEGORIES_LIST_QUERY = defineQuery(`
	*[_type == "category"] | order(title asc) {
		_id,
		title,
		slug
	}
`);

export const NAVIGATION_CATEGORIES_QUERY = defineQuery(`
	coalesce(
		*[
			_type == "siteSettings" &&
			_id == "siteSettings"
		][0].navigationCategories[]-> {
			_id,
			title,
			slug
		},
		[]
	)
`);

export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
	*[_type == "category" && slug.current == $slug][0] {
		_id,
		title,
		slug
	}
`);

export function getAllCategories() {
	return client
		.withConfig({ useCdn: false })
		.fetch<CATEGORIES_LIST_QUERY_RESULT>(CATEGORIES_LIST_QUERY, {});
}

export async function getNavigationCategories(): Promise<
	NonNullable<NAVIGATION_CATEGORIES_QUERY_RESULT>
> {
	const categories = await client.fetch<NAVIGATION_CATEGORIES_QUERY_RESULT>(
		NAVIGATION_CATEGORIES_QUERY,
		{},
		fetchOptions,
	);

	return categories ?? [];
}

export function getCategoryBySlug(slug: string) {
	return client.fetch<CATEGORY_BY_SLUG_QUERY_RESULT>(
		CATEGORY_BY_SLUG_QUERY,
		{ slug },
		fetchOptions,
	);
}

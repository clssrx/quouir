import { groq } from 'next-sanity';
import { CATEGORIES_LIST_QUERYResult } from '../types';
import { client } from '../lib/client';
import { sanityFetch } from '../lib/live';

export const CATEGORIES_LIST_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }
`;

export const CATEGORY_BY_SLUG_QUERY = `
	*[_type == "category" && slug.current == $slug][0] {
		_id,
		title,
		slug
	}
`;

export async function getAllCategories() {
	return client.fetch<CATEGORIES_LIST_QUERYResult>(
		CATEGORIES_LIST_QUERY,
		{},
		{
			next: { revalidate: 60 }, // Revalidate every 60 seconds
		},
	);
}

export async function getCategoryBySlug(slug: string) {
	const { data } = await sanityFetch({
		query: CATEGORY_BY_SLUG_QUERY,
		params: { slug },
	});

	return data;
}

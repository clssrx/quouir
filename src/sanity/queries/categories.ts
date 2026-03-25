import { groq } from 'next-sanity';
import { CATEGORIES_LIST_QUERYResult } from '../types';
import { client } from '../lib/client';

export const CATEGORIES_LIST_QUERY = groq`
  *[_type == "category"] | order(title asc) {
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

import { groq } from 'next-sanity';
import { CATEGORIES_LIST_QUERYResult } from '../types';
import { client } from '../lib/client';

export const CATEGORIES_LIST_QUERY = groq`*[_type == "category"]{
  _id,
  title,
  slug
}
`;

export async function getAllCategories(): Promise<CATEGORIES_LIST_QUERYResult> {
	return client.fetch(CATEGORIES_LIST_QUERY);
}

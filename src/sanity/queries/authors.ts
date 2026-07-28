import { defineQuery } from 'next-sanity';

import { sanityFetch } from '../lib/live';
import type { AUTHOR_QUERY_RESULT } from '../types';

export const AUTHOR_QUERY = defineQuery(`{
  "author": *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    bio,
    image {
      ...,
      alt
    },
    slug
  },

  "posts": *[
    _type == "post" &&
    references(*[_type == "author" && slug.current == $slug]._id)
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    subtitle,

    thumbnailImage {
      ...,
      alt
    },

    image {
      ...,
      alt
    },

    authors[]-> {
      _id,
      name,
      slug
    },

    category-> {
      _id,
      title,
      slug
    }
  }
}`);

export async function getAuthorBySlug(
	slug: string,
): Promise<AUTHOR_QUERY_RESULT> {
	const { data } = await sanityFetch({
		query: AUTHOR_QUERY,
		params: { slug },
	});

	return data;
}

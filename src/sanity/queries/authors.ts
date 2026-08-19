import { defineQuery } from 'next-sanity';

import { client } from '../lib/client';
import type { AUTHOR_QUERY_RESULT } from '../types';

const fetchOptions = {
	next: {
		revalidate: 86400,
	},
};

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

export const ALL_AUTHOR_SLUGS_QUERY = defineQuery(`
	*[
		_type == "author" &&
		defined(slug.current)
	] {
		"slug": slug.current
	}
`);

export function getAllAuthorsForStaticParams() {
	return client.withConfig({ useCdn: false }).fetch(ALL_AUTHOR_SLUGS_QUERY);
}

export function getAuthorBySlug(slug: string): Promise<AUTHOR_QUERY_RESULT> {
	return client.fetch<AUTHOR_QUERY_RESULT>(
		AUTHOR_QUERY,
		{ slug },
		fetchOptions,
	);
}

import { defineQuery } from 'next-sanity';
import {
	ALL_POSTS_WITH_CATEGORY_QUERY_RESULT,
	POSTS_BY_CATEGORY_QUERY_RESULT,
	POST_BY_CATEGORY_AND_SLUG_QUERY_RESULT,
	POST_BY_SLUG_QUERY_RESULT,
} from '../types';
import { client } from '../lib/client';

const fetchOptions = {
	next: {
		revalidate: 300,
	},
};

export const POSTS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current)
  ]
  | order(publishedAt desc)[0...12]{
    _id,
    title,
    slug,
    publishedAt,
    authors[]-> {
      _id,
      name,
      slug,
	  },
  }
`);

export const POST_BY_SLUG_QUERY =
	defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  subtitle,
  publishedAt,
  body,
	image {
      ...,
      alt
    },
   authors[]-> {
      _id,
      name,
      slug,
	  },
}`);

export const POST_BY_CATEGORY_AND_SLUG_QUERY = defineQuery(`
  *[
    _type == "post" &&
    slug.current == $slug &&
    category->slug.current == $category
  ][0]{
    _id,
    title,
    slug,
    subtitle,
    publishedAt,
    body,
    image {
      ...,
      alt
    },
    "pdfUrl": pdf.asset->url,
     authors[]-> {
      _id,
      name,
      slug,
	  },
    category->{_id, title, slug}
  }
`);

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`
	*[
		_type == "post" &&
		category->slug.current == $category
	]
	| order(publishedAt desc) {
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
`);

export const ALL_POSTS_WITH_CATEGORY_QUERY = defineQuery(`
	*[
		_type == "post" &&
		defined(slug.current) &&
		defined(category->slug.current)
	] {
		"slug": slug.current,
		"category": category->slug.current,
		_updatedAt
	}
`);

export const LATEST_POSTS_QUERY = defineQuery(`
	*[
		_type == "post" &&
		defined(slug.current) &&
		defined(category->slug.current)
	]
	| order(publishedAt desc)[0...3] {
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
`);

export function getLatestPosts() {
	return client.fetch(LATEST_POSTS_QUERY, {}, fetchOptions);
}

export function getPostBySlug(
	slug: string,
): Promise<POST_BY_SLUG_QUERY_RESULT | null> {
	return client.fetch<POST_BY_SLUG_QUERY_RESULT>(
		POST_BY_SLUG_QUERY,
		{ slug },
		fetchOptions,
	);
}

export function getPostByCategoryAndSlug(
	category: string,
	slug: string,
): Promise<POST_BY_CATEGORY_AND_SLUG_QUERY_RESULT | null> {
	return client.fetch<POST_BY_CATEGORY_AND_SLUG_QUERY_RESULT>(
		POST_BY_CATEGORY_AND_SLUG_QUERY,
		{ category, slug },
		fetchOptions,
	);
}

export function getPostsByCategory(
	category: string,
): Promise<POSTS_BY_CATEGORY_QUERY_RESULT> {
	return client.fetch<POSTS_BY_CATEGORY_QUERY_RESULT>(
		POSTS_BY_CATEGORY_QUERY,
		{ category },
		fetchOptions,
	);
}

export function getAllPostsWithCategoryForStaticParams(): Promise<ALL_POSTS_WITH_CATEGORY_QUERY_RESULT> {
	return client
		.withConfig({ useCdn: false })
		.fetch<ALL_POSTS_WITH_CATEGORY_QUERY_RESULT>(
			ALL_POSTS_WITH_CATEGORY_QUERY,
			{},
		);
}

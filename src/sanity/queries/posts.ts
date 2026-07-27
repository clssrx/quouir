import { defineQuery } from 'next-sanity';
import {
	ALL_POSTS_WITH_CATEGORY_QUERY_RESULT,
	POSTS_BY_CATEGORY_QUERY_RESULT,
	POSTS_QUERY_RESULT,
	POST_BY_CATEGORY_AND_SLUG_QUERY_RESULT,
	POST_BY_SLUG_QUERY_RESULT,
} from '../types';
import { sanityFetch } from '../lib/live';
import { client } from '../lib/client';

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

export async function getLatestPosts() {
	const { data } = await sanityFetch({
		query: LATEST_POSTS_QUERY,
		params: {},
	});

	return data;
}

export async function getPostBySlug(
	slug: string,
): Promise<POST_BY_SLUG_QUERY_RESULT | null> {
	const { data } = await sanityFetch({
		query: POST_BY_SLUG_QUERY,
		params: { slug },
	});
	return data;
}

export async function getPostByCategoryAndSlug(
	category: string,
	slug: string,
): Promise<POST_BY_CATEGORY_AND_SLUG_QUERY_RESULT | null> {
	const { data } = await sanityFetch({
		query: POST_BY_CATEGORY_AND_SLUG_QUERY,
		params: { category, slug },
	});

	return data;
}

export async function getPostsByCategory(
	category: string,
): Promise<POSTS_BY_CATEGORY_QUERY_RESULT> {
	const { data } = await sanityFetch({
		query: POSTS_BY_CATEGORY_QUERY,
		params: { category },
	});
	return data;
}

export async function getAllPostsWithCategoryForStaticParams(): Promise<ALL_POSTS_WITH_CATEGORY_QUERY_RESULT> {
	const data = await client.fetch(
		ALL_POSTS_WITH_CATEGORY_QUERY,
		{},
		{
			next: { revalidate: 60 },
		},
	);

	return data;
}

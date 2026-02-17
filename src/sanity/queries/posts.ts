import { groq } from 'next-sanity';
import {
	ALL_POSTS_WITH_CATEGORY_QUERYResult,
	POSTS_BY_CATEGORY_QUERYResult,
	POSTS_QUERYResult,
	POST_BY_CATEGORY_AND_SLUG_QUERYResult,
	POST_BY_SLUG_QUERYResult,
} from '../types';
import { sanityFetch } from '../lib/live';
import { client } from '../lib/client';

export const POSTS_QUERY = groq`
  *[
    _type == "post" &&
    defined(slug.current)
  ]
  | order(publishedAt desc)[0...12]{
    _id,
    title,
    slug,
    publishedAt,
    author->{
      _id,
      name,
      slug,
    }
  }
`;

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  subtitle,
  publishedAt,
  body,
	image,
  author->{_id, name, slug}
}`;

export const POST_BY_CATEGORY_AND_SLUG_QUERY = groq`
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
    image,
    author->{_id, name, slug},
    category->{_id, title, slug}
  }
`;

export const POSTS_BY_CATEGORY_QUERY = groq`
  *[
    _type == "post" &&
    defined(slug.current) &&
    category->slug.current == $category
  ]
  | order(publishedAt desc)[0...12]{
    _id,
    title,
    slug,
    publishedAt,
    author->{
      _id,
      name,
      slug,
    },
    category->{
      _id,
      title,
      slug
    }
  }
`;

export const ALL_POSTS_WITH_CATEGORY_QUERY = groq`
  *[_type == "post"]{
    "slug": slug.current,
    "category": category->slug.current
  }
`;

export async function getLatestPosts(): Promise<POSTS_QUERYResult> {
	const { data } = await sanityFetch({ query: POSTS_QUERY, params: {} });
	return data;
}

export async function getPostBySlug(
	slug: string,
): Promise<POST_BY_SLUG_QUERYResult | null> {
	const { data } = await sanityFetch({
		query: POST_BY_SLUG_QUERY,
		params: { slug },
	});
	return data;
}

export async function getPostByCategoryAndSlug(
	category: string,
	slug: string,
): Promise<POST_BY_CATEGORY_AND_SLUG_QUERYResult | null> {
	const { data } = await sanityFetch({
		query: POST_BY_CATEGORY_AND_SLUG_QUERY,
		params: { category, slug },
	});

	return data;
}

export async function getPostsByCategory(
	category: string,
): Promise<POSTS_BY_CATEGORY_QUERYResult> {
	const { data } = await sanityFetch({
		query: POSTS_BY_CATEGORY_QUERY,
		params: { category },
	});
	return data;
}

export async function getAllPostsWithCategoryForStaticParams(): Promise<ALL_POSTS_WITH_CATEGORY_QUERYResult> {
	const data = await client.fetch(ALL_POSTS_WITH_CATEGORY_QUERY);

	return data;
}

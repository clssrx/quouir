import { groq } from 'next-sanity';
import { POSTS_QUERY_RESULT, POST_QUERY_RESULT } from './types';
import { sanityFetch } from './live';

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

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  subtitle,
  publishedAt,
  body,
	image,
  author->{_id, name, slug}
}`;

export async function getLatestPosts(): Promise<POSTS_QUERY_RESULT> {
	const { data } = await sanityFetch({ query: POSTS_QUERY, params: {} });
	return data;
}

export async function getPostBySlug(
	slug: string,
): Promise<POST_QUERY_RESULT | null> {
	const { data } = await sanityFetch({ query: POST_QUERY, params: { slug } });
	return data;
}

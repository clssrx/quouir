import { groq } from 'next-sanity';
import { client } from '@/sanity/client';
import { POSTS_QUERY_RESULT, POST_QUERY_RESULT } from './types';

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
  publishedAt,
  body,
	image,
  author->{_id, name, slug}
}`;

const options = { next: { revalidate: 30 } };

export async function getLatestPosts(): Promise<POSTS_QUERY_RESULT> {
	return client.fetch<POSTS_QUERY_RESULT>(POSTS_QUERY, {}, options);
}

export async function getPostBySlug(
	slug: string,
): Promise<POST_QUERY_RESULT | null> {
	return client.fetch<POST_QUERY_RESULT>(POST_QUERY, { slug: slug }, options);
}

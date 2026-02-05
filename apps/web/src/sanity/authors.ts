import { client } from '@/sanity/client';
import { groq } from 'next-sanity';
import { AUTHOR_QUERY_RESULT } from './types';

export const AUTHOR_QUERY = groq`{
  "author": *[_type == "author" && slug.current == $slug][0]{
    _id,
    name,
    bio,
    image,
    slug
  },
  "posts": *[
    _type == "post" &&
    defined(author) &&
    references(*[_type=="author" && slug.current==$slug]._id)
  ] | order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
		image
  }
}`;

export async function getAuthorBySlug(
	slug: string,
): Promise<AUTHOR_QUERY_RESULT> {
	return client.fetch<AUTHOR_QUERY_RESULT>(AUTHOR_QUERY, {
		slug: slug,
	});
}

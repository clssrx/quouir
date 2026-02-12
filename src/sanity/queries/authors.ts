import { groq } from 'next-sanity';
import { sanityFetch } from '../lib/live';
import { AUTHOR_QUERYResult } from '../types';

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
): Promise<AUTHOR_QUERYResult> {
	const { data } = await sanityFetch({
		query: AUTHOR_QUERY,
		params: { slug },
	});
	return data;
}

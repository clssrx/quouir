import { groq } from 'next-sanity';
import { sanityFetch } from './live';
import { AUTHOR_QUERY_RESULT } from './types';

export const AUTHOR_PAGE_QUERY = groq`{
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
	const { data } = await sanityFetch({
		query: AUTHOR_PAGE_QUERY,
		params: { slug },
	});
	return data;
}

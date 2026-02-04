import { groq } from 'next-sanity';
import { client } from '@/sanity/client';
import { Post, SanitySlug } from '@/types/sanity';

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
      name,
      slug,
    }
  }
`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  body,
	image,
  author->{_id, name, slug}
}`;

const options = { next: { revalidate: 30 } };

export async function getLatestPosts(): Promise<Post[]> {
	return client.fetch(POSTS_QUERY, {}, options);
}

export async function getPostBySlug(slug: SanitySlug): Promise<Post | null> {
	return client.fetch<Post>(POST_QUERY, slug, options);
}

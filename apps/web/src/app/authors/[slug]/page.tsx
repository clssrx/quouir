import { client } from '@/sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';

const AUTHOR_PAGE_QUERY = `{
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

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
	projectId && dataset
		? imageUrlBuilder({ projectId, dataset }).image(source)
		: null;

export default async function AuthorPage({ params }) {
	const { slug } = await params;

	const data = await client.fetch(AUTHOR_PAGE_QUERY, {
		slug: slug,
	});

	const { author, posts } = data;

	const authorImageUrl = author.image
		? urlFor(author.image)?.width(300).height(300).url()
		: null;
	const authorName = author.name || 'Unknown Author';
	const authorBio = author.bio || '';

	return (
		<main className='container mx-auto max-w-3xl p-8'>
			<h1 className='text-4xl font-bold'>{authorName}</h1>

			<div className='mt-6 flex items-start gap-8'>
				{authorImageUrl && (
					<Image
						src={authorImageUrl}
						alt={authorName}
						width={250}
						height={250}
						className='rounded-full shrink-0'
					/>
				)}

				{authorBio && (
					<p className='text-gray-500 leading-relaxed text-justify'>
						{authorBio}
					</p>
				)}
			</div>

			<h2 className='mt-10 text-2xl font-semibold'>Posts</h2>
			<ul className='mt-4 space-y-4'>
				{posts.map((post) => {
					const postImageUrl = post.image
						? urlFor(post.image)?.width(200).height(200).url()
						: null;
					const postTitle = post.title || 'Untitled Post';
					const postSlug = post.slug?.current || '';
					const postId = post._id;

					return (
						<li key={postId}>
							<Link href={`/${postSlug}`}>
								<h4 className='text-md font-medium hover:underline'>
									{postTitle}
								</h4>
								{postImageUrl && (
									<Image
										src={postImageUrl}
										alt={postTitle}
										width={200}
										height={200}
										className='mt-2 rounded-lg'
									/>
								)}
							</Link>
						</li>
					);
				})}
			</ul>
		</main>
	);
}

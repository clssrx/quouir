import { client } from '@/sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';

import { AuthorPageData, AuthorPageProps } from '@/types/pages';
import { Post } from '@/types/sanity';
import { getAuthorBySlug } from '@/sanity/authors';

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
	projectId && dataset
		? imageUrlBuilder({ projectId, dataset }).image(source)
		: null;

const PostsSection = (posts: Post[]) => {
	return posts.length === 0 ? (
		<p>No posts found.</p>
	) : (
		posts.map((post) => {
			const postImageUrl = post.image
				? urlFor(post.image)?.width(200).height(200).url()
				: null;

			return (
				<li key={post._id}>
					<Link href={`/${post.slug?.current || ''}`}>
						<h4 className='text-md font-medium hover:underline'>
							{post.title}
						</h4>
						{postImageUrl && (
							<Image
								src={postImageUrl}
								alt={post.title}
								width={200}
								height={200}
								className='mt-2 rounded-lg'
							/>
						)}
					</Link>
				</li>
			);
		})
	);
};

export default async function AuthorPage({ params }: AuthorPageProps) {
	const { slug } = await params;

	const data: AuthorPageData = await getAuthorBySlug(slug);

	const { author, posts } = data;

	if (!author) {
		return <p>Author not found.</p>;
	}

	const authorImageUrl = author.image
		? urlFor(author.image)?.width(300).height(300).url()
		: null;

	return (
		<main className='container mx-auto max-w-3xl p-8'>
			<h1 className='text-4xl font-bold'>{author.name}</h1>

			<div className='mt-6 flex items-start gap-8'>
				{authorImageUrl && (
					<Image
						src={authorImageUrl}
						alt={author.name}
						width={250}
						height={250}
						className='rounded-full shrink-0'
					/>
				)}

				{author.bio && (
					<p className='text-gray-500 leading-relaxed text-justify'>
						{author.bio}
					</p>
				)}
			</div>

			<h2 className='mt-10 text-2xl font-semibold'>Posts</h2>
			<ul className='mt-4 space-y-4'>{PostsSection(posts)}</ul>
		</main>
	);
}

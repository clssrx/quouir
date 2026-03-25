import Link from 'next/link';
import Image from 'next/image';
import { getAuthorBySlug } from '@/sanity/queries/authors';
import { urlFor } from '@/sanity/lib/image';

import { AuthorPageProps, PostsSectionProps } from '@/types/pages';
import { AUTHOR_QUERYResult } from '@/sanity/types';

const PostsSection = ({ posts }: PostsSectionProps) => {
	if (posts.length === 0) {
		return <p>No post found.</p>;
	}

	return posts.map((post) => {
		const postImageUrl = post.image
			? urlFor(post.image)?.width(200).height(200).url()
			: undefined;

		return (
			<li key={post._id}>
				<Link
					href={`/${post.category?.slug?.current || ''}/${post.slug?.current || ''}`}
				>
					<h4 className='text-md font-medium hover:underline'>{post.title}</h4>
					{postImageUrl && (
						<Image
							src={postImageUrl}
							alt={post.title || 'Post image'}
							width={200}
							height={200}
							className='mt-2 rounded-lg'
						/>
					)}
				</Link>
			</li>
		);
	});
};

export default async function AuthorPage({ params }: AuthorPageProps) {
	const { slug } = await params;

	const data: AUTHOR_QUERYResult = await getAuthorBySlug(slug);

	const { author, posts } = data;

	if (!author) {
		return <p>Author not found.</p>;
	}

	const authorImageUrl = author.image
		? urlFor(author.image)?.width(300).height(300).url()
		: '/images/author-placeholder-image.jpg';

	return (
		<main className='container mx-auto max-w-3xl p-8'>
			<h1 className='text-4xl font-bold'>{author.name}</h1>

			<div className='mt-6 flex items-start gap-8'>
				{authorImageUrl && (
					<Image
						src={authorImageUrl}
						alt={author.name || 'Author image'}
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
			<ul className='mt-4 space-y-4'>
				<PostsSection posts={posts} />
			</ul>
		</main>
	);
}

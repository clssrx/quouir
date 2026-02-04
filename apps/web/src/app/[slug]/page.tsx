import { PortableText } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import Link from 'next/link';
import Image from 'next/image';
import { Post, SanitySlug } from '@/types/sanity';
import { getPostBySlug } from '@/sanity/posts';

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
	projectId && dataset
		? imageUrlBuilder({ projectId, dataset }).image(source)
		: null;

export default async function PostPage({
	params,
}: {
	params: Promise<SanitySlug>;
}) {
	const post: Post | null = await getPostBySlug(await params);

	if (!post) {
		return <p>Post not found.</p>;
	}

	const { title, body = [], publishedAt, image, author } = post;
	const postImageUrl = image
		? urlFor(image)?.width(550).height(310).url()
		: null;

	return (
		<main className='container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4'>
			<Link href='/' className='hover:underline'>
				← Back to posts
			</Link>
			<h1 className='text-4xl font-bold '>{title}</h1>
			<Link
				href={author?.slug ? `/authors/${author.slug.current}` : '#'}
				className='hover:underline'
			>
				<h3 className='text-lg text-gray-600'>
					{author?.name || 'Unknown Author'}
				</h3>
			</Link>

			<p>{new Date(publishedAt).toLocaleDateString()}</p>
			{postImageUrl && (
				<Image
					src={postImageUrl}
					alt={title}
					className='aspect-video rounded-xl'
					width={550}
					height={310}
				/>
			)}
			<div className='prose text-justify'>
				{Array.isArray(body) && <PortableText value={body} />}
			</div>
		</main>
	);
}

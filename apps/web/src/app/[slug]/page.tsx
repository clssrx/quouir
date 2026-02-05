import { PortableText } from 'next-sanity';
import Link from 'next/link';
import Image from 'next/image';

import { POST_QUERY_RESULT } from '@/sanity/types';
import { getPostBySlug } from '@/sanity/posts';
import { urlForImage } from '@/sanity/image';
import { PostPageProps } from '@/types/pages';

export default async function PostPage({ params }: PostPageProps) {
	const { slug } = await params;

	const post: POST_QUERY_RESULT | null = await getPostBySlug(slug);

	if (!post) {
		return <p>Post not found.</p>;
	}

	const { title, body = [], publishedAt, image, author } = post;
	const postImageUrl = image
		? urlForImage(image)?.width(550).height(310).url()
		: undefined;

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

			{publishedAt && <p>{new Date(publishedAt).toLocaleDateString()}</p>}

			{postImageUrl && (
				<Image
					src={postImageUrl}
					alt={title || 'Post image'}
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

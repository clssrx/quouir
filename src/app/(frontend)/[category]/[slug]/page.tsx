import Link from 'next/link';
import Image from 'next/image';

import { POST_BY_CATEGORY_AND_SLUG_QUERYResult } from '@/sanity/types';
import {
	getAllPostsWithCategoryForStaticParams,
	getPostByCategoryAndSlug,
} from '@/sanity/queries/posts';
import { urlFor } from '@/sanity/lib/image';
import { PostPageProps } from '@/types/pages';
import { FootnotePortableText } from '@/components/footnotePortableText';
import { PortableTextBlock } from 'next-sanity';

export const revalidate = 86400;

export async function generateStaticParams() {
	const posts = await getAllPostsWithCategoryForStaticParams();

	return posts.map((post) => ({
		category: post.category,
		slug: post.slug,
	}));
}

export default async function PostPage({ params }: PostPageProps) {
	const { category, slug } = await params;

	const post: POST_BY_CATEGORY_AND_SLUG_QUERYResult | null =
		await getPostByCategoryAndSlug(category, slug);

	if (!post) {
		return <p>Post not found.</p>;
		// notFound();
	}

	const { title, body = [], subtitle, publishedAt, image, author } = post;
	const postImageUrl = image
		? urlFor(image)?.width(550).height(310).url()
		: undefined;

	return (
		<main className='container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4'>
			<Link href='/' className='hover:underline'>
				← Back to posts
			</Link>

			<h1 className='text-4xl font-bold '>{title?.toUpperCase()}</h1>

			<h3 className='text-lg'>{subtitle}</h3>

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
				{Array.isArray(body) && (
					<>
						<FootnotePortableText value={body as PortableTextBlock[]} />
					</>
				)}
			</div>
		</main>
	);
}

import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { POSTS_BY_CATEGORY_QUERYResult } from '@/sanity/types';
import { formatItalianDate } from '@/utils/formatting';

export interface PostCardProps {
	post: POSTS_BY_CATEGORY_QUERYResult[0];
	categorySlug: string;
}

export const PostCard = ({ post, categorySlug }: PostCardProps) => {
	const title = post.title || '';
	const publishedAt = post.publishedAt;
	const image = post.thumbnailImage || post.image;
	const authorName = post.author?.name || 'Unknown Author';
	const authorSlug = post.author?.slug?.current || '';
	const postSlug = post.slug?.current || '';
	const excerpt = post.excerpt || null;
	const imageUrl = image
		? urlFor(image).width(600).height(600).url()
		: undefined;

	const formattedDate = formatItalianDate(publishedAt);

	return (
		<article className='flex flex-col h-full'>
			<Link href={`/${categorySlug}/${postSlug}`} className='group'>
				{imageUrl && (
					<div className='overflow-hidden'>
						<Image
							src={imageUrl}
							alt=''
							width={600}
							height={600}
							className='aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105'
						/>
					</div>
				)}

				<h2 className='mt-5 min-h-13 text-xl font-bold uppercase leading-tight line-clamp-2'>
					{title.toUpperCase()}
				</h2>
			</Link>

			<p className='text-xs uppercase tracking-wider text-gray-400 mt-2'>
				<Link
					href={`/authors/${authorSlug}`}
					className='underline-offset-4 hover:text-white hover:underline transition'
				>
					{authorName}
				</Link>
				{' · '}
				{formattedDate}
			</p>

			<p className='text-justify mt-3 line-clamp-4 text-sm text-gray-300'>
				{excerpt}
			</p>
		</article>
	);
};

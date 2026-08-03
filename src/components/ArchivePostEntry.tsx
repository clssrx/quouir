import Image from 'next/image';
import Link from 'next/link';

import { urlFor } from '@/sanity/lib/image';
import type {
	AUTHOR_QUERY_RESULT,
	LATEST_POSTS_QUERY_RESULT,
	POSTS_BY_CATEGORY_QUERY_RESULT,
} from '@/sanity/types';
import { formatItalianDate } from '@/utils/formatting';

import AuthorsList from './AuthorsList';

type ArchivePost =
	| LATEST_POSTS_QUERY_RESULT[number]
	| POSTS_BY_CATEGORY_QUERY_RESULT[number]
	| AUTHOR_QUERY_RESULT['posts'][number];

type ArchivePostEntryProps = {
	post: ArchivePost;
	index: number;
	variant?: 'default' | 'category';
	showAuthors?: boolean;
	showImage?: boolean;
};

export default function ArchivePostEntry({
	post,
	index,
	variant = 'default',
	showAuthors = true,
	showImage = true,
}: ArchivePostEntryProps) {
	const categorySlug = post.category?.slug?.current;
	const postSlug = post.slug?.current;

	if (!categorySlug || !postSlug) {
		return null;
	}

	const isCategory = variant === 'category';
	const postUrl = `/${categorySlug}/${postSlug}`;

	const image = post.thumbnailImage ?? post.image;

	const imageUrl =
		showImage && image
			? urlFor(image).width(800).height(800).fit('crop').url()
			: null;

	const formattedDate = post.publishedAt
		? formatItalianDate(post.publishedAt)
		: null;

	const authors = post.authors ?? [];

	const articleLayout = isCategory
		? imageUrl
			? 'py-6 md:grid-cols-[3rem_minmax(0,1fr)_14rem] md:gap-6 md:py-8 lg:grid-cols-[3rem_minmax(0,1fr)_18rem]'
			: 'py-6 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-6 md:py-8'
		: imageUrl
			? 'py-5 md:grid-cols-[3rem_9rem_minmax(0,1fr)_10rem] md:gap-4 md:py-6'
			: 'py-5 md:grid-cols-[3rem_9rem_minmax(0,1fr)] md:gap-4 md:py-6';

	const HeadingTag = variant === 'category' ? 'h2' : 'h3';

	return (
		<li className='border-t border-white/15'>
			<article
				className={`group grid grid-cols-[1fr_auto] gap-4 ${articleLayout}`}
			>
				{/* Index */}
				<span
					className='col-start-1 row-start-1 font-mono text-xs text-white/60'
					aria-hidden='true'
				>
					{String(index + 1).padStart(2, '0')}
				</span>

				{/* Category */}
				{!isCategory && post.category?.title && (
					<Link
						href={`/${categorySlug}`}
						className='col-start-2 row-start-1 text-right text-xs font-medium uppercase tracking-[0.08em] text-white/60 transition-colors hover:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-4 md:text-left'
					>
						{post.category.title}
					</Link>
				)}

				{/* Title + metadata + excerpt */}
				<div
					className={`col-span-2 row-start-2 md:col-span-1 md:row-start-1 ${
						isCategory ? 'md:col-start-2' : 'md:col-start-3'
					}`}
				>
					<HeadingTag
						className={`font-medium uppercase leading-[0.95] tracking-[-0.035em] ${
							isCategory
								? 'max-w-4xl text-[1.75rem] sm:text-3xl md:text-4xl'
								: 'max-w-3xl text-2xl md:text-3xl lg:text-4xl'
						}`}
					>
						<Link
							href={postUrl}
							className='transition-colors hover:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-4'
						>
							{post.title}
						</Link>
					</HeadingTag>

					<div className='mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.06em] text-white/60'>
						{showAuthors && authors.length > 0 && (
							<AuthorsList authors={authors} isUppercase />
						)}

						{showAuthors && authors.length > 0 && formattedDate && (
							<span aria-hidden='true'>/</span>
						)}

						{formattedDate && <span>{formattedDate}</span>}
					</div>

					{isCategory && post.excerpt && (
						<p className='mt-4 line-clamp-2 max-w-2xl text-base leading-relaxed text-white/65 md:mt-5 md:text-lg'>
							{post.excerpt}
						</p>
					)}
				</div>

				{/* Image */}
				{imageUrl && (
					<Link
						href={postUrl}
						aria-label={`Leggi ${post.title}`}
						className={`group/image col-span-2 row-start-3 block w-full overflow-hidden ${
							isCategory
								? 'md:col-span-1 md:col-start-3 md:row-start-1'
								: 'md:col-span-1 md:col-start-4 md:row-start-1'
						}`}
					>
						<div className='overflow-hidden transition-shadow duration-300 group-hover/image:ring-1 group-hover/image:ring-purple-300'>
							<Image
								src={imageUrl}
								alt=''
								width={800}
								height={800}
								loading={isCategory && index === 0 ? 'eager' : 'lazy'}
								sizes={
									isCategory
										? '(min-width: 1024px) 18rem, (min-width: 768px) 14rem, 100vw'
										: '(min-width: 768px) 10rem, 100vw'
								}
								className='aspect-square w-full object-cover transition-transform duration-300 group-hover/image:scale-[1.025] motion-reduce:transition-none'
							/>
						</div>
					</Link>
				)}
			</article>
		</li>
	);
}

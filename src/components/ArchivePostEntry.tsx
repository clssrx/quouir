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
};

export default function ArchivePostEntry({
	post,
	index,
	variant = 'default',
	showAuthors = true,
}: ArchivePostEntryProps) {
	const categorySlug = post.category?.slug?.current;
	const postSlug = post.slug?.current;

	if (!categorySlug || !postSlug) {
		return null;
	}

	const isCategory = variant === 'category';
	const postUrl = `/${categorySlug}/${postSlug}`;

	const image = post.thumbnailImage ?? post.image;

	const imageUrl = image
		? urlFor(image).width(800).height(600).fit('crop').url()
		: null;

	const formattedDate = post.publishedAt
		? formatItalianDate(post.publishedAt)
		: null;

	const authors = post.authors ?? [];

	return (
		<li className='border-t border-white/15'>
			<article
				className={
					isCategory
						? 'group grid gap-5 py-6 md:grid-cols-[3rem_minmax(0,1fr)_14rem] md:items-start md:gap-6 md:py-8 lg:grid-cols-[3rem_minmax(0,1fr)_18rem]'
						: 'group grid gap-4 py-5 md:grid-cols-[3rem_minmax(0,1fr)_14rem] md:items-start md:gap-6 md:py-8 lg:grid-cols-[3rem_minmax(0,1fr)_18rem]'
				}
			>
				{/* Mobile index/category row.
				    At md+, display: contents places both elements
				    directly into the desktop grid. */}
				<div className='flex items-baseline justify-between md:contents'>
					<span className='font-mono text-xs text-white/40'>
						{String(index + 1).padStart(2, '0')}
					</span>

					{!isCategory && (
						<span className='text-xs font-medium uppercase tracking-[0.08em] text-white/60'>
							{post.category?.title}
						</span>
					)}
				</div>

				{/* Title + metadata + optional excerpt */}
				<div>
					<h3
						className={
							isCategory
								? 'max-w-4xl text-[clamp(2rem,9vw,3rem)] font-medium uppercase leading-[0.95] tracking-[-0.035em] md:text-4xl'
								: 'max-w-3xl text-2xl font-medium uppercase leading-[0.95] tracking-[-0.035em] md:text-3xl lg:text-4xl'
						}
					>
						<Link
							href={postUrl}
							className='transition-colors hover:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-4'
						>
							{post.title}
						</Link>
					</h3>

					{(showAuthors || formattedDate) && (
						<div className='mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.06em] text-white/45'>
							{showAuthors && authors.length > 0 && (
								<AuthorsList authors={authors} isUppercase />
							)}

							{showAuthors && authors.length > 0 && formattedDate && (
								<span aria-hidden='true'>/</span>
							)}

							{formattedDate && (
								<time dateTime={post.publishedAt}>{formattedDate}</time>
							)}
						</div>
					)}

					{isCategory && post.excerpt && (
						<p className='mt-4 line-clamp-2 max-w-2xl text-[0.95rem] leading-[1.55] text-white/65 md:mt-5 md:text-lg md:leading-relaxed'>
							{post.excerpt}
						</p>
					)}
				</div>

				{/* Image */}
				{imageUrl && (
					<Link
						href={postUrl}
						aria-label={`Leggi ${post.title}`}
						className='group/image order-last block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 md:order-0'
					>
						<div className='overflow-hidden transition-shadow duration-300 group-hover/image:ring-1 group-hover/image:ring-purple-300'>
							<Image
								src={imageUrl}
								alt=''
								width={800}
								height={600}
								sizes={
									isCategory
										? '(min-width: 1024px) 18rem, (min-width: 768px) 14rem, calc(100vw - 2rem)'
										: '(min-width: 1024px) 10rem, (min-width: 768px) 8rem, calc(100vw - 2rem)'
								}
								className={
									isCategory
										? 'aspect-4/3 w-full object-cover transition-transform duration-300 group-hover/image:scale-[1.025] motion-reduce:transition-none'
										: 'aspect-3/2 w-full object-cover transition-transform duration-300 group-hover/image:scale-[1.025] motion-reduce:transition-none'
								}
							/>
						</div>
					</Link>
				)}
			</article>
		</li>
	);
}

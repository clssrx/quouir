import Link from 'next/link';

import AuthorsList from '@/components/AuthorsList';
import type { POST_BY_CATEGORY_AND_SLUG_QUERY_RESULT } from '@/sanity/types';
import { formatItalianDate } from '@/utils/formatting';

type Post = NonNullable<POST_BY_CATEGORY_AND_SLUG_QUERY_RESULT>;

type PostHeaderProps = {
	category: string;
	categoryLabel: string;
	title: Post['title'];
	subtitle: Post['subtitle'];
	authors: Post['authors'];
	publishedAt: Post['publishedAt'];
};

export const PostHeader = ({
	category,
	categoryLabel,
	title,
	subtitle,
	authors,
	publishedAt,
}: PostHeaderProps) => {
	const formattedDate = publishedAt ? formatItalianDate(publishedAt) : null;

	return (
		<header>
			<div className='mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-white/45'>
				<Link
					href={`/${category}`}
					className='transition-colors hover:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-4'
				>
					{categoryLabel}
				</Link>

				{authors?.length ? (
					<>
						<span aria-hidden='true'>/</span>

						<AuthorsList authors={authors} isUppercase />
					</>
				) : null}

				{formattedDate && publishedAt && (
					<>
						<span aria-hidden='true'>/</span>

						<time dateTime={publishedAt}>{formattedDate}</time>
					</>
				)}
			</div>

			<h1
				id='post-title'
				className='max-w-4xl text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.045em]'
			>
				{title}
			</h1>

			{subtitle && (
				<p className='mt-7 max-w-3xl text-xl leading-[1.35] text-white/65 md:text-2xl'>
					{subtitle}
				</p>
			)}
		</header>
	);
};

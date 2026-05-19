import Link from 'next/link';
import { formatItalianDate } from '@/utils/formatting';

type PostHeaderProps = {
	categoryLabel: string;
	title: string;
	subtitle?: string | null;
	authorName: string;
	authorSlug: string | null;
	publishedAt: string | undefined;
};

export const PostHeader = ({
	categoryLabel,
	title,
	subtitle,
	authorName,
	authorSlug,
	publishedAt,
}: PostHeaderProps) => {
	const formattedDate = formatItalianDate(publishedAt);

	return (
		<header className='mb-10'>
			<p className='mb-4 text-sm uppercase tracking-[0.22em] text-gray-400'>
				{categoryLabel}
			</p>

			<h1
				id='post-title'
				className='text-4xl font-semibold leading-tight tracking-tight md:text-6xl'
			>
				{title}
			</h1>

			{subtitle && (
				<p className='mt-5 text-lg leading-8 text-gray-300 md:text-xl'>
					{subtitle}
				</p>
			)}

			<div className='mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400'>
				{authorName && authorSlug ? (
					<Link
						href={`/authors/${authorSlug}`}
						className='underline-offset-4 transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
					>
						{authorName}
					</Link>
				) : (
					<span>{authorName || 'Autore sconosciuto'}</span>
				)}

				{formattedDate && (
					<>
						<span aria-hidden='true'>·</span>
						<time dateTime={publishedAt ?? undefined}>{formattedDate}</time>
					</>
				)}
			</div>
		</header>
	);
};

import { formatItalianDate } from '@/utils/formatting';
import { Slug } from '@/sanity/types';
import AuthorsList from '@/components/AuthorsList';

type PostHeaderProps = {
	categoryLabel: string;
	title: string;
	subtitle?: string | null;
	authors?: {
		name: string;
		slug: Slug;
	}[];
	publishedAt: string | undefined;
};

export const PostHeader = ({
	categoryLabel,
	title,
	subtitle,
	authors,
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
				<AuthorsList authors={authors} />

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

import Link from 'next/link';

type PostCategoryLinkProps = {
	category: string;
	categoryLabel: string;
	variant?: 'back' | 'footer';
};

export const PostCategoryLink = ({
	category,
	categoryLabel,
	variant = 'back',
}: PostCategoryLinkProps) => {
	const isFooter = variant === 'footer';

	return (
		<Link
			href={`/${category}`}
			className={
				isFooter
					? 'text-sm text-gray-300 underline-offset-4 transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
					: 'mb-4 inline-flex text-sm text-gray-300 underline-offset-4 transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 md:mb-6'
			}
		>
			{isFooter
				? `← Altri articoli in ${categoryLabel}`
				: `← Torna a ${categoryLabel}`}
		</Link>
	);
};

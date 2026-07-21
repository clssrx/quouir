import { Slug } from '@/sanity/types';
import Link from 'next/link';

type AuthorsListProps = {
	authors?: { name: string; slug: Slug }[];
	isUppercase?: boolean;
};

export default function AuthorsList({
	authors,
	isUppercase = false,
}: AuthorsListProps) {
	if (!authors || authors.length === 0) {
		return <span>Autor3 sconosciut3</span>;
	}

	return (
		<>
			{authors.map((author, index) => (
				<span key={author.slug.current}>
					<Link
						href={`/authors/${author.slug.current}`}
						className='underline-offset-4 transition hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4'
					>
						{isUppercase ? author.name.toUpperCase() : author.name}
					</Link>
					{index < authors.length - 1 && ', '}
				</span>
			))}
		</>
	);
}

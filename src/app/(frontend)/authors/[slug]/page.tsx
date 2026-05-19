import { notFound } from 'next/navigation';

import { getAuthorBySlug } from '@/sanity/queries/authors';
import { AuthorPageProps } from '@/types/pages';
import { AUTHOR_QUERYResult } from '@/sanity/types';

import { AuthorPostsSection } from './_components/AuthorPostsSection';

export default async function AuthorPage({ params }: AuthorPageProps) {
	const { slug } = await params;

	const data: AUTHOR_QUERYResult = await getAuthorBySlug(slug);
	const { author, posts } = data;

	if (!author) {
		notFound();
	}

	return (
		<section
			className='mx-auto w-full max-w-4xl px-4 py-2 sm:px-6'
			aria-labelledby='author-heading'
		>
			<header className='flex flex-col items-center gap-5 border-b border-white/10 pb-8 text-center sm:flex-row sm:text-left'>
				<div>
					<h1
						id='author-heading'
						className='wrap-break-words text-3xl font-bold leading-tight sm:text-4xl'
					>
						{author.name}
					</h1>
				</div>
			</header>

			<AuthorPostsSection posts={posts} />
		</section>
	);
}

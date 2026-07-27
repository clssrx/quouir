import { notFound } from 'next/navigation';

import { getAuthorBySlug } from '@/sanity/queries/authors';
import type { AUTHOR_QUERY_RESULT } from '@/sanity/types';
import type { AuthorPageProps } from '@/types/pages';

import { AuthorPostsSection } from './_components/AuthorPostsSection';

export default async function AuthorPage({ params }: AuthorPageProps) {
	const { slug } = await params;

	const data: AUTHOR_QUERY_RESULT = await getAuthorBySlug(slug);
	const { author, posts } = data;

	if (!author) {
		notFound();
	}

	return (
		<main className='py-8 md:py-10' aria-labelledby='author-heading'>
			<header className='border-b border-white/15 pb-8 md:pb-10'>
				<div className='flex items-end justify-between gap-6'>
					<h1
						id='author-heading'
						className='max-w-5xl wrap-break-words text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[0.8] tracking-[-0.06em]'
					>
						{author.name}
					</h1>

					<span
						className='mb-1 shrink-0 font-mono text-xs text-white/40'
						aria-label={`${posts.length} contenuti`}
					>
						{String(posts.length).padStart(2, '0')}
					</span>
				</div>
			</header>

			<AuthorPostsSection posts={posts} />
		</main>
	);
}

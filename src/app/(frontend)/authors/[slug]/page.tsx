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
		<main className='py-6 md:py-10' aria-labelledby='author-heading'>
			<header className='border-b border-white/15 pb-6 md:pb-10'>
				<div className='grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 md:gap-6'>
					<h1
						id='author-heading'
						className='min-w-0 max-w-5xl wrap-break-word text-[clamp(2.75rem,12vw,8rem)] font-semibold leading-[0.82] tracking-[-0.055em] md:leading-[0.8] md:tracking-[-0.06em]'
					>
						{author.name}
					</h1>

					<span
						className='mb-1 shrink-0 font-mono text-[0.65rem] text-white/40 md:text-xs'
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

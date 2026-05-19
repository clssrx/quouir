import { PostsSectionProps } from '@/types/pages';

import { AuthorPostCard } from './AuthorPostCard';

export const AuthorPostsSection = ({ posts }: PostsSectionProps) => {
	return (
		<section aria-labelledby='author-posts-heading' className='mt-10'>
			<h2 id='author-posts-heading' className='text-2xl font-semibold'>
				Articoli
			</h2>

			{posts.length === 0 ? (
				<p className='mt-6 text-gray-400'>
					Nessun articolo trovato per questa autrice o questo autore.
				</p>
			) : (
				<ul className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:max-w-2xl'>
					{posts.map((post) => (
						<AuthorPostCard key={post._id} post={post} />
					))}
				</ul>
			)}
		</section>
	);
};

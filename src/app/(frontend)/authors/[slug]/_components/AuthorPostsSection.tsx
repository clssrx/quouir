import ArchivePostEntry from '@/components/ArchivePostEntry';
import type { PostsSectionProps } from '@/types/pages';

export const AuthorPostsSection = ({ posts }: PostsSectionProps) => {
	return (
		<section aria-labelledby='author-posts-heading' className='pt-5'>
			<div className='pb-5'>
				<h2
					id='author-posts-heading'
					className='font-mono text-xs uppercase tracking-[0.14em] text-white/50'
				>
					Scritti
				</h2>
			</div>

			{posts.length === 0 ? (
				<p className='border-t border-white/15 py-8 text-white/50'>
					Nessun articolo trovato per questa autrice o questo autore.
				</p>
			) : (
				<ul className='border-b border-white/15'>
					{posts.map((post, index) => (
						<ArchivePostEntry
							key={post._id}
							post={post}
							index={index}
							showAuthors={false}
						/>
					))}
				</ul>
			)}
		</section>
	);
};

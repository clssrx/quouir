import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getAuthorBySlug } from '@/sanity/queries/authors';
import { urlFor } from '@/sanity/lib/image';
import { AuthorPageProps, PostsSectionProps } from '@/types/pages';
import { AUTHOR_QUERYResult } from '@/sanity/types';

const PostsSection = ({ posts }: PostsSectionProps) => {
	if (posts.length === 0) {
		return (
			<p className='mt-6 text-gray-400'>
				Nessun articolo trovato per questa autrice o questo autore.
			</p>
		);
	}

	return (
		<ul className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:max-w-2xl'>
			{posts.map((post) => {
				const postImageUrl = post.thumbnailImage
					? urlFor(post.thumbnailImage)?.width(400).height(400).url()
					: undefined;

				const categorySlug = post.category?.slug?.current;
				const postSlug = post.slug?.current;

				if (!categorySlug || !postSlug) return null;

				const postHref = `/${categorySlug}/${postSlug}`;

				return (
					<li key={post._id} className='h-full'>
						<article className='group flex h-full flex-col'>
							<Link
								href={postHref}
								className='block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
							>
								{postImageUrl && (
									<div className='aspect-square w-full max-w-[240px] overflow-hidden rounded-lg'>
										<Image
											src={postImageUrl}
											alt=''
											width={400}
											height={400}
											className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
										/>
									</div>
								)}

								<h2 className='mt-3 min-h-[2.5rem] text-base font-semibold leading-tight underline-offset-4 group-hover:underline line-clamp-2'>
									{post.title}
								</h2>
							</Link>
						</article>
					</li>
				);
			})}
		</ul>
	);
};

export default async function AuthorPage({ params }: AuthorPageProps) {
	const { slug } = await params;

	const data: AUTHOR_QUERYResult = await getAuthorBySlug(slug);
	const { author, posts } = data;

	if (!author) {
		notFound();
	}

	// const authorImage = author.image;

	// const authorImageUrl = authorImage
	// 	? urlFor(authorImage).width(500).height(500).url()
	// 	: '/images/author-placeholder-image.jpg';

	return (
		<section
			className='mx-auto w-full max-w-4xl px-4 py-2 sm:px-6'
			aria-labelledby='author-heading'
		>
			<header className='flex flex-col items-center gap-5 border-b border-white/10 pb-8 text-center sm:flex-row sm:text-left'>
				{/* <Image
					src={authorImageUrl}
					alt={
						authorImage ? (authorImage.alt ?? `Ritratto di ${author.name}`) : ''
					}
					width={160}
					height={160}
					className='aspect-square w-32 rounded-full object-cover sm:w-40'
				/> */}

				<div>
					<h1
						id='author-heading'
						className='text-3xl font-bold leading-tight break-words sm:text-4xl'
					>
						{author.name}
					</h1>
				</div>
			</header>

			<section aria-labelledby='author-posts-heading' className='mt-10'>
				<h2 id='author-posts-heading' className='text-2xl font-semibold'>
					Articoli
				</h2>

				<PostsSection posts={posts} />
			</section>
		</section>
	);
}

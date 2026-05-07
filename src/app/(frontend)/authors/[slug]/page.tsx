import Link from 'next/link';
import Image from 'next/image';
import { getAuthorBySlug } from '@/sanity/queries/authors';
import { urlFor } from '@/sanity/lib/image';

import { AuthorPageProps, PostsSectionProps } from '@/types/pages';
import { AUTHOR_QUERYResult } from '@/sanity/types';

const PostsSection = ({ posts }: PostsSectionProps) => {
	if (posts.length === 0) {
		return <li className='text-gray-400'>Nessun post trovato.</li>;
	}

	return posts.map((post) => {
		const postImageUrl = post.image
			? urlFor(post.image)?.width(400).height(400).url()
			: undefined;

		const categorySlug = post.category?.slug?.current;
		const postSlug = post.slug?.current;

		if (!categorySlug || !postSlug) return null;

		const postHref = `/${categorySlug}/${postSlug}`;

		return (
			<li key={post._id}>
				<Link
					href={postHref}
					className='group grid grid-cols-1 gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:grid-cols-[8rem_1fr] sm:items-start'
				>
					{postImageUrl && (
						<Image
							src={postImageUrl}
							alt=''
							width={200}
							height={200}
							className='aspect-square w-full max-w-xs rounded-lg object-cover sm:h-32 sm:w-32'
						/>
					)}

					<div className='min-w-0'>
						<h3 className='text-base font-medium underline-offset-4 group-hover:underline'>
							{post.title}
						</h3>
					</div>
				</Link>
			</li>
		);
	});
};

export default async function AuthorPage({ params }: AuthorPageProps) {
	const { slug } = await params;

	const data: AUTHOR_QUERYResult = await getAuthorBySlug(slug);

	const { author, posts } = data;

	if (!author) {
		return (
			<main className='mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 md:py-12'>
				<h1 className='text-3xl font-bold leading-tight break-words sm:text-4xl'>
					Autrice o autore non trovato
				</h1>
			</main>
		);
	}

	const authorImage = author.image;

	const authorImageUrl = authorImage
		? urlFor(authorImage).width(500).height(500).url()
		: '/images/author-placeholder-image.jpg';

	return (
		<main
			className='mx-auto w-full max-w-3xl px-4 py-2 sm:px-6 md:py-2'
			aria-labelledby='author-heading'
		>
			<h1
				id='author-heading'
				className='text-3xl font-bold leading-tight break-words sm:text-4xl'
			>
				{author.name}
			</h1>

			<div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-[250px_1fr] md:items-start md:gap-8'>
				{authorImageUrl && (
					<div className='flex justify-center md:justify-start'>
						<Image
							src={authorImageUrl}
							alt={
								authorImage
									? (authorImage.alt ?? `Ritratto di ${author.name}`)
									: ''
							}
							width={250}
							height={250}
							className='aspect-square w-40 rounded-full object-cover sm:w-52 md:w-[250px]'
						/>
					</div>
				)}

				{author.bio && (
					<p className='min-w-0 max-w-full text-justify leading-relaxed text-gray-300 break-words sm:text-justify'>
						{author.bio}
					</p>
				)}
			</div>

			<section aria-labelledby='author-posts-heading'>
				<h2 id='author-posts-heading' className='mt-10 text-2xl font-semibold'>
					Articoli
				</h2>

				<ul className='mt-4 space-y-6'>
					<PostsSection posts={posts} />
				</ul>
			</section>
		</main>
	);
}

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableTextBlock } from 'next-sanity';

import { POST_BY_CATEGORY_AND_SLUG_QUERYResult } from '@/sanity/types';
import {
	getAllPostsWithCategoryForStaticParams,
	getPostByCategoryAndSlug,
} from '@/sanity/queries/posts';
import { urlFor } from '@/sanity/lib/image';
import { PostPageProps } from '@/types/pages';
import { FootnotePortableText } from '@/components/footnotePortableText';

export const revalidate = 86400;

export async function generateStaticParams() {
	const posts = await getAllPostsWithCategoryForStaticParams();

	return posts.map((post) => ({
		category: post.category,
		slug: post.slug,
	}));
}

const formatCategoryLabel = (category: string) => {
	return category.replaceAll('-', ' ');
};

export default async function PostPage({ params }: PostPageProps) {
	const { category, slug } = await params;

	const post: POST_BY_CATEGORY_AND_SLUG_QUERYResult | null =
		await getPostByCategoryAndSlug(category, slug);

	if (!post) {
		notFound();
	}

	const {
		title,
		body = [],
		subtitle,
		publishedAt,
		image,
		author,
		pdfUrl,
	} = post;

	const categoryLabel = formatCategoryLabel(category);

	const pdfName = `${title || 'documento'}-${author?.name || 'autore'}`
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/\s+/g, '-')
		.replace(/[^\w-]/g, '')
		.concat('.pdf');

	const pdfDownloadUrl = `${pdfUrl}?dl=${encodeURIComponent(pdfName)}`;

	const postImageUrl = image
		? urlFor(image).width(1200).height(675).fit('crop').url()
		: undefined;

	const formattedDate = publishedAt
		? new Intl.DateTimeFormat('it-IT', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			}).format(new Date(publishedAt))
		: null;

	return (
		<main
			className='min-h-screen px-4 pb-8 pt-0 md:px-5 md:pb-16 md:pt-2'
			aria-labelledby='post-title'
		>
			<article className='mx-auto max-w-3xl'>
				<Link
					href={`/${category}`}
					className='mb-4 inline-flex text-sm text-gray-300 underline-offset-4 transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 md:mb-6'
				>
					← Torna a {categoryLabel}
				</Link>

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
						{author?.name && author?.slug?.current ? (
							<Link
								href={`/authors/${author.slug.current}`}
								className='underline-offset-4 transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
							>
								{author.name}
							</Link>
						) : (
							<span>{author?.name || 'Autore sconosciuto'}</span>
						)}

						{formattedDate && (
							<>
								<span aria-hidden='true'>·</span>
								<time dateTime={publishedAt ?? undefined}>{formattedDate}</time>
							</>
						)}
					</div>
				</header>

				{postImageUrl && (
					<div className='mb-12 overflow-hidden rounded-2xl'>
						<Image
							src={postImageUrl}
							alt={image?.alt ?? ''}
							width={1200}
							height={675}
							sizes='(min-width: 768px) 768px, 100vw'
							priority
							className='aspect-video w-full object-cover'
						/>
					</div>
				)}

				<div className='prose prose-invert prose-neutral max-w-none text-left text-pretty prose-p:leading-8 prose-img:rounded-xl sm:text-justify'>
					{Array.isArray(body) && (
						<FootnotePortableText value={body as PortableTextBlock[]} />
					)}
				</div>

				{pdfUrl && (
					<section
						className='mt-12 border-t border-white/10 pt-6'
						aria-labelledby='attached-material-heading'
					>
						<h2
							id='attached-material-heading'
							className='mb-2 text-xs uppercase tracking-[0.18em] text-gray-400'
						>
							Materiale allegato
						</h2>

						<a
							href={pdfDownloadUrl}
							download={pdfName}
							className='inline-flex w-fit items-center gap-2 text-sm font-bold text-gray-200 underline underline-offset-4 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
							aria-label={`Scarica il PDF: ${title}`}
						>
							Scarica il PDF
						</a>
					</section>
				)}

				<footer className='mt-16 border-t border-white/10 pt-8'>
					<Link
						href={`/${category}`}
						className='text-sm text-gray-300 underline-offset-4 transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
					>
						← Altri articoli in {categoryLabel}
					</Link>
				</footer>
			</article>
		</main>
	);
}

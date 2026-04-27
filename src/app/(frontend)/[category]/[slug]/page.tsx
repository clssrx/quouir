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

	const pdfName = `${title || 'documento'}-${author?.name || 'autore'}`
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/\s+/g, '-')
		.replace(/[^\w-]/g, '')
		.concat('.pdf');

	const pdfDownloadUrl = `${pdfUrl}?dl=${encodeURIComponent(pdfName)}`;
	console.log(pdfName);

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
		<main className='min-h-screen px-4 pb-8 pt-0 md:px-5 md:pb-16 md:pt-2'>
			<article className='mx-auto max-w-3xl'>
				<Link
					href={`/${category}`}
					className='mb-4 inline-flex text-sm opacity-70 transition hover:opacity-100 md:mb-6'
				>
					← Torna a {category}
				</Link>
				<header className='mb-10'>
					<p className='mb-4 text-sm uppercase tracking-[0.22em] opacity-50'>
						{category}
					</p>

					<h1 className='text-4xl font-semibold leading-tight tracking-tight md:text-6xl'>
						{title}
					</h1>

					{subtitle && (
						<p className='mt-5 text-lg leading-8 opacity-75 md:text-xl '>
							{subtitle}
						</p>
					)}

					<div className='mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm opacity-60'>
						{author?.name && author?.slug?.current ? (
							<Link
								href={`/authors/${author.slug.current}`}
								className='hover:underline'
							>
								{author.name}
							</Link>
						) : (
							<span>{author?.name || 'Autore sconosciuto'}</span>
						)}

						{formattedDate && (
							<>
								<span>·</span>
								<time dateTime={publishedAt ?? undefined}>{formattedDate}</time>
							</>
						)}
					</div>
				</header>
				{postImageUrl && (
					<div className='mb-12 overflow-hidden rounded-2xl'>
						<Image
							src={postImageUrl}
							alt={title || 'Immagine articolo'}
							width={1200}
							height={675}
							sizes='(min-width: 768px) 768px, 100vw'
							priority
							className='aspect-video w-full object-cover'
						/>
					</div>
				)}
				<div className='prose prose-neutral max-w-none text-pretty prose-p:leading-8 prose-img:rounded-xl text-justify'>
					{Array.isArray(body) && (
						<FootnotePortableText value={body as PortableTextBlock[]} />
					)}
				</div>

				{pdfUrl && (
					<div className='mt-12 border-t border-white/10 pt-6'>
						<p className='mb-2 text-xs uppercase tracking-[0.18em] opacity-40'>
							Materiale allegato
						</p>

						<a
							href={pdfDownloadUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='group inline-flex w-fit items-center gap-2 text-sm opacity-75 transition hover:opacity-100 font-bold'
						>
							<span className='underline underline-offset-4 bold'>
								Scarica il PDF
							</span>
						</a>
					</div>
				)}

				<footer className='mt-16 border-t pt-8'>
					<Link
						href={`/${category}`}
						className='text-sm opacity-70 transition hover:opacity-100 hover:underline'
					>
						← Altri articoli in {category}
					</Link>
				</footer>
			</article>
		</main>
	);
}

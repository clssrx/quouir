import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { PortableTextBlock } from 'next-sanity';

import { FootnotePortableText } from '@/components/portable-text/FootnotePortableText';
import {
	getAllPostsWithCategoryForStaticParams,
	getPostByCategoryAndSlug,
} from '@/sanity/queries/posts';
import type { POST_BY_CATEGORY_AND_SLUG_QUERY_RESULT } from '@/sanity/types';
import type { PostPageProps } from '@/types/pages';

import { formatCategoryTitle } from '../_utils/categoryFormatting';
import { AttachedPdfSection } from './_components/AttachedPdf';
import { PostCategoryLink } from './_components/PostCategoryLink';
import { PostHeader } from './_components/PostHeader';
import { PostHeroImage } from './_components/PostHeroImage';

export const revalidate = 86400;

export async function generateMetadata({
	params,
}: PostPageProps): Promise<Metadata> {
	const { category, slug } = await params;

	const post = await getPostByCategoryAndSlug(category, slug);

	if (!post) {
		return {
			title: 'Articolo non trovato',
		};
	}

	return {
		title: post.title,
	};
}

export async function generateStaticParams() {
	const posts = await getAllPostsWithCategoryForStaticParams();

	return posts.map((post) => ({
		category: post.category,
		slug: post.slug,
	}));
}

export default async function PostPage({ params }: PostPageProps) {
	const { category, slug } = await params;

	const post: POST_BY_CATEGORY_AND_SLUG_QUERY_RESULT | null =
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
		authors,
		pdfUrl,
	} = post;

	const categoryLabel = post.category?.title ?? formatCategoryTitle(category);

	const authorNames = (authors ?? []).map((author) => author.name);

	return (
		<main className='pt-6 pb-10 md:pt-10 md:pb-20' aria-labelledby='post-title'>
			<article>
				<div className='mx-auto max-w-4xl'>
					<PostHeader
						category={category}
						categoryLabel={categoryLabel}
						title={title}
						subtitle={subtitle}
						authors={authors}
						publishedAt={publishedAt}
					/>
				</div>

				{image && (
					<div className='mx-auto mt-8 max-w-6xl md:mt-14'>
						<PostHeroImage image={image} />
					</div>
				)}

				<div className='mx-auto mt-10 max-w-2xl md:mt-16'>
					<div>
						{Array.isArray(body) && (
							<FootnotePortableText value={body as PortableTextBlock[]} />
						)}
					</div>

					<AttachedPdfSection
						title={title}
						authorNames={authorNames}
						pdfUrl={pdfUrl}
					/>

					<footer className='mt-12 border-t border-white/15 pt-5 md:mt-16 md:pt-6'>
						<PostCategoryLink
							category={category}
							categoryLabel={categoryLabel}
							variant='footer'
						/>
					</footer>
				</div>
			</article>
		</main>
	);
}

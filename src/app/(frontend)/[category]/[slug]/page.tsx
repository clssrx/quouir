import { notFound } from 'next/navigation';
import { PortableTextBlock } from 'next-sanity';

import { POST_BY_CATEGORY_AND_SLUG_QUERYResult } from '@/sanity/types';
import {
	getAllPostsWithCategoryForStaticParams,
	getPostByCategoryAndSlug,
} from '@/sanity/queries/posts';
import { PostPageProps } from '@/types/pages';
import { FootnotePortableText } from '@/components/FootnotePortableText';
import { formatCategoryTitle } from '../_utils/categoryFormatting';
import { AttachedPdfSection } from './_components/AttachedPdf';
import { PostHeader } from './_components/PostHeader';
import { PostCategoryLink } from './_components/PostCategoryLink';
import { PostHeroImage } from './_components/PostHeroImage';

export const revalidate = 300;

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

	const categoryLabel = formatCategoryTitle(category);

	return (
		<main
			className='min-h-screen px-4 pb-8 pt-0 md:px-5 md:pb-16 md:pt-2'
			aria-labelledby='post-title'
		>
			<article className='mx-auto max-w-3xl'>
				<PostCategoryLink category={category} categoryLabel={categoryLabel} />

				<PostHeader
					categoryLabel={categoryLabel}
					title={title}
					subtitle={subtitle}
					authorName={author?.name}
					authorSlug={author?.slug.current}
					publishedAt={publishedAt}
				/>

				<PostHeroImage image={image} />

				<div className='prose prose-invert prose-neutral max-w-none text-left text-pretty prose-p:leading-8 prose-img:rounded-xl sm:text-justify'>
					{Array.isArray(body) && (
						<FootnotePortableText value={body as PortableTextBlock[]} />
					)}
				</div>

				<AttachedPdfSection
					title={title}
					authorName={author?.name}
					pdfUrl={pdfUrl}
				/>

				<footer className='mt-16 border-t border-white/10 pt-8'>
					<PostCategoryLink
						category={category}
						categoryLabel={categoryLabel}
						variant='footer'
					/>
				</footer>
			</article>
		</main>
	);
}

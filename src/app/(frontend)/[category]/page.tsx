import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ArchivePostEntry from '@/components/ArchivePostEntry';
import {
	getAllCategories,
	getCategoryBySlug,
} from '@/sanity/queries/categories';
import { getPostsByCategory } from '@/sanity/queries/posts';
import type { POSTS_BY_CATEGORY_QUERY_RESULT } from '@/sanity/types';
import type { CategoryPageProps } from '@/types/pages';

import { EmptyCategoryState } from './_components/EmptyCategoryState';

export const dynamicParams = false;
export const revalidate = 300;

const RESERVED_ROUTES = new Set(['call-e-norme-editoriali']);

export async function generateStaticParams() {
	const categories = await getAllCategories();

	return categories
		.filter((category) => !RESERVED_ROUTES.has(category.slug.current))
		.map((category) => ({
			category: category.slug.current,
		}));
}

export async function generateMetadata({
	params,
}: CategoryPageProps): Promise<Metadata> {
	const { category } = await params;

	const existingCategory = await getCategoryBySlug(category);

	if (!existingCategory) {
		return {
			title: 'Categoria non trovata',
		};
	}

	return {
		title: existingCategory.title,
	};
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { category } = await params;

	const existingCategory = await getCategoryBySlug(category);

	if (!existingCategory) {
		notFound();
	}

	const postsByCategory: POSTS_BY_CATEGORY_QUERY_RESULT =
		await getPostsByCategory(category);

	return (
		<main aria-labelledby='category-heading'>
			<header className='py-6 md:py-10'>
				<div className='grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4'>
					<h1
						id='category-heading'
						className='min-w-0 text-[clamp(2.75rem,12vw,8rem)] font-semibold uppercase leading-[0.82] tracking-[-0.055em]'
					>
						{existingCategory.title}
					</h1>

					<span
						className='mb-1 shrink-0 font-mono text-[0.65rem] text-white/60 md:text-xs'
						aria-label={`${postsByCategory.length} contenuti`}
					>
						{String(postsByCategory.length).padStart(2, '0')}
					</span>
				</div>
			</header>

			{postsByCategory.length > 0 ? (
				<ul className='border-b border-white/15'>
					{postsByCategory.map((post, index) => (
						<ArchivePostEntry
							key={post._id}
							post={post}
							index={index}
							variant='category'
						/>
					))}
				</ul>
			) : (
				<EmptyCategoryState />
			)}
		</main>
	);
}

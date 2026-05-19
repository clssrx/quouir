import { CallEditorialGuidelinesPage } from '@/components/CallEditorialGuidelinesPage';
import { PostCard } from '@/components/PostCard';
import {
	getAllCategories,
	getCategoryBySlug,
} from '@/sanity/queries/categories';
import { getPostsByCategory } from '@/sanity/queries/posts';
import { POSTS_BY_CATEGORY_QUERYResult } from '@/sanity/types';
import { CategoryPageProps } from '@/types/pages';
import { formatCategoryTitle } from './_utils/categoryFormatting';
import { EmptyCategoryState } from './_components/EmptyCategoryState';
import { notFound } from 'next/navigation';

export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
	const categories = await getAllCategories();

	return categories.map((category) => ({
		category: category.slug.current,
	}));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { category } = await params;

	const postsByCategory: POSTS_BY_CATEGORY_QUERYResult =
		await getPostsByCategory(category);

	const categoryTitle = formatCategoryTitle(category);

	const existingCategory = await getCategoryBySlug(category);

	const isCallAndGuidelinesPage = category === 'call-e-norme-editoriali';

	if (!existingCategory) {
		notFound();
	}

	if (isCallAndGuidelinesPage) {
		return <CallEditorialGuidelinesPage />;
	}

	if (!postsByCategory.length) {
		return <EmptyCategoryState />;
	}

	return (
		<main
			className='mx-auto w-full max-w-4xl px-4 py-2 sm:px-6 md:py-2'
			aria-labelledby='category-heading'
		>
			<h1
				id='category-heading'
				className='mb-8 text-3xl font-bold leading-tight uppercase sm:text-4xl'
			>
				{categoryTitle}
			</h1>

			<ul className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
				{postsByCategory.map((post) => (
					<li key={post._id} className='h-full'>
						<PostCard post={post} categorySlug={category} />
					</li>
				))}
			</ul>
		</main>
	);
}

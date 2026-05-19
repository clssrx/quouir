import { CallEditorialGuidelinesPage } from '@/components/CallEditorialGuidelinesPage';
import { PostCard } from '@/components/PostCard';
import {
	getAllCategories,
	getCategoryBySlug,
} from '@/sanity/queries/categories';
import { getPostsByCategory } from '@/sanity/queries/posts';
import { POSTS_BY_CATEGORY_QUERYResult } from '@/sanity/types';
import { CategoryPageProps } from '@/types/pages';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
	const categories = await getAllCategories();

	return categories.map((category) => ({
		category: category.slug.current,
	}));
}

const formatCategoryTitle = (category: string) => {
	return category.replaceAll('-', ' ');
};

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
		return (
			<main
				className='mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6'
				aria-labelledby='no-posts-heading'
			>
				<h1
					id='no-posts-heading'
					className='text-2xl font-semibold leading-tight sm:text-3xl'
				>
					Non ci sono ancora articoli in questa categoria.
				</h1>

				<p className='mt-3 text-gray-300'>
					Torna alla homepage per esplorare gli altri contenuti.
				</p>

				<Link
					href='/'
					className='mt-6 inline-block underline underline-offset-4 transition hover:text-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
				>
					Torna alla homepage
				</Link>
			</main>
		);
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

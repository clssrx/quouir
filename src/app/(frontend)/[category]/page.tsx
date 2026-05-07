import { PostCard } from '@/components/PostCard';
import { getAllCategories } from '@/sanity/queries/categories';
import { getPostsByCategory } from '@/sanity/queries/posts';
import { POSTS_BY_CATEGORY_QUERYResult } from '@/sanity/types';
import { CategoryPageProps } from '@/types/pages';
import Link from 'next/link';

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

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

	if (!postsByCategory.length) {
		return (
			<main
				className='container mx-auto py-32 text-center'
				aria-labelledby='no-posts-heading'
			>
				<h1 id='no-posts-heading' className='text-2xl mb-4'>
					Non ci sono ancora post in questa categoria.
				</h1>
				<Link
					href='/'
					className='underline focus-visible:outline-2 focus-visible:outline-offset-2'
					aria-label='Back to homepage'
				>
					Torna alla homepage
				</Link>
			</main>
		);
	}

	return (
		<main
			className='container mx-auto max-w-4xl px-6'
			aria-labelledby='category-heading'
		>
			<h1 id='category-heading' className='text-4xl font-bold mb-8'>
				{category.toUpperCase()}
			</h1>
			<ul className='grid grid-cols-1 sm:grid-cols-2 gap-10' role='list'>
				{postsByCategory.map((post) => (
					<li key={post._id} className='h-full'>
						<PostCard post={post} categorySlug={category} />
					</li>
				))}
			</ul>
		</main>
	);
}

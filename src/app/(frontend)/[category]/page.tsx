import { CallEditorialGuidelinesPage } from '@/components/CallEditorialGuidelinesPage';
import { PostCard } from '@/components/PostCard';
import { getAllCategories } from '@/sanity/queries/categories';
import { getPostsByCategory } from '@/sanity/queries/posts';
import { POSTS_BY_CATEGORY_QUERYResult } from '@/sanity/types';
import { CategoryPageProps } from '@/types/pages';

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

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

	const isCallAndGuidelinesPage = category === 'call-e-norme-editoriali';

	if (isCallAndGuidelinesPage) {
		return <CallEditorialGuidelinesPage />;
	}

	if (!postsByCategory.length) {
		return <CallEditorialGuidelinesPage />;
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

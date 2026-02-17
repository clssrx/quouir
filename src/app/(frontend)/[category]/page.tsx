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

	if (postsByCategory.length === 0) {
		return (
			<main className='container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4'>
				<h1 className='text-3xl font-bold'>{category.toUpperCase()}</h1>
				<p>No posts found for this category.</p>
			</main>
		);
	}

	return (
		<main className='container mx-auto max-w-3xl p-8 flex flex-col gap-4'>
			<h1 className='text-4xl font-bold mb-8'>{category.toUpperCase()}</h1>
			<ul className='flex flex-col gap-y-4'>
				{postsByCategory.map((post) => {
					const postSlug = post.slug?.current || '';
					const authorName = post.author?.name || 'Unknown Author';
					const authorSlug = post.author?.slug?.current || '';
					const postPublishedAt = post.publishedAt || '';
					const postId = post._id;

					return (
						<li key={postId} className='flex flex-col gap-1'>
							<Link href={`/${category}/${postSlug}`}>
								<h2 className='text-xl font-semibold hover:underline'>
									{post.title}
								</h2>
								<p>{new Date(postPublishedAt).toLocaleDateString()}</p>
							</Link>
							{post.author && (
								<Link
									href={`/authors/${authorSlug}`}
									className='text-sm text-gray-600 hover:underline'
								>
									{authorName}
								</Link>
							)}
						</li>
					);
				})}
			</ul>
		</main>
	);
}

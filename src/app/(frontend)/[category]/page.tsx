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
			<main className='container mx-auto py-32 text-center'>
				<h2 className='text-2xl mb-4'>No posts in this category yet.</h2>
				<Link href='/' className='underline'>
					Back to homepage
				</Link>
			</main>
		);
	}

	return (
		<main className='container mx-auto max-w-4xl p-6 gap-4'>
			<h1 className='text-4xl font-bold mb-8'>{category.toUpperCase()}</h1>
			<ul className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
				{postsByCategory.map((post) => {
					const postSlug = post.slug?.current || '';
					const authorName = post.author?.name || 'Unknown Author';
					const authorSlug = post.author?.slug?.current || '';
					const postPublishedAt = post.publishedAt || '';
					const postId = post._id;

					return (
						<li key={post._id} className='h-full'>
							<PostCard
								key={postId}
								title={post.title}
								categorySlug={category}
								image={post.thumbnailImage || post.image}
								publishedAt={postPublishedAt}
								authorName={authorName}
								authorSlug={authorSlug}
								postSlug={postSlug}
								excerpt={post.excerpt}
							/>
						</li>
					);
				})}
			</ul>
		</main>
	);
}

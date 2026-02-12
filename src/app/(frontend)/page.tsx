import Link from 'next/link';
import { getLatestPosts } from '@/sanity/queries/posts';

export default async function IndexPage() {
	const posts = await getLatestPosts();

	return (
		<main className='container mx-auto min-h-screen max-w-3xl p-8'>
			<h1 className='text-4xl font-bold mb-8'>Posts</h1>
			<ul className='flex flex-col gap-y-4'>
				{posts.map((post) => {
					const postSlug = post.slug?.current || '';
					const authorName = post.author?.name || 'Unknown Author';
					const authorSlug = post.author?.slug?.current || '';
					const postPublishedAt = post.publishedAt || '';
					const postId = post._id;

					return (
						<li key={postId} className='flex flex-col gap-1'>
							<Link href={`/${postSlug}`}>
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

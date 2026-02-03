import { PortableText, type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/client';
import Link from 'next/link';
import Image from 'next/image';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  body,
	image,
  author->{_id, name, slug}
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
	projectId && dataset
		? imageUrlBuilder({ projectId, dataset }).image(source)
		: null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const post = await client.fetch<SanityDocument>(
		POST_QUERY,
		await params,
		options,
	);
	const postImageUrl = post.image
		? urlFor(post.image)?.width(550).height(310).url()
		: null;

	const postTitle = post.title || 'Untitled Post';
	const postBody = post.body || [];
	const postPublishedAt = post.publishedAt || '';

	const authorName = post.author?.name || 'Unknown Author';
	const authorSlug = post.author?.slug?.current || '';
	const authorLink = authorSlug ? `/authors/${authorSlug}` : '#';

	return (
		<main className='container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4'>
			<Link href='/' className='hover:underline'>
				← Back to posts
			</Link>
			<h1 className='text-4xl font-bold '>{postTitle}</h1>
			<Link href={authorLink} className='hover:underline'>
				<h3 className='text-lg text-gray-600'>{authorName}</h3>
			</Link>

			<p>{new Date(postPublishedAt).toLocaleDateString()}</p>
			{postImageUrl && (
				<Image
					src={postImageUrl}
					alt={postTitle}
					className='aspect-video rounded-xl'
					width={550}
					height={310}
				/>
			)}
			<div className='prose text-justify'>
				{Array.isArray(postBody) && <PortableText value={postBody} />}
			</div>
		</main>
	);
}

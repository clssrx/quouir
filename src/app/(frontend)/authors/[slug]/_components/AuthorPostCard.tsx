import Image from 'next/image';
import Link from 'next/link';

import { urlFor } from '@/sanity/lib/image';
import { PostsSectionProps } from '@/types/pages';

type AuthorPost = PostsSectionProps['posts'][number];

type AuthorPostCardProps = {
	post: AuthorPost;
};

export const AuthorPostCard = ({ post }: AuthorPostCardProps) => {
	const categorySlug = post.category?.slug?.current;
	const postSlug = post.slug?.current;

	if (!categorySlug || !postSlug) {
		return null;
	}

	const postHref = `/${categorySlug}/${postSlug}`;

	const postImageUrl = post.thumbnailImage
		? urlFor(post.thumbnailImage).width(400).height(400).url()
		: undefined;

	return (
		<li className='h-full'>
			<article className='group flex h-full flex-col'>
				<Link
					href={postHref}
					className='block focus-visible:outline-2 focus-visible:outline-offset-4'
				>
					{postImageUrl && (
						<div className='aspect-square w-full max-w-60 overflow-hidden rounded-lg'>
							<Image
								src={postImageUrl}
								alt={post.thumbnailImage?.alt ?? ''}
								width={400}
								height={400}
								className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
							/>
						</div>
					)}

					<h2 className='mt-3 line-clamp-2 min-h-10 text-base font-semibold leading-tight underline-offset-4 group-hover:underline'>
						{post.title}
					</h2>
				</Link>
			</article>
		</li>
	);
};

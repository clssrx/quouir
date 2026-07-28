import Image from 'next/image';

import { urlFor } from '@/sanity/lib/image';
import type { POST_BY_CATEGORY_AND_SLUG_QUERY_RESULT } from '@/sanity/types';

type Post = NonNullable<POST_BY_CATEGORY_AND_SLUG_QUERY_RESULT>;

type PostHeroImageProps = {
	image: Post['image'];
};

export const PostHeroImage = ({ image }: PostHeroImageProps) => {
	if (!image) return null;

	const imageUrl = urlFor(image).width(1600).height(1000).fit('crop').url();

	return (
		<figure>
			<Image
				src={imageUrl}
				alt={image.alt ?? ''}
				width={1600}
				height={1000}
				sizes='(min-width: 1280px) 1152px, (min-width: 768px) 90vw, 100vw'
				priority
				className='h-auto w-full object-cover'
			/>
		</figure>
	);
};

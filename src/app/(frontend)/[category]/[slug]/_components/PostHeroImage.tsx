import Image from 'next/image';

import { urlFor } from '@/sanity/lib/image';
import { POST_BY_CATEGORY_AND_SLUG_QUERYResult } from '@/sanity/types';

type Post = NonNullable<POST_BY_CATEGORY_AND_SLUG_QUERYResult>;

type PostHeroImageProps = {
	image: Post['image'];
};

export const PostHeroImage = ({ image }: PostHeroImageProps) => {
	if (!image) return null;

	const imageUrl = urlFor(image).width(1200).height(675).fit('crop').url();

	return (
		<div className='mb-12 overflow-hidden rounded-2xl'>
			<Image
				src={imageUrl}
				alt={image.alt ?? ''}
				width={1200}
				height={675}
				sizes='(min-width: 768px) 768px, 100vw'
				priority
				className='aspect-video w-full object-cover'
			/>
		</div>
	);
};

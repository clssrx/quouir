import Image from 'next/image';
import type { PortableTextComponents } from '@portabletext/react';
import { type SanityImageSource } from '@sanity/image-url';
import type { ReactNode } from 'react';

import { urlFor } from '@/sanity/lib/image';

type LinkMark = {
	href?: string;
};

type PortableTextImageValue = SanityImageSource & {
	alt?: string;
};

export const linkClasses =
	'text-purple-300 underline underline-offset-4 transition hover:text-purple-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300';

const isExternalHref = (href: string) => {
	return href.startsWith('http');
};

const stripTrailingPunctuation = (url: string) => {
	const cleanUrl = url.replace(/[.,;:!?)]$/, '');
	const trailingPunctuation = url.slice(cleanUrl.length);

	return { cleanUrl, trailingPunctuation };
};

const ExternalLink = ({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) => {
	return (
		<a
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			className={linkClasses}
		>
			{children}
			<span className='sr-only'>, si apre in una nuova scheda</span>
		</a>
	);
};

export const renderTextWithLinks = (text: string) => {
	const urlRegex = /(https?:\/\/[^\s]+)/g;

	return text.split(urlRegex).map((part, index) => {
		const isUrl = /^https?:\/\/[^\s]+$/.test(part);

		if (!isUrl) {
			return part;
		}

		const { cleanUrl, trailingPunctuation } = stripTrailingPunctuation(part);

		return (
			<span key={`${cleanUrl}-${index}`}>
				<ExternalLink href={cleanUrl}>{cleanUrl}</ExternalLink>
				{trailingPunctuation}
			</span>
		);
	});
};

const PortableTextImage = ({ value }: { value?: unknown }) => {
	if (!value) return null;

	const image = value as PortableTextImageValue;

	return (
		<Image
			className='not-prose h-auto w-full rounded-lg'
			src={urlFor(image)
				.width(600)
				.height(400)
				.quality(80)
				.auto('format')
				.url()}
			alt={image.alt ?? ''}
			width={600}
			height={400}
		/>
	);
};

export const portableTextComponents: PortableTextComponents = {
	types: {
		image: PortableTextImage,
	},

	marks: {
		link: ({ children, value }) => {
			const link = value as LinkMark;
			const href = link?.href;

			if (!href) return <>{children}</>;

			if (isExternalHref(href)) {
				return <ExternalLink href={href}>{children}</ExternalLink>;
			}

			return (
				<a href={href} className={linkClasses}>
					{children}
				</a>
			);
		},
	},
};

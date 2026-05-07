import Image from 'next/image';
import type { PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';

type LinkMark = {
	href?: string;
};

export const linkClasses =
	'text-purple-300 underline underline-offset-4 transition hover:text-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300';

export const renderTextWithLinks = (text: string) => {
	const urlRegex = /(https?:\/\/[^\s]+)/g;

	return text.split(urlRegex).map((part, index) => {
		const isUrl = /^https?:\/\/[^\s]+$/.test(part);

		if (!isUrl) {
			return part;
		}

		const cleanUrl = part.replace(/[.,;:!?)]$/, '');
		const trailingPunctuation = part.slice(cleanUrl.length);

		return (
			<span key={`${cleanUrl}-${index}`}>
				<a
					href={cleanUrl}
					target='_blank'
					rel='noopener noreferrer'
					className={linkClasses}
				>
					{cleanUrl}
					<span className='sr-only'>, si apre in una nuova scheda</span>
				</a>
				{trailingPunctuation}
			</span>
		);
	});
};

export const portableTextComponents: PortableTextComponents = {
	types: {
		image: ({ value }) =>
			value ? (
				<Image
					className='not-prose h-auto w-full rounded-lg'
					src={urlFor(value)
						.width(600)
						.height(400)
						.quality(80)
						.auto('format')
						.url()}
					alt={value?.alt ?? ''}
					width={600}
					height={400}
				/>
			) : null,
	},

	marks: {
		link: ({ children, value }) => {
			const link = value as LinkMark;
			const href = link?.href;

			if (!href) return <>{children}</>;

			const isExternal = href.startsWith('http');

			return (
				<a
					href={href}
					target={isExternal ? '_blank' : undefined}
					rel={isExternal ? 'noopener noreferrer' : undefined}
					className={linkClasses}
				>
					{children}
					{isExternal && (
						<span className='sr-only'>, si apre in una nuova scheda</span>
					)}
				</a>
			);
		},
	},
};

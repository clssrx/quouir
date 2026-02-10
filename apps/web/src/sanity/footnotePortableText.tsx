'use client';

import Image from 'next/image';
import {
	PortableText,
	PortableTextComponents,
	PortableTextBlock,
} from '@portabletext/react';
import { urlForImage } from './image';

interface Footnote {
	id: number;
	text: string;
}

// Helper to extract footnotes from PortableText blocks
const extractFootnotes = (blocks: PortableTextBlock[]): Footnote[] => {
	const footnotesMap = new Map<string, number>();
	let counter = 1;

	blocks.forEach((block) => {
		if (block._type === 'block' && block.markDefs) {
			block.markDefs.forEach((mark) => {
				if (
					mark._type === 'footnote' &&
					typeof mark.text === 'string' &&
					!footnotesMap.has(mark.text)
				) {
					footnotesMap.set(mark.text, counter++);
				}
			});
		}
	});

	return Array.from(footnotesMap.entries()).map(([text, id]) => ({ id, text }));
};

export const FootnotePortableText = ({
	value,
}: {
	value: PortableTextBlock[];
}) => {
	const footnotes = extractFootnotes(value);

	const components: PortableTextComponents = {
		types: {
			image: (props) =>
				props.value ? (
					<Image
						className='rounded-lg not-prose w-full h-auto'
						src={urlForImage(props.value)
							.width(600)
							.height(400)
							.quality(80)
							.auto('format')
							.url()}
						alt={props?.value?.alt || ''}
						width={600}
						height={400}
					/>
				) : null,
		},
		marks: {
			footnote: ({ value }) => {
				const footnote = footnotes.find((f) => f.text === value.text);
				if (!footnote) return null;

				return (
					<sup className='cursor-pointer'>
						<a
							href={`#footnote-${footnote.id}`}
							id={`footnote-ref-${footnote.id}`}
						>
							{footnote.id}
						</a>
					</sup>
				);
			},
		},
	};

	return (
		<div>
			<PortableText value={value} components={components} />

			{footnotes.length > 0 && (
				<section className='mt-8 border-t pt-4 text-sm text-gray-600'>
					<h2 className='font-semibold mb-2'>Footnotes</h2>
					<ol className='list-decimal ml-5'>
						{footnotes.map((f) => (
							<li key={f.id} id={`footnote-${f.id}`}>
								{f.text}{' '}
								<a
									href={`#footnote-ref-${f.id}`}
									className='text-purple-600 hover:underline'
								>
									↩
								</a>
							</li>
						))}
					</ol>
				</section>
			)}
		</div>
	);
};

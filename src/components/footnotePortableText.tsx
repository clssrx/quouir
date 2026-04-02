'use client';

import Image from 'next/image';
import {
	PortableText,
	PortableTextComponents,
	PortableTextBlock,
} from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';

import { Footnote } from '@/types/components';

type FootnoteMark = {
	_key?: string;
	_type: 'footnote';
	text: string;
};

type PortableTextBlockWithMarks = PortableTextBlock & {
	markDefs?: FootnoteMark[];
};

const extractFootnotes = (blocks: PortableTextBlock[]): Footnote[] => {
	const footnotesMap = new Map<string, number>();
	let counter = 1;

	blocks.forEach((block) => {
		const typedBlock = block as PortableTextBlockWithMarks;

		if (typedBlock._type === 'block' && typedBlock.markDefs) {
			typedBlock.markDefs.forEach((mark) => {
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
			image: ({ value }) =>
				value ? (
					<Image
						className='rounded-lg not-prose w-full h-auto'
						src={urlFor(value)
							.width(600)
							.height(400)
							.quality(80)
							.auto('format')
							.url()}
						alt={value?.alt || ''}
						width={600}
						height={400}
					/>
				) : null,
		},
		block: {
			normal: ({ children }) => <p className='mb-5 leading-7'>{children}</p>,
			indented: ({ children }) => (
				<p className='mb-5 leading-7 indent-8'>{children}</p>
			),
		},
		hardBreak: () => <br />,
		marks: {
			footnote: ({ value }) => {
				const footnoteValue = value as FootnoteMark;
				const footnote = footnotes.find((f) => f.text === footnoteValue.text);

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
					<h2 className='mb-2 font-semibold'>Footnotes</h2>
					<ol className='ml-5 list-decimal'>
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

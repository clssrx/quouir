'use client';

import {
	PortableText,
	PortableTextBlock,
	PortableTextComponents,
} from '@portabletext/react';

import {
	linkClasses,
	portableTextComponents,
	renderTextWithLinks,
} from '@/components/PortableTextComponents';

type FootnoteMark = {
	_key: string;
	_type: 'footnote';
	text: string;
};

type PortableTextSpan = {
	_type?: 'span';
	text?: string;
	marks?: unknown[];
};

type MarkDef =
	| Partial<FootnoteMark>
	| {
			_key?: string;
			_type?: string;
			[key: string]: unknown;
	  };

type PortableTextBlockWithChildren = PortableTextBlock & {
	children?: PortableTextSpan[];
	markDefs?: MarkDef[];
};

type ExtractedFootnote = {
	number: number;
	markKey: string;
	text: string;
};

const isFootnoteMark = (mark: MarkDef): mark is FootnoteMark => {
	return (
		mark._type === 'footnote' &&
		typeof mark._key === 'string' &&
		typeof mark.text === 'string' &&
		mark.text.trim().length > 0
	);
};

const extractFootnotes = (blocks: PortableTextBlock[]): ExtractedFootnote[] => {
	const footnotes: ExtractedFootnote[] = [];
	const seenKeys = new Set<string>();

	blocks.forEach((block) => {
		const typedBlock = block as PortableTextBlockWithChildren;

		if (typedBlock._type !== 'block') return;

		const markDefs = typedBlock.markDefs ?? [];
		const children = typedBlock.children ?? [];

		children.forEach((child) => {
			const marks = Array.isArray(child.marks)
				? child.marks.filter((mark): mark is string => typeof mark === 'string')
				: [];

			marks.forEach((markKey) => {
				if (seenKeys.has(markKey)) return;

				const footnote = markDefs.find(
					(mark): mark is FootnoteMark =>
						mark._key === markKey && isFootnoteMark(mark),
				);

				if (!footnote) return;

				seenKeys.add(markKey);

				footnotes.push({
					number: footnotes.length + 1,
					markKey: footnote._key,
					text: footnote.text,
				});
			});
		});
	});

	return footnotes;
};

export const FootnotePortableText = ({
	value,
}: {
	value: PortableTextBlock[];
}) => {
	const footnotes = extractFootnotes(value);

	const components: PortableTextComponents = {
		...portableTextComponents,

		block: {
			normal: ({ children }) => <p className='mb-5 leading-7'>{children}</p>,

			h2: ({ children }) => (
				<h2 className='mb-4 mt-10 text-2xl font-semibold leading-tight'>
					{children}
				</h2>
			),

			h3: ({ children }) => (
				<h3 className='mb-3 mt-8 text-xl font-semibold leading-tight'>
					{children}
				</h3>
			),

			blockquote: ({ children }) => (
				<blockquote className='my-6 border-l-2 border-white/20 pl-4 italic text-gray-200'>
					{children}
				</blockquote>
			),

			indented: ({ children }) => (
				<p className='mb-5 leading-7 indent-8'>{children}</p>
			),
		},

		hardBreak: () => <br />,

		marks: {
			...(portableTextComponents.marks ?? {}),

			footnote: ({ children, value }) => {
				const footnoteValue = value as Partial<FootnoteMark>;

				const footnote = footnotes.find(
					(note) => note.markKey === footnoteValue._key,
				);

				if (!footnote) return <>{children}</>;

				return (
					<>
						{children}
						<sup className='ml-0.5 align-super text-xs leading-none'>
							<a
								href={`#footnote-${footnote.number}`}
								id={`footnote-ref-${footnote.number}`}
								aria-label={`Vai alla nota ${footnote.number}`}
								className='text-purple-300 underline-offset-2 hover:text-purple-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300'
							>
								{footnote.number}
							</a>
						</sup>
					</>
				);
			},
		},
	};

	return (
		<div>
			<PortableText value={value} components={components} />

			{footnotes.length > 0 && (
				<section
					className='mt-8 border-t border-white/10 pt-4 text-sm text-gray-300'
					aria-labelledby='footnotes-heading'
				>
					<h2 id='footnotes-heading' className='mb-2 font-semibold text-white'>
						Note
					</h2>

					<ol className='ml-5 list-decimal space-y-2'>
						{footnotes.map((footnote) => (
							<li key={footnote.markKey} id={`footnote-${footnote.number}`}>
								<span>{renderTextWithLinks(footnote.text)}</span>{' '}
								<a
									href={`#footnote-ref-${footnote.number}`}
									className={linkClasses}
									aria-label={`Torna al riferimento della nota ${footnote.number}`}
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

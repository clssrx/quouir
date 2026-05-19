import {
	PortableText,
	type PortableTextBlock,
	type PortableTextComponents,
} from '@portabletext/react';

import {
	linkClasses,
	portableTextComponents,
	renderTextWithLinks,
} from '@/components/portable-text/PortableTextComponents';

import {
	extractFootnotes,
	type ExtractedFootnote,
	type FootnoteMark,
} from './footnotes';

type FootnotePortableTextProps = {
	value: PortableTextBlock[];
};

const createFootnotePortableTextComponents = (
	footnotes: ExtractedFootnote[],
): PortableTextComponents => ({
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
			<p className='mb-5 indent-8 leading-7'>{children}</p>
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
							className='text-purple-300 underline-offset-2 hover:text-purple-200 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300'
						>
							{footnote.number}
						</a>
					</sup>
				</>
			);
		},
	},
});

export const FootnotePortableText = ({ value }: FootnotePortableTextProps) => {
	const footnotes = extractFootnotes(value);
	const components = createFootnotePortableTextComponents(footnotes);

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

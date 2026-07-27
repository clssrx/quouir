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
		normal: ({ children }) => (
			<p className='mb-7 text-lg leading-[1.7] text-white/90 last:mb-0'>
				{children}
			</p>
		),

		h2: ({ children }) => (
			<h2 className='mt-14 mb-5 text-3xl font-medium leading-[1.05] tracking-[-0.03em] md:text-4xl'>
				{children}
			</h2>
		),

		h3: ({ children }) => (
			<h3 className='mt-10 mb-4 text-2xl font-medium leading-[1.1] tracking-[-0.02em] md:text-3xl'>
				{children}
			</h3>
		),

		blockquote: ({ children }) => (
			<blockquote className='my-10 border-y border-white/15 py-6 text-xl leading-[1.45] text-white/75 md:text-2xl'>
				{children}
			</blockquote>
		),

		indented: ({ children }) => (
			<p className='mb-7 indent-8 text-lg leading-[1.7] text-white/90 last:mb-0'>
				{children}
			</p>
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
					className='mt-16 border-t border-white/15 pt-5 font-mono text-xs leading-relaxed text-white/55'
					aria-labelledby='footnotes-heading'
				>
					<h2
						id='footnotes-heading'
						className='mb-5 uppercase tracking-widest text-white/70'
					>
						Note
					</h2>

					<ol className='ml-5 list-decimal space-y-3'>
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

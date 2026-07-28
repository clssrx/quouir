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
			<p className='mb-6 text-base leading-[1.7] text-white/90 last:mb-0 sm:text-lg md:mb-7'>
				{children}
			</p>
		),

		h2: ({ children }) => (
			<h2 className='mt-10 mb-4 text-2xl font-medium leading-[1.08] tracking-[-0.03em] sm:text-3xl md:mt-14 md:mb-5 md:text-4xl'>
				{children}
			</h2>
		),

		h3: ({ children }) => (
			<h3 className='mt-8 mb-4 text-xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-2xl md:mt-10 md:text-3xl'>
				{children}
			</h3>
		),

		blockquote: ({ children }) => (
			<blockquote className='my-8 border-y border-white/15 py-5 text-lg leading-[1.5] text-white/75 sm:text-xl md:my-10 md:py-6 md:text-2xl'>
				{children}
			</blockquote>
		),

		indented: ({ children }) => (
			<p className='mb-6 indent-6 text-base leading-[1.7] text-white/90 last:mb-0 sm:text-lg md:mb-7 md:indent-8'>
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
					className='mt-12 border-t border-white/15 pt-5 font-mono text-xs leading-relaxed text-white/55 md:mt-16'
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

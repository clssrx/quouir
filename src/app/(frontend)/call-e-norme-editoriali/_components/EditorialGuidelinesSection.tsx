import {
	PortableText,
	type PortableTextBlock,
	type PortableTextComponents,
} from '@portabletext/react';

import type { CALL_EDITORIAL_GUIDELINES_QUERY_RESULT } from '@/sanity/types';

type CallEditorialGuidelines =
	NonNullable<CALL_EDITORIAL_GUIDELINES_QUERY_RESULT>;

type EditorialRule = NonNullable<
	CallEditorialGuidelines['editorialRules']
>[number];

type FootnoteExample = NonNullable<
	CallEditorialGuidelines['footnoteExamples']
>[number];

type BibliographyExample = NonNullable<
	CallEditorialGuidelines['bibliographyExamples']
>[number];

type EditorialExample = FootnoteExample | BibliographyExample;

type EditorialGuidelinesSectionProps = {
	rules: EditorialRule[];
	footnoteExamples: FootnoteExample[];
	bibliographyIntro?: string | null;
	bibliographyExamples: BibliographyExample[];
};

const editorialExampleComponents: PortableTextComponents = {
	block: {
		normal: ({ children }) => <p className='wrap-anywhere'>{children}</p>,
	},

	marks: {
		strong: ({ children }) => (
			<strong className='font-semibold text-gray-100'>{children}</strong>
		),

		em: ({ children }) => <em>{children}</em>,
	},
};

const EditorialExamplesList = ({
	examples,
}: {
	examples: EditorialExample[];
}) => {
	return (
		<div className='font-mono text-sm leading-relaxed text-white/60'>
			{examples.map((example) => {
				console.log(example);

				const content = Array.isArray(example.content)
					? (example.content as PortableTextBlock[])
					: null;

				if (!content) return null;

				if (example.kind === 'heading') {
					return (
						<div
							key={example._key}
							className='border-t border-white/15 py-4 first:border-t-0 first:pt-0'
						>
							<div className='min-w-0 space-y-3 text-white'>
								<PortableText
									value={content}
									components={editorialExampleComponents}
								/>
							</div>
						</div>
					);
				}

				return (
					<div
						key={example._key}
						className='border-t border-white/15 py-4 first:border-t-0 first:pt-0'
					>
						<div className='grid grid-cols-[1rem_minmax(0,1fr)] gap-4'>
							<span aria-hidden='true' className='text-white/60'>
								•
							</span>

							<div className='min-w-0 space-y-3'>
								<PortableText
									value={content}
									components={editorialExampleComponents}
								/>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export const EditorialGuidelinesSection = ({
	rules,
	footnoteExamples,
	bibliographyIntro,
	bibliographyExamples,
}: EditorialGuidelinesSectionProps) => {
	return (
		<section
			aria-labelledby='editorial-guidelines-heading'
			className='grid gap-5 border-b border-white/15 py-8 md:grid-cols-[3rem_14rem_minmax(0,1fr)] md:gap-6 md:py-10'
		>
			<span className='font-mono text-xs text-white/60'>04</span>

			<h2
				id='editorial-guidelines-heading'
				className='text-lg font-medium uppercase leading-tight tracking-[-0.02em] md:text-xl'
			>
				Norme editoriali
			</h2>

			<div className='min-w-0 max-w-3xl'>
				<ul className='list-outside list-disc pl-5 marker:text-white/60'>
					{rules.map((rule) => (
						<li
							key={rule._key}
							className='border-t border-white/15 py-4 pl-2 first:border-t-0 first:pt-0'
						>
							<p className='max-w-3xl leading-relaxed text-white/70'>
								{rule.text}
							</p>
						</li>
					))}
				</ul>

				<section
					aria-labelledby='footnotes-heading'
					className='mt-10 border-t border-white/15 pt-8'
				>
					<h3
						id='footnotes-heading'
						className='mb-6 text-lg font-medium uppercase tracking-[-0.02em]'
					>
						Note a piè di pagina
					</h3>

					<EditorialExamplesList examples={footnoteExamples} />
				</section>

				<section
					aria-labelledby='bibliography-heading'
					className='mt-10 border-t border-white/15 pt-8'
				>
					<h3
						id='bibliography-heading'
						className='mb-6 text-lg font-medium uppercase tracking-[-0.02em]'
					>
						Bibliografia
					</h3>

					{bibliographyIntro && (
						<p className='mb-7 leading-relaxed text-white/70'>
							{bibliographyIntro}
						</p>
					)}

					<EditorialExamplesList examples={bibliographyExamples} />
				</section>
			</div>
		</section>
	);
};

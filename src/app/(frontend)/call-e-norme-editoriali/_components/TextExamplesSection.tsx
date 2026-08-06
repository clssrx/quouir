import {
	PortableText,
	type PortableTextBlock,
	type PortableTextComponents,
} from '@portabletext/react';

import type { CALL_EDITORIAL_GUIDELINES_QUERY_RESULT } from '@/sanity/types';

type CallEditorialGuidelines =
	NonNullable<CALL_EDITORIAL_GUIDELINES_QUERY_RESULT>;

type TextExample = NonNullable<
	CallEditorialGuidelines['footnoteExamples']
>[number];

type TextExamplesSectionProps = {
	number: string;
	headingId: string;
	title: string;
	intro?: string | null;
	examples: TextExample[];
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

export const TextExamplesSection = ({
	number,
	headingId,
	title,
	intro,
	examples,
}: TextExamplesSectionProps) => {
	return (
		<section
			aria-labelledby={headingId}
			className='grid gap-5 border-b border-white/15 py-8 md:grid-cols-[3rem_14rem_minmax(0,1fr)] md:gap-6 md:py-10'
		>
			<span className='font-mono text-xs text-white/60'>{number}</span>

			<h2
				id={headingId}
				className='text-lg font-medium uppercase leading-tight tracking-[-0.02em] md:text-xl'
			>
				{title}
			</h2>

			<div className='min-w-0 max-w-3xl'>
				{intro && <p className='mb-7 leading-relaxed text-white/70'>{intro}</p>}

				<div className='font-mono text-sm leading-relaxed text-white/60'>
					{examples.map((example, index) => (
						<div
							key={example._key}
							className='grid gap-4 border-t border-white/15 py-4 first:border-t-0 first:pt-0 sm:grid-cols-[2.5rem_minmax(0,1fr)]'
						>
							<span className='text-xs text-white/60' aria-hidden='true'>
								{String(index + 1).padStart(2, '0')}
							</span>

							<div className='min-w-0 space-y-3'>
								{Array.isArray(example.content) && (
									<PortableText
										value={example.content as PortableTextBlock[]}
										components={editorialExampleComponents}
									/>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

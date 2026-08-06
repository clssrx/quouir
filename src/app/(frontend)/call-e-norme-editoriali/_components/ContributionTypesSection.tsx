import {
	PortableText,
	type PortableTextBlock,
	type PortableTextComponents,
} from '@portabletext/react';

import type { CALL_EDITORIAL_GUIDELINES_QUERY_RESULT } from '@/sanity/types';

type CallEditorialGuidelines =
	NonNullable<CALL_EDITORIAL_GUIDELINES_QUERY_RESULT>;

type ContributionType = NonNullable<
	CallEditorialGuidelines['contributionTypes']
>[number];

type ContributionTypesSectionProps = {
	contributionTypes: ContributionType[];
};

const contributionComponents: PortableTextComponents = {
	block: {
		normal: ({ children }) => (
			<p className='max-w-2xl leading-relaxed text-white/75'>{children}</p>
		),
	},

	list: {
		bullet: ({ children }) => <ul className='mt-5 space-y-3'>{children}</ul>,
	},

	listItem: {
		bullet: ({ children }) => (
			<li className='border-t border-white/10 pt-3 leading-relaxed text-white/60'>
				{children}
			</li>
		),
	},

	marks: {
		strong: ({ children }) => (
			<strong className='font-semibold text-white'>{children}</strong>
		),

		em: ({ children }) => <em>{children}</em>,
	},
};

export const ContributionTypesSection = ({
	contributionTypes,
}: ContributionTypesSectionProps) => {
	return (
		<section
			aria-labelledby='types-heading'
			className='grid gap-5 border-b border-white/15 py-8 md:grid-cols-[3rem_14rem_minmax(0,1fr)] md:gap-6 md:py-10'
		>
			<span className='font-mono text-xs text-white/60'>03</span>

			<h2
				id='types-heading'
				className='text-lg font-medium uppercase leading-tight tracking-[-0.02em] md:text-xl'
			>
				Tipologie di contributi
			</h2>

			<div>
				{contributionTypes.map((contributionType, index) => {
					const headingId = `contribution-type-${index + 1}`;

					return (
						<section
							key={contributionType._key}
							aria-labelledby={headingId}
							className='grid gap-4 border-t border-white/15 py-6 first:border-t-0 first:pt-0 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8'
						>
							<div>
								<span
									className='font-mono text-[0.65rem] text-white/60'
									aria-hidden='true'
								>
									{String(index + 1).padStart(2, '0')}
								</span>

								<h3
									id={headingId}
									className='mt-2 text-xl font-medium uppercase tracking-tight'
								>
									{contributionType.title}
								</h3>
							</div>

							<div>
								{Array.isArray(contributionType.content) && (
									<PortableText
										value={contributionType.content as PortableTextBlock[]}
										components={contributionComponents}
									/>
								)}
							</div>
						</section>
					);
				})}
			</div>
		</section>
	);
};

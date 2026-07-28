import type { TextExample } from '../_data/callEditorialGuidelines';

type TextExamplesSectionProps = {
	number: string;
	headingId: string;
	title: string;
	intro?: string;
	examples: TextExample[];
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
			<span className='font-mono text-xs text-white/35'>{number}</span>

			<h2
				id={headingId}
				className='text-lg font-medium uppercase leading-tight tracking-[-0.02em] md:text-xl'
			>
				{title}
			</h2>

			<div className='max-w-3xl'>
				{intro && <p className='mb-7 leading-relaxed text-white/70'>{intro}</p>}

				<div className='font-mono text-sm leading-relaxed text-white/60'>
					{examples.map((example, index) => (
						<div
							key={example.id}
							className='grid gap-4 border-t border-white/15 py-4 first:border-t-0 first:pt-0 sm:grid-cols-[2.5rem_minmax(0,1fr)]'
						>
							<span className='text-xs text-white/30'>
								{String(index + 1).padStart(2, '0')}
							</span>

							<p>{example.content}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

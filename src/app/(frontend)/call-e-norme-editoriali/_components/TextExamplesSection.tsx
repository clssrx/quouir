import type { TextExample } from '../_data/callEditorialGuidelines';

type TextExamplesSectionProps = {
	headingId: string;
	title: string;
	intro?: string;
	examples: TextExample[];
};

export const TextExamplesSection = ({
	headingId,
	title,
	intro,
	examples,
}: TextExamplesSectionProps) => {
	return (
		<section aria-labelledby={headingId} className='space-y-5'>
			<h2 id={headingId} className='text-2xl font-semibold uppercase'>
				{title}
			</h2>

			{intro && <p className='leading-relaxed text-gray-300'>{intro}</p>}

			<div className='space-y-4 rounded-2xl border border-white/15 p-5 text-sm leading-relaxed text-gray-300'>
				{examples.map((example) => (
					<p key={example.id}>{example.content}</p>
				))}
			</div>
		</section>
	);
};

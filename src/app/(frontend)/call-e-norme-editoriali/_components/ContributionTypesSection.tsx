import type { ContributionType } from '../_data/callEditorialGuidelines';

type ContributionTypesSectionProps = {
	contributionTypes: ContributionType[];
};

export const ContributionTypesSection = ({
	contributionTypes,
}: ContributionTypesSectionProps) => {
	return (
		<section aria-labelledby='types-heading' className='space-y-6'>
			<h2 id='types-heading' className='text-2xl font-semibold uppercase'>
				Tipologie di contributi
			</h2>

			<div className='grid gap-5 md:grid-cols-2'>
				{contributionTypes.map((type) => (
					<section
						key={type.title}
						className='rounded-2xl border border-white/15 p-5'
						aria-labelledby={`${type.title.toLowerCase()}-heading`}
					>
						<h3
							id={`${type.title.toLowerCase()}-heading`}
							className='text-xl font-semibold'
						>
							{type.title}
						</h3>

						{type.description && (
							<p className='mt-3 leading-relaxed text-gray-300'>
								{type.description}
							</p>
						)}

						{type.requirements && (
							<ul className='mt-4 list-disc space-y-2 pl-5 text-gray-300'>
								{type.requirements.map((requirement) => (
									<li key={requirement}>{requirement}</li>
								))}
							</ul>
						)}
					</section>
				))}
			</div>
		</section>
	);
};

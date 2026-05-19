type ResearchFieldsSectionProps = {
	fields: string[];
};

export const ResearchFieldsSection = ({
	fields,
}: ResearchFieldsSectionProps) => {
	return (
		<section aria-labelledby='fields-heading' className='space-y-5'>
			<h2 id='fields-heading' className='text-2xl font-semibold uppercase'>
				Ambiti di interesse
			</h2>

			<ul className='flex flex-wrap gap-2'>
				{fields.map((field) => (
					<li
						key={field}
						className='rounded-full border border-white/15 px-3 py-1 text-sm text-gray-100'
					>
						{field}
					</li>
				))}
			</ul>
		</section>
	);
};

type ResearchFieldsSectionProps = {
	fields: string[];
};

export const ResearchFieldsSection = ({
	fields,
}: ResearchFieldsSectionProps) => {
	return (
		<section
			aria-labelledby='fields-heading'
			className='grid gap-5 border-b border-white/15 py-8 md:grid-cols-[3rem_14rem_minmax(0,1fr)] md:gap-6 md:py-10'
		>
			<span className='font-mono text-xs text-white/60'>01</span>

			<h2
				id='fields-heading'
				className='text-lg font-medium uppercase leading-tight tracking-[-0.02em] md:text-xl'
			>
				Ambiti di interesse
			</h2>

			<ul className='grid gap-x-12 gap-y-3 sm:grid-cols-2'>
				{fields.map((field) => (
					<li key={field} className='text-base leading-snug text-white/75'>
						{field}
					</li>
				))}
			</ul>
		</section>
	);
};

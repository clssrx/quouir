type ResearchFieldsSectionProps = {
	fields: string[];
};

export const ResearchFieldsSection = ({
	fields,
}: ResearchFieldsSectionProps) => {
	return (
		<section
			aria-labelledby='fields-heading'
			className='grid min-w-0 gap-3 border-b border-white/15 py-7 md:grid-cols-[3rem_14rem_minmax(0,1fr)] md:gap-6 md:py-10'
		>
			<span className='font-mono text-xs text-white/35'>01</span>

			<h2
				id='fields-heading'
				className='text-lg font-medium uppercase leading-tight tracking-[-0.02em] md:text-xl'
			>
				Ambiti di interesse
			</h2>

			<ul className='grid sm:grid-cols-2'>
				{fields.map((field) => (
					<li
						key={field}
						className='border-t border-white/15 py-3 text-base leading-snug text-white/75 first:border-t-0 sm:odd:pr-5 sm:even:pl-5'
					>
						{field}
					</li>
				))}
			</ul>
		</section>
	);
};

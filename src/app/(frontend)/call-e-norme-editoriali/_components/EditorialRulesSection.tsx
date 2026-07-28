type EditorialRulesSectionProps = {
	rules: string[];
};

export const EditorialRulesSection = ({
	rules,
}: EditorialRulesSectionProps) => {
	return (
		<section
			aria-labelledby='rules-heading'
			className='grid gap-5 border-b border-white/15 py-8 md:grid-cols-[3rem_14rem_minmax(0,1fr)] md:gap-6 md:py-10'
		>
			<span className='font-mono text-xs text-white/60'>04</span>

			<h2
				id='rules-heading'
				className='text-lg font-medium uppercase leading-tight tracking-[-0.02em] md:text-xl'
			>
				Norme editoriali
			</h2>

			<ol>
				{rules.map((rule, index) => (
					<li
						key={rule}
						className='grid gap-4 border-t border-white/15 py-4 first:border-t-0 first:pt-0 sm:grid-cols-[2.5rem_minmax(0,1fr)]'
					>
						<span className='font-mono text-xs text-white/60'>
							{String(index + 1).padStart(2, '0')}
						</span>

						<p className='max-w-3xl leading-relaxed text-white/70'>{rule}</p>
					</li>
				))}
			</ol>
		</section>
	);
};

type EditorialRulesSectionProps = {
	rules: string[];
};

export const EditorialRulesSection = ({
	rules,
}: EditorialRulesSectionProps) => {
	return (
		<section aria-labelledby='rules-heading' className='space-y-6'>
			<h2 id='rules-heading' className='text-2xl font-semibold uppercase'>
				Norme editoriali
			</h2>

			<ul className='space-y-3 leading-relaxed text-gray-300'>
				{rules.map((rule) => (
					<li key={rule} className='border-b border-white/10 pb-3'>
						{rule}
					</li>
				))}
			</ul>
		</section>
	);
};

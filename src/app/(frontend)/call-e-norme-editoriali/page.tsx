import {
	bibliographyExamples,
	contributionTypes,
	editorialRules,
	footnoteExamples,
	researchFields,
} from './_data/callEditorialGuidelines';

import { CallPageHeader } from './_components/CallPageHeader';
import { ContributionTypesSection } from './_components/ContributionTypesSection';
import { EditorialRulesSection } from './_components/EditorialRulesSection';
import { EnglishPdfSection } from './_components/EnglishPdfSection';
import { ResearchFieldsSection } from './_components/ResearchFieldsSection';
import { TextExamplesSection } from './_components/TextExamplesSection';

export default function CallEditorialGuidelinesPage() {
	return (
		<main
			className='py-8 md:py-10'
			aria-labelledby='call-editorial-guidelines-heading'
		>
			<article>
				<CallPageHeader />

				<div className='border-t border-white/15'>
					<ResearchFieldsSection fields={researchFields} />

					<section
						aria-labelledby='languages-heading'
						className='grid gap-5 border-b border-white/15 py-8 md:grid-cols-[3rem_14rem_minmax(0,1fr)] md:gap-6 md:py-10'
					>
						<span className='font-mono text-xs text-white/35'>02</span>

						<h2
							id='languages-heading'
							className='text-lg font-medium uppercase leading-tight tracking-[-0.02em] md:text-xl'
						>
							Lingue accettate
						</h2>

						<p className='text-lg leading-relaxed text-white/80'>
							Italiano / Inglese / Francese / Spagnolo
						</p>
					</section>

					<ContributionTypesSection contributionTypes={contributionTypes} />

					<EditorialRulesSection rules={editorialRules} />

					<TextExamplesSection
						number='05'
						headingId='notes-heading'
						title='Note a piè di pagina'
						examples={footnoteExamples}
					/>

					<TextExamplesSection
						number='06'
						headingId='bibliography-heading'
						title='Bibliografia'
						intro='La bibliografia va organizzata come le note a piè di pagina, eccetto per il fatto che il nome deve seguire il cognome; il rientro deve essere sporgente di 0,5 cm; l’interlinea deve essere di 1,5. I riferimenti vanno messi in ordine alfabetico.'
						examples={bibliographyExamples}
					/>

					<EnglishPdfSection />
				</div>
			</article>
		</main>
	);
}

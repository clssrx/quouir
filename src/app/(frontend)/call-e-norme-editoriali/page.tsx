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
			className='mx-auto w-full max-w-4xl px-4 py-2 sm:px-6'
			aria-labelledby='call-editorial-guidelines-heading'
		>
			<article className='space-y-14'>
				<CallPageHeader />

				<ResearchFieldsSection fields={researchFields} />

				<section aria-labelledby='languages-heading' className='space-y-3'>
					<h2
						id='languages-heading'
						className='text-2xl font-semibold uppercase'
					>
						Lingue accettate
					</h2>

					<p className='text-gray-100'>
						Italiano, inglese, francese, spagnolo.
					</p>
				</section>

				<ContributionTypesSection contributionTypes={contributionTypes} />

				<EditorialRulesSection rules={editorialRules} />

				<TextExamplesSection
					headingId='notes-heading'
					title='Note a piè di pagina'
					examples={footnoteExamples}
				/>

				<TextExamplesSection
					headingId='bibliography-heading'
					title='Bibliografia'
					intro='La bibliografia va organizzata come le note a piè di pagina, eccetto per il fatto che il nome deve seguire il cognome; il rientro deve essere sporgente di 0,5 cm; l’interlinea deve essere di 1,5. I riferimenti vanno messi in ordine alfabetico.'
					examples={bibliographyExamples}
				/>

				<EnglishPdfSection />
			</article>
		</main>
	);
}

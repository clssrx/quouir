import { notFound } from 'next/navigation';

import { getCallEditorialGuidelines } from '@/sanity/queries/callEditorialGuidelines';

import { CallPageHeader } from './_components/CallPageHeader';
import { ContributionTypesSection } from './_components/ContributionTypesSection';
import { EditorialRulesSection } from './_components/EditorialRulesSection';
import { EnglishPdfSection } from './_components/EnglishPdfSection';
import { ResearchFieldsSection } from './_components/ResearchFieldsSection';
import { TextExamplesSection } from './_components/TextExamplesSection';

export default async function CallEditorialGuidelinesPage() {
	const data = await getCallEditorialGuidelines();

	if (!data) {
		notFound();
	}

	const {
		introLead,
		introSupportingText,
		submissionLabel,
		submissionEmail,
		submissionNote,
		researchFields,
		acceptedLanguages,
		contributionTypes,
		editorialRules,
		footnoteExamples,
		bibliographyIntro,
		bibliographyExamples,
		englishDescription,
		englishPdfUrl,
		englishLinkLabel,
	} = data;

	return (
		<main
			className='py-8 md:py-10'
			aria-labelledby='call-editorial-guidelines-heading'
		>
			<article>
				<CallPageHeader
					introLead={introLead}
					introSupportingText={introSupportingText}
					submissionLabel={submissionLabel}
					submissionEmail={submissionEmail}
					submissionNote={submissionNote}
				/>

				<div className='border-t border-white/15'>
					<ResearchFieldsSection fields={researchFields} />

					<section
						aria-labelledby='languages-heading'
						className='grid gap-5 border-b border-white/15 py-8 md:grid-cols-[3rem_14rem_minmax(0,1fr)] md:gap-6 md:py-10'
					>
						<span className='font-mono text-xs text-white/60'>02</span>

						<h2
							id='languages-heading'
							className='text-lg font-medium uppercase leading-tight tracking-[-0.02em] md:text-xl'
						>
							Lingue accettate
						</h2>

						<p className='text-lg leading-relaxed text-white/80'>
							{acceptedLanguages.join(' / ')}
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
						intro={bibliographyIntro}
						examples={bibliographyExamples}
					/>

					<EnglishPdfSection
						description={englishDescription}
						pdfUrl={englishPdfUrl}
						linkLabel={englishLinkLabel}
					/>
				</div>
			</article>
		</main>
	);
}

import { defineQuery } from 'next-sanity';

import { sanityFetch } from '../lib/live';

export const CALL_EDITORIAL_GUIDELINES_QUERY = defineQuery(`
	*[
		_type == "callEditorialGuidelines" &&
		_id == "callEditorialGuidelines"
	][0] {
		_id,
		introLead,
		introSupportingText,
		submissionLabel,
		submissionEmail,
		submissionNote,

		researchFields,
		acceptedLanguages,

		contributionTypes[] {
			_key,
			title,
			content
		},

		editorialRules[] {
			_key,
			text
		},

		footnoteExamples[] {
			_key,
			content
		},

		bibliographyIntro,

		bibliographyExamples[] {
			_key,
			content
		},

		englishDescription,
		"englishPdfUrl": englishPdf.asset->url,
		englishLinkLabel
	}
`);

export async function getCallEditorialGuidelines() {
	const { data } = await sanityFetch({
		query: CALL_EDITORIAL_GUIDELINES_QUERY,
		params: {},
	});

	return data;
}

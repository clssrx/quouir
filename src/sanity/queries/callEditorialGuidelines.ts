import { defineQuery } from 'next-sanity';

import { client } from '../lib/client';
import type { CALL_EDITORIAL_GUIDELINES_QUERY_RESULT } from '../types';

const fetchOptions = {
	next: {
		revalidate: 86400,
	},
};

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

export function getCallEditorialGuidelines() {
	return client.fetch<CALL_EDITORIAL_GUIDELINES_QUERY_RESULT>(
		CALL_EDITORIAL_GUIDELINES_QUERY,
		{},
		fetchOptions,
	);
}

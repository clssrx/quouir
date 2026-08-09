import { defineQuery } from 'next-sanity';

import { client } from '../lib/client';
import type {
	LICENSE_TEXT_QUERY_RESULT,
	SITE_SETTINGS_QUERY_RESULT,
} from '../types';

const fetchOptions = {
	next: {
		revalidate: 300,
	},
};

export const SITE_SETTINGS_QUERY = defineQuery(`
	*[
		_type == "siteSettings" &&
		_id == "siteSettings"
	][0] {
		title,
		introText,
		aboutUsText,
		logo,
		contactEmail,
		facebookUrl,
		instagramUrl
	}
`);

export const LICENSE_TEXT_QUERY = defineQuery(`
	*[
		_type == "siteSettings" &&
		_id == "siteSettings"
	][0].licenseText
`);

export function getSiteSettings() {
	return client.fetch<SITE_SETTINGS_QUERY_RESULT>(
		SITE_SETTINGS_QUERY,
		{},
		fetchOptions,
	);
}

export function getLicenseText() {
	return client.fetch<LICENSE_TEXT_QUERY_RESULT>(
		LICENSE_TEXT_QUERY,
		{},
		fetchOptions,
	);
}

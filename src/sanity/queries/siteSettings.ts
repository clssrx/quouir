import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../lib/live';

export const SITE_SETTINGS_QUERY = defineQuery(`
	*[_type == "siteSettings"][0] {
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
	*[_type == "siteSettings"][0].licenseText
`);

export async function getSiteSettings() {
	const { data } = await sanityFetch({
		query: SITE_SETTINGS_QUERY,
		params: {},
	});
	return data;
}

export async function getLicenseText() {
	const { data } = await sanityFetch({
		query: LICENSE_TEXT_QUERY,
		params: {},
	});
	return data;
}

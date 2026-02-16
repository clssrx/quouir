import { groq } from 'next-sanity';
import { sanityFetch } from '../lib/live';

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  title,
  aboutUsText,
  logo,
  contactEmail,
  facebookUrl,
  instagramUrl,
}
`;

// export const SOCIAL_LINKS_QUERY = groq`*[_type == "siteSettings"][0]{
//   contactEmail,
//   facebookUrl,
//   instagramUrl,
// }
// `;

export const LICENSE_TEXT_QUERY = groq`*[_type == "siteSettings"][0]{
  licenseText,
}
`;

export async function getSiteSettings() {
	const { data } = await sanityFetch({
		query: SITE_SETTINGS_QUERY,
		params: {},
	});
	return data;
}

// export async function getSocialLinks() {
// 	const { data } = await sanityFetch({
// 		query: SOCIAL_LINKS_QUERY,
// 		params: {},
// 	});
// 	return data;
// }

export async function getLicenseText() {
	const { data } = await sanityFetch({
		query: LICENSE_TEXT_QUERY,
		params: {},
	});
	return data;
}

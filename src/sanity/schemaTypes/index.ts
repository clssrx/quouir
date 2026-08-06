import { type SchemaTypeDefinition } from 'sanity';
import { categoryType } from './categoryType';
import { postType } from './postType';
import { authorType } from './authorType';
import { siteSettingsType } from './sitesettingsType';
import { callEditorialGuidelinesType } from './callEditorialGuidelinesType';

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		categoryType,
		postType,
		authorType,
		siteSettingsType,
		callEditorialGuidelinesType,
	],
};

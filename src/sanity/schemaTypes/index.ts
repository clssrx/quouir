import { type SchemaTypeDefinition } from 'sanity';
import { categoryType } from './categoryType';
import { postType } from './postType';
import { authorType } from './authorType';

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [categoryType, postType, authorType],
};

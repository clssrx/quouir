import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
	name: 'category',
	title: 'Category',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Category name',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Category URL',
			description: 'Generated from the category name.',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'description',
			title: 'Category description',
			description: 'Optional internal note or public description.',
			type: 'text',
			rows: 3,
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
		},
	},
});

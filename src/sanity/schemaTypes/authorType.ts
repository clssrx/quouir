import { defineType, defineField } from 'sanity';

export const authorType = defineType({
	name: 'author',
	title: 'Author',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Author name',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Author URL',
			description: 'Generated from the author name.',
			type: 'slug',
			options: { source: 'name', maxLength: 96 },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'bio',
			title: 'Short biography',
			type: 'text',
			rows: 4,
		}),
		defineField({
			name: 'image',
			title: 'Author photo',
			type: 'image',
			options: { hotspot: true },
		}),
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'bio',
			media: 'image',
		},
	},
});

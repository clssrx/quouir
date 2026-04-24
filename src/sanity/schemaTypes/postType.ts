import { defineField, defineType, defineArrayMember } from 'sanity';
import { ImageIcon, DocumentTextIcon } from '@sanity/icons';

export const postType = defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Article title',
			description: 'The main title shown on the website.',
			type: 'string',
			validation: (rule) => rule.required().error('Please add a title.'),
		}),
		defineField({
			name: 'slug',
			title: 'Page URL',
			description:
				'Generated from the title. Click “Generate” after writing the title.',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (rule) =>
				rule.required().error('Please generate a page URL.'),
		}),

		defineField({
			name: 'subtitle',
			title: 'Subtitle',
			description: 'Optional short line shown under the title.',
			type: 'string',
		}),

		defineField({
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: [{ type: 'author' }],
			validation: (rule) => rule.required(),
		}),

		defineField({
			name: 'category',
			title: 'Category',
			type: 'reference',
			to: [{ type: 'category' }],
			validation: (rule) => rule.required(),
		}),

		defineField({
			name: 'publishedAt',
			title: 'Publication date',
			description: 'Used to order posts on the website.',
			type: 'date',
			initialValue: () => new Date().toISOString().split('T')[0],
			validation: (rule) => rule.required(),
		}),

		defineField({
			name: 'image',
			title: 'Main image',
			description: 'Large image shown on the article page.',
			type: 'image',
			options: { hotspot: true },
		}),

		defineField({
			name: 'thumbnailImage',
			title: 'Preview image',
			description: 'Small image used in article cards and previews.',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'excerpt',
			title: 'Short summary',
			description: 'Shown in previews. Keep it short.',
			type: 'text',
			rows: 3,
			validation: (rule) =>
				rule.max(500).warning('Try to keep this under 500 characters.'),
		}),

		defineField({
			name: 'body',
			title: 'Body',
			type: 'array',
			validation: (rule) => rule.required(),
			of: [
				defineArrayMember({
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'Heading', value: 'h2' },
						{ title: 'Small heading', value: 'h3' },
						{ title: 'Quote', value: 'blockquote' },
					],
					lists: [
						{ title: 'Bullet', value: 'bullet' },
						{ title: 'Numbered', value: 'number' },
					],
					marks: {
						decorators: [
							{ title: 'Strong', value: 'strong' },
							{ title: 'Emphasis', value: 'em' },
							{ title: 'Code', value: 'code' },
						],
						annotations: [
							{
								name: 'link',
								type: 'object',
								title: 'URL',
								fields: [
									defineField({
										name: 'href',
										type: 'url',
										title: 'URL',
									}),
								],
							},
							{
								name: 'footnote',
								title: 'Footnote',
								type: 'object',
								icon: DocumentTextIcon,
								fields: [
									defineField({
										name: 'text',
										title: 'Footnote text',
										type: 'text',
										rows: 3,
									}),
									defineField({
										name: 'id',
										title: 'id',
										type: 'string',
										description:
											'Unique identifier for this footnote (e.g. "footnote-1")',
									}),
								],
							},
						],
					},
				}),
				defineArrayMember({
					type: 'image',
					icon: ImageIcon,
					options: { hotspot: true },
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'category.title',
			media: 'thumbnailImage',
		},
	},
});

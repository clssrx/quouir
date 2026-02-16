import { defineType, defineField, defineArrayMember } from 'sanity';

export const siteSettingsType = defineType({
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Site Title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'logo',
			title: 'Site Logo',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'aboutUsText',
			title: 'About us text',
			type: 'array',
			validation: (rule) => rule.required(),
			of: [
				defineArrayMember({
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'H1', value: 'h1' },
						{ title: 'H2', value: 'h2' },
						{ title: 'H3', value: 'h3' },
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
						],
					},
				}),
			],
		}),
		defineField({
			name: 'licenseText',
			title: 'License Text',
			type: 'array',
			validation: (rule) => rule.required(),
			of: [
				defineArrayMember({
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'H1', value: 'h1' },
						{ title: 'H2', value: 'h2' },
						{ title: 'H3', value: 'h3' },
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
						],
					},
				}),
			],
		}),
		defineField({
			name: 'contactEmail',
			title: 'Contact Email',
			type: 'string',
		}),
		defineField({
			name: 'facebookUrl',
			title: 'Facebook URL',
			type: 'url',
		}),
		defineField({
			name: 'instagramUrl',
			title: 'Instagram URL',
			type: 'url',
		}),
	],
});

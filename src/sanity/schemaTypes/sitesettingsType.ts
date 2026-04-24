import { defineType, defineField, defineArrayMember } from 'sanity';

const simpleTextBlock = defineArrayMember({
	type: 'block',
	styles: [
		{ title: 'Testo normale', value: 'normal' },
		{ title: 'Titolo sezione', value: 'h2' },
		{ title: 'Sottotitolo sezione', value: 'h3' },
		{ title: 'Citazione', value: 'blockquote' },
	],
	lists: [
		{ title: 'Elenco puntato', value: 'bullet' },
		{ title: 'Elenco numerato', value: 'number' },
	],
	marks: {
		decorators: [
			{ title: 'Grassetto', value: 'strong' },
			{ title: 'Corsivo', value: 'em' },
		],
		annotations: [
			{
				name: 'link',
				type: 'object',
				title: 'Link',
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
});

export const siteSettingsType = defineType({
	name: 'siteSettings',
	title: 'Impostazioni del sito',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Titolo del sito',
			type: 'string',
			validation: (rule) =>
				rule.required().error('Inserisci il titolo del sito.'),
		}),
		defineField({
			name: 'logo',
			title: 'Logo del sito',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'aboutUsText',
			title: 'Testo “Chi siamo”',
			description: 'Testo principale mostrato nella homepage.',
			type: 'array',
			validation: (rule) =>
				rule.required().error('Inserisci il testo “Chi siamo”.'),
			of: [simpleTextBlock],
		}),
		defineField({
			name: 'licenseText',
			title: 'Testo della licenza',
			description: 'Testo legale o informativo mostrato nel sito.',
			type: 'array',
			validation: (rule) =>
				rule.required().error('Inserisci il testo della licenza.'),
			of: [simpleTextBlock],
		}),
		defineField({
			name: 'contactEmail',
			title: 'Email di contatto',
			type: 'string',
			validation: (rule) =>
				rule
					.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
					.warning('Inserisci un indirizzo email valido.'),
		}),
		defineField({
			name: 'facebookUrl',
			title: 'URL Facebook',
			type: 'url',
		}),
		defineField({
			name: 'instagramUrl',
			title: 'URL Instagram',
			type: 'url',
		}),
	],
	preview: {
		prepare() {
			return {
				title: 'Impostazioni del sito',
				subtitle: 'Contenuti generali usati in tutto il sito',
			};
		},
	},
});

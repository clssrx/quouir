import { defineField, defineType, defineArrayMember } from 'sanity';
import { ImageIcon, DocumentTextIcon } from '@sanity/icons';

export const postType = defineType({
	name: 'post',
	title: 'Articolo',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: "Titolo dell'articolo",
			description: 'Il titolo principale mostrato sul sito.',
			type: 'string',
			validation: (rule) => rule.required().error('Inserisci un titolo.'),
		}),
		defineField({
			name: 'slug',
			title: 'URL della pagina',
			description:
				"Dopo aver scritto il titolo, clicca su “Generate” per creare automaticamente l'URL.",
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (rule) => rule.required().error('Genera l’URL della pagina.'),
		}),
		defineField({
			name: 'subtitle',
			title: 'Sottotitolo',
			description: 'Breve frase opzionale mostrata sotto il titolo.',
			type: 'string',
		}),
		defineField({
			name: 'author',
			title: 'Autore',
			type: 'reference',
			to: [{ type: 'author' }],
			validation: (rule) => rule.required().error('Seleziona un autore.'),
		}),
		defineField({
			name: 'category',
			title: 'Categoria',
			type: 'reference',
			to: [{ type: 'category' }],
			validation: (rule) => rule.required().error('Seleziona una categoria.'),
		}),
		defineField({
			name: 'publishedAt',
			title: 'Data di pubblicazione',
			description: 'Usata per ordinare gli articoli sul sito.',
			type: 'date',
			initialValue: () => new Date().toISOString().split('T')[0],
			validation: (rule) =>
				rule.required().error('Inserisci una data di pubblicazione.'),
		}),
		defineField({
			name: 'image',
			title: 'Immagine principale',
			description: "Immagine grande mostrata nella pagina dell'articolo.",
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'thumbnailImage',
			title: 'Immagine di anteprima',
			description: 'Immagine piccola usata nelle liste e nelle anteprime.',
			type: 'image',
			options: { hotspot: true },
		}),
		defineField({
			name: 'excerpt',
			title: 'Riassunto breve',
			description: 'Mostrato nelle anteprime. Meglio tenerlo breve.',
			type: 'text',
			rows: 3,
			validation: (rule) =>
				rule.max(500).warning('Meglio restare sotto i 500 caratteri.'),
		}),
		defineField({
			name: 'body',
			title: "Contenuto dell'articolo",
			type: 'array',
			validation: (rule) =>
				rule.required().error("Inserisci il contenuto dell'articolo."),
			of: [
				defineArrayMember({
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
							{ title: 'Codice', value: 'code' },
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
							{
								name: 'footnote',
								title: 'Nota a piè di pagina',
								type: 'object',
								icon: DocumentTextIcon,
								fields: [
									defineField({
										name: 'text',
										title: 'Testo della nota',
										type: 'text',
										rows: 3,
									}),
									defineField({
										name: 'id',
										title: 'ID nota',
										type: 'string',
										description:
											'Identificativo unico per questa nota, per esempio “nota-1”.',
									}),
								],
							},
						],
					},
				}),
				defineArrayMember({
					type: 'image',
					title: 'Immagine',
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

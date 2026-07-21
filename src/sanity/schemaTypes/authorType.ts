import { defineType, defineField } from 'sanity';

export const authorType = defineType({
	name: 'author',
	title: 'Autore',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: "Nome dell'autorx",
			type: 'string',
			validation: (rule) =>
				rule.required().error("Inserisci il nome dell'autore / autor3"),
		}),
		defineField({
			name: 'slug',
			title: 'URL autor3 / autor3',
			description: 'Viene generato automaticamente dal nome.',
			type: 'slug',
			options: { source: 'name', maxLength: 96 },
			validation: (rule) =>
				rule.required().error("Genera l'URL dell'autorə / autor3"),
		}),
		defineField({
			name: 'bio',
			title: 'Breve biografia',
			description: "Una breve descrizione dell'autorə / autor3 (opzionale).",
			type: 'text',
			rows: 4,
		}),
		defineField({
			name: 'image',
			title: "Foto dell'autor3",
			description: "Immagine profilo dell'autorə / autor3.",
			type: 'image',
			options: { hotspot: true },
			fields: [
				defineField({
					name: 'alt',
					title: 'Testo alternativo',
					type: 'string',
					description:
						"Descrizione dell'immagine per migliorare l'accessibilità.",
				}),
			],
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

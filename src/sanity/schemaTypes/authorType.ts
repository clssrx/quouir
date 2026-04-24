import { defineType, defineField } from 'sanity';

export const authorType = defineType({
	name: 'author',
	title: 'Autore',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Nome dell’autore',
			type: 'string',
			validation: (rule) =>
				rule.required().error('Inserisci il nome dell’autore'),
		}),
		defineField({
			name: 'slug',
			title: 'URL autore',
			description: 'Viene generato automaticamente dal nome.',
			type: 'slug',
			options: { source: 'name', maxLength: 96 },
			validation: (rule) => rule.required().error('Genera l’URL dell’autore'),
		}),
		defineField({
			name: 'bio',
			title: 'Breve biografia',
			description: "Una breve descrizione dell'autore (opzionale).",
			type: 'text',
			rows: 4,
		}),
		defineField({
			name: 'image',
			title: 'Foto dell’autore',
			description: 'Immagine profilo dell’autore.',
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

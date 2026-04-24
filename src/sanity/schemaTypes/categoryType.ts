import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
	name: 'category',
	title: 'Categoria',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Nome della categoria',
			type: 'string',
			validation: (rule) =>
				rule.required().error('Inserisci un nome per la categoria'),
		}),
		defineField({
			name: 'slug',
			title: 'URL della categoria',
			description: 'Viene generato automaticamente dal nome della categoria.',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (rule) =>
				rule.required().error('Genera l’URL della categoria'),
		}),
		defineField({
			name: 'description',
			title: 'Descrizione',
			description: 'Nota interna o breve descrizione pubblica (opzionale).',
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

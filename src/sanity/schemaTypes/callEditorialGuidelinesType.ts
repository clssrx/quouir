import { defineArrayMember, defineField, defineType } from 'sanity';

const contributionContentBlock = defineArrayMember({
	type: 'block',

	styles: [
		{
			title: 'Testo normale',
			value: 'normal',
		},
	],

	lists: [
		{
			title: 'Elenco puntato',
			value: 'bullet',
		},
	],

	marks: {
		decorators: [
			{
				title: 'Grassetto',
				value: 'strong',
			},
			{
				title: 'Corsivo',
				value: 'em',
			},
		],

		annotations: [],
	},
});

/**
 * Used for footnote and bibliography examples.
 *
 * Lists and headings are excluded because each example
 * is rendered as a single editorial entry.
 */
const editorialExampleBlock = defineArrayMember({
	type: 'block',

	styles: [
		{
			title: 'Testo normale',
			value: 'normal',
		},
	],

	lists: [],

	marks: {
		decorators: [
			{
				title: 'Grassetto',
				value: 'strong',
			},
			{
				title: 'Corsivo',
				value: 'em',
			},
		],

		annotations: [],
	},
});

const contributionTypeMember = defineArrayMember({
	name: 'contributionType',
	title: 'Tipologia di contributo',
	type: 'object',

	fields: [
		defineField({
			name: 'title',
			title: 'Titolo',
			type: 'string',

			validation: (rule) =>
				rule.required().error('Inserisci il titolo della tipologia.'),
		}),

		defineField({
			name: 'content',
			title: 'Contenuto',
			description:
				'Puoi usare paragrafi, elenchi puntati, grassetto e corsivo.',

			type: 'array',
			of: [contributionContentBlock],

			validation: (rule) =>
				rule.required().min(1).error('Inserisci il contenuto della tipologia.'),
		}),
	],

	preview: {
		select: {
			title: 'title',
		},
	},
});

const editorialRuleMember = defineArrayMember({
	name: 'editorialRule',
	title: 'Norma editoriale',
	type: 'object',

	fields: [
		defineField({
			name: 'text',
			title: 'Testo',
			type: 'text',
			rows: 3,

			validation: (rule) =>
				rule.required().error('Inserisci il testo della norma.'),
		}),
	],

	preview: {
		select: {
			title: 'text',
		},
	},
});

const editorialExampleMember = defineArrayMember({
	name: 'editorialExample',
	title: 'Esempio editoriale',
	type: 'object',

	fields: [
		defineField({
			name: 'editorLabel',
			title: 'Nome interno',
			description:
				'Serve per riconoscere l’elemento nello Studio. Non viene mostrato sul sito.',

			type: 'string',

			validation: (rule) => rule.required().error('Inserisci un nome interno.'),
		}),

		defineField({
			name: 'content',
			title: 'Contenuto',
			description:
				'Puoi usare grassetto e corsivo per mantenere la formattazione editoriale.',

			type: 'array',
			of: [editorialExampleBlock],

			validation: (rule) =>
				rule.required().min(1).error('Inserisci il contenuto dell’esempio.'),
		}),
	],

	preview: {
		select: {
			title: 'editorLabel',
		},
	},
});

export const callEditorialGuidelinesType = defineType({
	name: 'callEditorialGuidelines',
	title: 'Call e norme editoriali',
	type: 'document',

	groups: [
		{
			name: 'introduction',
			title: 'Introduzione',
			default: true,
		},
		{
			name: 'guidelines',
			title: 'Call e norme',
		},
		{
			name: 'examples',
			title: 'Esempi editoriali',
		},
		{
			name: 'english',
			title: 'Versione inglese',
		},
	],

	fields: [
		defineField({
			name: 'introLead',
			title: 'Introduzione principale',
			type: 'text',
			rows: 3,
			group: 'introduction',

			validation: (rule) =>
				rule.required().error('Inserisci il testo introduttivo principale.'),
		}),

		defineField({
			name: 'introSupportingText',
			title: 'Introduzione secondaria',
			type: 'text',
			rows: 3,
			group: 'introduction',

			validation: (rule) =>
				rule.required().error('Inserisci il testo introduttivo secondario.'),
		}),

		defineField({
			name: 'submissionLabel',
			title: 'Titolo invio contributi',
			type: 'string',
			group: 'introduction',

			validation: (rule) =>
				rule
					.required()
					.error('Inserisci il titolo per l’invio dei contributi.'),
		}),

		defineField({
			name: 'submissionEmail',
			title: 'Email per l’invio dei contributi',
			type: 'string',
			group: 'introduction',

			validation: (rule) =>
				rule
					.required()
					.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
					.error('Inserisci un indirizzo email valido.'),
		}),

		defineField({
			name: 'submissionNote',
			title: 'Nota sulla pubblicazione',
			type: 'text',
			rows: 3,
			group: 'introduction',

			validation: (rule) =>
				rule.required().error('Inserisci la nota sulla pubblicazione.'),
		}),

		defineField({
			name: 'researchFields',
			title: 'Ambiti di interesse',
			description: 'Puoi aggiungere, eliminare e riordinare gli ambiti.',

			type: 'array',
			group: 'guidelines',

			of: [
				defineArrayMember({
					type: 'string',
				}),
			],

			validation: (rule) =>
				rule
					.required()
					.min(1)
					.unique()
					.error('Inserisci almeno un ambito di interesse.'),
		}),

		defineField({
			name: 'acceptedLanguages',
			title: 'Lingue accettate',
			description: 'Le lingue vengono mostrate sul sito nello stesso ordine.',

			type: 'array',
			group: 'guidelines',

			of: [
				defineArrayMember({
					type: 'string',
				}),
			],

			validation: (rule) =>
				rule.required().min(1).unique().error('Inserisci almeno una lingua.'),
		}),

		defineField({
			name: 'contributionTypes',
			title: 'Tipologie di contributi',
			description:
				'La numerazione sul sito viene generata automaticamente in base all’ordine degli elementi.',

			type: 'array',
			group: 'guidelines',
			of: [contributionTypeMember],

			validation: (rule) =>
				rule
					.required()
					.min(1)
					.error('Inserisci almeno una tipologia di contributo.'),
		}),

		defineField({
			name: 'editorialRules',
			title: 'Norme editoriali',
			description:
				'La numerazione sul sito viene generata automaticamente in base all’ordine delle norme.',

			type: 'array',
			group: 'guidelines',
			of: [editorialRuleMember],

			validation: (rule) =>
				rule.required().min(1).error('Inserisci almeno una norma editoriale.'),
		}),

		defineField({
			name: 'footnoteExamples',
			title: 'Esempi note a piè di pagina',
			description:
				'La numerazione sul sito viene generata automaticamente in base all’ordine degli esempi.',

			type: 'array',
			group: 'examples',
			of: [editorialExampleMember],

			validation: (rule) =>
				rule.required().min(1).error('Inserisci almeno un esempio.'),
		}),

		defineField({
			name: 'bibliographyIntro',
			title: 'Introduzione alla bibliografia',
			type: 'text',
			rows: 5,
			group: 'examples',

			validation: (rule) =>
				rule.required().error('Inserisci le indicazioni per la bibliografia.'),
		}),

		defineField({
			name: 'bibliographyExamples',
			title: 'Esempi bibliografia',
			description:
				'La numerazione sul sito viene generata automaticamente in base all’ordine degli esempi.',

			type: 'array',
			group: 'examples',
			of: [editorialExampleMember],

			validation: (rule) =>
				rule.required().min(1).error('Inserisci almeno un esempio.'),
		}),

		defineField({
			name: 'englishDescription',
			title: 'Descrizione versione inglese',
			type: 'text',
			rows: 3,
			group: 'english',

			validation: (rule) =>
				rule
					.required()
					.error('Inserisci la descrizione della versione inglese.'),
		}),

		defineField({
			name: 'englishPdf',
			title: 'PDF in inglese',
			description:
				'Carica il PDF contenente la versione inglese della call e delle norme editoriali.',

			type: 'file',
			group: 'english',

			options: {
				accept: 'application/pdf',
			},

			validation: (rule) => rule.required().error('Carica il PDF in inglese.'),
		}),

		defineField({
			name: 'englishLinkLabel',
			title: 'Testo del link PDF',
			type: 'string',
			group: 'english',

			validation: (rule) =>
				rule.required().error('Inserisci il testo del link.'),
		}),
	],

	preview: {
		prepare() {
			return {
				title: 'Call e norme editoriali',
				subtitle: 'Contenuti della pagina',
			};
		},
	},
});

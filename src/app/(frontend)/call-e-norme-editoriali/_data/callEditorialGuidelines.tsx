import type { ReactNode } from 'react';

export type ContributionType = {
	title: string;
	description?: string;
	requirements?: string[];
};

export type TextExample = {
	id: string;
	content: ReactNode;
};

export const researchFields = [
	'Body Studies',
	'Cultural Studies',
	'Ecologia e antispecismo',
	'Femminismi',
	'Fenomenologia',
	'Filosofie e teorie critiche contemporanee',
	'Gender Studies',
	'Literary Studies',
	'Postcolonial Studies',
	'Postumanesimo',
	'Psicoanalisi',
	'Queer Theories',
	'Sexuality Studies',
	'Transfemminismo',
	'Transumanesimo',
];

export const contributionTypes: ContributionType[] = [
	{
		title: 'Papers',
		requirements: [
			'Abstract in inglese di max 1.000 caratteri, spazi inclusi',
			'Cinque keywords in inglese',
			'Testo di max 20.000 caratteri, spazi inclusi, comprensivo di note e bibliografia',
			'Breve biografia di chi presenta il contributo',
		],
	},
	{
		title: 'Recensioni',
		requirements: [
			'Testo di max 15.000 caratteri, spazi inclusi, comprensivo di note e bibliografia',
			'Breve biografia di chi presenta il contributo',
		],
	},
	{
		title: 'Interviste',
		requirements: [
			'Testo di max 20.000 caratteri, spazi inclusi, comprensivo di note e bibliografia',
			'Breve biografia di chi presenta il contributo',
			'Oltre al testo scritto, è possibile presentare materiale audiovisivo',
		],
	},
	{
		title: 'Traduzioni',
		description:
			'Si tratta di testi senza un limite di caratteri, purché riguardino articoli, brevi saggi o libri inediti in italiano. Anche per le traduzioni è prevista una breve biografia di chi presenta il contributo.',
	},
	{
		title: 'Materiali',
		description:
			'Si tratta di una sezione che ospita scritture sperimentali, come testi in prosa, poesie, materiale audiovisivo, fotografie, collage ecc. a tema libero. Per quanto riguarda i testi, non è previsto un limite di caratteri, né è richiesto che ci si attenga alle retoriche e alle logiche argomentative della cosiddetta “produzione accademica”. Ogni materiale deve essere corredato da una spiegazione di max 500 caratteri e da una breve biografia di chi presenta il contributo.',
	},
];

export const editorialRules = [
	'Formato: .doc o .docx.',
	'Interlinea: 1.5.',
	'Font: Times New Roman.',
	'Dimensioni del font: 12, giustificato.',
	'Margini: 3 cm.',
	'La prima riga di ciascun capoverso va fatta rientrare di 0.5 cm, eccetto per la prima riga di ogni paragrafo e per quella dopo una citazione corpo a parte.',
	'Ogni pagina va numerata. Il numero va posizionato in basso, al centro, dimensioni 10.',
	'Citazioni: virgolette basse («…»). Usare le virgolette alte (“…”) solo per includere una citazione dentro a una citazione o per enfatizzare una o più parole.',
	'La punteggiatura viene sempre dopo le virgolette.',
	'Le citazioni che superano le tre righe vanno staccate dal testo: dimensioni 10, rientro di 0.5 cm sia a destra che a sinistra, interlinea singola.',
	'Dimensioni del font per le note a piè di pagina: Times New Roman 10, interlinea singola, la prima riga va fatta rientrare di 0.5 cm.',
];

export const footnoteExamples: TextExample[] = [
	{
		id: 'footnote-monografie-title',
		content: <strong className='text-gray-100'>Monografie</strong>,
	},
	{
		id: 'butler-footnote',
		content: (
			<>
				J. Butler,{' '}
				<em>
					Questione di genere. Il femminismo e la sovversione dell’identità
				</em>
				, tr. it. di S. Adamo, Laterza, Roma-Bari 2022, p. 125.
			</>
		),
	},
	{
		id: 'sedgwick-footnote',
		content: (
			<>
				E. Kosofsky Sedgwick, <em>Queer e ora!</em>, in E.A.G. Arfini, C. Lo
				Iacono (a cura di), <em>Canone inverso. Antologia di teoria queer</em>,
				ETS, Pisa 2012, pp. 155-200.
			</>
		),
	},
	{
		id: 'footnote-articles-title',
		content: <strong className='text-gray-100'>Articoli di riviste</strong>,
	},
	{
		id: 'almeida-footnote',
		content: (
			<>
				M.W.B. de Almeida, <em>Is there mathematics in the forest?</em>, in
				«Hau: Journal of Ethnographic Theory», vol. 9, n. 1., 2019, pp. 86-98.
			</>
		),
	},
];

export const bibliographyExamples: TextExample[] = [
	{
		id: 'butler-bibliography',
		content: (
			<>
				Butler J.,{' '}
				<em>
					Questione di genere. Il femminismo e la sovversione dell’identità
				</em>
				, tr. it. di S. Adamo, Laterza, Roma-Bari 2022.
			</>
		),
	},
	{
		id: 'almeida-bibliography',
		content: (
			<>
				De Almeida M.W.B., <em>Is there mathematics in the forest?</em>, in
				«Hau: Journal of Ethnographic Theory», vol. 9, n. 1., 2019, pp. 86-98.
			</>
		),
	},
	{
		id: 'sedgwick-bibliography',
		content: (
			<>
				Kosofsky Sedgwick E., <em>Queer e ora!</em>, in E.A.G. Arfini, C. Lo
				Iacono (a cura di), <em>Canone inverso. Antologia di teoria queer</em>,
				ETS, Pisa 2012, pp. 155-200.
			</>
		),
	},
];

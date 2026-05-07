const researchFields = [
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

const contributionTypes = [
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

const editorialRules = [
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

export function CallEditorialGuidelinesPage() {
	return (
		<main
			className='mx-auto w-full max-w-4xl px-4 py-2 sm:px-6'
			aria-labelledby='call-editorial-guidelines-heading'
		>
			<article className='space-y-14'>
				<header className='max-w-3xl space-y-6'>
					<h1
						id='call-editorial-guidelines-heading'
						className='text-3xl font-bold leading-tight uppercase sm:text-4xl'
					>
						Call e norme editoriali
					</h1>

					<p className='text-lg leading-relaxed text-gray-100'>
						QU'OUÏR accoglie varie tipologie di contributi per le quali prevede
						una call sempre aperta.
					</p>

					<p className='leading-relaxed text-gray-300'>
						Le proposte devono rivestire un particolare interesse per il
						dibattito contemporaneo e riguardare uno o più dei campi indicati.
					</p>

					<div className='rounded-2xl border border-white/15 p-5'>
						<p className='text-sm uppercase tracking-wide text-gray-400'>
							Invio contributi
						</p>

						<a
							href='mailto:contatti@quouir.com'
							className='mt-2 inline-block text-lg underline underline-offset-4 transition hover:text-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
						>
							contatti@quouir.com
						</a>

						<p className='mt-3 text-sm leading-relaxed text-gray-300'>
							Una volta accettati, i contributi saranno pubblicati sul sito e
							sui social network di competenza.
						</p>
					</div>
				</header>

				<section aria-labelledby='fields-heading' className='space-y-5'>
					<h2 id='fields-heading' className='text-2xl font-semibold uppercase'>
						Ambiti di interesse
					</h2>

					<ul className='flex flex-wrap gap-2'>
						{researchFields.map((field) => (
							<li
								key={field}
								className='rounded-full border border-white/15 px-3 py-1 text-sm text-gray-100'
							>
								{field}
							</li>
						))}
					</ul>
				</section>

				<section aria-labelledby='languages-heading' className='space-y-3'>
					<h2
						id='languages-heading'
						className='text-2xl font-semibold uppercase'
					>
						Lingue accettate
					</h2>

					<p className='text-gray-100'>
						Italiano, inglese, francese, spagnolo.
					</p>
				</section>

				<section aria-labelledby='types-heading' className='space-y-6'>
					<h2 id='types-heading' className='text-2xl font-semibold uppercase'>
						Tipologie di contributi
					</h2>

					<div className='grid gap-5 md:grid-cols-2'>
						{contributionTypes.map((type) => (
							<section
								key={type.title}
								className='rounded-2xl border border-white/15 p-5'
								aria-labelledby={`${type.title}-heading`}
							>
								<h3
									id={`${type.title}-heading`}
									className='text-xl font-semibold'
								>
									{type.title}
								</h3>

								{type.description && (
									<p className='mt-3 leading-relaxed text-gray-300'>
										{type.description}
									</p>
								)}

								{type.requirements && (
									<ul className='mt-4 list-disc space-y-2 pl-5 text-gray-300'>
										{type.requirements.map((requirement) => (
											<li key={requirement}>{requirement}</li>
										))}
									</ul>
								)}
							</section>
						))}
					</div>
				</section>

				<section aria-labelledby='rules-heading' className='space-y-6'>
					<h2 id='rules-heading' className='text-2xl font-semibold uppercase'>
						Norme editoriali
					</h2>

					<ul className='space-y-3 leading-relaxed text-gray-300'>
						{editorialRules.map((rule) => (
							<li key={rule} className='border-b border-white/10 pb-3'>
								{rule}
							</li>
						))}
					</ul>
				</section>

				<section aria-labelledby='notes-heading' className='space-y-5'>
					<h2 id='notes-heading' className='text-2xl font-semibold uppercase'>
						Note a piè di pagina
					</h2>

					<div className='space-y-4 rounded-2xl border border-white/15 p-5 text-sm leading-relaxed text-gray-300'>
						<p>
							<strong className='text-gray-100'>Monografie</strong>
						</p>

						<p>
							J. Butler,{' '}
							<em>
								Questione di genere. Il femminismo e la sovversione
								dell’identità
							</em>
							, tr. it. di S. Adamo, Laterza, Roma-Bari 2022, p. 125.
						</p>

						<p>
							E. Kosofsky Sedgwick, <em>Queer e ora!</em>, in E.A.G. Arfini, C.
							Lo Iacono (a cura di),{' '}
							<em>Canone inverso. Antologia di teoria queer</em>, ETS, Pisa
							2012, pp. 155-200.
						</p>

						<p>
							<strong className='text-gray-100'>Articoli di riviste</strong>
						</p>

						<p>
							M.W.B. de Almeida, <em>Is there mathematics in the forest?</em>,
							in «Hau: Journal of Ethnographic Theory», vol. 9, n. 1., 2019, pp.
							86-98.
						</p>
					</div>
				</section>

				<section aria-labelledby='bibliography-heading' className='space-y-5'>
					<h2
						id='bibliography-heading'
						className='text-2xl font-semibold uppercase'
					>
						Bibliografia
					</h2>

					<p className='leading-relaxed text-gray-300'>
						La bibliografia va organizzata come le note a piè di pagina, eccetto
						per il fatto che il nome deve seguire il cognome; il rientro deve
						essere sporgente di 0,5 cm; l’interlinea deve essere di 1,5. I
						riferimenti vanno messi in ordine alfabetico.
					</p>

					<div className='space-y-4 rounded-2xl border border-white/15 p-5 text-sm leading-relaxed text-gray-300'>
						<p>
							Butler J.,{' '}
							<em>
								Questione di genere. Il femminismo e la sovversione
								dell’identità
							</em>
							, tr. it. di S. Adamo, Laterza, Roma-Bari 2022.
						</p>

						<p>
							De Almeida M.W.B., <em>Is there mathematics in the forest?</em>,
							in «Hau: Journal of Ethnographic Theory», vol. 9, n. 1., 2019, pp.
							86-98.
						</p>

						<p>
							Kosofsky Sedgwick E., <em>Queer e ora!</em>, in E.A.G. Arfini, C.
							Lo Iacono (a cura di),{' '}
							<em>Canone inverso. Antologia di teoria queer</em>, ETS, Pisa
							2012, pp. 155-200.
						</p>
					</div>
				</section>

				<section
					aria-labelledby='english-pdf-heading'
					className='rounded-2xl border border-white/15 p-5'
				>
					<h2
						id='english-pdf-heading'
						className='text-xl font-semibold uppercase'
					>
						English version
					</h2>

					<p className='mt-3 leading-relaxed text-gray-300'>
						The call and the editorial standards are available in English by
						downloading the following PDF.
					</p>

					<a
						href='/pdf/call-editorial-standards-en.pdf'
						className='mt-5 inline-block rounded-full border border-white/20 px-5 py-2 text-sm uppercase tracking-wide transition hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
					>
						Download the English call and editorial standards PDF
					</a>
				</section>
			</article>
		</main>
	);
}

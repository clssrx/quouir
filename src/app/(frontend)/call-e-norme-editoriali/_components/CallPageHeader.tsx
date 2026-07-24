export const CallPageHeader = () => {
	return (
		<header className='max-w-3xl space-y-6'>
			<h1
				id='call-editorial-guidelines-heading'
				className='text-3xl font-bold leading-tight uppercase sm:text-4xl'
			>
				Call e norme editoriali
			</h1>

			<p className='text-lg leading-relaxed text-gray-100'>
				QU&apos;OUÏR accoglie varie tipologie di contributi per le quali prevede
				una call sempre aperta.
			</p>

			<p className='leading-relaxed text-gray-300'>
				Le proposte devono rivestire un particolare interesse per il dibattito
				contemporaneo e riguardare uno o più dei campi indicati.
			</p>

			<div className='rounded-2xl border border-white/15 p-5'>
				<p className='text-sm uppercase tracking-wide text-gray-400'>
					Invio contributi
				</p>

				<a
					href='mailto:contatti@quouir.com'
					className='mt-2 inline-block text-lg underline underline-offset-4 transition hover:text-gray-300 focus-visible:outline-2 focus-visible:outline-offset-4'
				>
					contatti@quouir.com
				</a>

				<p className='mt-3 text-sm leading-relaxed text-gray-300'>
					Una volta accettati, i contributi saranno pubblicati sul sito e sui
					social network di competenza.
				</p>
			</div>
		</header>
	);
};

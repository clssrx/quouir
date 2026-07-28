export const CallPageHeader = () => {
	return (
		<header className='pb-8 md:pb-14'>
			<h1
				id='call-editorial-guidelines-heading'
				className='max-w-6xl wrap-break-word text-[clamp(2.75rem,12vw,8rem)] font-semibold uppercase leading-[0.82] tracking-[-0.055em] md:leading-[0.8] md:tracking-[-0.06em]'
			>
				Call e norme editoriali
			</h1>

			<div className='mt-8 grid gap-8 md:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] lg:gap-16'>
				<div className='max-w-3xl'>
					<p className='text-xl leading-[1.2] tracking-[-0.025em] sm:text-2xl md:text-3xl'>
						QU&apos;OUÏR accoglie varie tipologie di contributi per le quali
						prevede una call sempre aperta.
					</p>

					<p className='mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg md:mt-6'>
						Le proposte devono rivestire un particolare interesse per il
						dibattito contemporaneo e riguardare uno o più dei campi indicati.
					</p>
				</div>

				<div className='min-w-0 border-t border-white/15 pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6'>
					<p className='font-mono text-xs uppercase tracking-[0.12em] text-white/45'>
						Invio contributi
					</p>

					<a
						href='mailto:contatti@quouir.com'
						className='mt-4 inline-block max-w-full break-all text-lg tracking-[-0.02em] transition-colors hover:text-purple-300 active:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-xl md:text-2xl'
					>
						contatti@quouir.com
					</a>

					<p className='mt-4 max-w-md text-sm leading-relaxed text-white/55 md:mt-5'>
						Una volta accettati, i contributi saranno pubblicati sul sito e sui
						social network di competenza.
					</p>
				</div>
			</div>
		</header>
	);
};

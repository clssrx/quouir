export const CallPageHeader = () => {
	return (
		<header className='pb-10 md:pb-14'>
			<h1
				id='call-editorial-guidelines-heading'
				className='max-w-6xl text-[clamp(3.5rem,9vw,8rem)] font-semibold uppercase leading-[0.8] tracking-[-0.06em]'
			>
				Call e norme editoriali
			</h1>

			<div className='mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] lg:gap-16'>
				<div className='max-w-3xl'>
					<p className='text-2xl leading-[1.2] tracking-[-0.025em] md:text-3xl'>
						QU&apos;OUÏR accoglie varie tipologie di contributi per le quali
						prevede una call sempre aperta.
					</p>

					<p className='mt-6 max-w-2xl text-lg leading-relaxed text-white/65'>
						Le proposte devono rivestire un particolare interesse per il
						dibattito contemporaneo e riguardare uno o più dei campi indicati.
					</p>
				</div>

				<div className='border-t border-white/15 pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6'>
					<p className='font-mono text-xs uppercase tracking-[0.12em] text-white/45'>
						Invio contributi
					</p>

					<a
						href='mailto:contatti@quouir.com'
						className='mt-4 inline-block text-xl tracking-[-0.02em] transition-colors hover:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-4 md:text-2xl'
					>
						contatti@quouir.com
					</a>

					<p className='mt-5 max-w-md text-sm leading-relaxed text-white/55'>
						Una volta accettati, i contributi saranno pubblicati sul sito e sui
						social network di competenza.
					</p>
				</div>
			</div>
		</header>
	);
};

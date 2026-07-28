import Link from 'next/link';

export default function NotFound() {
	return (
		<main className='flex min-h-[calc(100dvh-3.5rem)] flex-col py-8 md:min-h-screen md:py-10'>
			<p className='font-mono text-xs uppercase tracking-[0.14em] text-white/40'>
				Errore / 404
			</p>

			<div className='mt-6'>
				<p
					aria-hidden='true'
					className='text-[clamp(7rem,28vw,22rem)] font-semibold leading-[0.7] tracking-[-0.08em] text-purple-300'
				>
					404
				</p>
			</div>

			<div className='mt-10 border-t border-white/15 pt-6 md:mt-14'>
				<div className='grid gap-6 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-6'>
					<span className='font-mono text-xs text-white/35'>00</span>

					<div className='max-w-2xl'>
						<h1 className='text-3xl font-medium leading-[0.95] tracking-[-0.035em] md:text-5xl'>
							Qui non c&apos;è niente.
						</h1>

						<p className='mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg'>
							La pagina che stai cercando non è disponibile.
						</p>

						<Link
							href='/'
							className='mt-8 inline-flex font-mono text-xs uppercase tracking-[0.08em] transition-colors hover:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-4'
						>
							01 / Torna alla home
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}

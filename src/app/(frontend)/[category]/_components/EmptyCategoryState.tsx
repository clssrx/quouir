import Link from 'next/link';

export const EmptyCategoryState = () => {
	return (
		<section
			className='border-b border-white/15 py-8 md:py-12'
			aria-labelledby='empty-category-heading'
		>
			<div className='grid gap-6 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-6'>
				<span className='font-mono text-xs text-white/35'>00</span>

				<div className='max-w-2xl'>
					<h2
						id='empty-category-heading'
						className='text-3xl font-medium leading-[0.95] tracking-[-0.035em] md:text-4xl'
					>
						Nessun contenuto in questa sezione.
					</h2>

					<p className='mt-5 text-base leading-relaxed text-white/60 md:text-lg'>
						Non ci sono ancora contenuti pubblicati.
					</p>

					<Link
						href='/'
						className='mt-8 inline-flex font-mono text-xs uppercase tracking-[0.08em] transition-colors hover:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-4'
					>
						← Torna alla home
					</Link>
				</div>
			</div>
		</section>
	);
};

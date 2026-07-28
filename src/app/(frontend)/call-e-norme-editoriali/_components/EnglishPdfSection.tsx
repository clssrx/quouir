export const EnglishPdfSection = () => {
	return (
		<section
			aria-labelledby='english-pdf-heading'
			className='grid gap-5 py-8 md:grid-cols-[3rem_14rem_minmax(0,1fr)] md:gap-6 md:py-10'
		>
			<span className='font-mono text-xs text-white/35'>07</span>

			<h2
				id='english-pdf-heading'
				className='text-lg font-medium uppercase leading-tight tracking-[-0.02em] md:text-xl'
			>
				English version
			</h2>

			<div className='max-w-2xl'>
				<p className='leading-relaxed text-white/65'>
					The call and the editorial standards are available in English by
					downloading the following PDF.
				</p>

				<a
					href='/pdf/call-editorial-standards-en.pdf'
					className='mt-6 inline-flex items-baseline gap-3 border-b border-white/30 pb-1 font-mono text-sm uppercase tracking-[0.06em] transition-colors hover:border-purple-300 hover:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-4'
				>
					Download PDF
					<span aria-hidden='true'>↗</span>
				</a>
			</div>
		</section>
	);
};

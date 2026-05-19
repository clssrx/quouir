export const EnglishPdfSection = () => {
	return (
		<section
			aria-labelledby='english-pdf-heading'
			className='rounded-2xl border border-white/15 p-5'
		>
			<h2 id='english-pdf-heading' className='text-xl font-semibold uppercase'>
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
	);
};

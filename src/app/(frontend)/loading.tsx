export default function Loading() {
	return (
		<main className='py-8 md:py-10' aria-busy='true'>
			<p className='font-mono text-xs uppercase tracking-[0.08em] text-white/60'>
				Caricamento
			</p>

			<div className='mt-4 h-px w-full overflow-hidden bg-white/15'>
				<div className='h-full w-1/3 animate-pulse bg-purple-300' />
			</div>
		</main>
	);
}

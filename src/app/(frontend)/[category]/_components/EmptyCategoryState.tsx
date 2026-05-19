import Link from 'next/link';

export const EmptyCategoryState = () => {
	return (
		<main
			className='mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6'
			aria-labelledby='no-posts-heading'
		>
			<h1
				id='no-posts-heading'
				className='text-2xl font-semibold leading-tight sm:text-3xl'
			>
				Non ci sono ancora articoli in questa categoria.
			</h1>

			<p className='mt-3 text-gray-300'>
				Torna alla homepage per esplorare gli altri contenuti.
			</p>

			<Link
				href='/'
				className='mt-6 inline-block underline underline-offset-4 transition hover:text-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
			>
				Torna alla homepage
			</Link>
		</main>
	);
};

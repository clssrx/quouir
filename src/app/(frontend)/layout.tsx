import { SanityLive } from '@/sanity/lib/live';
import { getAllCategories } from '@/sanity/queries/categories';
import { getLicenseText } from '@/sanity/queries/siteSettings';
import Navbar from './_components/Navbar';
import { Footer } from './_components/Footer';

export default async function FrontendLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [categories, licenseText] = await Promise.all([
		getAllCategories(),
		getLicenseText(),
	]);

	return (
		<>
			<a
				href='#main-content'
				className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:outline-2 focus:outline-offset-2'
			>
				Salta al contenuto principale
			</a>

			<Navbar categories={categories} />

			<div
				id='main-content'
				tabIndex={-1}
				className='mx-auto min-h-screen max-w-5xl px-6'
			>
				{children}
			</div>

			<SanityLive />

			<Footer licenseText={licenseText} />
		</>
	);
}

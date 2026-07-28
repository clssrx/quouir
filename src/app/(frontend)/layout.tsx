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
				className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:outline-2 focus:outline-offset-2'
			>
				Salta al contenuto principale
			</a>

			<Navbar categories={categories} />

			<div className='md:pl-64'>
				<div
					id='main-content'
					tabIndex={-1}
					className='min-h-screen px-4 sm:px-6 md:px-8 lg:px-12'
				>
					{children}
				</div>

				<SanityLive />

				<Footer licenseText={licenseText} />
			</div>
		</>
	);
}

import { SanityLive } from '@/sanity/lib/live';
import { getAllCategories } from '@/sanity/queries/categories';
import { getLicenseText } from '@/sanity/queries/siteSettings';
import { PortableText, PortableTextBlock } from 'next-sanity';
import Navbar from '@/components/Navbar';
import {
	linkClasses,
	portableTextComponents,
} from '@/components/portable-text/PortableTextComponents';

export default async function FrontendLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [categories, data] = await Promise.all([
		getAllCategories(),
		getLicenseText(),
	]);

	const licenseText = data?.licenseText;

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

const Footer = ({ licenseText }: { licenseText?: PortableTextBlock[] }) => {
	return (
		<footer
			className='mt-4 border-t border-white/10'
			aria-label='Informazioni sul sito'
		>
			<div className='mx-auto max-w-3xl px-6 py-8 text-center'>
				<p className='text-sm text-white/60'>
					© {new Date().getFullYear()} QU&apos;OUÏR
				</p>

				<div className='mt-4 text-center text-sm leading-relaxed text-white/70 sm:text-center'>
					{licenseText ? (
						<PortableText
							value={licenseText}
							components={portableTextComponents}
						/>
					) : (
						<p>
							I contenuti sono distribuiti con licenza{' '}
							<a
								href='https://creativecommons.org/licenses/by-nc-nd/4.0/'
								target='_blank'
								rel='noopener noreferrer'
								className={linkClasses}
							>
								Creative Commons BY-NC-ND 4.0
								<span className='sr-only'>, si apre in una nuova scheda</span>
							</a>
							. Uso non commerciale. Opere derivate non consentite.
						</p>
					)}
				</div>
			</div>
		</footer>
	);
};

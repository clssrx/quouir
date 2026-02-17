import { SanityLive } from '@/sanity/lib/live';
import { getLicenseText } from '@/sanity/queries/siteSettings';
import { PortableText, PortableTextBlock } from 'next-sanity';

export default async function FrontendLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const data = await getLicenseText();
	const licenseText = data?.licenseText;

	return (
		<>
			{/* <Navbar /> */}

			<main className='mx-auto max-w-5xl px-6 min-h-screen'>{children}</main>

			<SanityLive />
			<Footer licenseText={licenseText} />
		</>
	);
}

const Footer = ({ licenseText }: { licenseText?: PortableTextBlock[] }) => {
	return (
		<footer className='mt-4 border-t border-white/10'>
			<div className='mx-auto max-w-3xl px-6 py-8 text-center'>
				<p className='text-sm text-white/50'>
					© {new Date().getFullYear()} QU'OUÏR
				</p>

				<div className='mt-4 text-sm text-white/60 leading-relaxed'>
					{licenseText ? (
						<PortableText value={licenseText} />
					) : (
						<p>
							Creative Commons{' '}
							<a
								href='https://creativecommons.org/licenses/by-nc-nd/4.0/'
								target='_blank'
								rel='noopener noreferrer'
								className='underline hover:opacity-70 transition'
							>
								BY-NC-ND 4.0
							</a>
							. Non-commercial use. No derivatives.
						</p>
					)}
				</div>
			</div>
		</footer>
	);
};

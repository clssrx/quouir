import { getSiteSettings } from '@/sanity/queries/siteSettings';
import { SITE_SETTINGS_QUERY_RESULT } from '@/sanity/types';
import SocialLinks from './_components/SocialLinks';

import { HomeLogo } from './_components/HomeLogo';
import { HomeMainText } from './_components/HomeMainText';

export default async function HomePage() {
	const data: SITE_SETTINGS_QUERY_RESULT | null = await getSiteSettings();

	if (!data) {
		return (
			<main className='min-h-screen px-4 py-12 text-center'>
				<p>Impostazioni del sito non trovate.</p>
			</main>
		);
	}

	const { title, aboutUsText, logo, contactEmail, facebookUrl, instagramUrl } =
		data;

	return (
		<main className='min-h-screen px-4 pb-16 md:pt-2'>
			<section className='mx-auto flex max-w-3xl flex-col items-center gap-8 text-center'>
				<h1 className='text-4xl font-bold uppercase tracking-tight md:text-6xl'>
					{title}
				</h1>

				<HomeLogo logo={logo} />

				<HomeMainText aboutUsText={aboutUsText} />

				<SocialLinks
					contactEmail={contactEmail ?? undefined}
					facebookUrl={facebookUrl ?? undefined}
					instagramUrl={instagramUrl ?? undefined}
				/>
			</section>
		</main>
	);
}

import { getSiteSettings } from '@/sanity/queries/siteSettings';
import type { SITE_SETTINGS_QUERY_RESULT } from '@/sanity/types';

import { HomeLogo } from './_components/HomeLogo';
import { HomeMainText } from './_components/HomeMainText';
import SocialLinks from './_components/SocialLinks';

export default async function HomePage() {
	const data: SITE_SETTINGS_QUERY_RESULT | null = await getSiteSettings();

	if (!data) {
		return (
			<main className='py-12'>
				<p>Impostazioni del sito non trovate.</p>
			</main>
		);
	}

	const {
		title,
		aboutUsText,
		logo,
		contactEmail,
		facebookUrl,
		instagramUrl,
		introText,
	} = data;

	return (
		<main>
			<section className='grid gap-12 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:py-10'>
				<div>
					<h1 className='max-w-5xl text-[clamp(4.5rem,11vw,10rem)] font-semibold uppercase leading-[0.8] tracking-[-0.065em]'>
						{title}
					</h1>

					{introText && (
						<p className='mt-10 max-w-2xl text-2xl leading-[1.1] tracking-[-0.025em] md:text-3xl'>
							{introText}
						</p>
					)}
				</div>

				<HomeLogo logo={logo} />
			</section>

			<section className='border-t border-white/15 py-10 md:py-14'>
				<div className='grid gap-10 lg:grid-cols-[10rem_minmax(0,48rem)]'>
					<h2 className='font-mono text-xs uppercase tracking-[0.14em] text-white/50'>
						{title} ?
					</h2>

					<div>
						<HomeMainText aboutUsText={aboutUsText} />

						<SocialLinks
							contactEmail={contactEmail ?? undefined}
							facebookUrl={facebookUrl ?? undefined}
							instagramUrl={instagramUrl ?? undefined}
						/>
					</div>
				</div>
			</section>
		</main>
	);
}

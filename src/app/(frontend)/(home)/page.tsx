import { getSiteSettings } from '@/sanity/queries/siteSettings';

import { HomeLogo } from './_components/HomeLogo';
import { HomeMainText } from './_components/HomeMainText';
import SocialLinks from './_components/SocialLinks';

import ArchivePostEntry from '@/components/ArchivePostEntry';
import { getLatestPosts } from '@/sanity/queries/posts';

export default async function HomePage() {
	const [data, latestPosts] = await Promise.all([
		getSiteSettings(),
		getLatestPosts(),
	]);

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
			<section className='grid gap-8 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10 md:py-10'>
				<div>
					<h1 className='text-[clamp(3.5rem,16vw,9rem)] font-semibold uppercase leading-[0.8] tracking-[-0.065em]'>
						{title}
					</h1>

					{introText && (
						<p className='mt-7 max-w-2xl text-xl leading-[1.15] tracking-[-0.02em] sm:text-2xl md:mt-10 md:text-3xl lg:text-4xl'>
							{introText}
						</p>
					)}
				</div>

				<HomeLogo logo={logo} />
			</section>

			{latestPosts.length > 0 && (
				<section
					className='border-t border-white/15'
					aria-labelledby='latest-posts-heading'
				>
					<div className='flex items-end justify-between py-4 md:py-5'>
						<h2
							id='latest-posts-heading'
							className='font-mono text-xs uppercase tracking-[0.14em] text-white/50'
						>
							Ultime aggiunte
						</h2>

						<span className='font-mono text-[0.65rem] text-white/60'>
							{String(latestPosts.length).padStart(2, '0')}
						</span>
					</div>

					<ul className='border-b border-white/15'>
						{latestPosts.map((post, index) => (
							<ArchivePostEntry key={post._id} post={post} index={index} />
						))}
					</ul>
				</section>
			)}

			<section className='border-t border-white/15 py-8 md:py-14'>
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

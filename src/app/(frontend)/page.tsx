import Image from 'next/image';
import { PortableText, PortableTextBlock } from 'next-sanity';

import { getSiteSettings } from '@/sanity/queries/siteSettings';
import { SITE_SETTINGS_QUERYResult } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';
import SocialLinks from '@/components/SocialLinks';

export default async function HomePage() {
	const data: SITE_SETTINGS_QUERYResult | null = await getSiteSettings();

	if (!data) {
		return (
			<main className='min-h-screen px-4 py-12 text-center'>
				<p>Impostazioni del sito non trovate.</p>
			</main>
		);
	}

	const { title, aboutUsText, logo, contactEmail, facebookUrl, instagramUrl } =
		data;

	const logoUrl = logo
		? urlFor(logo).width(320).height(320).fit('crop').url()
		: undefined;

	return (
		<main className='min-h-screen px-4 pb-16 md:pt-2 '>
			<section className='mx-auto flex max-w-3xl flex-col items-center gap-8 text-center'>
				<h1 className='text-4xl font-bold tracking-tight md:text-6xl'>
					{title}
				</h1>

				{logoUrl && (
					<div className='overflow-hidden rounded-full  p-2'>
						<Image
							src={logoUrl}
							alt="Logo Qu'ouir"
							width={260}
							height={260}
							priority
							sizes='260px'
							className='rounded-full'
						/>
					</div>
				)}

				<MainText aboutUsText={aboutUsText as PortableTextBlock[]} />

				<SocialLinks
					contactEmail={contactEmail ?? undefined}
					facebookUrl={facebookUrl ?? undefined}
					instagramUrl={instagramUrl ?? undefined}
				/>
			</section>
		</main>
	);
}

const MainText = ({ aboutUsText }: { aboutUsText?: PortableTextBlock[] }) => {
	if (!aboutUsText?.length) {
		return <p className='text-white/60'>About us text not available.</p>;
	}

	return (
		<div className='max-w-3xl text-left text-lg leading-8 text-white/80 md:text-xl md:leading-9'>
			<PortableText
				value={aboutUsText}
				components={{
					block: {
						normal: ({ children }) => (
							<p className='mb-6 text-justify'>{children}</p>
						),
					},
				}}
			/>
		</div>
	);
};

import Image from 'next/image';
import { getSiteSettings } from '@/sanity/queries/siteSettings';
import { SITE_SETTINGS_QUERYResult } from '@/sanity/types';
import { PortableTextBlock } from 'next-sanity';
import { urlFor } from '@/sanity/lib/image';

import SocialLinks from '@/components/SocialLinks';

export default async function HomePage() {
	const data: SITE_SETTINGS_QUERYResult | null = await getSiteSettings();

	//change here for a fallback homepage content if the query fails
	if (!data) {
		return <p>Site settings not found.</p>;
	}

	const { title, aboutUsText, logo, contactEmail, facebookUrl, instagramUrl } =
		data;

	const logoUrl = logo ? urlFor(logo)?.width(250).height(250).url() : undefined;

	return (
		<div className='min-h-screen flex flex-col'>
			<main className='flex-1'>
				<div className='container mx-auto px-4 sm:px-10 py-8 sm:py-[12 1] flex flex-col gap-8 xs:px-8'>
					<h1 className='text-4xl font-bold text-center justify-self-center'>
						{title.toUpperCase()}
					</h1>
					<div className='flex justify-center'>
						{logoUrl && (
							<Image
								src={logoUrl}
								alt={"qu'ouir logo"}
								width={250}
								height={250}
								className='rounded-full'
							/>
						)}
					</div>
					<MainText aboutUsText={aboutUsText as PortableTextBlock[]} />

					<SocialLinks
						contactEmail={contactEmail ?? undefined}
						facebookUrl={facebookUrl ?? undefined}
						instagramUrl={instagramUrl ?? undefined}
					/>
				</div>
			</main>
		</div>
	);
}

const MainText = ({ aboutUsText }: { aboutUsText: PortableTextBlock[] }) => {
	return (
		<div className='flex flex-col gap-6'>
			<p className='max-w-3xl mx-auto text-lg leading-8 text-justify'>
				{aboutUsText ? (
					aboutUsText.map((block, index) => (
						<span key={index}>
							{block.children.map((child) => child.text).join(' ')}
						</span>
					))
				) : (
					<span>About us text not available.</span>
				)}
			</p>
		</div>
	);
};

import Image from 'next/image';

import { urlFor } from '@/sanity/lib/image';
import type { SITE_SETTINGS_QUERY_RESULT } from '@/sanity/types';

type SiteSettings = NonNullable<SITE_SETTINGS_QUERY_RESULT>;

type HomeLogoProps = {
	logo: SiteSettings['logo'];
};

export const HomeLogo = ({ logo }: HomeLogoProps) => {
	if (!logo) return null;

	const logoUrl = urlFor(logo).width(500).height(500).fit('crop').url();

	return (
		<div className='w-40 justify-self-start md:w-52 lg:w-60'>
			<Image
				src={logoUrl}
				alt="Logo QU'OUÏR"
				width={500}
				height={500}
				priority
				sizes='(min-width: 1024px) 240px, (min-width: 768px) 208px, 160px'
				className='h-auto w-full rounded-full'
			/>
		</div>
	);
};

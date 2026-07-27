import Image from 'next/image';

import { urlFor } from '@/sanity/lib/image';
import { SITE_SETTINGS_QUERY_RESULT } from '@/sanity/types';

type SiteSettings = NonNullable<SITE_SETTINGS_QUERY_RESULT>;

type HomeLogoProps = {
	logo: SiteSettings['logo'];
};

export const HomeLogo = ({ logo }: HomeLogoProps) => {
	if (!logo) return null;

	const logoUrl = urlFor(logo).width(320).height(320).fit('crop').url();

	return (
		<div className='overflow-hidden rounded-full p-2'>
			<Image
				src={logoUrl}
				alt={"Logo QU'OUÏR"}
				width={260}
				height={260}
				priority
				sizes='260px'
				className='rounded-full'
			/>
		</div>
	);
};

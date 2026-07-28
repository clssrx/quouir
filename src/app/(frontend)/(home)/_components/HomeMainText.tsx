import { PortableText, PortableTextBlock } from 'next-sanity';

import { SITE_SETTINGS_QUERY_RESULT } from '@/sanity/types';

type SiteSettings = NonNullable<SITE_SETTINGS_QUERY_RESULT>;

type HomeMainTextProps = {
	aboutUsText: SiteSettings['aboutUsText'];
};

const portableTextComponents = {
	block: {
		normal: ({ children }: { children?: React.ReactNode }) => (
			<p className='mb-6'>{children}</p>
		),
	},
};

export const HomeMainText = ({ aboutUsText }: HomeMainTextProps) => {
	if (!aboutUsText?.length) {
		return <p className='text-white/60'>Testo introduttivo non disponibile.</p>;
	}

	return (
		<div className='text-lg leading-[1.55] text-white/80 md:text-xl'>
			<PortableText
				value={aboutUsText as PortableTextBlock[]}
				components={portableTextComponents}
			/>
		</div>
	);
};

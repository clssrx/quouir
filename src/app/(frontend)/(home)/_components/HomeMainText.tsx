import { PortableText, PortableTextBlock } from 'next-sanity';

import { SITE_SETTINGS_QUERY_RESULT } from '@/sanity/types';

type SiteSettings = NonNullable<SITE_SETTINGS_QUERY_RESULT>;

type HomeMainTextProps = {
	aboutUsText: SiteSettings['aboutUsText'];
};

const portableTextComponents = {
	block: {
		normal: ({ children }: { children?: React.ReactNode }) => (
			<p className='mb-6 text-justify'>{children}</p>
		),
	},
};

export const HomeMainText = ({ aboutUsText }: HomeMainTextProps) => {
	if (!aboutUsText?.length) {
		return <p className='text-white/60'>Testo introduttivo non disponibile.</p>;
	}

	return (
		<div className='max-w-3xl text-left text-lg leading-8 text-white/80 md:text-xl md:leading-9'>
			<PortableText
				value={aboutUsText as PortableTextBlock[]}
				components={portableTextComponents}
			/>
		</div>
	);
};

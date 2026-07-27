import { portableTextComponents } from '@/components/portable-text/PortableTextComponents';
import { LICENSE_TEXT_QUERY_RESULT } from '@/sanity/types';
import { PortableText } from 'next-sanity';

type FooterProps = {
	licenseText?: LICENSE_TEXT_QUERY_RESULT;
};

export function Footer({ licenseText }: FooterProps) {
	if (!licenseText) {
		return null;
	}

	return (
		<footer
			className='mt-12 border-t border-white/15'
			aria-label='Informazioni sul sito'
		>
			<div className='px-4 py-6 sm:px-6 md:px-8 lg:px-12'>
				<p className='font-mono text-xs uppercase tracking-wide text-white/50'>
					{`© ${new Date().getFullYear()} QU'OUÏR`}
				</p>

				<div className='mt-3 max-w-2xl text-sm leading-relaxed text-white/70'>
					<PortableText
						value={licenseText}
						components={portableTextComponents}
					/>
				</div>
			</div>
		</footer>
	);
}

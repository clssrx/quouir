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
			className='mt-10 border-t border-white/15 md:mt-12'
			aria-label='Informazioni sul sito'
		>
			<div className='px-4 py-6 sm:px-6 md:px-8 lg:px-12'>
				<p className='font-mono text-[0.65rem] uppercase tracking-wide text-white/50 md:text-xs'>
					© {new Date().getFullYear()} QU&apos;OUÏR
				</p>

				<div className='mt-3 max-w-2xl wrap-break-word text-sm leading-relaxed text-white/65 md:text-white/70'>
					<PortableText
						value={licenseText}
						components={portableTextComponents}
					/>
				</div>
			</div>
		</footer>
	);
}

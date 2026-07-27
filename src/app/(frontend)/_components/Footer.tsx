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
			className='mt-4 border-t border-white/10'
			aria-label='Informazioni sul sito'
		>
			<div className='mx-auto max-w-3xl px-6 py-8 text-center'>
				<p className='text-sm text-white/60'>
					© {new Date().getFullYear()} QU&apos;OUÏR
				</p>

				<div className='mt-4 text-center text-sm leading-relaxed text-white/70 sm:text-center'>
					<PortableText
						value={licenseText}
						components={portableTextComponents}
					/>
				</div>
			</div>
		</footer>
	);
}

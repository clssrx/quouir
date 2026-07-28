import { PortableText } from 'next-sanity';

import { portableTextComponents } from '@/components/portable-text/PortableTextComponents';
import type { LICENSE_TEXT_QUERY_RESULT } from '@/sanity/types';

type FooterProps = {
	licenseText?: LICENSE_TEXT_QUERY_RESULT;
};

export function Footer({ licenseText }: FooterProps) {
	return (
		<footer
			className='mt-10 border-t border-white/15 md:mt-12'
			aria-label='Informazioni sul sito'
		>
			<div className='px-4 py-6 sm:px-6 md:px-8 lg:px-12'>
				<p className='font-mono text-[0.65rem] uppercase tracking-wide text-white/50 md:text-xs'>
					{`© ${new Date().getFullYear()} QU'OUÏR`}
				</p>

				{licenseText && (
					<div className='mt-3 max-w-2xl wrap-break-word text-sm leading-relaxed text-white/65 md:text-white/70'>
						<PortableText
							value={licenseText}
							components={portableTextComponents}
						/>
					</div>
				)}

				<div className='mt-6 flex flex-col gap-3 border-t border-white/15 pt-4 font-mono text-[0.65rem] uppercase tracking-[0.06em] text-white/45 sm:flex-row sm:items-center sm:justify-between md:text-xs'>
					<p>
						Sito sviluppato da{' '}
						<a
							href='https://www.linkedin.com/in/leoncolosio'
							target='_blank'
							rel='noopener noreferrer'
							className='text-link'
						>
							Leon Colosio
						</a>
					</p>

					<a
						href='https://github.com/clssrx/quouir'
						target='_blank'
						rel='noopener noreferrer'
						className='text-link w-fit'
					>
						Codice sorgente
					</a>
				</div>
			</div>
		</footer>
	);
}

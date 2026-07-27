import Link from 'next/link';

type SocialLinksProps = {
	contactEmail?: string;
	facebookUrl?: string;
	instagramUrl?: string;
};

export default function SocialLinks({
	contactEmail,
	facebookUrl,
	instagramUrl,
}: SocialLinksProps) {
	if (!contactEmail && !facebookUrl && !instagramUrl) {
		return null;
	}

	const linkClasses =
		'transition-colors hover:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-4';

	return (
		<nav
			aria-label='Contatti e social'
			className='mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-4 font-mono text-xs uppercase tracking-[0.08em]'
		>
			{instagramUrl && (
				<Link href={instagramUrl} className={linkClasses}>
					Instagram ↗
				</Link>
			)}

			{facebookUrl && (
				<Link href={facebookUrl} className={linkClasses}>
					Facebook ↗
				</Link>
			)}

			{contactEmail && (
				<Link href={`mailto:${contactEmail}`} className={linkClasses}>
					Email ↗
				</Link>
			)}
		</nav>
	);
}

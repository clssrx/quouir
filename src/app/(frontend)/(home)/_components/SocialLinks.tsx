import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaEnvelope } from 'react-icons/fa';

export default function SocialLinks({
	contactEmail,
	facebookUrl,
	instagramUrl,
}: {
	contactEmail?: string;
	facebookUrl?: string;
	instagramUrl?: string;
}) {
	const hasLinks = Boolean(contactEmail || facebookUrl || instagramUrl);

	if (!hasLinks) {
		return null;
	}

	return (
		<div className='flex justify-center space-x-6 p-4'>
			{instagramUrl && (
				<Link href={instagramUrl} aria-label="Instagram di QU'OUÏR">
					<FaInstagram size={24} aria-hidden='true' focusable='false' />
				</Link>
			)}
			{facebookUrl && (
				<Link href={facebookUrl} aria-label="Facebook di QU'OUÏR">
					<FaFacebookF aria-hidden='true' focusable='false' size={24} />
				</Link>
			)}
			{contactEmail && (
				<Link
					href={`mailto:${contactEmail}`}
					aria-label="Scrivi una email a QU'OUÏR"
				>
					<FaEnvelope size={24} aria-hidden='true' focusable='false' />
				</Link>
			)}
		</div>
	);
}

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
				<Link href={instagramUrl}>
					<FaInstagram size={24} />
				</Link>
			)}
			{facebookUrl && (
				<Link href={facebookUrl}>
					<FaFacebookF size={24} />
				</Link>
			)}
			{contactEmail && (
				<Link href={`mailto:${contactEmail}`}>
					<FaEnvelope size={24} />
				</Link>
			)}
		</div>
	);
}

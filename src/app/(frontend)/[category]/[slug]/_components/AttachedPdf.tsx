import { createPdfFileName } from '../_utils/postFormatting';

type AttachedPdfSectionProps = {
	title: string;
	authorNames?: string[];
	pdfUrl: string | null;
};

export const AttachedPdfSection = ({
	title,
	authorNames,
	pdfUrl,
}: AttachedPdfSectionProps) => {
	const pdfName = createPdfFileName(title, authorNames);

	const pdfDownloadUrl = `${pdfUrl}?dl=${encodeURIComponent(pdfName)}`;

	if (!pdfUrl) return null;

	return (
		<section
			className='mt-12 border-t border-white/10 pt-6'
			aria-labelledby='attached-material-heading'
		>
			<h2
				id='attached-material-heading'
				className='mb-2 text-xs uppercase tracking-[0.18em] text-gray-400'
			>
				Materiale allegato
			</h2>

			<a
				href={pdfDownloadUrl}
				download={pdfName}
				className='inline-flex w-fit items-center gap-2 text-sm font-bold text-gray-200 underline underline-offset-4 transition hover:text-white  focus-visible:outline-2 focus-visible:outline-offset-4'
				aria-label={`Scarica il PDF: ${title}`}
			>
				Scarica il PDF
			</a>
		</section>
	);
};

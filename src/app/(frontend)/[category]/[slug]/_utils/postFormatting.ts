export const createPdfFileName = (
	title?: string | null,
	authorName?: string | null,
) => {
	return `${title || 'documento'}-${authorName || 'autore'}`
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/\s+/g, '-')
		.replace(/[^\w-]/g, '')
		.concat('.pdf');
};

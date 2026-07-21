export const createPdfFileName = (
	title?: string | null,
	authorNames?: string[],
) => {
	return `${title || 'documento'}-${authorNames?.join('-') || 'autore'}`
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/\s+/g, '-')
		.replace(/[^\w-]/g, '')
		.concat('.pdf');
};

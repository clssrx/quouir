export const formatCategoryLabel = (category: string) => {
	return category.replaceAll('-', ' ');
};

export const formatPublishedDate = (publishedAt?: string | null) => {
	if (!publishedAt) return null;

	return new Intl.DateTimeFormat('it-IT', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(publishedAt));
};

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

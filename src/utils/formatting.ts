export const formatItalianDate = (date?: string | null) => {
	if (!date) return null;

	return new Intl.DateTimeFormat('it-IT', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));
};

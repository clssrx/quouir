import { createClient } from 'next-sanity';

export const client = createClient({
	projectId: 'sffla1ia',
	dataset: 'production',
	apiVersion: '2026-02-01',
	useCdn: false,
});

import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

import { client } from '@/sanity/lib/client';

type SupportedDocumentType =
	'post' | 'category' | 'author' | 'siteSettings' | 'callEditorialGuidelines';

type DocumentState = {
	slug?: string | null;
	category?: string | null;
	authors?: Array<string | null> | null;
};

type WebhookPayload = {
	documentId?: string | null;
	_type?: SupportedDocumentType;
	before?: DocumentState | null;
	after?: DocumentState | null;
};

type ReferencingPost = {
	slug: string | null;
	category: string | null;
};

const POSTS_REFERENCING_AUTHOR_QUERY = `
	*[
		_type == "post" &&
		references($authorId)
	] {
		"slug": slug.current,
		"category": category->slug.current
	}
`;

const revalidatePaths = (paths: Set<string>) => {
	for (const path of paths) {
		revalidatePath(path);
	}
};

const revalidatePost = (body: WebhookPayload) => {
	const paths = new Set<string>(['/', '/sitemap.xml']);

	const oldCategory = body.before?.category;
	const oldSlug = body.before?.slug;

	if (oldCategory) {
		paths.add(`/${oldCategory}`);
	}

	if (oldCategory && oldSlug) {
		paths.add(`/${oldCategory}/${oldSlug}`);
	}

	const newCategory = body.after?.category;
	const newSlug = body.after?.slug;

	if (newCategory) {
		paths.add(`/${newCategory}`);
	}

	if (newCategory && newSlug) {
		paths.add(`/${newCategory}/${newSlug}`);
	}

	const authors = [
		...(body.before?.authors ?? []),
		...(body.after?.authors ?? []),
	];

	for (const authorSlug of authors) {
		if (authorSlug) {
			paths.add(`/authors/${authorSlug}`);
		}
	}

	revalidatePaths(paths);
};

const revalidateAuthor = async (body: WebhookPayload) => {
	if (!body.documentId) {
		throw new Error('Missing documentId for author webhook.');
	}

	const paths = new Set<string>(['/']);

	const oldSlug = body.before?.slug;
	const newSlug = body.after?.slug;

	if (oldSlug) {
		paths.add(`/authors/${oldSlug}`);
	}

	if (newSlug) {
		paths.add(`/authors/${newSlug}`);
	}

	/*
	 * Author data is also rendered inside posts and category archives.
	 *
	 * The webhook cannot query reverse references itself, so fetch the
	 * posts referencing this author when the author is published.
	 *
	 * This query is intentionally uncached and bypasses the Sanity CDN:
	 * webhook deliveries are rare and we want the freshest relationship
	 * data when deciding which paths to invalidate.
	 */
	const posts = await client
		.withConfig({ useCdn: false })
		.fetch<ReferencingPost[]>(
			POSTS_REFERENCING_AUTHOR_QUERY,
			{
				authorId: body.documentId,
			},
			{
				cache: 'no-store',
			},
		);

	for (const post of posts) {
		if (post.category) {
			paths.add(`/${post.category}`);
		}

		if (post.category && post.slug) {
			paths.add(`/${post.category}/${post.slug}`);
		}
	}

	revalidatePaths(paths);
};

const revalidateCategory = () => {
	/*
	 * Categories are used by the navigation, so a category change can
	 * affect every frontend route.
	 */
	revalidatePath('/', 'layout');
	revalidatePath('/sitemap.xml');
};

const revalidateSiteSettings = () => {
	/*
	 * Site settings contain shared frontend content such as navigation
	 * and footer data.
	 */
	revalidatePath('/', 'layout');
};

const revalidateEditorialGuidelines = () => {
	revalidatePath('/call-e-norme-editoriali');
};

export async function POST(request: NextRequest) {
	try {
		const secret = process.env.SANITY_REVALIDATE_SECRET;

		if (!secret) {
			return NextResponse.json(
				{
					message: 'Missing environment variable SANITY_REVALIDATE_SECRET.',
				},
				{
					status: 500,
				},
			);
		}

		const { isValidSignature, body } = await parseBody<WebhookPayload>(
			request,
			secret,
			true,
		);

		if (!isValidSignature) {
			return NextResponse.json(
				{
					message: 'Invalid signature.',
				},
				{
					status: 401,
				},
			);
		}

		if (!body?._type) {
			return NextResponse.json(
				{
					message: 'Invalid webhook payload.',
				},
				{
					status: 400,
				},
			);
		}

		switch (body._type) {
			case 'post':
				revalidatePost(body);
				break;

			case 'author':
				await revalidateAuthor(body);
				break;

			case 'category':
				revalidateCategory();
				break;

			case 'siteSettings':
				revalidateSiteSettings();
				break;

			case 'callEditorialGuidelines':
				revalidateEditorialGuidelines();
				break;
		}

		return NextResponse.json({
			revalidated: true,
			type: body._type,
		});
	} catch (error: unknown) {
		console.error('Sanity webhook revalidation failed:', error);

		return NextResponse.json(
			{
				message:
					error instanceof Error
						? error.message
						: 'Unknown revalidation error.',
			},
			{
				status: 500,
			},
		);
	}
}

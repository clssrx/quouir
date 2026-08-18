import type { MetadataRoute } from 'next';

import { getAllCategories } from '@/sanity/queries/categories';
import { getAllPostsWithCategoryForStaticParams } from '@/sanity/queries/posts';

const SITE_URL = 'https://www.quouir.com';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [categories, posts] = await Promise.all([
		getAllCategories(),
		getAllPostsWithCategoryForStaticParams(),
	]);

	const staticPages: MetadataRoute.Sitemap = [
		{
			url: SITE_URL,
		},
	];

	const categoryPages: MetadataRoute.Sitemap = categories.flatMap(
		(category) => {
			const slug = category.slug?.current;

			if (!slug) {
				return [];
			}

			return [
				{
					url: `${SITE_URL}/${slug}`,
				},
			];
		},
	);

	const postPages: MetadataRoute.Sitemap = posts.flatMap((post) => {
		if (!post.slug || !post.category) {
			return [];
		}

		return [
			{
				url: `${SITE_URL}/${post.category}/${post.slug}`,
				lastModified: new Date(post._updatedAt),
			},
		];
	});

	return [...staticPages, ...categoryPages, ...postPages];
}

import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
	S.list()
		.title('Content')
		.items([
			S.listItem()
				.title('Posts by category')
				.icon(() => '💾')
				.child(
					S.documentTypeList('category')
						.title('Categories')
						.child((categoryId) =>
							S.documentList()
								.title('Posts')
								.filter('_type == "post" && category._ref == $categoryId')
								.params({ categoryId })
								.initialValueTemplates([
									S.initialValueTemplateItem('post-by-category', {
										categoryId,
									}),
								]),
						),
				),

			// S.listItem()
			// 	.title('Home Page')
			// 	.icon(() => '🏠')
			// 	.child(
			// 		S.document().schemaType('homePage').documentId('homePage'), // fixed ID, singleton pattern
			// 	),

			S.listItem()
				.title('Site Settings')
				.icon(() => '⚙️')
				.child(
					S.document().schemaType('siteSettings').documentId('siteSettings'),
				),

			S.divider(),

			S.documentTypeListItem('post').title('All Posts'),
			S.documentTypeListItem('category'),
			S.documentTypeListItem('author'),
		]);

import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
	S.list()
		.title('Content')
		.items([
			S.listItem()
				.title('Posts by category')
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

			S.divider(),

			S.documentTypeListItem('post').title('All Posts'),
			S.documentTypeListItem('category'),
			S.documentTypeListItem('author'),
		]);

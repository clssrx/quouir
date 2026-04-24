import { StructureResolver } from 'sanity/structure';

const EmojiIcon = ({ emoji }: { emoji: string }) => {
	return <span style={{ fontSize: '1.2rem' }}>{emoji}</span>;
};

export const structure: StructureResolver = (S) =>
	S.list()
		.title("Qu'ouir Studio")
		.items([
			S.documentTypeListItem('post')
				.title('Articles / Posts')
				.icon(() => <EmojiIcon emoji='📝' />),

			S.listItem()
				.title('Posts by category')
				.icon(() => <EmojiIcon emoji='🗂️' />)
				.child(
					S.documentTypeList('category')
						.title('Choose a category')
						.child((categoryId) =>
							S.documentList()
								.title('Posts in this category')
								.filter('_type == "post" && category._ref == $categoryId')
								.params({ categoryId }),
						),
				),

			S.divider(),

			S.documentTypeListItem('category')
				.title('Categories')
				.icon(() => <EmojiIcon emoji='🏷️' />),

			S.documentTypeListItem('author')
				.title('Authors')
				.icon(() => <EmojiIcon emoji='👤' />),

			S.divider(),

			S.listItem()
				.title('Site Settings')
				.icon(() => <EmojiIcon emoji='⚙️' />)
				.child(
					S.document().schemaType('siteSettings').documentId('siteSettings'),
				),
		]);

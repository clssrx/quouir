import { StructureResolver } from 'sanity/structure';

const EmojiIcon = ({ emoji }: { emoji: string }) => {
	return <span style={{ fontSize: '1.2rem' }}>{emoji}</span>;
};

export const structure: StructureResolver = (S) =>
	S.list()
		.title("Qu'ouïr Studio")
		.items([
			S.documentTypeListItem('post')
				.title('Articoli')
				.icon(() => <EmojiIcon emoji='📝' />),

			S.listItem()
				.title('Articoli per categoria')
				.icon(() => <EmojiIcon emoji='🗂️' />)
				.child(
					S.documentTypeList('category')
						.title('Scegli una categoria')
						.child((categoryId) =>
							S.documentList()
								.title('Articoli in questa categoria')
								.filter('_type == "post" && category._ref == $categoryId')
								.params({ categoryId }),
						),
				),

			S.divider(),

			S.documentTypeListItem('category')
				.title('Categorie')
				.icon(() => <EmojiIcon emoji='🏷️' />),

			S.documentTypeListItem('author')
				.title('Autori')
				.icon(() => <EmojiIcon emoji='👤' />),

			S.divider(),

			S.listItem()
				.title('Impostazioni sito')
				.icon(() => <EmojiIcon emoji='⚙️' />)
				.child(
					S.document()
						.schemaType('siteSettings')
						.documentId('siteSettings')
						.title('Impostazioni sito'),
				),
		]);

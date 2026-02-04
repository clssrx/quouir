import type { Author, Post } from './sanity';

export interface AuthorPageData {
	author: Author;
	posts: Post[];
}

export interface AuthorPageProps {
	params: {
		slug: string;
	};
}

export interface PostPageProps {
	params: {
		slug: string;
	};
}

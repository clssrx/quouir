import type { AUTHOR_QUERY_RESULT } from '@/sanity/types';
export interface AuthorPageProps {
	params: {
		slug: string;
	};
}

export type AuthorPosts = AUTHOR_QUERY_RESULT['posts'];

export type PostsSectionProps = {
	posts: AuthorPosts;
};

export interface PostPageProps {
	params: {
		slug: string;
	};
}

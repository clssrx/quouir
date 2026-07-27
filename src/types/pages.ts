import type { AUTHOR_QUERY_RESULT } from '@/sanity/types';
export interface AuthorPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export type AuthorPosts = AUTHOR_QUERY_RESULT['posts'];

export type PostsSectionProps = {
	posts: AuthorPosts;
};

export interface PostPageProps {
	params: Promise<{
		category: string;
		slug: string;
	}>;
}

export interface CategoryPageProps {
	params: Promise<{
		category: string;
	}>;
}

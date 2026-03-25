import type { AUTHOR_QUERYResult } from '@/sanity/types';
export interface AuthorPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export type AuthorPosts = AUTHOR_QUERYResult['posts'];

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

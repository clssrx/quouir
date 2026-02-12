import type { AUTHOR_QUERYResult } from '@/sanity/types';
export interface AuthorPageProps {
	params: {
		slug: string;
	};
}

export type AuthorPosts = AUTHOR_QUERYResult['posts'];

export type PostsSectionProps = {
	posts: AuthorPosts;
};

export interface PostPageProps {
	params: {
		slug: string;
	};
}

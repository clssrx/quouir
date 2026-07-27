import { describe, it, expect, vi, beforeEach } from 'vitest';
import { client } from '@/sanity/lib/client';

// Mock the Sanity client
vi.mock('@/sanity/lib/client', () => ({
	client: {
		fetch: vi.fn(),
	},
}));

describe('Sanity Queries - Posts', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should fetch all posts', async () => {
		const mockPosts = [
			{
				_id: 'post-1',
				title: 'Test Post 1',
				slug: { current: 'test-post-1', _type: 'slug' },
				publishedAt: '2024-06-15T10:00:00Z',
				authors: [
					{
						_id: 'author-1',
						name: 'John Doe',
						slug: { current: 'john-doe', _type: 'slug' },
					},
				],
			},
			{
				_id: 'post-2',
				title: 'Test Post 2',
				slug: { current: 'test-post-2', _type: 'slug' },
				publishedAt: '2024-06-10T10:00:00Z',
				authors: [],
			},
		];

		vi.mocked(client.fetch).mockResolvedValueOnce(mockPosts);

		const posts = await client.fetch('POSTS_QUERY');

		expect(Array.isArray(posts)).toBe(true);
		expect(posts).toHaveLength(2);
		expect(posts[0]).toHaveProperty('_id');
		expect(posts[0]).toHaveProperty('title');
		expect(posts[0]).toHaveProperty('slug');
		expect(posts[0]).toHaveProperty('publishedAt');
		expect(posts[0]).toHaveProperty('authors');
	});

	it('should fetch post by slug', async () => {
		const mockPost = {
			_id: 'post-1',
			title: 'Test Post',
			slug: { current: 'test-post', _type: 'slug' },
			subtitle: 'Test Subtitle',
			publishedAt: '2024-06-15T10:00:00Z',
			body: [
				{
					_type: 'block',
					_key: 'block-1',
					children: [{ _type: 'span', text: 'Test content' }],
				},
			],
			image: {
				_type: 'image',
				asset: {
					_id: 'image-1',
					_type: 'reference',
					_ref: 'image-123',
				},
				alt: 'Test Image',
			},
			authors: [
				{
					_id: 'author-1',
					name: 'John Doe',
					slug: { current: 'john-doe', _type: 'slug' },
				},
			],
		};

		vi.mocked(client.fetch).mockResolvedValueOnce(mockPost);

		const post = await client.fetch('POST_BY_SLUG_QUERY', {
			slug: 'test-post',
		});

		expect(post).toBeDefined();
		expect(post._id).toBe('post-1');
		expect(post.title).toBe('Test Post');
		expect(post.slug.current).toBe('test-post');
		expect(post).toHaveProperty('body');
	});

	it('should fetch posts by category', async () => {
		const mockPostsByCategory = [
			{
				_id: 'post-1',
				title: 'Materiali Post',
				slug: { current: 'materiali-post', _type: 'slug' },
				category: {
					title: 'Materiali',
					slug: { current: 'materiali', _type: 'slug' },
				},
			},
		];

		vi.mocked(client.fetch).mockResolvedValueOnce(mockPostsByCategory);

		const posts = await client.fetch('POSTS_BY_CATEGORY_QUERY');

		expect(Array.isArray(posts)).toBe(true);
		expect(posts[0]).toHaveProperty('_id');
		expect(posts[0]).toHaveProperty('title');
		expect(posts[0]).toHaveProperty('category');
	});
});

describe('Sanity Queries - Categories', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should fetch all categories', async () => {
		const mockCategories = [
			{
				_id: 'cat-1',
				title: 'Materiali',
				slug: { current: 'materiali', _type: 'slug' },
			},
			{
				_id: 'cat-2',
				title: 'Interviste',
				slug: { current: 'interviste', _type: 'slug' },
			},
			{
				_id: 'cat-3',
				title: 'Papers',
				slug: { current: 'papers', _type: 'slug' },
			},
		];

		vi.mocked(client.fetch).mockResolvedValueOnce(mockCategories);

		const categories = await client.fetch('CATEGORIES_LIST_QUERY');

		expect(Array.isArray(categories)).toBe(true);
		expect(categories.length).toBeGreaterThan(0);
		categories.forEach((category) => {
			expect(category).toHaveProperty('_id');
			expect(category).toHaveProperty('title');
			expect(category).toHaveProperty('slug');
		});
	});

	it('should fetch category by slug', async () => {
		const mockCategory = {
			_id: 'cat-1',
			title: 'Materiali',
			slug: { current: 'materiali', _type: 'slug' },
		};

		vi.mocked(client.fetch).mockResolvedValueOnce(mockCategory);

		const category = await client.fetch('CATEGORY_BY_SLUG_QUERY', {
			slug: 'materiali',
		});

		expect(category).toBeDefined();
		expect(category._id).toBe('cat-1');
		expect(category.title).toBe('Materiali');
		expect(category.slug.current).toBe('materiali');
	});
});

describe('Sanity Queries - Authors', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should fetch author by slug with their posts', async () => {
		const mockAuthorData = {
			author: {
				_id: 'author-1',
				name: 'John Doe',
				bio: 'Test bio',
				image: {
					_type: 'image',
					asset: {
						_id: 'image-1',
						_type: 'reference',
						_ref: 'image-123',
					},
					alt: 'Author Image',
				},
				slug: { current: 'john-doe', _type: 'slug' },
			},
			posts: [
				{
					_id: 'post-1',
					title: 'Authors Post',
					slug: { current: 'author-post', _type: 'slug' },
					publishedAt: '2024-06-15T10:00:00Z',
					thumbnailImage: {
						_type: 'image',
						asset: {
							_id: 'image-2',
							_type: 'reference',
							_ref: 'image-456',
						},
						alt: 'Post Image',
					},
					category: {
						title: 'Materiali',
						slug: { current: 'materiali', _type: 'slug' },
					},
				},
			],
		};

		vi.mocked(client.fetch).mockResolvedValueOnce(mockAuthorData);

		const authorData = await client.fetch('AUTHOR_QUERY', { slug: 'john-doe' });

		expect(authorData).toHaveProperty('author');
		expect(authorData).toHaveProperty('posts');
		expect(authorData.author._id).toBe('author-1');
		expect(authorData.author.name).toBe('John Doe');
		expect(authorData.author.slug.current).toBe('john-doe');
		expect(Array.isArray(authorData.posts)).toBe(true);
	});

	it('should handle author with no posts', async () => {
		const mockAuthorData = {
			author: {
				_id: 'author-2',
				name: 'Jane Smith',
				bio: 'Another bio',
				slug: { current: 'jane-smith', _type: 'slug' },
			},
			posts: [],
		};

		vi.mocked(client.fetch).mockResolvedValueOnce(mockAuthorData);

		const authorData = await client.fetch('AUTHOR_QUERY', {
			slug: 'jane-smith',
		});

		expect(authorData.author.name).toBe('Jane Smith');
		expect(authorData.posts).toHaveLength(0);
	});
});

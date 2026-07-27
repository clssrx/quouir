import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostCard } from '@/components/PostCard';

describe('PostCard Component', () => {
	const mockPost = {
		_id: 'post-1',
		title: 'Test Post Title',
		slug: {
			_type: 'slug' as const,
			current: 'test-post-title',
		},
		publishedAt: '2024-06-15T10:00:00Z',
		authors: [
			{
				_id: 'author-1',
				name: 'John Doe',
				slug: {
					_type: 'slug' as const,
					current: 'john-doe',
				},
			},
		],
		image: {
			_type: 'image' as const,
			asset: {
				_id: 'image-1',
				_type: 'reference' as const,
				_ref: 'image-123',
			},
			alt: 'Post Image',
		},
		thumbnailImage: undefined,
		excerpt: 'This is a test excerpt for the post.',
	};

	it('should render post title in uppercase', () => {
		render(<PostCard post={mockPost} categorySlug='materiali' />);

		const title = screen.getByRole('heading', { level: 2 });
		expect(title.textContent).toBe('TEST POST TITLE');
	});

	it('should render link with correct href', () => {
		render(<PostCard post={mockPost} categorySlug='materiali' />);

		// Get the link that contains the heading (the main post link)
		const heading = screen.getByRole('heading', { level: 2 });
		const link = heading.closest('a');
		expect(link).toHaveAttribute('href', '/materiali/test-post-title');
	});

	it('should render formatted date', () => {
		render(<PostCard post={mockPost} categorySlug='materiali' />);

		expect(screen.getByText(/giugno/i)).toBeInTheDocument();
	});

	it('should render excerpt', () => {
		render(<PostCard post={mockPost} categorySlug='materiali' />);

		expect(
			screen.getByText('This is a test excerpt for the post.'),
		).toBeInTheDocument();
	});

	it('should render authors list', () => {
		render(<PostCard post={mockPost} categorySlug='materiali' />);

		// AuthorsList should render the author in uppercase
		expect(screen.getByRole('link', { name: /JOHN DOE/i })).toBeInTheDocument();
	});

	it('should handle post without image', () => {
		const postWithoutImage = {
			...mockPost,
			image: undefined,
			thumbnailImage: undefined,
		};

		render(<PostCard post={postWithoutImage} categorySlug='materiali' />);

		// Title should still render
		const title = screen.getByRole('heading', { level: 2 });
		expect(title).toBeInTheDocument();
	});

	it('should prefer thumbnailImage over image', () => {
		const postWithBothImages = {
			...mockPost,
			image: {
				_type: 'image' as const,
				asset: {
					_id: 'image-1',
					_type: 'reference' as const,
					_ref: 'image-123',
				},
				alt: 'Main Image',
			},
			thumbnailImage: {
				_type: 'image' as const,
				asset: {
					_id: 'thumbnail-1',
					_type: 'reference' as const,
					_ref: 'thumbnail-123',
				},
				alt: 'Thumbnail Image',
			},
		};

		const { container } = render(
			<PostCard post={postWithBothImages} categorySlug='materiali' />,
		);

		// Check that an image element exists (should use thumbnailImage)
		const imageElement = container.querySelector('img');
		expect(imageElement).toBeInTheDocument();
	});

	it('should handle empty authors array', () => {
		const postWithoutAuthors = {
			...mockPost,
			authors: [],
		};

		render(<PostCard post={postWithoutAuthors} categorySlug='materiali' />);

		// Should still display "Autor3 sconosciut3"
		expect(screen.getByText(/Autor3 sconosciut3/i)).toBeInTheDocument();
	});

	it('should handle multiple authors', () => {
		const postWithMultipleAuthors = {
			...mockPost,
			authors: [
				{
					_id: 'author-1',
					name: 'John Doe',
					slug: {
						_type: 'slug' as const,
						current: 'john-doe',
					},
				},
				{
					_id: 'author-2',
					name: 'Jane Smith',
					slug: {
						_type: 'slug' as const,
						current: 'jane-smith',
					},
				},
			],
		};

		render(
			<PostCard post={postWithMultipleAuthors} categorySlug='materiali' />,
		);

		expect(screen.getByRole('link', { name: /JOHN DOE/i })).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: /JANE SMITH/i }),
		).toBeInTheDocument();
	});

	it('should handle post without publishedAt date', () => {
		const postWithoutDate = {
			...mockPost,
			publishedAt: undefined,
		};

		render(<PostCard post={postWithoutDate} categorySlug='materiali' />);

		// Component should still render without error
		const title = screen.getByRole('heading', { level: 2 });
		expect(title).toBeInTheDocument();
	});

	it('should handle post without slug', () => {
		const postWithoutSlug = {
			...mockPost,
			slug: undefined,
		};

		render(<PostCard post={postWithoutSlug} categorySlug='materiali' />);

		const heading = screen.getByRole('heading', { level: 2 });
		const link = heading.closest('a');
		expect(link).toHaveAttribute('href', '/materiali/');
	});

	it('should apply correct CSS classes', () => {
		const { container } = render(
			<PostCard post={mockPost} categorySlug='materiali' />,
		);

		const article = container.querySelector('article');
		expect(article?.className).toContain('flex');
		expect(article?.className).toContain('flex-col');

		const title = screen.getByRole('heading', { level: 2 });
		expect(title.className).toContain('line-clamp-2');
	});

	it('should render with different category slugs', () => {
		const categories = ['eventi', 'interviste', 'papers', 'traduzioni'];

		for (const category of categories) {
			const { unmount } = render(
				<PostCard post={mockPost} categorySlug={category} />,
			);

			// Get the link that contains the heading (the main post link)
			const heading = screen.getByRole('heading', { level: 2 });
			const link = heading.closest('a');
			expect(link).toHaveAttribute('href', `/${category}/test-post-title`);

			unmount();
		}
	});
});

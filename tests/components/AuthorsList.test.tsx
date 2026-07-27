import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuthorsList from '@/components/AuthorsList';

describe('AuthorsList Component', () => {
	it('should render "Autor3 sconosciut3" when no authors provided', () => {
		render(<AuthorsList authors={undefined} />);
		expect(screen.getByText('Autor3 sconosciut3')).toBeInTheDocument();
	});

	it('should render "Autor3 sconosciut3" when authors array is empty', () => {
		render(<AuthorsList authors={[]} />);
		expect(screen.getByText('Autor3 sconosciut3')).toBeInTheDocument();
	});

	it('should render single author with correct link', () => {
		const authors = [
			{
				name: 'John Doe',
				slug: { current: 'john-doe', _type: 'slug' },
			},
		];

		render(<AuthorsList authors={authors} />);

		const link = screen.getByRole('link', { name: /john doe/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', '/authors/john-doe');
	});

	it('should render multiple authors separated by comma', () => {
		const authors = [
			{
				name: 'John Doe',
				slug: { current: 'john-doe', _type: 'slug' },
			},
			{
				name: 'Jane Smith',
				slug: { current: 'jane-smith', _type: 'slug' },
			},
		];

		render(<AuthorsList authors={authors} />);

		expect(screen.getByRole('link', { name: /john doe/i })).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: /jane smith/i }),
		).toBeInTheDocument();
		expect(screen.getByText(/,/)).toBeInTheDocument();
	});

	it('should render three authors correctly', () => {
		const authors = [
			{
				name: 'Author One',
				slug: { current: 'author-one', _type: 'slug' },
			},
			{
				name: 'Author Two',
				slug: { current: 'author-two', _type: 'slug' },
			},
			{
				name: 'Author Three',
				slug: { current: 'author-three', _type: 'slug' },
			},
		];

		render(<AuthorsList authors={authors} />);

		expect(
			screen.getByRole('link', { name: /author one/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: /author two/i }),
		).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: /author three/i }),
		).toBeInTheDocument();
	});

	it('should render author names in uppercase when isUppercase is true', () => {
		const authors = [
			{
				name: 'John Doe',
				slug: { current: 'john-doe', _type: 'slug' },
			},
		];

		render(<AuthorsList authors={authors} isUppercase={true} />);

		expect(screen.getByRole('link', { name: /JOHN DOE/i })).toBeInTheDocument();
	});

	it('should render author names in normal case when isUppercase is false', () => {
		const authors = [
			{
				name: 'John Doe',
				slug: { current: 'john-doe', _type: 'slug' },
			},
		];

		render(<AuthorsList authors={authors} isUppercase={false} />);

		const link = screen.getByRole('link', { name: /john doe/i });
		expect(link.textContent).toBe('John Doe');
	});

	it('should have proper styling classes for links', () => {
		const authors = [
			{
				name: 'John Doe',
				slug: { current: 'john-doe', _type: 'slug' },
			},
		];

		render(<AuthorsList authors={authors} />);

		const link = screen.getByRole('link', { name: /john doe/i });
		expect(link.className).toContain('underline-offset-4');
		expect(link.className).toContain('transition');
		expect(link.className).toContain('hover:text-white');
	});

	it('should not add comma after the last author', () => {
		const authors = [
			{
				name: 'John Doe',
				slug: { current: 'john-doe', _type: 'slug' },
			},
			{
				name: 'Jane Smith',
				slug: { current: 'jane-smith', _type: 'slug' },
			},
		];

		const { container } = render(<AuthorsList authors={authors} />);
		const text = container.textContent;

		// Should have exactly one comma (between authors, not after)
		const commaCount = (text?.match(/,/g) || []).length;
		expect(commaCount).toBe(1);
	});
});

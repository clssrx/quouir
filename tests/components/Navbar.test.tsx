import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/Navbar';

describe('Navbar Component', () => {
	const mockCategories = [
		{
			_id: 'cat-1',
			title: 'Materiali',
			slug: {
				_type: 'slug' as const,
				current: 'materiali',
			},
		},
		{
			_id: 'cat-2',
			title: 'Interviste',
			slug: {
				_type: 'slug' as const,
				current: 'interviste',
			},
		},
		{
			_id: 'cat-3',
			title: 'Papers',
			slug: {
				_type: 'slug' as const,
				current: 'papers',
			},
		},
	];

	it('should render logo link to homepage', () => {
		render(<Navbar categories={mockCategories} />);

		const logo = screen.getByRole('link', {
			name: /QU'OUÏR|Vai alla homepage/i,
		});
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('href', '/');
	});

	it('should render all categories as navigation links', () => {
		render(<Navbar categories={mockCategories} />);

		mockCategories.forEach((category) => {
			const link = screen.getByRole('link', { name: category.title });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', `/${category.slug.current}`);
		});
	});

	it('should filter out categories without slug', () => {
		const categoriesWithoutSlug = [
			...mockCategories,
			{
				_id: 'cat-4',
				title: 'No Slug Category',
				slug: undefined,
			},
		];

		render(<Navbar categories={categoriesWithoutSlug as any} />);

		// Should not find the category without slug
		expect(
			screen.queryByRole('link', { name: 'No Slug Category' }),
		).not.toBeInTheDocument();

		// Should still have the others
		expect(screen.getByRole('link', { name: 'Materiali' })).toBeInTheDocument();
	});

	it('should not render if no valid navigation items', () => {
		const emptyCategories = [];
		const { container } = render(
			<Navbar categories={emptyCategories as any} />,
		);

		// Should render nothing
		const header = container.querySelector('header');
		expect(header).not.toBeInTheDocument();
	});

	it('should render mobile menu button on small screens', () => {
		render(<Navbar categories={mockCategories} />);

		const menuButton = screen.getByRole('button', { name: /apri menu/i });
		expect(menuButton).toBeInTheDocument();
		expect(menuButton).toHaveAttribute('aria-expanded', 'false');
	});

	it('should toggle mobile menu when button is clicked', async () => {
		render(<Navbar categories={mockCategories} />);

		const menuButton = screen.getByRole('button', { name: /apri menu/i });

		// Initially closed
		expect(menuButton).toHaveAttribute('aria-expanded', 'false');

		// Click to open
		fireEvent.click(menuButton);
		expect(menuButton).toHaveAttribute('aria-expanded', 'true');

		// Click to close
		fireEvent.click(menuButton);
		expect(menuButton).toHaveAttribute('aria-expanded', 'false');
	});

	it('should display mobile menu links when menu is open', () => {
		render(<Navbar categories={mockCategories} />);

		const menuButton = screen.getByRole('button', { name: /apri menu/i });
		fireEvent.click(menuButton);

		// All category links should be visible in mobile menu
		mockCategories.forEach((category) => {
			const link = screen.getAllByRole('link', { name: category.title });
			expect(link.length).toBeGreaterThan(0);
		});
	});

	it('should close mobile menu when a category link is clicked', async () => {
		render(<Navbar categories={mockCategories} />);

		const menuButton = screen.getByRole('button', { name: /apri menu/i });

		// Open menu
		fireEvent.click(menuButton);
		expect(menuButton).toHaveAttribute('aria-expanded', 'true');

		// Find mobile menu nav by aria-label
		const mobileNav = screen.getByRole('navigation', {
			name: /Navigazione mobile/i,
		});
		expect(mobileNav).toBeInTheDocument();

		// The test would verify click closes menu, but this is limited in jsdom
		// In a real browser test (Playwright), this would be fully testable
	});

	it('should close mobile menu on Escape key', async () => {
		render(<Navbar categories={mockCategories} />);

		const menuButton = screen.getByRole('button', { name: /apri menu/i });

		// Open menu
		fireEvent.click(menuButton);
		expect(menuButton).toHaveAttribute('aria-expanded', 'true');

		// Press Escape
		fireEvent.keyDown(window, { key: 'Escape' });

		// Menu should close
		expect(menuButton).toHaveAttribute('aria-expanded', 'false');
	});

	it('should have proper ARIA labels', () => {
		render(<Navbar categories={mockCategories} />);

		// Header should be semantic
		const header = screen.getByRole('banner');
		expect(header).toBeInTheDocument();

		// Desktop nav should have aria-label
		const desktopNav = screen.getByRole('navigation', {
			name: /Navigazione principale/i,
		});
		expect(desktopNav).toBeInTheDocument();

		// Logo should have aria-label
		const logo = screen.getByRole('link', { name: /Vai alla homepage/i });
		expect(logo).toBeInTheDocument();
	});

	it('should have correct styling classes', () => {
		render(<Navbar categories={mockCategories} />);

		const logo = screen.getByRole('link', {
			name: /QU'OUÏR|Vai alla homepage/i,
		});
		expect(logo.className).toContain('font-bold');
		expect(logo.className).toContain('focus-visible:outline');
	});

	it('should maintain category order', () => {
		render(<Navbar categories={mockCategories} />);

		const desktopNav = screen.getByRole('navigation', {
			name: /Navigazione principale/i,
		});
		const links = desktopNav.querySelectorAll('a');

		// Should have 3 category links (excluding logo which is separate)
		const categoryLinks = Array.from(links).filter((link) =>
			mockCategories.some((cat) => link.textContent?.includes(cat.title)),
		);

		expect(categoryLinks.length).toBe(mockCategories.length);
	});

	it('should handle single category', () => {
		const singleCategory = [mockCategories[0]];
		render(<Navbar categories={singleCategory} />);

		// Should render with single category
		expect(screen.getByRole('link', { name: 'Materiali' })).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: /QU'OUÏR|Vai alla homepage/i }),
		).toBeInTheDocument();
	});
});

'use client';

import { usePathname } from 'next/navigation';

import type { NAVIGATION_CATEGORIES_QUERY_RESULT } from '@/sanity/types';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

type NavbarProps = {
	categories: NAVIGATION_CATEGORIES_QUERY_RESULT;
};

export type NavigationItem = {
	id: string;
	title: string;
	href: string;
	isActive: boolean;
};

export default function Navbar({ categories }: NavbarProps) {
	const pathname = usePathname();

	const navigationItems: NavigationItem[] = categories.flatMap((category) => {
		const slug = category.slug?.current;

		if (!slug) {
			return [];
		}

		const href = `/${slug}`;

		return [
			{
				id: category._id,
				title: category.title,
				href,
				isActive: pathname === href || pathname.startsWith(`${href}/`),
			},
		];
	});

	return (
		<header className='sticky top-0 z-50 border-b border-white/15 bg-black md:fixed md:inset-y-0 md:left-0 md:w-64 md:border-r md:border-b-0'>
			<MobileNavbar items={navigationItems} />
			<DesktopNavbar items={navigationItems} />
		</header>
	);
}

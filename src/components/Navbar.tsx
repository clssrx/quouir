'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { CATEGORIES_LIST_QUERYResult } from '@/sanity/types';

type NavbarProps = {
	categories: CATEGORIES_LIST_QUERYResult;
};

export default function Navbar({ categories }: NavbarProps) {
	const [isOpen, setIsOpen] = useState(false);

	const navigationItems = categories.filter(
		(category) => category.slug?.current,
	);

	useEffect(() => {
		if (!isOpen) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		window.addEventListener('keydown', handleEscape);

		return () => {
			window.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen]);

	if (!navigationItems.length) return null;

	return (
		<header className='backdrop-blur-sm border-b border-white/10 mb-8'>
			<div className='container mx-auto max-w-5xl px-6 py-4 flex items-center justify-between'>
				<Link
					href='/'
					className='text-xl font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
					aria-label="Vai alla homepage di qu'ouïr"
				>
					qu'ouïr
				</Link>

				<nav
					className='hidden md:flex gap-6'
					aria-label='Navigazione principale'
				>
					{navigationItems.map((category) => (
						<Link
							key={category._id}
							href={`/${category.slug?.current}`}
							className='text-sm text-white/70 hover:text-white transition uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
						>
							{category.title}
						</Link>
					))}
				</nav>

				<button
					type='button'
					aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
					aria-expanded={isOpen}
					aria-controls='primary-navigation-mobile'
					onClick={() => setIsOpen((open) => !open)}
					className='md:hidden flex flex-col gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
				>
					<span className='w-6 h-0.5 bg-white' aria-hidden='true' />
					<span className='w-6 h-0.5 bg-white' aria-hidden='true' />
					<span className='w-6 h-0.5 bg-white' aria-hidden='true' />
				</button>
			</div>

			{isOpen && (
				<nav
					id='primary-navigation-mobile'
					aria-label='Navigazione mobile'
					className='md:hidden px-6 pb-4 flex flex-col gap-4 items-end'
				>
					{navigationItems.map((category) => (
						<Link
							key={category._id}
							href={`/${category.slug?.current}`}
							onClick={() => setIsOpen(false)}
							className='text-sm text-white/70 hover:text-white transition uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'
						>
							{category.title}
						</Link>
					))}
				</nav>
			)}
		</header>
	);
}

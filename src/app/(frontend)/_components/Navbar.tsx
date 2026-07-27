'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { CATEGORIES_LIST_QUERY_RESULT } from '@/sanity/types';

type NavbarProps = {
	categories: CATEGORIES_LIST_QUERY_RESULT;
};

export default function Navbar({ categories }: NavbarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

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
		<header className='sticky top-0 z-40 border-b border-white/20 bg-black md:fixed md:inset-y-0 md:left-0 md:w-64 md:border-r md:border-b-0'>
			<div className='flex items-center justify-between px-4 py-4 md:h-full md:flex-col md:items-stretch md:justify-start md:px-5 md:py-5'>
				<Link
					href='/'
					className='text-2xl font-semibold tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4'
					aria-label="Vai alla homepage di QU'OUÏR"
				>
					QU&apos;OUÏR
				</Link>

				<p className='mt-14 hidden font-mono text-[0.7rem] uppercase tracking-[0.15em] text-white/40 md:block'>
					Archivio
				</p>

				<nav
					className='mt-3 hidden flex-col border-b border-white/15 md:flex'
					aria-label='Navigazione principale'
				>
					{navigationItems.map((category, index) => {
						const slug = category.slug?.current;
						if (!slug) return null;

						const href = `/${slug}`;
						const isActive =
							pathname === href || pathname.startsWith(`${href}/`);

						return (
							<Link
								key={category._id}
								href={href}
								aria-current={isActive ? 'page' : undefined}
								className={[
									'group grid grid-cols-[2.25rem_1fr] items-baseline border-t border-white/15 py-3',
									'text-sm uppercase tracking-[0.03em] transition-colors',
									'hover:text-purple-300',
									'focus-visible:outline-2 focus-visible:outline-offset-4',
									isActive ? 'text-purple-300' : 'text-white',
								].join(' ')}
							>
								<span className='font-mono text-[0.65rem] text-white/40 group-hover:text-current'>
									{String(index + 1).padStart(2, '0')}
								</span>

								<span>{category.title}</span>
							</Link>
						);
					})}
				</nav>

				<button
					type='button'
					aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
					aria-expanded={isOpen}
					aria-controls='primary-navigation-mobile'
					onClick={() => setIsOpen((open) => !open)}
					className='flex flex-col gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 md:hidden'
				>
					<span className='h-px w-6 bg-white' aria-hidden='true' />
					<span className='h-px w-6 bg-white' aria-hidden='true' />
					<span className='h-px w-6 bg-white' aria-hidden='true' />
				</button>
			</div>

			{isOpen && (
				<nav
					id='primary-navigation-mobile'
					aria-label='Navigazione mobile'
					className='border-t border-white/20 px-4 pb-4 md:hidden'
				>
					{navigationItems.map((category, index) => {
						const slug = category.slug?.current;
						if (!slug) return null;

						const href = `/${slug}`;
						const isActive =
							pathname === href || pathname.startsWith(`${href}/`);

						return (
							<Link
								key={category._id}
								href={href}
								aria-current={isActive ? 'page' : undefined}
								onClick={() => setIsOpen(false)}
								className={[
									'grid grid-cols-[2.25rem_1fr] border-b border-white/15 py-3',
									'text-sm uppercase',
									'focus-visible:outline-2 focus-visible:outline-offset-4',
									isActive ? 'text-purple-300' : 'text-white',
								].join(' ')}
							>
								<span className='font-mono text-[0.65rem] text-white/40'>
									{String(index + 1).padStart(2, '0')}
								</span>

								<span>{category.title}</span>
							</Link>
						);
					})}
				</nav>
			)}
		</header>
	);
}

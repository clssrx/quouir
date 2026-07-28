'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import type { CATEGORIES_LIST_QUERY_RESULT } from '@/sanity/types';

type NavbarProps = {
	categories: CATEGORIES_LIST_QUERY_RESULT;
};

export default function Navbar({ categories }: NavbarProps) {
	const [isOpen, setIsOpen] = useState(false);

	const pathname = usePathname();

	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLElement>(null);
	const wasOpen = useRef(false);

	const navigationItems = categories.filter(
		(category) => category.slug?.current,
	);

	useEffect(() => {
		if (!isOpen) {
			if (wasOpen.current) {
				menuButtonRef.current?.focus();
			}

			wasOpen.current = false;

			return;
		}

		wasOpen.current = true;

		document.body.style.overflow = 'hidden';

		const firstLink =
			menuRef.current?.querySelector<HTMLAnchorElement>('a[href]');

		firstLink?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	return (
		<header className='sticky top-0 z-50 border-b border-white/15 bg-black md:fixed md:inset-y-0 md:left-0 md:w-64 md:border-r md:border-b-0'>
			{/* Mobile header */}
			<div className='flex h-14 items-center justify-between px-4 md:hidden'>
				<Link
					href='/'
					aria-label="Vai alla homepage di QU'OUÏR"
					className='inline-flex min-h-11 items-center text-xl font-semibold uppercase tracking-[-0.04em] transition-colors hover:text-purple-300 active:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-4'
					onClick={() => setIsOpen(false)}
				>
					QU&apos;OUÏR
				</Link>

				<button
					type='button'
					ref={menuButtonRef}
					aria-expanded={isOpen}
					aria-controls='mobile-navigation'
					onClick={() => setIsOpen((open) => !open)}
					className='min-h-11 px-2 font-mono text-xs uppercase tracking-widest transition-colors hover:text-purple-300 active:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-2'
				>
					{isOpen ? 'Chiudi' : 'Menu'}
				</button>
			</div>

			{/* Mobile menu */}
			{isOpen && (
				<nav
					ref={menuRef}
					id='mobile-navigation'
					aria-label='Navigazione principale'
					className='fixed inset-x-0 top-14 bottom-0 overflow-y-auto bg-black px-4 pb-8 md:hidden'
				>
					<p className='py-5 font-mono text-xs uppercase tracking-[0.14em] text-white/60'>
						Indice
					</p>

					<div className='border-b border-white/15'>
						{navigationItems.map((category, index) => {
							const slug = category.slug?.current;

							if (!slug) {
								return null;
							}

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
										'grid min-h-14 grid-cols-[2.5rem_minmax(0,1fr)] items-baseline border-t border-white/15 py-4',
										'text-2xl uppercase leading-none tracking-[-0.03em]',
										'transition-colors duration-150',
										'active:bg-white/5 active:text-purple-300',
										'focus-visible:outline-2 focus-visible:-outline-offset-2',
										isActive ? 'text-purple-300' : 'text-white',
									].join(' ')}
								>
									<span className='font-mono text-[0.65rem] tracking-normal text-white/60'>
										{String(index + 1).padStart(2, '0')}
									</span>

									<span>{category.title}</span>
								</Link>
							);
						})}
					</div>
				</nav>
			)}

			{/* Desktop archive rail */}
			<div className='hidden h-full flex-col px-5 py-5 md:flex'>
				<Link
					href='/'
					aria-label="Vai alla homepage di QU'OUÏR"
					className='text-2xl font-semibold uppercase tracking-[-0.04em] transition-colors hover:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-4'
				>
					QU&apos;OUÏR
				</Link>

				<p className='mt-14 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-white/60'>
					Indice
				</p>

				<nav
					aria-label='Navigazione principale'
					className='mt-3 flex flex-col border-b border-white/15'
				>
					{navigationItems.map((category, index) => {
						const slug = category.slug?.current;

						if (!slug) {
							return null;
						}

						const href = `/${slug}`;

						const isActive =
							pathname === href || pathname.startsWith(`${href}/`);

						return (
							<Link
								key={category._id}
								href={href}
								aria-current={isActive ? 'page' : undefined}
								className={[
									'group grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline border-t border-white/15 py-3',
									'text-sm uppercase tracking-[0.03em]',
									'transition-colors hover:text-purple-300',
									'focus-visible:outline-2 focus-visible:outline-offset-4',
									isActive ? 'text-purple-300' : 'text-white',
								].join(' ')}
							>
								<span className='font-mono text-[0.65rem] text-white/60 group-hover:text-current'>
									{String(index + 1).padStart(2, '0')}
								</span>

								<span className='min-w-0 wrap-break-word'>
									{category.title}
								</span>
							</Link>
						);
					})}
				</nav>
			</div>
		</header>
	);
}

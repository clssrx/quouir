import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import type { NavigationItem } from './Navbar';

type MobileNavbarProps = {
	items: NavigationItem[];
};

export default function MobileNavbar({ items }: MobileNavbarProps) {
	const [isOpen, setIsOpen] = useState(false);

	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLElement>(null);
	const wasOpen = useRef(false);

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
		<>
			<div className='flex h-14 items-center justify-between px-4 md:hidden'>
				<Link
					href='/'
					onClick={() => setIsOpen(false)}
					className='mobile-navbar-brand font-medium uppercase tracking-[-0.04em]'
				>
					QU&apos;OUÏR
				</Link>

				<button
					type='button'
					ref={menuButtonRef}
					aria-expanded={isOpen}
					aria-controls='mobile-navigation'
					onClick={() => setIsOpen((open) => !open)}
					className='ml-auto min-h-11 px-2 font-mono text-xs uppercase tracking-widest transition-colors hover:text-purple-300 active:text-purple-300 focus-visible:outline-2 focus-visible:outline-offset-2'
				>
					{isOpen ? 'Chiudi' : 'Menu'}
				</button>
			</div>

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
						{items.map((item, index) => (
							<Link
								key={item.id}
								href={item.href}
								aria-current={item.isActive ? 'page' : undefined}
								onClick={() => setIsOpen(false)}
								className={[
									'grid min-h-14 grid-cols-[2.5rem_minmax(0,1fr)] items-baseline border-t border-white/15 py-4',
									'text-2xl uppercase leading-none tracking-[-0.03em]',
									'transition-colors duration-150',
									'active:bg-white/5 active:text-purple-300',
									'focus-visible:outline-2 focus-visible:-outline-offset-2',
									item.isActive ? 'text-purple-300' : 'text-white',
								].join(' ')}
							>
								<span className='font-mono text-[0.65rem] tracking-normal text-white/60'>
									{String(index + 1).padStart(2, '0')}
								</span>

								<span>{item.title}</span>
							</Link>
						))}
					</div>
				</nav>
			)}
		</>
	);
}

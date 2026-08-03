import Link from 'next/link';

import type { NavigationItem } from './Navbar';

type DesktopNavbarProps = {
	items: NavigationItem[];
};

export default function DesktopNavbar({ items }: DesktopNavbarProps) {
	return (
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
				{items.map((item, index) => (
					<Link
						key={item.id}
						href={item.href}
						aria-current={item.isActive ? 'page' : undefined}
						className={[
							'group grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline border-t border-white/15 py-3',
							'text-sm uppercase tracking-[0.03em]',
							'transition-colors hover:text-purple-300',
							'focus-visible:outline-2 focus-visible:outline-offset-4',
							item.isActive ? 'text-purple-300' : 'text-white',
						].join(' ')}
					>
						<span className='font-mono text-[0.65rem] text-white/60 group-hover:text-current'>
							{String(index + 1).padStart(2, '0')}
						</span>

						<span className='min-w-0 wrap-break-word'>{item.title}</span>
					</Link>
				))}
			</nav>
		</div>
	);
}

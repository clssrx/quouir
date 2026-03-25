'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CATEGORIES_LIST_QUERYResult } from '@/sanity/types';

type NavbarProps = {
	categories: CATEGORIES_LIST_QUERYResult;
};

export default function Navbar({ categories }: NavbarProps) {
	const [isOpen, setIsOpen] = useState(false);

	if (!categories.length) return null;

	return (
		<nav className='backdrop-blur-sm border-b border-white/10 mb-8'>
			<div className='container mx-auto max-w-5xl px-6 py-4 flex items-center justify-between'>
				{/* Logo */}
				<Link href='/' className='text-xl font-bold'>
					QU'OUÏR
				</Link>

				{/* Desktop Menu */}
				<div className='hidden md:flex gap-6'>
					{categories
						.filter((c) => c.slug?.current)
						.map((category) => (
							<Link
								key={category._id}
								href={`/${category.slug.current}`}
								className='text-sm text-white/70 hover:text-white transition'
							>
								{category.title.toUpperCase()}
							</Link>
						))}
				</div>

				{/* Mobile Hamburger */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className='md:hidden flex flex-col gap-1'
					aria-label='Toggle menu'
				>
					<span className='w-6 h-0.5 bg-white' />
					<span className='w-6 h-0.5 bg-white' />
					<span className='w-6 h-0.5 bg-white' />
				</button>
			</div>

			{/* Mobile Dropdown */}
			{isOpen && (
				<div className='md:hidden px-6 pb-4 flex flex-col gap-4 items-end'>
					{categories
						.filter((c) => c.slug?.current)
						.map((category) => (
							<Link
								key={category._id}
								href={`/${category.slug.current}`}
								onClick={() => setIsOpen(false)}
								className='text-sm text-white/70 hover:text-white transition'
							>
								{category.title.toUpperCase()}
							</Link>
						))}
				</div>
			)}
		</nav>
	);
}

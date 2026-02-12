import { SanityLive } from '@/sanity/lib/live';

export default function FrontendLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			{/* <Navbar /> */}
			<main className='container mx-auto'>{children}</main>
			<SanityLive />
			{/* <Footer /> */}
		</>
	);
}

import type { Metadata } from 'next';
import { Geist_Mono, Inter_Tight } from 'next/font/google';

import './globals.css';

const interTight = Inter_Tight({
	variable: '--font-inter-tight',
	subsets: ['latin'],
	display: 'swap',
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL('https://www.quouir.com'),

	title: {
		default: "QU'OUÏR",
		template: "%s | QU'OUÏR",
	},

	description:
		"QU'OUÏR è una rivista di filosofia, un archivio di pratiche discorsive e un laboratorio culturale e politico.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='it'>
			<body
				className={`${interTight.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}

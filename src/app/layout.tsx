import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
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
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
			>
				{children}
			</body>
		</html>
	);
}

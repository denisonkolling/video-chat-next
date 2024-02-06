import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import { SocketProvider } from '@/context/SocketContext';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Video Chat!',
	description: 'Connecting people...',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={rubik.className}>
				<SocketProvider>{children}</SocketProvider>
			</body>
		</html>
	);
}

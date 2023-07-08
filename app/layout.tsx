import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/auth-provider'
import { Inter } from 'next/font/google'
import MainNav from '@/components/main-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Next Social',
	description: 'A truly NEXT generation social platform.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<AuthProvider>
			<html lang='en'>
				<body className={inter.className}>
					<ThemeProvider attribute='class' forcedTheme='dark'>
						<header>
							<MainNav />
						</header>
						<div>{children}</div>
					</ThemeProvider>
				</body>
			</html>
		</AuthProvider>
	)
}

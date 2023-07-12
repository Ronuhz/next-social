import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/components/auth-provider'
import { Inter } from 'next/font/google'
import MainNav from '@/components/main-nav'
import { Toaster } from '@/components/ui/toaster'

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
			<html
				lang='en'
				className='h-full w-full antialiased'
				suppressHydrationWarning
			>
				<body className={`${inter.className}`}>
					<ThemeProvider attribute='class' defaultTheme='dark'>
						<MainNav />
						<main>
							{children}
							<Toaster />
						</main>
					</ThemeProvider>
				</body>
			</html>
		</AuthProvider>
	)
}

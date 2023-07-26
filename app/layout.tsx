import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { Inter } from 'next/font/google'
import MainNav from '@/components/main-nav'
import { Toaster } from '@/components/ui/toaster'
import QueryProvider from '@/components/providers/query-provider'
import IOSSplashes from '@/public/assets/splashes/ios-splashes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'NEXT Social',
	description: 'A truly NEXT generation social platform.',
	appleWebApp: { statusBarStyle: 'black-translucent' },
	viewport: { initialScale: 1, viewportFit: 'cover', userScalable: false },
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
				className='h-full w-full select-none antialiased'
				style={{ WebkitTapHighlightColor: 'transparent' }}
				suppressHydrationWarning
			>
				<head>
					<IOSSplashes />
					<link rel='manifest' href='/site.webmanifest' />
				</head>
				<QueryProvider>
					<body className={`${inter.className}`}>
						<ThemeProvider attribute='class' defaultTheme='dark'>
							<MainNav />
							<main className='mt-14 standalone:mt-24 standalone:sm:mt-14'>
								{children}
								<Toaster />
							</main>
						</ThemeProvider>
					</body>
				</QueryProvider>
			</html>
		</AuthProvider>
	)
}

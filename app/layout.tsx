import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MainNav from '@/components/main-nav'
import { Toaster } from '@/components/ui/toaster'
import AppleSplashes from '@/public/assets/splash/apple-splashes'
import Providers from '@/components/providers'

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
		<html
			lang='en'
			className='h-full w-full select-none antialiased'
			style={{ WebkitTapHighlightColor: 'transparent' }}
			suppressHydrationWarning
		>
			<head>
				<AppleSplashes />
				<link rel='manifest' href='/manifest.json' />
			</head>
			<body className={`${inter.className}`}>
				<Providers>
					<MainNav />
					<main className='mt-14 standalone:mt-24 standalone:sm:mt-14'>
						{children}
						<Toaster />
					</main>
				</Providers>
			</body>
		</html>
	)
}

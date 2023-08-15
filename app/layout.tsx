import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MainNav from '@/components/nav/main-nav'
import { Toaster } from '@/components/ui/toaster'
import AppleSplashes from '@/public/assets/splash/apple-splashes'
import Providers from '@/components/providers'
import NewPostButton from '@/components/buttons/new-post/button'
import { SignedIn } from '@/components/auth-helpers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'NEXT Social',
	description: 'A truly NEXT generation social platform.',
	appleWebApp: { statusBarStyle: 'black-translucent' },
	manifest: '/manifest.json',
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
			<body className={`${inter.className} standalone:safe-top-as-margin`}>
				<Providers>
					<MainNav />
					<main className='mt-14'>
						<div className='fixed bottom-1 right-1 m-4 block sm:hidden'>
							<SignedIn>
								<NewPostButton />
							</SignedIn>
						</div>
						{children}
						<Toaster />
					</main>
				</Providers>
			</body>
		</html>
	)
}

import { SignInButton } from '@/components/buttons/auth-buttons'
import { Separator } from '@/components/ui/separator'
import Feed from '@/components/feed'
import { getSession } from '@/lib/session'
import RefreshButton from '@/components/buttons/refresh-button'
import { SignedIn, SignedOut } from '@/components/auth-helpers'
import { Suspense } from 'react'

export default async function Home() {
	return (
		<>
			<SignedOut>
				<section className='flex h-[60vh] flex-col items-center justify-center'>
					<h1 className='balance pb-1 pt-20 text-center text-4xl font-extrabold'>
						The NEXT gen social platform
					</h1>
					<p className='balance font-sem text-center text-muted-foreground'>
						Discover the latest buzz. Connect with friends and explore new
						horizons. Join our community and share your experiences.
					</p>
					<Separator className='my-2 h-[2px] w-[60vw]' />
					<p className='pb-2'>Start your journey by logging in</p>
					<SignInButton size='default' />
				</section>
			</SignedOut>
			<SignedIn>
				<section className='flex flex-col items-center justify-center '>
					<div className='w-[95vw] space-y-2 sm:w-[32rem]'>
						<div className='flex h-full items-center justify-between pt-3'>
							<h1 className='text-xl font-semibold sm:text-2xl'>FEED</h1>
							<RefreshButton />
						</div>
						<Suspense fallback={<p>Loading FEED...</p>}>
							<AsyncFeed />
						</Suspense>
					</div>
				</section>
			</SignedIn>
		</>
	)
}

const AsyncFeed = async () => {
	const session = await getSession()

	return <Feed session={session!} />
}

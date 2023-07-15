import { SignInButton } from '@/components/buttons/auth-buttons'
import { Separator } from '@/components/ui/separator'
import Feed from '@/components/feed'
import { getSession } from '@/lib/session'

export default async function Home() {
	const session = await getSession()

	if (!session) {
		return (
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
		)
	}

	return (
		<section className='flex flex-col items-center justify-center '>
			<div className='w-[95vw] gap-4 space-y-4 sm:w-[32rem]'>
				<h1 className='mr-auto pt-3 text-xl font-semibold sm:text-2xl'>FEED</h1>
				<Feed session={session} />
			</div>
		</section>
	)
}

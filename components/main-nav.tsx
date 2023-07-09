import { SignInButton, SignOutButton } from './auth-buttons'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import { Separator } from './ui/separator'

const MainNav = async () => {
	const session = await getServerSession(authOptions)
	return (
		<>
			<div className='w-full px-8 py-3'>
				<nav className=' flex flex-row items-center justify-between'>
					<Link href='/'>
						<h1 className='text-2xl font-bold'>NEXT Social</h1>
					</Link>
					<ul className='inline-flex items-center gap-3'>
						<li key='signButton'>
							{!session ? <SignInButton /> : <SignOutButton />}
						</li>
						{session && (
							<li key='profile'>
								<Link href={`/profile`}>
									<img
										src={session?.user?.image ?? ''}
										alt='My Profile'
										className='h-8 w-8 overflow-hidden rounded-full'
									/>
								</Link>
							</li>
						)}
					</ul>
				</nav>
			</div>
			<Separator />
		</>
	)
}

export default MainNav

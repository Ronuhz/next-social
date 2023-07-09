import { SignInButton, SignOutButton } from './auth-buttons'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import { Separator } from './ui/separator'

const MainNav = async () => {
	const session = await getServerSession(authOptions)
	return (
		<>
			<div className='w-full py-3 px-8'>
				<nav className='flex flex-row items-center justify-between'>
					<Link href='/'>
						<h1 className='font-bold text-2xl'>NEXT Social</h1>
					</Link>
					<ul className='inline-flex items-center gap-3'>
						<li>{!session ? <SignInButton /> : <SignOutButton />}</li>
						{session && (
							<li>
								<Link href={`/profile`}>
									<img
										src={session?.user?.image ?? ''}
										alt='My Profile'
										className='rounded-full overflow-hidden h-8 w-8'
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

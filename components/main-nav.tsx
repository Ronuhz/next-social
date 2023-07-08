import { SignInButton } from './auth-buttons'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'

const MainNav = async () => {
	const session = await getServerSession(authOptions)
	return (
		<div className='w-full border-b-[1px] border-slate-700 py-3 px-8'>
			<nav className='flex flex-row items-center justify-between'>
				<Link href='/'>
					<h1 className='font-bold text-2xl'>NEXT Social</h1>
				</Link>
				<ul className='inline-flex items-center gap-3'>
					<li>
						{!session ? (
							<SignInButton />
						) : (
							<Link href={`/profile`}>
								<img
									src={session?.user?.image ?? ''}
									alt='My Profile'
									className='rounded-full overflow-hidden h-8 w-8'
								/>
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default MainNav

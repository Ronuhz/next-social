import Link from 'next/link'
import { Separator } from '../ui/separator'
import { getCurrentUser } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import ProfilePic from '@/app/user/_components/profile-pic'
import { SignedIn } from '../auth-helpers'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { SignOutDropdownItem } from '../buttons/auth-buttons'
import { User } from 'lucide-react'

const MobileNav = () => {
	return (
		<header className='fixed top-0 z-20 block w-screen sm:hidden'>
			<nav className='standalone:safe-top relative  flex min-h-[3.5rem] w-full items-center justify-center py-3 backdrop-blur-lg standalone:items-end'>
				<SignedIn>
					<Profile />
				</SignedIn>
				<Link href='/'>
					<h1 className='text-lg font-bold sm:text-2xl'>NEXT Social</h1>
				</Link>
			</nav>
			<Separator />
		</header>
	)
}

const Profile = async () => {
	const currentUser = await getCurrentUser()

	const user = await prisma.user.findUnique({
		where: { email: currentUser?.email! },
		select: { username: true, profilePicture: true },
	})

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='absolute left-1 m-2 mt-3 rounded-full'
				>
					<ProfilePic
						username={user?.username ?? ''}
						image={user?.profilePicture}
						className='standalone:safe-top-as-margin h-10 w-10'
					/>
				</Button>
			</SheetTrigger>
			<SheetContent
				side='left'
				className='standalone:safe-top-as-margin flex flex-col'
			>
				<SheetEntry href='/user'>
					<User className='mr-2 h-4 w-4' />
					Profile
				</SheetEntry>
				<SheetEntry href='/'>
					<SignOutDropdownItem />
				</SheetEntry>
			</SheetContent>
		</Sheet>
	)
}

const SheetEntry = ({
	href,
	children,
}: {
	href: string
	children: React.ReactNode
}) => {
	return (
		<Link href={href}>
			<SheetClose className='flex items-center'>{children}</SheetClose>
		</Link>
	)
}

export default MobileNav

import Link from 'next/link'
import { Separator } from '../ui/separator'
import { getCurrentUser } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import ProfilePic from '@/app/user/_components/profile-pic'
import { SignedIn } from '../auth-helpers'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from '../ui/sheet'
import { Button } from '../ui/button'
import { LogoutSheetItem } from '../buttons/auth-buttons'
import { Settings, User } from 'lucide-react'

const MobileNav = () => {
	return (
		<header className='fixed top-0 z-20 block w-screen sm:hidden'>
			<nav className='standalone:safe-top relative flex min-h-[3.5rem] w-full items-center justify-center py-3 backdrop-blur-lg standalone:items-end'>
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
		// TODO: Sheet looks off on standalone, it needs to be higher up
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='absolute bottom-2 left-3 rounded-full'
				>
					<ProfilePic
						username={user?.username ?? ''}
						image={user?.profilePicture}
						className='h-10 w-10'
					/>
				</Button>
			</SheetTrigger>
			<SheetContent
				side='left'
				className='standalone:safe-top-as-margin flex flex-col px-12'
			>
				<SheetHeader>
					<div className='mb-5 flex flex-col items-start justify-center'>
						<Link href='/user'>
							<SheetClose>
								<ProfilePic
									username={user?.username ?? ''}
									image={user?.profilePicture}
									className='h-14 w-14'
								/>
								<p className='mt-2 text-xl font-bold'>{user?.username ?? ''}</p>
							</SheetClose>
						</Link>
					</div>
				</SheetHeader>
				<SheetEntry href='/user'>
					<User className='mr-4' size={24} />
					Profile
				</SheetEntry>
				<SheetEntry href='/settings'>
					<Settings className='mr-4' size={24} />
					Settings
				</SheetEntry>
				<SheetEntry href='/'>
					<LogoutSheetItem />
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
			<SheetClose className='flex items-center text-2xl'>{children}</SheetClose>
		</Link>
	)
}

export default MobileNav

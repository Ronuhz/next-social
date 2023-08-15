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
import { CalendarDays, Settings, User } from 'lucide-react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { getMonthAndYearFromDate } from '@/lib/utils'

export const dynamic = 'static'

const MobileNav = () => {
	return (
		<header className='fixed top-0 z-20 w-screen sm:hidden'>
			<nav className='standalone:safe-top flex min-h-[3.5rem] w-full items-center justify-center py-3 backdrop-blur-lg standalone:items-end'>
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
		select: { username: true, profilePicture: true, createdAt: true },
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

			{/* Visible Sheet */}
			<SheetContent
				side='left'
				className='standalone:safe-top flex flex-col pl-12'
				autoFocus={false}
				hideCloseButton={true}
			>
				{/* User information */}
				<SheetHeader className='relative my-2'>
					<div className='flex flex-col items-start justify-center'>
						<Link href='/user'>
							<SheetClose>
								<ProfilePic
									username={user?.username ?? ''}
									image={user?.profilePicture}
									className='h-14 w-14'
								/>
								<p className='mt-2 text-left text-xl font-bold'>
									{user?.username ?? ''}
								</p>
								<p className='inline-flex items-center gap-1 text-base text-muted-foreground'>
									<CalendarDays size={18} />
									Joined {getMonthAndYearFromDate(user?.createdAt!)}
								</p>
							</SheetClose>
						</Link>
					</div>
					<SheetClose className=' absolute -right-3 -top-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
						<Cross2Icon className='h-4 w-4' />
						<span className='sr-only'>Close</span>
					</SheetClose>
				</SheetHeader>

				{/* Entries aka. actions (links) */}
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

import { SignOutDropdownItem } from './buttons/auth-buttons'
import Link from 'next/link'
import { Separator } from './ui/separator'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { NewPostButton } from './buttons/new-post-button'
import ProfilePic from '../app/profile/_components/profile-pic'
import { getCurrentUser } from '@/lib/session'
import { User, LogOut } from 'lucide-react'

interface ProfileDropdownProps {
	currentUser: {
		name?: string | null | undefined
		email?: string | null | undefined
		image?: string | null | undefined
	}
}

const MainNav = async () => {
	const currentUser = await getCurrentUser()
	return (
		<header className='sticky top-0 z-20'>
			<nav className=' flex w-full flex-row items-center justify-between px-6 pb-1 pt-2 backdrop-blur-lg sm:px-8'>
				<Link href='/'>
					<h1 className='text-lg font-bold sm:text-2xl'>NEXT Social</h1>
				</Link>
				{currentUser && (
					<ul className='inline-flex items-center gap-3'>
						<li className='mb-1'>
							<NewPostButton />
						</li>
						<li>
							<ProfileDropdown currentUser={currentUser} />
						</li>
					</ul>
				)}
			</nav>
			<Separator />
		</header>
	)
}

const ProfileDropdown = ({ currentUser }: ProfileDropdownProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon'>
					<ProfilePic
						name={currentUser?.name}
						image={currentUser?.image}
						className='h-8 w-8'
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='mr-2 w-56'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href='/profile'>
						<DropdownMenuItem className='cursor-pointer'>
							<User className='mr-2 h-4 w-4' />
							<span>Profile</span>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<LogOut className='mr-2 h-4 w-4' />
						<SignOutDropdownItem />
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default MainNav

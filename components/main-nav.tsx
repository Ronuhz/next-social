import { SignOutDropdownItem } from './buttons'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
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
import { NewPostButton } from './buttons'
import ProfilePic from './profile-pic'

const MainNav = async () => {
	const session = await getServerSession(authOptions)
	return (
		<>
			<div className='w-full px-6 pb-1 pt-2 backdrop-blur-lg sm:px-8'>
				<nav className=' flex flex-row items-center justify-between'>
					<Link href='/'>
						<h1 className='text-lg font-bold sm:text-2xl'>NEXT Social</h1>
					</Link>
					<ul className='inline-flex items-center gap-3'>
						{/* <li>{!session && <SignInButton />}</li> */}
						{session && (
							<>
								<li className='mb-1'>
									<NewPostButton />
								</li>
								<li>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='ghost' size='icon'>
												<ProfilePic
													name={session?.user?.name}
													image={session?.user?.image}
													className='h-8 w-8'
												/>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className='mr-2 w-40'>
											<DropdownMenuLabel>My Account</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuGroup>
												<Link href='/profile'>
													<DropdownMenuItem className='cursor-pointer'>
														Profile
													</DropdownMenuItem>
												</Link>
											</DropdownMenuGroup>
											<DropdownMenuGroup>
												<DropdownMenuItem>
													<SignOutDropdownItem />
												</DropdownMenuItem>
											</DropdownMenuGroup>
										</DropdownMenuContent>
									</DropdownMenu>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
			<Separator />
		</>
	)
}

export default MainNav

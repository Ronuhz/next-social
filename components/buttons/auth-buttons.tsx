'use client'

import { LogOut } from 'lucide-react'
import { Button, ButtonProps } from '../ui/button'
import { signIn, signOut } from 'next-auth/react'

export const SignInButton = (props: ButtonProps) => {
	return (
		<Button size='sm' {...props} onClick={() => signIn('google')}>
			Log In
		</Button>
	)
}

export const SignOutButton = () => {
	return (
		<Button variant='outline' size='sm' onClick={() => signOut()}>
			Log Out
		</Button>
	)
}

export const SignOutDropdownItem = () => {
	return (
		<span
			className='flex w-full cursor-pointer items-center'
			onClick={() => signOut()}
		>
			<LogOut className='mr-2 h-4 w-4' />
			<span>Log Out</span>
		</span>
	)
}

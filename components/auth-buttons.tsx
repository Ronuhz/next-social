'use client'

import { Button, ButtonProps } from './ui/button'
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
		<div className='cursor-pointer' onClick={() => signOut()}>
			Log Out
		</div>
	)
}

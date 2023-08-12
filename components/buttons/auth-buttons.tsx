'use client'

import { Loader2, LogOut } from 'lucide-react'
import { Button, ButtonProps } from '../ui/button'
import { signIn, signOut } from 'next-auth/react'
import { useState } from 'react'

export const SignInButton = (props: ButtonProps) => {
	const [isSigningIn, setIsSigningIn] = useState(false)
	return (
		<Button
			size='sm'
			disabled={isSigningIn}
			onClick={() => {
				setIsSigningIn(true)
				signIn('google')
			}}
			{...props}
			className='flex items-center justify-center transition-all'
		>
			{isSigningIn ? <Loader2 className='h-5 w-5 animate-spin' /> : 'Login'}
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
			<span>Logout</span>
		</span>
	)
}

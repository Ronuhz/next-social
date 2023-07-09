'use client'

import { Button } from './ui/button'
import { signIn, signOut } from 'next-auth/react'

export const SignInButton = () => {
	return (
		<Button size='sm' onClick={() => signIn('google')}>
			Sign In
		</Button>
	)
}

export const SignOutButton = () => {
	return (
		<Button variant='outline' size='sm' onClick={() => signOut()}>
			Sign Out
		</Button>
	)
}

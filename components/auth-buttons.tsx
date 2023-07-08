'use client'

import { Button } from './ui/button'
import { signIn, signOut } from 'next-auth/react'

export const SignInButton = () => {
	return <Button onClick={() => signIn('google')}>Sign In</Button>
}

export const SignOutButton = () => {
	return <Button onClick={() => signOut()}>Sign Out</Button>
}

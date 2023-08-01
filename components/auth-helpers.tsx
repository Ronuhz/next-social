'use client'

import { useSession } from 'next-auth/react'

type Props = {
	children: React.ReactNode
}

export const SignedOut = ({ children }: Props) => {
	const { data: session, status } = useSession()
	if (status === 'loading' || status === 'unauthenticated') {
		return <>{children}</>
	} else return <></>
}

export const SignedIn = ({ children }: Props) => {
	const { data: session, status } = useSession()
	if (status === 'authenticated') {
		return <>{children}</>
	} else return <></>
}

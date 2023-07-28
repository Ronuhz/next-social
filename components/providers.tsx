'use client'

import { useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

interface Props {
	children: React.ReactNode
}

const Providers = ({ children }: Props) => {
	const [client] = useState(new QueryClient())
	return (
		<SessionProvider>
			<QueryClientProvider client={client}>
				<ThemeProvider attribute='class' forcedTheme='dark'>
					{children}
				</ThemeProvider>
			</QueryClientProvider>
		</SessionProvider>
	)
}

export default Providers

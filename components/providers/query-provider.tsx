'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

interface Props {
	children: React.ReactNode
}

const QueryProvider = ({ children }: Props) => {
	const [client] = useState(new QueryClient())
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default QueryProvider

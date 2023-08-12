//* Only used when the display mode is standalone aka. with PWAs (Progressive Web Applications)

'use client'
import { RotateCw } from 'lucide-react'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

const RefreshButton = () => {
	const queryClient = useQueryClient()
	const [isSpinning, setIsSpinning] = useState(false)

	const handleClick = () => {
		if (isSpinning) return

		setIsSpinning(true)
		queryClient.invalidateQueries({ queryKey: ['oldPosts'] })

		setTimeout(() => {
			setIsSpinning(false)
		}, 600) // 0.6 seconds (600 milliseconds)
	}

	return (
		<div
			onClick={handleClick}
			className={`${cn(
				buttonVariants({ variant: 'ghost', size: 'icon' })
			)} hidden cursor-pointer items-center justify-center standalone:flex`}
		>
			<RotateCw className={isSpinning ? 'animate-refresh-spin' : ''} />
		</div>
	)
}

export default RefreshButton

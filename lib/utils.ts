import { toast } from '@/components/ui/use-toast'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getTimeAgo(createdDate: Date) {
	const currentDate = new Date()
	const timeDifference = currentDate.getTime() - createdDate.getTime()

	const seconds = Math.floor(timeDifference / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)
	const months = Math.floor(days / 30)
	const years = Math.floor(months / 12)

	if (years > 0) {
		const options = { year: 'numeric', month: 'short', day: 'numeric' } as const
		const formattedDate = createdDate.toLocaleString('en-US', options)
		return `${formattedDate}`
	} else if (months > 0) {
		return `${months} m`
	} else if (days > 0) {
		return `${days} d`
	} else if (hours > 0) {
		return `${hours} h`
	} else if (minutes > 0) {
		return `${minutes} min`
	} else {
		return `Now`
	}
}

export function catchError(err: unknown) {
	return toast({
		variant: 'destructive',
		title: 'Uh oh! Something went wrong.',
		description: 'There was a problem with your request.',
	})
}

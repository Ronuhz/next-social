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

export function getMonthAndYearFromDate(date: Date) {
	const options = { year: 'numeric', month: 'long' } as const
	return date.toLocaleDateString('en-US', options)
}

export function shortenNumber(number: number): string {
	const abbreviations = ['', 'K', 'M', 'B', 'T']
	let tier = 0

	while (number >= 1000 && tier < abbreviations.length - 1) {
		number /= 1000
		tier++
	}

	let precision = 1
	if (tier === 1 && number >= 1 && number < 10) {
		precision = 3
	}

	const formattedNumber = number.toFixed(precision).replace(/\.?0+$/, '')

	return formattedNumber + abbreviations[tier]
}

export function catchError(err: unknown) {
	return toast({
		variant: 'destructive',
		title: 'Uh oh! Something went wrong.',
		description: 'There was a problem with your request.',
	})
}

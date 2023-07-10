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
		return `${years} y`
	} else if (months > 0) {
		return `${months} m`
	} else if (days > 0) {
		return `${days} d`
	} else if (hours > 0) {
		return `${hours} h`
	} else if (minutes > 0) {
		return `${minutes} min`
	} else {
		return `${seconds} s`
	}
}

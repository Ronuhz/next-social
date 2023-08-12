import { Card, CardContent, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

export const PostSkeleton = () => {
	return (
		<Card className='w-[95vw] sm:w-[32rem]'>
			<CardHeader>
				<div className='inline-flex items-center gap-4'>
					<Skeleton className='h-8 w-8 rounded-full' />
					<div className='space-y-2'>
						<Skeleton className='h-3 w-[150px]' />
						<Skeleton className='h-3 w-[100px]' />
					</div>
				</div>
			</CardHeader>
			<CardContent className='space-y-2'>
				<Skeleton className='w-6/7 h-3' />
				<Skeleton className='w-6/7 h-3' />
				<Skeleton className='w-6/7 h-3' />
				<Skeleton className='w-6/7 h-3' />
				<Skeleton className='w-6/7 h-3' />
				<Skeleton className='h-3 w-4/5' />
			</CardContent>
		</Card>
	)
}

export const ProfileSkeleton = () => {
	return (
		<div className='w-fit gap-4'>
			<Skeleton className='m-3 mr-auto h-6 w-40' />
			<div className='flex w-[95vw] flex-row items-center gap-4 rounded-xl border bg-card bg-opacity-50 p-3 text-card-foreground shadow sm:w-[32rem] sm:p-6'>
				<Skeleton className='h-[92px] w-[92px] rounded-full' />
				<div className='space-y-2'>
					<Skeleton className='h-5 w-24' />
					<div className='space-y-1'>
						<Skeleton className='h-4 w-80' />
						<Skeleton className='h-4 w-80' />
						<Skeleton className='h-4 w-60' />
						<Skeleton className='h-4 w-28' />
					</div>
				</div>
			</div>
		</div>
	)
}

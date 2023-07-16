import { Card, CardContent, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'

const PostSkeleton = () => {
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

export default PostSkeleton

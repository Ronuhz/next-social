import { ProfileSkeleton } from '@/components/skeletons'

const Loading = () => {
	return (
		<section className='flex flex-col items-center justify-center'>
			<ProfileSkeleton />
		</section>
	)
}

export default Loading

import { getTimeAgo } from '@/lib/utils'
import { Card, CardContent, CardHeader } from './ui/card'
import Link from 'next/link'
import ProfilePic from './profile-pic'

export const revalidate = 216000

interface Props {
	userId: string
	name: string | null
	image: string | null
	content: string | null
	createdAt: Date
}

// TODO: Make sure that it works with long texts

const Post = ({ userId, name, image, content, createdAt }: Props) => {
	return (
		<Card className='w-[22rem] sm:w-[32rem]'>
			<CardHeader>
				<Link
					href={`/profile/${userId}`}
					className={`inline-flex items-center gap-4`}
				>
					<ProfilePic name={name} image={image} />
					{/* <img
						src={image ?? ''}
						alt='Profile'
						className='h-8 w-8 rounded-full'
					/> */}
					<div>
						<p className='font-semibold underline-offset-auto hover:underline'>
							{name}
						</p>
						<p className='text-sm text-muted-foreground '>
							{getTimeAgo(createdAt)}
						</p>
					</div>
				</Link>
			</CardHeader>
			<CardContent className='text-sm'>{content}</CardContent>
		</Card>
	)
}

export default Post

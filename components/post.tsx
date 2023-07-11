import { getTimeAgo } from '@/lib/utils'
import { Card, CardContent, CardHeader } from './ui/card'
import Link from 'next/link'
import ProfilePic from './profile-pic'
import { Session } from 'next-auth'
import { DeletePostButton } from './buttons'

export const revalidate = 216000

interface Props {
	postId: string
	userId: string
	userEmail: string
	name: string | null
	image: string | null
	content: string | null
	createdAt: Date
	session: Session | null
}

// TODO: Make sure that it works with long texts

const Post = ({
	postId,
	userId,
	userEmail,
	name,
	image,
	content,
	createdAt,
	session,
}: Props) => {
	return (
		<Card className='w-[22rem] sm:w-[32rem]'>
			<CardHeader>
				<div className='inline-flex items-center justify-between'>
					<Link
						href={`/profile/${userId}`}
						className={`inline-flex items-center gap-4`}
					>
						<ProfilePic name={name} image={image} className='h-8 w-8' />
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
					{session && userEmail === session?.user?.email && (
						<DeletePostButton postId={postId} userEmail={userEmail} />
					)}
				</div>
			</CardHeader>
			<CardContent className='text-sm'>{content}</CardContent>
		</Card>
	)
}

export default Post

import { getTimeAgo } from '@/lib/utils'
import { Card, CardContent, CardHeader } from './ui/card'
import Link from 'next/link'
import ProfilePic from '../app/profile/_components/profile-pic'
import { Session } from 'next-auth'
import { DeletePostButton } from './buttons'

export const revalidate = 216000

interface Props {
	post: {
		id: string
		content: string | null
		createdAt: Date
		userId: string
		user: {
			name: string | null
			image: string | null
			email: string | null
		}
	}
	session: Session | null
}

const Post = ({ post, session }: Props) => {
	return (
		<Card className='w-[22rem] sm:w-[32rem]'>
			<CardHeader>
				<div className='inline-flex items-center justify-between'>
					<Link
						href={`/profile/${post?.userId}`}
						className={`inline-flex items-center gap-4`}
					>
						<ProfilePic
							name={post?.user.name}
							image={post?.user.image}
							className='h-8 w-8'
						/>
						<div>
							<p className='font-semibold underline-offset-auto hover:underline'>
								{post?.user.name}
							</p>
							<p className='text-sm text-muted-foreground '>
								{getTimeAgo(post?.createdAt)}
							</p>
						</div>
					</Link>
					{session && post?.user.email === session?.user?.email && (
						<DeletePostButton postId={post?.id} userEmail={post?.user.email!} />
					)}
				</div>
			</CardHeader>
			<CardContent className='text-sm'>{post?.content}</CardContent>
		</Card>
	)
}

export default Post

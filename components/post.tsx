'use client'

import { getTimeAgo } from '@/lib/utils'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import Link from 'next/link'
import ProfilePic from '../app/profile/_components/profile-pic'
import { Session } from 'next-auth'
import { DeletePostButton } from './buttons/delete-post-button'
import Linkify from 'linkify-react'
import LikeButton from './buttons/like-button'
import { PostType } from '@/types'
import { Heart } from 'lucide-react'
import { useState } from 'react'

export const revalidate = 216000

interface Props {
	post: PostType
	session: Session | null
	queryKey: string[]
}

/**
 *
 * @param queryKey will be ['oldPosts', `posts OR profile-${userId}`]
 * *oldPosts is used to revalidate the feed and profile posts if a new post is created
 * *posts is used to revalidate posts on the feed if one gets deleted
 * *profile-${userId} is used to revalidate posts on the profile if one gets deleted
 */

const Post = async ({ post, session, queryKey }: Props) => {
	const isLikedByCurrentUser = post.likes.some(
		(like) =>
			like.postId === post.id && like.userId === (session?.user?.id ?? '')
	)
	return (
		<Card className='w-[95vw] sm:w-[32rem]'>
			<CardHeader>
				<div className='inline-flex items-center justify-between'>
					<Link
						href={`/profile/${post?.userId}`}
						className={`inline-flex items-center gap-4`}
					>
						<ProfilePic
							name={post?.user.name}
							image={post?.user.image}
							className='h-10 w-10'
						/>
						<div>
							<p className='font-semibold underline-offset-auto hover:underline'>
								{post?.user.name}
							</p>
							<p className='text-sm text-muted-foreground '>
								{getTimeAgo(new Date(post.createdAt))}
							</p>
						</div>
					</Link>
					{session && post?.userId === session?.user?.id && (
						<DeletePostButton postId={post?.id} queryKey={queryKey} />
					)}
				</div>
			</CardHeader>
			<CardContent className='whitespace-pre-line break-words text-sm visited:text-red-500'>
				<Linkify
					as='p'
					options={{
						className:
							'text-blue-400 font-normal visited:text-purple-500 hover:underline',
					}}
				>
					{post?.content}
				</Linkify>
			</CardContent>
			<CardFooter>
				{session ? (
					<LikeButton
						isLikedByCurrentUser={isLikedByCurrentUser}
						postId={post.id}
						userId={session?.user?.id}
						likeCount={post.likes.length}
					/>
				) : (
					<>
						<Heart height={20} width={20} />
						<span>{post.likes.length}</span>
					</>
				)}
			</CardFooter>
		</Card>
	)
}

export default Post

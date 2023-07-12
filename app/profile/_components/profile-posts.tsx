'use client'

import Post from '@/components/post'
import { Session } from 'next-auth'
import { PostType } from '@/types'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query'

interface Props {
	posts: PostType[]
	session: Session | null
}

// TODO: Implement InfiniteScroll

const ProfilePosts = ({ posts, session }: Props) => {
	return (
		<QueryClientProvider client={queryClient}>
			{posts.map((post) => (
				<Post key={post.id} post={post} session={session} />
			))}
		</QueryClientProvider>
	)
}

export default ProfilePosts

'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import Post from './post'
import { Session } from 'next-auth'
import InfiniteScroll from './Infinite-scroll'
import { queryClient } from '@/lib/query'
import PostSkeleton from './skeletons'
import { PostType } from '@/types'

interface Props {
	posts: PostType[]
	nextCursor: string
}

/**
 * *fetches the recent posts from the database
 * @param pageParam The current page number
 */
const fetchPosts = async ({ pageParam = 1 }) => {
	const res = await fetch(`/api/posts?perPage=20&cursor=${pageParam}`)
	const data: Props = await res.json()
	return data
}

const returnPosts = (page: Props, session: Session) => {
	return page.posts.map((post) => (
		<Post key={post.id} post={post} session={session} />
	))
}

const Feed = ({ session }: { session: Session }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<InfiniteScroll
				queryKeys={['posts']}
				fetchFunction={fetchPosts}
				returnFunction={(page: Props) => returnPosts(page, session)}
				loadingSkeleton={
					<>
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
					</>
				}
			/>
		</QueryClientProvider>
	)
}

export default Feed

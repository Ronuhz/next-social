'use client'

import Post from '@/components/post'
import { Session } from 'next-auth'
import { PostType } from '@/types'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query'
import InfiniteScroll from '@/components/Infinite-scroll'
import PostSkeleton from '@/components/skeletons'

interface Props {
	posts: PostType[]
	nextCursor: string
}

const fetchPosts = async ({ pageParam = 1 }, userId: string) => {
	const res = await fetch(
		`/api/posts?perPage=20&cursor=${pageParam}&userId=${userId}`
	)
	const data: Props = await res.json()
	console.log(data)
	return data
}

const returnPosts = (page: Props, session: Session | null) => {
	return page.posts.map((post) => (
		<Post key={post.id} post={post} session={session} />
	))
}

const ProfilePosts = ({
	userId,
	session,
}: {
	userId: string
	session: Session | null
}) => {
	return (
		<QueryClientProvider client={queryClient}>
			<InfiniteScroll
				queryKeys={['posts']}
				fetchFunction={({ pageParam }) => fetchPosts({ pageParam }, userId)}
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

export default ProfilePosts

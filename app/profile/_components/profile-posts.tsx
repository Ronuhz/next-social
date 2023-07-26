'use client'

import { Session } from 'next-auth'
import { PageType } from '@/types'
import InfiniteScroll from '@/components/Infinite-scroll'
import Post from '@/components/post'
import PostSkeleton from '@/components/skeletons'

const fetchPosts = async ({ pageParam = 1 }, userId: string) => {
	const res = await fetch(
		`/api/posts?perPage=20&cursor=${pageParam}&userId=${userId}`
	)
	const data: PageType = await res.json()
	return data
}

const returnPosts = (page: PageType, session: Session | null) => {
	return page.posts.map((post) => (
		<Post
			key={post.id}
			post={post}
			session={session}
			queryKey={[`oldPosts`, `profile-${post.userId}`]}
		/>
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
		<InfiniteScroll
			queryKeys={['oldPosts', `profile-${userId}`]}
			fetchFunction={({ pageParam }) => fetchPosts({ pageParam }, userId)}
			returnFunction={(page: PageType) => returnPosts(page, session)}
			loadingSkeleton={
				<>
					<PostSkeleton />
				</>
			}
		/>
	)
}

export default ProfilePosts

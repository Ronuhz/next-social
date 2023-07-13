'use client'

import Post from './post'
import { Session } from 'next-auth'
import InfiniteScroll from './Infinite-scroll'
import PostSkeleton from './skeletons'
import { PageType } from '@/types'
/**
 * *fetches the recent posts from the database
 * @param pageParam The current page number
 */
const fetchPosts = async ({ pageParam = 1 }) => {
	const res = await fetch(`/api/posts?perPage=2&cursor=${pageParam}`)
	const data: PageType = await res.json()
	return data
}

const returnPosts = (page: PageType, session: Session) => {
	return page.posts.map((post) => (
		<Post key={post.id} post={post} session={session} />
	))
}

const Feed = ({ session }: { session: Session }) => {
	return (
		<InfiniteScroll
			queryKeys={['posts']}
			fetchFunction={fetchPosts}
			returnFunction={(page: PageType) => returnPosts(page, session)}
			loadingSkeleton={
				<>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</>
			}
		/>
	)
}

export default Feed

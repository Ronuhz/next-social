import { prisma } from '@/lib/prisma'
import Post from './post'
import { getSession } from '@/lib/session'

const Feed = async () => {
	const session = await getSession()

	const posts = await prisma.post.findMany({
		include: {
			user: { select: { name: true, image: true, email: true } },
		},
		orderBy: { createdAt: 'desc' },
	})

	return (
		<>
			{posts.map((post) => (
				<Post key={post.id} post={post} session={session} />
			))}
		</>
	)
}

export default Feed

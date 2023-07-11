import { prisma } from '@/lib/prisma'
import Post from './post'

const Feed = async () => {
	const posts = await prisma.post.findMany({
		include: { user: { select: { id: true, name: true, image: true } } },
		orderBy: { createdAt: 'desc' },
	})

	return (
		<>
			{posts.map((post) => (
				<Post
					key={post.id}
					userId={post.userId}
					name={post.user.name}
					image={post.user.image}
					content={post.content}
					createdAt={post.createdAt}
				/>
			))}
		</>
	)
}

export default Feed

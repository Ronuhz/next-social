import { prisma } from '@/lib/prisma'
import Post from './post'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const Feed = async () => {
	const session = await getServerSession(authOptions)

	const posts = await prisma.post.findMany({
		include: {
			user: { select: { id: true, name: true, image: true, email: true } },
		},
		orderBy: { createdAt: 'desc' },
	})

	return (
		<>
			{posts.map((post) => (
				<Post
					key={post.id}
					postId={post.id}
					userId={post.userId}
					userEmail={post.user.email!}
					name={post.user.name}
					image={post.user.image}
					content={post.content}
					createdAt={post.createdAt}
					session={session}
				/>
			))}
		</>
	)
}

export default Feed

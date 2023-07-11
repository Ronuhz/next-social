import { prisma } from '@/lib/prisma'
import Post from './post'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

interface Props {
	id: string
}

const ProfilePosts = async ({ id }: Props) => {
	const session = await getServerSession(authOptions)
	const posts = await prisma.post.findMany({
		where: { userId: id },
		include: { user: { select: { name: true, email: true, image: true } } },
		orderBy: { createdAt: 'desc' },
	})

	return (
		<>
			{posts.map((post) => (
				<Post
					key={post.id}
					postId={post.id}
					content={post.content}
					createdAt={post.createdAt}
					image={post.user.image}
					name={post.user.name}
					userId={post.userId}
					userEmail={post.user.email!}
					session={session}
				/>
			))}
		</>
	)
}

export default ProfilePosts

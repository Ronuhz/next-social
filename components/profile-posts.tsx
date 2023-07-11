import { prisma } from '@/lib/prisma'
import Post from './post'

interface Props {
	id: string
}

const ProfilePosts = async ({ id }: Props) => {
	const posts = await prisma.post.findMany({
		where: { userId: id },
		include: { user: { select: { name: true, image: true } } },
	})

	return (
		<>
			{posts.map((post) => (
				<Post
					key={post.id}
					content={post.content}
					createdAt={post.createdAt}
					image={post.user.image}
					name={post.user.name}
					userId={post.userId}
				/>
			))}
		</>
	)
}

export default ProfilePosts

import { prisma } from '@/lib/prisma'
import Post from '@/components/post'
import { getSession } from '@/lib/session'

interface Props {
	id: string
}

const ProfilePosts = async ({ id }: Props) => {
	const session = await getSession()
	const posts = await prisma.post.findMany({
		where: { userId: id },
		include: { user: { select: { name: true, email: true, image: true } } },
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

export default ProfilePosts

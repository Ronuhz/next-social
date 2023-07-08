import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

interface Props {
	params: {
		id: string
	}
}

const Profile = async ({ params }: Props) => {
	const targetId = params.id

	const user = await prisma.user.findUnique({
		where: { id: targetId },
	})

	if (!user) {
		return <p>User not found</p>
	}

	return (
		<>
			<p>Logged in as: {user?.name}</p>
			<p>Email: {user?.email}</p>
			<p>
				Profile Image:{' '}
				<img
					src={user?.image ?? ''}
					width={64}
					height={64}
					alt='Profile Image'
				/>
			</p>
			<p>Bio: {user?.bio ?? ''}</p>
			<p>Location: {user?.location ?? ''}</p>
		</>
	)
}

export default Profile

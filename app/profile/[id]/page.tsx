import { prisma } from '@/lib/prisma'
import Profile from '@/components/profile'

interface Props {
	params: {
		id: string
	}
}

const ProfilePage = async ({ params }: Props) => {
	const targetId = params.id

	const user = await prisma.user.findUnique({
		where: { id: targetId },
	})

	if (!user) {
		return <p className='text-center'>User not found</p>
	}

	return (
		<section className='flex flex-col items-center justify-center'>
			<Profile user={user!} canBeEdited={false} />
		</section>
	)
}

export default ProfilePage

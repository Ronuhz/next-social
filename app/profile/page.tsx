import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Profile from './_components/profile'
import { getSession } from '@/lib/session'

export const revalidate = 300

export const metadata = {
	title: 'My Profile',
	description: 'View and Edit your profile.',
}

const ProfilePage = async () => {
	const session = await getSession()
	if (!session) {
		return redirect('/')
	}

	const user = await prisma.user.findUnique({
		where: { email: session?.user?.email! },
		select: {
			id: true,
			username: true,
			bio: true,
			location: true,
			email: true,
			image: true,
		},
	})

	return (
		<section className='flex flex-col items-center justify-center'>
			<Profile user={user!} />
		</section>
	)
}

export default ProfilePage

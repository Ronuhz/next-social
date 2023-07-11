import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import Profile from '@/components/profile'

export const revalidate = 300

export const metadata = {
	title: 'My Profile',
	description: 'View and Edit your profile.',
}

const ProfilePage = async () => {
	const session = await getServerSession(authOptions)
	if (!session) {
		return redirect('/')
	}

	const user = await prisma.user.findUnique({
		where: { email: session?.user?.email! },
		select: {
			id: true,
			name: true,
			bio: true,
			location: true,
			email: true,
			image: true,
		},
	})

	// TODO: FIX MY POSTS gap and move dives into the custom components

	return (
		<section className='flex flex-col items-center justify-center'>
			<Profile user={user!} />
		</section>
	)
}

export default ProfilePage

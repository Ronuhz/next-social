import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import Profile from '@/components/profile'

export const metadata = {
	title: 'My Profile',
	description: 'View and Edit your profile',
}

interface saveAccountInfoProps {
	bio: string
	location: string
}

const ProfilePage = async () => {
	const session = await getServerSession(authOptions)
	if (!session) {
		return redirect('/')
	}

	const user = await prisma.user.findUnique({
		where: { email: session?.user?.email! },
		select: { name: true, bio: true, location: true, email: true, image: true },
	})

	async function saveAccountInfo({
		bio,
		location,
	}: saveAccountInfoProps): Promise<void> {
		'use server'

		return new Promise<void>(async (resolve, reject) => {
			const session = await getServerSession(authOptions)
			try {
				await prisma.user.update({
					where: { email: session?.user?.email! },
					data: { bio, location },
				})
				resolve()
				revalidatePath('/')
			} catch (error) {
				reject(error)
			}
		})
	}

	return (
		<section className='flex flex-col items-center justify-center'>
			<Profile
				user={user!}
				saveAccountInfo={saveAccountInfo}
				canBeEdited={true}
			/>
		</section>
	)
}

export default ProfilePage

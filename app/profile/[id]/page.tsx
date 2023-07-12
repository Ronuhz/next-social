import { prisma } from '@/lib/prisma'
import Profile from '../_components/profile'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'

interface Props {
	params: {
		id: string
	}
}

export const revalidate = 300

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const user = await prisma.user.findUnique({
		where: { id: params.id },
		select: { name: true },
	})
	return {
		title: `${user?.name + "'s profile" ?? 'Profile'}`,
		description: 'View a users profile and their posts.',
	}
}

const ProfilePage = async ({ params }: Props) => {
	const targetId = params.id

	const user = await prisma.user.findUnique({
		where: { id: targetId },
		select: {
			id: true,
			name: true,
			bio: true,
			location: true,
			email: true,
			image: true,
		},
	})

	if (!user) {
		return (
			<section className='flex flex-col items-center justify-center space-y-6 p-6'>
				<h1 className='text-2xl font-bold uppercase'>User not found</h1>
				<Link href='/' className={cn(buttonVariants({ variant: 'default' }))}>
					Back to Home
				</Link>
			</section>
		)
	}

	return (
		<section className='flex flex-col items-center justify-center '>
			<Profile user={user!} />
		</section>
	)
}

export default ProfilePage

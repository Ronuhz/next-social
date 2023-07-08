import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { SignOutButton } from '@/components/auth-buttons'
import { redirect } from 'next/navigation'
import { MapPin, Edit } from 'lucide-react'

export const metadata = {
	title: 'My Profile',
	description: 'View and Edit your profile',
}

const Profile = async () => {
	const session = await getServerSession(authOptions)
	if (!session) {
		return redirect('/')
	}

	const user = await prisma.user.findUnique({
		where: { email: session?.user?.email! },
	})

	async function saveAccountInfo(formData: FormData) {
		'use server'

		const bio = formData.get('bio') as string
		const location = formData.get('location') as string

		await prisma.user.update({
			where: { email: session?.user?.email! },
			data: { bio, location },
		})
		revalidatePath('/')
	}

	return (
		<section className='flex flex-col items-center justify-center'>
			<h1 className='font-semibold text-2xl p-6'>My Profile</h1>
			<div className='flex flex-row items-center gap-4 bg-slate-800 bg-opacity-50 p-6 rounded-2xl w-[32rem]'>
				<img
					src={user?.image ?? ''}
					width={64}
					height={64}
					alt='Profile Image'
					className='h-fit w-fit rounded-full shadow-md shadow-black'
				/>
				<div className='flex flex-col'>
					<p className='font-semibold text-xl pb-2 inline-flex items-center gap-4'>
						{user?.name} <Edit size={20} />
					</p>
					<p>{user?.bio ?? ''}</p>
					{user?.location && (
						<p className='inline-flex items-center gap-1 text-gray-400'>
							<MapPin size={18} />
							{user?.location ?? ''}
						</p>
					)}
				</div>
			</div>

			{/* <form action={saveAccountInfo}>
				<textarea name='bio' defaultValue={user?.bio ?? ''} maxLength={100} />
				<input
					type='text'
					name='location'
					defaultValue={user?.location ?? ''}
					maxLength={30}
				/>
				<button type='submit'>Submit</button>
			</form> */}
			{/* <SignOutButton /> */}
		</section>
	)
}

export default Profile

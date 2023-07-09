import { MapPin } from 'lucide-react'
import EditProfile from '@/components/edit-profile'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

interface Props {
	user: {
		id: string
		name: string | null
		email: string | null
		emailVerified: Date | null
		image: string | null
		bio: string | null
		location: string | null
	}
	saveAccountInfo?: (data: any) => Promise<void>
	canBeEdited: boolean
}

const Profile = async ({ user, saveAccountInfo, canBeEdited }: Props) => {
	const session = await getServerSession(authOptions)

	const isItMyProfile = session?.user?.email == user.email

	return (
		<>
			<h1 className='font-semibold text-xl sm:text-2xl p-3'>
				{isItMyProfile ? 'My Profile' : `${user.name}'s profile`}
			</h1>
			<div className='flex flex-row items-center gap-4 bg-slate-800 bg-opacity-50 p-3 sm:p-6 rounded-2xl w-[22rem] sm:w-[32rem]'>
				<img
					src={user?.image ?? ''}
					width={64}
					height={64}
					alt='Profile Image'
					className='h-fit w-fit rounded-full shadow-md shadow-black'
				/>
				<div className='flex flex-col mb-auto'>
					<p className='font-semibold text-lg sm:text-xl pb-0 sm:pb-2 inline-flex items-center gap-1'>
						{user?.name}
						{canBeEdited && (
							<EditProfile
								bio={user?.bio ?? ''}
								location={user?.location ?? ''}
								saveAccountInfo={saveAccountInfo!}
							/>
						)}
					</p>
					<p className='text-xs sm:text-base'>{user?.bio ?? ''}</p>
					{user?.location && (
						<p className='inline-flex items-center gap-1 text-gray-400 text-xs sm:text-base'>
							<MapPin size={16} />
							{user?.location ?? ''}
						</p>
					)}
				</div>
			</div>
		</>
	)
}

export default Profile

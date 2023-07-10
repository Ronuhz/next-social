import { MapPin } from 'lucide-react'
import EditProfile from '@/components/edit-profile'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

interface Props {
	user: {
		name: string | null
		email: string | null
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
			<h1 className='p-3 text-xl font-semibold uppercase sm:text-2xl'>
				{isItMyProfile ? 'My Profile' : `${user.name}'s profile`}
			</h1>
			<div className='flex w-[22rem] flex-row items-center gap-4 rounded-xl border bg-card bg-opacity-50 p-3 text-card-foreground shadow sm:w-[32rem] sm:p-6'>
				<img
					src={user?.image ?? ''}
					alt='Profile Image'
					className='h-[72px] w-[72px] rounded-full sm:h-[96px] sm:w-[96px]'
				/>
				<div className='mb-auto flex flex-col overflow-hidden'>
					<p className='inline-flex items-center gap-1 pb-0 font-semibold sm:pb-2 sm:text-xl'>
						{user?.name}
						{canBeEdited && (
							<EditProfile
								bio={user?.bio ?? ''}
								location={user?.location ?? ''}
								saveAccountInfo={saveAccountInfo!}
							/>
						)}
					</p>
					<p className='balance text-xs sm:text-base'>{user?.bio ?? ''}</p>
					{user?.location && (
						<p className='balance inline-flex items-center gap-1 text-xs text-muted-foreground sm:text-base'>
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

import { MapPin } from 'lucide-react'
import { EditProfileButton } from '@/components/buttons/edit-profile-button'
import ProfilePic from './profile-pic'
import ProfilePosts from './profile-posts'
import { getSession } from '@/lib/session'
import { UserType } from '@/types'

/**
 *
 * @param user The user whose profile is being viewed
 */

const Profile = async ({ user }: UserType) => {
	const session = await getSession()

	const isItMyProfile = session?.user?.id == user.id

	return (
		<div className='w-fit gap-4'>
			<h1 className='mr-auto p-3 text-xl font-semibold uppercase sm:text-2xl'>
				{isItMyProfile ? 'My Profile' : `${user.name}'s profile`}
			</h1>
			<div className='flex w-[22rem] flex-row items-center gap-4 rounded-xl border bg-card bg-opacity-50 p-3 text-card-foreground shadow sm:w-[32rem] sm:p-6'>
				<ProfilePic
					className='h-[92px] w-[92px]'
					fallbackTextSize='text-3xl'
					image={user?.image}
					name={user?.name}
				/>
				<div className='mb-auto flex flex-col overflow-hidden'>
					<p className='inline-flex items-center gap-1 pb-0 font-semibold sm:pb-2 sm:text-xl'>
						{user?.name}
						{user?.email === session?.user?.email && (
							<EditProfileButton
								bio={user?.bio ?? ''}
								location={user?.location ?? ''}
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
			<h1 className='mr-auto p-3 pt-8 text-xl font-semibold uppercase sm:text-2xl'>
				{isItMyProfile ? 'My Posts' : `Posts`}
			</h1>
			<div className='space-y-4'>
				<ProfilePosts userId={user?.id} session={session} />
			</div>
		</div>
	)
}

export default Profile

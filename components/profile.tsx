import { MapPin } from 'lucide-react'
import EditProfile from '@/components/edit-profile'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ProfilePic from './profile-pic'
import PostSkeleton from './skeletons'
import { Suspense } from 'react'
import ProfilePosts from './profile-posts'

interface Props {
	user: {
		id: string
		name: string | null
		email: string | null
		image: string | null
		bio: string | null
		location: string | null
	}
	saveAccountInfo?: (data: any) => Promise<void>
}

const Profile = async ({ user, saveAccountInfo }: Props) => {
	const session = await getServerSession(authOptions)

	const isItMyProfile = session?.user?.email == user.email

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
			<h1 className='mr-auto p-3 pt-8 text-xl font-semibold uppercase sm:text-2xl'>
				{isItMyProfile ? 'My Posts' : `${user.name}'s Posts`}
			</h1>
			<div className='space-y-4'>
				<Suspense
					fallback={
						<>
							<PostSkeleton />
							<PostSkeleton />
							<PostSkeleton />
						</>
					}
				>
					<ProfilePosts id={user?.id} />
				</Suspense>
			</div>
		</div>
	)
}

export default Profile

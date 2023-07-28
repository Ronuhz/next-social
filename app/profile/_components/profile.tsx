import { MapPin, Files } from 'lucide-react'
import { EditProfileButton } from '@/components/buttons/edit-profile-button'
import ProfilePic from './profile-pic'
import ProfilePosts from './profile-posts'
import { getSession } from '@/lib/session'
import { UserType } from '@/types'
import RefreshButton from '@/components/buttons/refresh-button'
import { prisma } from '@/lib/prisma'
import {
	TooltipTrigger,
	Tooltip,
	TooltipContent,
	TooltipProvider,
} from '@/components/ui/tooltip'
import EditProfilePictureButton from '@/components/buttons/edit-profilepicture-button'
import { ProfileSkeleton } from '@/components/skeletons'

/**
 *
 * @param user The user whose profile is being viewed
 */

const Profile = async ({ user }: UserType) => {
	const session = await getSession()

	const isItMyProfile = session?.user?.id == user.id

	const postCount = await prisma.post.count({
		where: {
			userId: user.id,
		},
	})

	return (
		<div className='w-fit gap-4'>
			<div>
				<h1 className='mr-auto p-3 text-xl font-semibold uppercase sm:text-2xl'>
					{isItMyProfile ? 'My Profile' : `${user.username}'s profile`}
				</h1>
			</div>
			<div className='flex w-[95vw] flex-row items-center gap-4 rounded-xl border bg-card bg-opacity-50 p-3 text-card-foreground shadow sm:w-[32rem] sm:p-6'>
				<div className='relative'>
					{isItMyProfile ? <EditProfilePictureButton /> : <></>}
					<ProfilePic
						className='h-[92px] w-[92px]'
						fallbackTextSize='text-3xl'
						image={user?.profilePicture}
						username={user?.username!}
					/>
				</div>
				<div className='mb-auto flex flex-col overflow-hidden'>
					<p className='inline-flex items-center gap-1 pb-0 font-semibold sm:pb-2 sm:text-xl'>
						{user?.username}
						{user?.email === session?.user?.email && (
							<EditProfileButton
								username={user?.username!}
								bio={user?.bio ?? ''}
								location={user?.location ?? ''}
							/>
						)}
					</p>
					<p className='balance text-xs sm:text-base'>{user?.bio ?? ''}</p>
					{user?.location && (
						<p className='balance inline-flex items-center gap-1 text-xs text-muted-foreground sm:text-base'>
							<MapPin size={14} />
							{user?.location ?? ''}
						</p>
					)}
				</div>
			</div>
			<div className='flex items-center justify-between p-2 pt-3'>
				<div className='inline-flex items-center gap-2'>
					<h1 className='mr-auto text-xl font-semibold uppercase sm:text-2xl'>
						{isItMyProfile ? 'My Posts' : `Posts`}
					</h1>
					{/* Post count */}
					<div className='text-xs text-muted-foreground sm:text-base'>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<p className='inline-flex items-center gap-1'>
										<Files size={14} />
										{postCount ?? 0}
									</p>
								</TooltipTrigger>
								<TooltipContent>
									<p>Post count</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
				<RefreshButton />
			</div>
			<div className='space-y-4'>
				<ProfilePosts userId={user?.id} session={session} />
			</div>
		</div>
	)
}

export default Profile

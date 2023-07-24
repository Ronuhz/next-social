import { Skeleton } from '@/components/ui/skeleton'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '../../../components/ui/avatar'

interface Props {
	username: string
	image: string | null | undefined
	className?: string
	fallbackTextSize?:
		| 'text-sx'
		| 'text-sm'
		| 'text-base'
		| 'text-lg'
		| 'text-xl'
		| 'text-2xl'
		| 'text-3xl'
		| 'text-4xl'
		| 'text-5xl'
		| 'text-6xl'
		| 'text-7xl'
		| 'text-8xl'
		| 'text-9xl'
}

const ProfilePic = ({
	username,
	image,
	className,
	fallbackTextSize,
	...rest
}: Props) => {
	const placeholder = username ? username.substring(0, 2) : ''

	return (
		<Avatar className={className} {...rest}>
			<AvatarImage alt='Profile' src={image ?? ''} />
			<AvatarFallback className={`${fallbackTextSize}`}>
				<Skeleton className='inline-flex h-full w-full items-center justify-center rounded-full'>
					{placeholder}
				</Skeleton>
			</AvatarFallback>
		</Avatar>
	)
}

export default ProfilePic

'use client'

import { Heart } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { handleLike } from '@/lib/actions'
import { useState } from 'react'

interface Props {
	isLikedByCurrentUser: boolean
	postId: string
	userId: string
	likeCount: number
}

interface Data {
	postId: string
	userId: string
}

const LikeButton = ({
	isLikedByCurrentUser,
	postId,
	userId,
	likeCount,
}: Props) => {
	const [isLiked, setIsLiked] = useState(isLikedByCurrentUser)
	const [likeAmount, setLikeAmount] = useState(likeCount)

	const data: Data = { postId, userId }
	const { mutate } = useMutation({
		mutationFn: async (data: Data) => handleLike(data),
		onMutate: () => {
			// *Optimistically updates the like button and DOESN'T invalidate or
			// *refetch the data (posts) because it's not necessary

			setIsLiked((prev) => !prev)
			setLikeAmount((prev) => (isLiked ? prev - 1 : prev + 1))
		},
	})
	return (
		<div className='flex items-center'>
			<div
				onClick={() => mutate(data)}
				className='cursor-pointer rounded-full p-1 transition-all duration-75 hover:text-red-500 active:scale-125'
			>
				{!isLiked ? (
					<Heart height={18} width={18} />
				) : (
					<Heart
						height={18}
						width={18}
						fill='rgb(239 68 68)'
						className='text-red-500'
					/>
				)}
			</div>
			<p className='text-sm'>{likeAmount}</p>
		</div>
	)
}

export default LikeButton

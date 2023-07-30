'use client'

import { Heart } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { handleLike } from './action'
import { catchError } from '@/lib/utils'
import { LikeButtonProps, PostData } from './utils'

const LikeButton = ({
	isLikedByCurrentUser,
	postId,
	userId,
	likeCount,
}: LikeButtonProps) => {
	const [isLiked, setIsLiked] = useState(isLikedByCurrentUser)
	const [likeAmount, setLikeAmount] = useState(likeCount)

	const data: PostData = { postId, userId }
	//* DOESN'T invalidate or refetch the data (posts) because it's not necessary
	const updateOptimistically = () => {
		setIsLiked((prev) => !prev)
		setLikeAmount((prev) => (isLiked ? prev - 1 : prev + 1))
	}

	const { mutate } = useMutation({
		mutationFn: (data: PostData) => handleLike(data),
		onMutate: () => {
			updateOptimistically()
		},
		onError: (error) => {
			//* Reverts the changes of the onMutates optimistic update if an error occurred
			updateOptimistically()
			catchError(error)
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
			<p className={`text-sm ${isLiked ? 'font-bold text-red-500' : ''}`}>
				{likeAmount}
			</p>
		</div>
	)
}

export default LikeButton

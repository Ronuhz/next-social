export type LikeButtonProps = {
	isLikedByCurrentUser: boolean
	postId: string
	userId: string
	likeCount: number
}

export type PostData = {
	postId: string
	userId: string
}

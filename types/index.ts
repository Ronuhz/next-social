export interface UserType {
	user: {
		id: string
		username: string | null
		email: string | null
		profilePicture: string | null
		bio: string | null
		location: string | null
	}
}

export interface PostType {
	id: string
	content: string | null
	createdAt: Date
	userId: string
	user: {
		username: string
		profilePicture: string | null
	}
	likes: { userId: string; postId: string }[]
}

export interface PageType {
	posts: PostType[]
	nextCursor: string
}

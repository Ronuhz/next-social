export interface UserType {
	user: {
		id: string
		name: string | null
		email: string | null
		image: string | null
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
		name: string | null
		image: string | null
	}
	likes: { userId: string; postId: string }[]
}

export interface PageType {
	posts: PostType[]
	nextCursor: string
}

'use server'

import { prisma } from './prisma'
import { revalidatePath } from 'next/cache'
import { getSession } from './session'

export async function handleLike({
	postId,
	userId,
}: {
	postId: string
	userId: string
}): Promise<void> {
	return new Promise<void>(async (resolve, reject) => {
		try {
			const isAlreadyLikedByUser = await prisma.like.findUnique({
				where: { postId_userId: { postId, userId } },
			})

			if (isAlreadyLikedByUser) {
				await prisma.like.delete({
					where: { postId_userId: { postId, userId } },
				})
			} else {
				await prisma.like.create({ data: { postId, userId } })
			}

			resolve()
		} catch (error) {
			reject(error)
		}
	})
}

export async function createNewPost(content: string): Promise<void> {
	return new Promise<void>(async (resolve, reject) => {
		try {
			const session = await getSession()

			await prisma.post.create({
				data: {
					content,
					user: {
						connect: { id: session?.user?.id },
					},
				},
			})
			revalidatePath('')
			resolve()
		} catch (error) {
			reject(error)
		}
	})
}

export async function deletePost(postId: string): Promise<void> {
	return new Promise<void>(async (resolve, reject) => {
		try {
			await prisma.post.delete({ where: { id: postId } })
			revalidatePath('/')
			resolve()
		} catch (error) {
			reject(error)
		}
	})
}

interface saveAccountInfoProps {
	username: string
	bio: string
	location: string
}

export async function saveAccountInfo({
	username,
	bio,
	location,
}: saveAccountInfoProps): Promise<void> {
	return new Promise<void>(async (resolve, reject) => {
		const session = await getSession()

		try {
			await prisma.user.update({
				where: { id: session?.user?.id },
				data: { bio, location, username },
			})
			resolve()
			revalidatePath('/')
		} catch (error) {
			console.log(error)
			reject(error)
		}
	})
}

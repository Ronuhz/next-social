'use server'

import { prisma } from './prisma'
import { revalidatePath } from 'next/cache'
import { getSession } from './session'
import { utapi } from 'uploadthing/server'

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
	profilePicture?: File
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
				data: { username, bio, location },
			})
			resolve()
			revalidatePath('/')
		} catch (error) {
			reject(error)
		}
	})
}

export async function updateProfilePic(fileUrl: string) {
	const session = await getSession()
	try {
		const substringToRemove = 'https://uploadthing.com/f/'
		const user = await prisma.user.findUnique({
			where: { id: session?.user.id },
			select: { profilePicture: true },
		})

		console.log(user)

		// Tries to delete the old profile pic from Uploadthing
		// if an error occurs then delete the newly uploaded one
		try {
			if (user?.profilePicture.includes(substringToRemove)) {
				const modifiedURL = user?.profilePicture.replace(substringToRemove, '')
				await utapi.deleteFiles([modifiedURL])
			}

			await prisma.user.update({
				where: { id: session?.user.id },
				data: {
					profilePicture: fileUrl,
				},
			})
		} catch (error) {
			const modifiedURL = fileUrl.replace(substringToRemove, '')
			await utapi.deleteFiles([modifiedURL])
			console.log(error)
		}

		revalidatePath('/')
	} catch (error) {
		console.log(error)
	}
}

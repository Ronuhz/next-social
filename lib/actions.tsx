'use server'

import { prisma } from './prisma'
import { revalidatePath } from 'next/cache'
import { getSession } from './session'

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
	bio: string
	location: string
}

export async function saveAccountInfo({
	bio,
	location,
}: saveAccountInfoProps): Promise<void> {
	return new Promise<void>(async (resolve, reject) => {
		const session = await getSession()

		try {
			await prisma.user.update({
				where: { id: session?.user?.id },
				data: { bio, location },
			})
			resolve()
			revalidatePath('/')
		} catch (error) {
			reject(error)
		}
	})
}

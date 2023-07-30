'use server'

import { prisma } from '@/lib/prisma'
import { PostData } from './utils'

export async function handleLike({ postId, userId }: PostData): Promise<void> {
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

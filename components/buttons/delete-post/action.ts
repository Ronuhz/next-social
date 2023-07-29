'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deletePost(postId: string): Promise<void> {
	return new Promise<void>(async (resolve, reject) => {
		try {
			await prisma.post.delete({ where: { id: postId } })

			/**
			 * It's possible the would be nice to check here if the user who tries to
			 * delete the post actually owns it.
			 */

			revalidatePath('/')
			resolve()
		} catch (error) {
			reject(error)
		}
	})
}

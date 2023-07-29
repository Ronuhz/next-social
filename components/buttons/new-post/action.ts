'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { revalidatePath } from 'next/cache'
import { type NewPostProps, newPostFormSchema } from './utils'

export default async function createNewPost(data: NewPostProps) {
	const validated = newPostFormSchema.safeParse(data)

	return new Promise<void>(async (resolve, reject) => {
		if (validated.success) {
			const session = await getSession()

			try {
				await prisma.post.create({
					data: {
						content: validated.data.content,
						user: {
							connect: { id: session?.user?.id },
						},
					},
				})

				revalidatePath('/')
				resolve()
			} catch (error) {
				console.log('ERROR: Post creation in the database failed.')
				reject(error)
			}
		} else {
			console.log('ERROR: Post content validation failed on server side.')
			reject('ERROR: Post content validation failed on server side.')
		}
	})
}

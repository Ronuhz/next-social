'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { prisma } from './prisma'
import { revalidatePath } from 'next/cache'

export async function CreateNewPost(content: string): Promise<void> {
	return new Promise<void>(async (resolve, reject) => {
		try {
			const session = await getServerSession(authOptions)
			const user = await prisma.user.findUnique({
				where: { email: session?.user?.email! },
				select: { id: true },
			})

			await prisma.post.create({
				data: {
					content,
					user: {
						connect: { id: user?.id },
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

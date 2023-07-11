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

export async function DeletePost(
	postId: string,
	userEmail: string
): Promise<void> {
	return new Promise<void>(async (resolve, reject) => {
		try {
			const session = await getServerSession(authOptions)

			if (session?.user?.email !== userEmail) {
				reject()
			}

			await prisma.post.delete({ where: { id: postId } })
			revalidatePath('')
			resolve()
		} catch (error) {
			reject(error)
		}
	})
}

interface SaveAccountInfoProps {
	bio: string
	location: string
}

export async function SaveAccountInfo({
	bio,
	location,
}: SaveAccountInfoProps): Promise<void> {
	return new Promise<void>(async (resolve, reject) => {
		const session = await getServerSession(authOptions)
		try {
			await prisma.user.update({
				where: { email: session?.user?.email! },
				data: { bio, location },
			})
			resolve()
			revalidatePath('/')
		} catch (error) {
			reject(error)
		}
	})
}

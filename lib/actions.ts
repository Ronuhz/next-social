'use server'

import { prisma } from './prisma'
import { revalidatePath } from 'next/cache'
import { getSession } from './session'
import { utapi } from 'uploadthing/server'

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

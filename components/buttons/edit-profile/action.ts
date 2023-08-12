'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/session'
import { revalidatePath } from 'next/cache'
import { type ProfileInfoProps, editFormSchema } from './utils'

export default async function saveProfileInfo(data: ProfileInfoProps) {
	const validated = editFormSchema.safeParse(data)

	return new Promise<void>(async (resolve, reject) => {
		if (validated.success) {
			const user = await getCurrentUser()

			try {
				await prisma.user.update({
					where: { id: user?.id },
					data: validated.data,
				})

				revalidatePath('/')
				resolve()
			} catch (error) {
				console.log('ERROR: Profile info database update failed.')
				reject(error)
			}
		} else {
			console.log('ERROR: Profile info validation failed on server side.')
			reject('ERROR: Profile info validation failed on server side.')
		}
	})
}

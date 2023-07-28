'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser, getSession } from '@/lib/session'
import { revalidatePath } from 'next/cache'
import { type ProfileInfoProps, editFormSchema } from './utils'

export default async function saveProfileInfo(data: ProfileInfoProps) {
	const validated = editFormSchema.safeParse(data)

	if (validated.success) {
		const user = await getCurrentUser()

		try {
			await prisma.user.update({
				where: { id: user?.id },
				data: validated.data,
			})

			revalidatePath('/')
		} catch (error) {
			console.log('ERROR: Profile info database update failed: ', error)
		}
	} else {
		console.log('ERROR: Profile info validation failed on server side.')
	}
}

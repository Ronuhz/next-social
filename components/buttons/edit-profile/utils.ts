import * as z from 'zod'

export const editFormSchema = z.object({
	username: z
		.string()
		.min(1, { message: 'Username must be at least 1 character long' })
		.max(20, { message: 'Username must be shorter then 20 characters' })
		.refine((val) => !/\s/.test(val), {
			message: 'Username must not contain spaces',
		})
		.refine((val) => /^[a-z0-9áéíóúőűäëïöüâêîôûàèìòùçßñ._-]+$/.test(val), {
			message:
				'Username must only contain lowercase letters, numbers and the following special characters: ._-',
		}),
	bio: z.string().max(100),
	location: z.string().max(30),
})

export type ProfileInfoProps = {
	username: string
	bio: string
	location: string
}

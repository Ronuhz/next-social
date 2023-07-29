import * as z from 'zod'

export const newPostFormSchema = z.object({
	content: z
		.string()
		.min(1, { message: 'Content must be at least 1 character long' })
		.max(600, { message: 'Content must be shorter then 600 characters' }),
})

export type NewPostProps = z.infer<typeof newPostFormSchema>

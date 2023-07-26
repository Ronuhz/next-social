'use client'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Edit, Loader2 } from 'lucide-react'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { createNewPost } from '@/lib/actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'

export const NewPostButton = () => {
	const [isOpen, setIsOpen] = useState(false)
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const newPostFormSchema = z.object({
		content: z
			.string()
			.min(1, { message: 'Content must be at least 1 character long' })
			.max(600, { message: 'Content must be shorter then 600 characters' }),
	})

	const form = useForm<z.infer<typeof newPostFormSchema>>({
		resolver: zodResolver(newPostFormSchema),
		defaultValues: {
			content: '',
		},
	})

	const { mutate, isLoading } = useMutation({
		mutationFn: (values: z.infer<typeof newPostFormSchema>) =>
			createNewPost(values.content),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['oldPosts'],
			})
			setIsOpen(false)

			// clears the forms input
			form.reset({ content: '' })
			toast({ description: 'Post created' })
		},
		onError: () =>
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with your request.',
			}),
	})

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size='sm' className='gap-1' aria-label='New Post'>
					<Edit height={18} width={18} />
					New Post
				</Button>
			</DialogTrigger>
			<DialogContent
				onEscapeKeyDown={(e) => (isLoading ? e.preventDefault() : {})}
				disabled={isLoading}
				onPointerDownOutside={(e) => (isLoading ? e.preventDefault() : {})}
			>
				<DialogHeader>
					<DialogTitle>New post</DialogTitle>
					<DialogDescription className='balance'>
						Create a new post. It will be visible to everyone on the feed and on
						your profile.
					</DialogDescription>
				</DialogHeader>

				{/* FORM */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit((values) => mutate(values))}
						className='space-y-8'
					>
						<FormField
							control={form.control}
							name='content'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Content</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Here goes your latest story...'
											disabled={isLoading}
											rows={6}
											className='resize-y'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type='submit' disabled={isLoading}>
								{isLoading && <Loader2 className='mr-2 h-5 w-5 animate-spin' />}
								Post
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

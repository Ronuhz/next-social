'use client'
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
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { catchError } from '@/lib/utils'
import { newPostFormSchema } from './utils'
import createNewPost from './action'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

const NewPostButton = () => {
	const queryClient = useQueryClient()

	const [isOpen, setIsOpen] = useState(false)
	const { toast } = useToast()

	const form = useForm<z.infer<typeof newPostFormSchema>>({
		resolver: zodResolver(newPostFormSchema),
		defaultValues: {
			content: '',
		},
	})

	const { mutate, isLoading } = useMutation({
		mutationFn: (values: z.infer<typeof newPostFormSchema>) =>
			createNewPost(values),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['oldPosts'],
			})
			setIsOpen(false)

			// clears the forms input
			form.reset({ content: '' })
			toast({ description: 'Post created' })
		},
		onError: (error) => catchError(error),
	})

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<TooltipProvider>
				<Tooltip>
					<DialogTrigger asChild>
						<TooltipTrigger asChild>
							<Button size='icon' className='gap-1' aria-label='New Post'>
								<Edit height={18} width={18} />
							</Button>
						</TooltipTrigger>
					</DialogTrigger>
					<TooltipContent>
						<p>New Post</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<DialogContent
				disabled={isLoading}
				onEscapeKeyDown={(e) => (isLoading ? e.preventDefault() : {})}
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
								{isLoading ? (
									<Loader2 className='mr-2 h-5 w-5 animate-spin' />
								) : (
									'Post'
								)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default NewPostButton

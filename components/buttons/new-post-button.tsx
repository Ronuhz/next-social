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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { createNewPost } from '@/lib/actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const NewPostButton = () => {
	const queryClient = useQueryClient()
	const [content, setContent] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	const { toast } = useToast()

	const { mutate, isLoading } = useMutation({
		mutationFn: (content: string) => createNewPost(content),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['oldPosts'],
			})
			setIsOpen(false)
			setContent('')
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
						Create a new post. Will be visible to everyone on the feed and on
						your profile.
					</DialogDescription>
				</DialogHeader>
				<div className='space-y-1'>
					<Label htmlFor='content'>Content</Label>
					<Textarea
						id='content'
						placeholder='Here goes your latest story'
						disabled={isLoading}
						rows={6}
						minLength={1}
						maxLength={600}
						className='resize-y'
						onChange={(e) => setContent(e.target.value)}
					/>
					{content.length < 1 && (
						<p className='text-sm text-red-700'>
							Content must be at least 1 character long
						</p>
					)}
				</div>
				<DialogFooter>
					<Button
						disabled={content.length < 1 || isLoading}
						onClick={() => mutate(content)}
					>
						{!isLoading ? (
							'Post'
						) : (
							<>
								<Loader2 className='mr-2 h-5 w-5 animate-spin' />
								Posting
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

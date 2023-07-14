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
import { useQueryClient } from '@tanstack/react-query'

export const NewPostButton = () => {
	const [content, setContent] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const { toast } = useToast()
	const queryClient = useQueryClient()

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
					{!isLoading ? (
						<Button
							disabled={content.length < 1}
							onClick={() => {
								setIsLoading(true)
								createNewPost(content)
									.then(() => {
										setIsOpen(false)
										setContent('')
										toast({ description: 'Post created' })
									})
									.finally(() => {
										queryClient.invalidateQueries({
											queryKey: ['oldPosts'],
										})
										setIsLoading(false)
									})
									.catch(() =>
										toast({
											variant: 'destructive',
											title: 'Uh oh! Something went wrong.',
											description: 'There was a problem with your request.',
										})
									)
							}}
						>
							Post
						</Button>
					) : (
						<Button disabled>
							<Loader2 className='mr-2 h-5 w-5 animate-spin' />
							Posting
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

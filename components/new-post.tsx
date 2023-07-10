'use client'

import { Button } from './ui/button'
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
import { useState } from 'react'
import { toast, useToast } from '@/components/ui/use-toast'
import { CreateNewPost } from '@/lib/actions'

const NewPost = () => {
	const [content, setContent] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size='sm' className='gap-1'>
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
					<DialogDescription>Create a new post.</DialogDescription>
				</DialogHeader>
				<div className='space-y-1'>
					<Label htmlFor='content'>Content</Label>
					<Textarea
						id='content'
						placeholder='Write here what you want to tell to the world'
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
								CreateNewPost(content)
									.then(() => setIsOpen(false))
									.then(() => toast({ description: 'Post created' }))
									.finally(() => setIsLoading(false))
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

export default NewPost

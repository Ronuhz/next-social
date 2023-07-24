'use client'

import { Button, buttonVariants } from '../ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { deletePost } from '@/lib/actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostType } from '@/types'
import {
	AlertDialog,
	AlertDialogHeader,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from '../ui/alert-dialog'
import { cn } from '@/lib/utils'

interface Props {
	postId: string
	queryKey: string[]
}

export const DeletePostButton = ({ postId, queryKey }: Props) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const { mutateAsync, isLoading } = useMutation({
		mutationFn: (postId: string) => deletePost(postId),
		onMutate: async (postId) => {
			// Optimistic post deletion
			await queryClient.cancelQueries({ queryKey: queryKey })
			const previousPosts: any = queryClient.getQueryData(queryKey)

			const optimisticPosts = previousPosts.pages.map((page: any) => {
				return {
					...page,
					posts: page.posts.filter((post: PostType) => post.id !== postId),
				}
			})

			queryClient.setQueriesData(queryKey, (old: any) => ({
				...old,
				pages: optimisticPosts,
			}))
			return { previousPosts }
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['posts'],
			})
			toast({ description: 'Post deleted' })
		},
		onError: (context: any) => {
			queryClient.setQueriesData(['posts'], context.previousPosts)
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with your request.',
			})
		},
	})

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					aria-label='Delete Post'
					disabled={isLoading}
					className='mb-auto hover:text-red-600'
				>
					{!isLoading ? (
						<Trash2 size={18} />
					) : (
						<Loader2 className='h-5 w-5 animate-spin' />
					)}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Post?</AlertDialogTitle>
					<AlertDialogDescription>
						This can’t be undone and it will be removed from the feed and your
						profile.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className={cn(buttonVariants({ variant: 'destructive' }))}
						onClick={() => mutateAsync(postId)}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

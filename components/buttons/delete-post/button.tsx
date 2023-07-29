'use client'

import { Button, buttonVariants } from '../../ui/button'
import { Trash2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
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
} from '../../ui/alert-dialog'
import { catchError, cn } from '@/lib/utils'
import { DeletePostProps } from './utils'
import { deletePost } from './action'

export const DeletePostButton = ({ postId, queryKey }: DeletePostProps) => {
	const queryClient = useQueryClient()

	const { toast } = useToast()

	const { mutate, isLoading } = useMutation({
		mutationFn: (postId: string) => deletePost(postId),
		onMutate: async (postId) => {
			// Optimistic post deletion
			await queryClient.cancelQueries({ queryKey })
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
				queryKey,
			})
			toast({ description: 'Post deleted' })
		},
		onError: (error, variables, context) => {
			// Rolls back to the original posts which are provided from the onMutate with return
			queryClient.setQueriesData(queryKey, context?.previousPosts)
			catchError(error)
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
					<Trash2 size={18} />
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
						onClick={() => mutate(postId)}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

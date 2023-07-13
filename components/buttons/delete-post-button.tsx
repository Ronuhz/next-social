'use client'

import { Button } from '../ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { deletePost } from '@/lib/actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostType } from '@/types'

interface Props {
	postId: string
	queryKey: string[]
}

/**
 * TODO: feed and profile queries conflict
 * TODO: maybe from profile-posts pass down the user id
 * TODO: and if !userId then user posts as key otherwise
 * TODO: posts-${userId}
 * */

export const DeletePostButton = ({ postId, queryKey }: Props) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	const { mutateAsync, isLoading } = useMutation({
		mutationFn: (postId: string) => deletePost(postId),
		onMutate: async (postId) => {
			await queryClient.cancelQueries({ queryKey: queryKey })
			const previousPosts: any = queryClient.getQueryData(queryKey)

			const optimisticPosts = previousPosts.pages.map((page: any) => {
				return {
					...page,
					posts: page.posts.filter((post: PostType) => post.id !== postId),
				}
			})
			console.log('prev', previousPosts)

			console.log(
				'optimist',
				queryClient.setQueriesData(queryKey, (old: any) => ({
					...old,
					pages: optimisticPosts,
				}))
			)
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
		<Button
			variant='ghost'
			size='icon'
			aria-label='Delete Post'
			disabled={isLoading}
			className='mb-auto hover:text-red-600'
			onClick={() => mutateAsync(postId)}
		>
			{!isLoading ? (
				<Trash2 size={18} />
			) : (
				<Loader2 className='h-5 w-5 animate-spin' />
			)}
		</Button>
	)
}

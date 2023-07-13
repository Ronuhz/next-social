'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { queryClient } from '@/lib/query'
import { Card, CardContent, CardDescription, CardHeader } from './ui/card'

interface Props {
	queryKeys: string[]
	fetchFunction: ({ pageParam = 1 }) => Promise<any>
	returnFunction: (page: any) => any
	loadingSkeleton?: React.JSX.Element
}

const InfiniteScroll = ({
	queryKeys,
	fetchFunction,
	returnFunction,
	loadingSkeleton,
}: Props) => {
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: queryKeys,
		queryFn: fetchFunction,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	})

	return status === 'loading' ? (
		<>{loadingSkeleton ? loadingSkeleton : <p>loading</p>}</>
	) : status === 'error' ? (
		<Card>
			<CardHeader>Oh, no! Something went wrong!</CardHeader>
			<CardContent className='-mt-6'>
				<CardDescription>Or you're not logged in</CardDescription>
			</CardContent>
		</Card>
	) : (
		<>
			{data.pages.map((page, i) => (
				<React.Fragment key={i}>{returnFunction(page)}</React.Fragment>
			))}
			<div className='flex items-center justify-center pb-3 pt-1'>
				{isFetchingNextPage ? (
					<Loader2 className='mr-2 h-5 w-5 animate-spin' />
				) : hasNextPage ? (
					<Button
						onClick={() => fetchNextPage()}
						disabled={!hasNextPage || isFetchingNextPage}
					>
						Load More
					</Button>
				) : (
					'Nothing more to load'
				)}
			</div>
		</>
	)
}

export default InfiniteScroll

import { Loader2 } from 'lucide-react'

// TODO: Implement additional skeleton loading "components" with the Next.js 13 way
// * THIS IS JUST A PLACEHOLDER

const Loading = () => {
	return (
		<div className='mt-12 flex w-full items-center justify-center'>
			<Loader2 className='h-12 w-12 animate-spin' />
		</div>
	)
}

export default Loading

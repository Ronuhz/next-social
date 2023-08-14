import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const Settings = () => {
	return (
		<section className='flex w-full flex-col items-center justify-center'>
			<div className='mx-3'>
				<h1 className='my-3 text-xl font-semibold uppercase sm:text-2xl'>
					Settings
				</h1>

				{/* REMOVE THIS <p> when page is done */}
				<p className='py-1 text-lg font-extrabold'>
					This page is not done, the actions below do not work
				</p>
				<Card className='w-[95vw] border-destructive sm:w-[32rem]'>
					<CardHeader>
						<CardTitle className='text-2xl text-destructive'>
							Delete account
						</CardTitle>
						<CardDescription className='text-secondary-foreground'>
							Once you delete your account, there is no going back. Please be
							certain.
						</CardDescription>
					</CardHeader>
					<CardFooter>
						<Button variant='destructive'>Delete your account</Button>
					</CardFooter>
				</Card>
			</div>
		</section>
	)
}

export default Settings

'use client'

import { useState } from 'react'
import { Edit, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

interface Props {
	bio: string
	location: string
	saveAccountInfo: (data: any) => Promise<void>
}

const EditProfile = ({ bio, location, saveAccountInfo }: Props) => {
	const [accountInfo, setAccountInfo] = useState({
		bio,
		location,
	})
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const { toast } = useToast()

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant='ghost' size='sm'>
					<Edit size={16} />
				</Button>
			</DialogTrigger>
			<DialogContent
				className='sm:max-w-[425px]'
				onEscapeKeyDown={(e) => e.preventDefault()}
				onPointerDownOutside={(e) => isLoading && e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						{"Make changes to your profile here. Click save when you're done."}
					</DialogDescription>
				</DialogHeader>
				<Label htmlFor='bio'>Bio</Label>
				<Textarea
					id='bio'
					placeholder="ex. I'm a ..."
					defaultValue={bio}
					disabled={isLoading}
					rows={3}
					maxLength={100}
					className='resize-none'
					onChange={(e) => {
						setAccountInfo((prev) => ({ ...prev, bio: e.target.value }))
					}}
				/>
				<Label htmlFor='location'>Location</Label>
				<Input
					type='text'
					id='location'
					placeholder='ex. New York'
					defaultValue={location}
					disabled={isLoading}
					maxLength={30}
					onChange={(e) => {
						setAccountInfo((prev) => ({ ...prev, location: e.target.value }))
					}}
				/>

				<DialogFooter className='flex flex-col gap-2 pt-4 sm:gap-0'>
					{!isLoading ? (
						<Button
							type='submit'
							onClick={() => {
								setIsLoading(true)
								saveAccountInfo(accountInfo)
									.then(() => setIsOpen(false))
									.then(() =>
										toast({
											description: 'Account updated',
										})
									)
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
							Save
						</Button>
					) : (
						<Button disabled>
							<Loader2 className='mr-2 h-5 w-5 animate-spin' />
							Saving
						</Button>
					)}
					<Button
						type='button'
						variant='secondary'
						disabled={isLoading}
						onClick={() => setIsOpen(false)}
					>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default EditProfile

'use client'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Edit3, Loader2 } from 'lucide-react'
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
import { saveAccountInfo } from '@/lib/actions'

interface EditProfileProps {
	bio: string
	location: string
}

export const EditProfileButton = ({ bio, location }: EditProfileProps) => {
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
				<Button variant='ghost' size='sm' aria-label='Edit Profile'>
					<Edit3 size={16} />
				</Button>
			</DialogTrigger>
			<DialogContent
				className='sm:max-w-[425px]'
				onEscapeKeyDown={(e) => (isLoading ? e.preventDefault() : {})}
				disabled={isLoading}
				onPointerDownOutside={(e) => (isLoading ? e.preventDefault() : {})}
			>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						{"Make changes to your profile here. Click save when you're done."}
					</DialogDescription>
				</DialogHeader>
				<div className='space-y-1'>
					<Label htmlFor='bio'>Bio</Label>
					<Textarea
						id='bio'
						placeholder='Tell us a little bit about yourself'
						defaultValue={bio}
						disabled={isLoading}
						rows={3}
						maxLength={100}
						className='resize-none'
						onChange={(e) => {
							setAccountInfo((prev) => ({ ...prev, bio: e.target.value }))
						}}
					/>
				</div>
				<div className='space-y-1'>
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
				</div>

				<DialogFooter>
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
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

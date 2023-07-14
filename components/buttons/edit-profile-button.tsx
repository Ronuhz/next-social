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
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
	const { toast } = useToast()

	const { mutate, isLoading } = useMutation({
		mutationFn: (accountInfo: EditProfileProps) => saveAccountInfo(accountInfo),
		onSuccess: () => {
			setIsOpen(false)
			toast({
				description: 'Account updated',
			})
		},
		onError: () =>
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with your request.',
			}),
	})

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
				{/* 
				
				Custom profile pic upload needs to be implemented.
				Files compress in browser with: https://www.npmjs.com/package/browser-image-compression
				and uploaded to Uploadthing

				<div className='space-y-1'>
					<Label htmlFor='profilePicture'>Profile Picture</Label>
					<Input type='file' id='profilePicture' disabled={isLoading} />
				</div> */}

				<DialogFooter>
					{!isLoading ? (
						<Button type='submit' onClick={() => mutate(accountInfo)}>
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

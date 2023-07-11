'use client'

import { Button, ButtonProps } from './ui/button'
import { signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import { Edit, Edit3, Loader2, Trash2 } from 'lucide-react'
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
import { createNewPost, deletePost } from '@/lib/actions'
import { saveAccountInfo } from '@/lib/actions'

export const SignInButton = (props: ButtonProps) => {
	return (
		<Button size='sm' {...props} onClick={() => signIn('google')}>
			Log In
		</Button>
	)
}

export const SignOutButton = () => {
	return (
		<Button variant='outline' size='sm' onClick={() => signOut()}>
			Log Out
		</Button>
	)
}

export const SignOutDropdownItem = () => {
	return (
		<div className='cursor-pointer' onClick={() => signOut()}>
			Log Out
		</div>
	)
}

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
				<Button variant='ghost' size='sm'>
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

export const NewPostButton = () => {
	const [content, setContent] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const { toast } = useToast()

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
								createNewPost(content)
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

interface deletePostButtonProps {
	postId: string
	userEmail: string
}

export const DeletePostButton = ({
	postId,
	userEmail,
}: deletePostButtonProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()

	return (
		<>
			{!isLoading ? (
				<Button
					variant='ghost'
					size='icon'
					className='mb-auto'
					onClick={() => {
						setIsLoading(true)
						deletePost(postId, userEmail)
							.then(() => toast({ description: 'Post deleted' }))
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
					<Trash2 size={18} />
				</Button>
			) : (
				<Button disabled variant='ghost' size='icon' className='mb-auto'>
					<Loader2 className='mr-2 h-5 w-5 animate-spin' />
				</Button>
			)}
		</>
	)
}

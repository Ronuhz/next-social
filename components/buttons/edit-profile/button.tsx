'use client'

import { Button } from '../../ui/button'
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { useMutation } from '@tanstack/react-query'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../ui/form'
import { catchError } from '@/lib/utils'
import { type ProfileInfoProps, editFormSchema } from './utils'
import saveProfileInfo from './action'

export const EditProfileButton = ({
	bio,
	location,
	username,
}: ProfileInfoProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { toast } = useToast()

	const form = useForm<z.infer<typeof editFormSchema>>({
		resolver: zodResolver(editFormSchema),
		defaultValues: {
			username,
			bio,
			location,
		},
	})

	const { mutate, isLoading } = useMutation({
		mutationFn: (values: z.infer<typeof editFormSchema>) =>
			saveProfileInfo(values),
		onSuccess: (data, values) => {
			setIsOpen(false)
			toast({
				description: 'Account updated',
			})
		},
		onError: (error) => catchError(error),
	})

	const onSubmit = (values: z.infer<typeof editFormSchema>) => {
		if (
			values.bio !== bio ||
			values.location !== location ||
			values.username !== username
		) {
			mutate(values)
		} else {
			setIsOpen(false)
		}
	}

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
					<DialogDescription className='balance'>
						{"Make changes to your profile here. Click save when you're done."}
					</DialogDescription>
				</DialogHeader>

				{/* FORM */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit((values) => onSubmit(values))}
						className='space-y-4'
					>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder='username'
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormDescription>Your unique identifier</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='bio'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bio</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Tell us a little bit about yourself'
											disabled={isLoading}
											rows={3}
											className='resize-y'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='location'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Location</FormLabel>
									<FormControl>
										<Input
											placeholder='ex. New York'
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type='submit' disabled={isLoading}>
								{isLoading && <Loader2 className='mr-2 h-5 w-5 animate-spin' />}
								Save
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

'use client'

import { Loader2, SmilePlus } from 'lucide-react'
import {
	Dialog,
	DialogHeader,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogFooter,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useUploadThing } from '@/utils/uploadthing'
import { toast } from '../ui/use-toast'
import { updateProfilePic } from '@/lib/actions'
import imageCompression from 'browser-image-compression'

const EditProfilePictureButton = () => {
	const [file, setFile] = useState<File | undefined>(undefined)
	const [isOpen, setIsOpen] = useState(false)

	const { startUpload, isUploading } = useUploadThing('imageUploader', {
		onClientUploadComplete: (res) => {
			setIsOpen(false)
			// @ts-ignore
			const fileUrl = res[0].fileUrl
			if (fileUrl) {
				updateProfilePic(fileUrl)
				toast({
					description: 'Profile picture uploaded',
				})
			} else {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: 'There was a problem with your request.',
				})
			}
		},
		onUploadError: () => {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: 'There was a problem with your request.',
			})
		},
	})

	const onUpload = async (file: File) => {
		const options = {
			maxSizeMB: 0.01,
			maxWidthOrHeight: 96,
			useWebWorker: true,
		}

		try {
			const compressedFile = await imageCompression(file, options)
			startUpload([compressedFile])
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				setIsOpen(open)
				setFile(undefined)
			}}
		>
			<DialogTrigger asChild>
				<SmilePlus className='absolute left-3/4 z-10 h-8 w-8 cursor-pointer rounded-full border bg-background p-1' />
			</DialogTrigger>
			<DialogContent
				onEscapeKeyDown={(e) => (isUploading ? e.preventDefault() : {})}
				disabled={isUploading}
				onPointerDownOutside={(e) => (isUploading ? e.preventDefault() : {})}
			>
				<DialogHeader>
					<DialogTitle>Upload a Profile Picture</DialogTitle>
				</DialogHeader>
				<div>
					<Input
						type='file'
						disabled={isUploading}
						accept='image/png, image/jpeg'
						onChange={(e) => setFile(e.target.files![0])}
					/>
				</div>
				<DialogFooter>
					<Button
						disabled={!file || isUploading}
						onClick={() => onUpload(file!)}
					>
						{isUploading && <Loader2 className='mr-2 h-5 w-5 animate-spin' />}
						Upload
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default EditProfilePictureButton

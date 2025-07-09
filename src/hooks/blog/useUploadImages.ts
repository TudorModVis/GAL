import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ImageToUpload } from '@/types/blog.types'

import { blogService } from '@/services/blog.service'

export function useUploadImages() {
	const {
		mutate: uploadImages,
		isPending: isImagesUploadPending,
		isSuccess: isUploadComplete
	} = useMutation({
		mutationKey: ['upload image'],
		mutationFn: async (uploads: ImageToUpload[]): Promise<string[]> => {
			let completedCount = 0
			const totalCount = uploads.length

			toast.loading(`Uploading 0 of ${totalCount} images...`, {
				id: 'upload-progress'
			})

			// Upload with progress tracking
			const uploadPromises = uploads.map(async ({ uploadUrl, file }) => {
				try {
					await blogService.uploadImage(uploadUrl, file)
					completedCount++

					// Update progress
					toast.loading(`Uploading ${completedCount} of ${totalCount} images...`, {
						id: 'upload-progress'
					})

					return uploadUrl
				} catch (error) {
					throw new Error(`Failed to upload ${file.name}. ${error instanceof Error ? error.message : 'Unknown error'}`)
				}
			})

			return await Promise.all(uploadPromises)
		},
		onSuccess: results => {
			toast.success(`Successfully uploaded ${results.length} images!`, {
				id: 'upload-progress'
			})
		},
		onError: () => {
			toast.error('Failed to upload image')
		}
	})

	return { uploadImages, isImagesUploadPending, isUploadComplete }
}

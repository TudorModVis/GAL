import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { IFileToUpload } from '@/types/documents.types'

import { documentsService } from '@/services/documents.service'

export function useUploadFiles() {
	const {
		mutate: uploadFiles,
		isPending: isFilesUploadPending,
		isSuccess: isUploadComplete
	} = useMutation({
		mutationKey: ['upload file'],
		mutationFn: async (uploads: IFileToUpload[]): Promise<string[]> => {
			let completedCount = 0
			const totalCount = uploads.length

			toast.loading(`Uploading ${totalCount} files...`, {
				id: 'upload-progress'
			})

			const uploadPromises = uploads.map(async ({ uploadUrl, file }) => {
				try {
					await documentsService.uploadFile(uploadUrl, file)
					completedCount++

					toast.loading(`Uploading ${completedCount} of ${totalCount} files...`, {
						id: 'upload-progress'
					})

					return uploadUrl
				} catch (error) {
					throw new Error(
						`Failed to upload ${file.name}. ${error instanceof Error ? error.message : 'Unknown error'}`
					)
				}
			})

			return await Promise.all(uploadPromises)
		},
		onSuccess: () => {
			toast.success('All files uploaded successfully', {
				id: 'upload-progress'
			})
		},
		onError: () => {
			toast.error('File upload failed')
		}
	})

	return { uploadFiles, isFilesUploadPending, isUploadComplete }
}

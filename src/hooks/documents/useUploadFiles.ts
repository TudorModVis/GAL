import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { IFileToUpload } from '@/types/documents.types'

import { documentsService } from '@/services/documents.service'

export function useUploadFiles() {
	const t = useTranslations('Admin.ToastMessages')

	const {
		mutate: uploadFiles,
		isPending: isFilesUploadPending,
		isSuccess: isUploadComplete
	} = useMutation({
		mutationKey: ['upload file'],
		mutationFn: async (uploads: IFileToUpload[]): Promise<string[]> => {
			let completedCount = 0
			const totalCount = uploads.length

			toast.loading(
				` ${t('files_uploading_slice_1')} 0 ${t('files_uploading_slice_2')} ${totalCount} ${t('files_uploading_slice_3')}...`,
				{
					id: 'file-upload-progress'
				}
			)

			const uploadPromises = uploads.map(async ({ uploadUrl, file }) => {
				try {
					await documentsService.uploadFile(uploadUrl, file)
					completedCount++

					toast.loading(
						` ${t('files_uploading_slice_1')} ${completedCount} ${t('files_uploading_slice_2')} ${totalCount} ${t('files_uploading_slice_3')}...`,
						{
							id: 'file-upload-progress'
						}
					)

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
			toast.success(t('files_uploading_success'), {
				id: 'file-upload-progress'
			})
		},
		onError: () => {
			toast.error(t('files_uploading_failed'))
		}
	})

	return { uploadFiles, isFilesUploadPending, isUploadComplete }
}

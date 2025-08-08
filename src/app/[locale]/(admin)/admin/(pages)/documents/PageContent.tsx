'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'

import { DocumentsForm } from '@/components/AdminComponents/DocumentsPageComponents/DocumentsForm'
import { StatisticsNav as DocumentsNav } from '@/components/AdminComponents/StatisticsPageComponents/StatisticsNav'

import { ImageToUpload } from '@/types/blog.types'
import { IFileToUpload, TypeDocumentsFormState } from '@/types/documents.types'

import { useDeleteImages } from '@/hooks/blog/useDeleteImages'
import { useUploadImages } from '@/hooks/blog/useUploadImages'
import { useDeleteFiles } from '@/hooks/documents/useDeleteFiles'
import { useUpdateDocuments } from '@/hooks/documents/useUpdateDocuments'
import { useUploadFiles } from '@/hooks/documents/useUploadFiles'
import { useInitialDocumentsData } from '@/hooks/documents/useInitialDocumentsData'
import { toast } from 'sonner'

export function PageContent() {
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const [language, setLanguage] = useState<'ro' | 'ru' | 'en'>(locale)

	// For pdf files
	const [filesToUpload, setFilesToUpload] = useState<IFileToUpload[]>([])
	const [filesToDelete, setFilesToDelete] = useState<string[]>([])

	const { uploadFiles, isFilesUploadPending } = useUploadFiles()
	const { deleteFiles, isFilesDeletePending } = useDeleteFiles()
	const { updateDocuments, isUpdatePending } = useUpdateDocuments()

	// For images
	const [imagesToUpload, setImagesToUpload] = useState<ImageToUpload[]>([])
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([])

	const { uploadImages, isImagesUploadPending } = useUploadImages()
	const { deleteImages, isDeletePending } = useDeleteImages()

	const { handleSubmit, control, formState, reset } = useForm<TypeDocumentsFormState>({
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	})

    const { isLoading } = useInitialDocumentsData(reset)

	const onSubmit = (data: TypeDocumentsFormState) => {
		updateDocuments(data, {
			onSuccess: () => {
				// Upload files first
				if (filesToUpload.length > 0) {
					uploadFiles(filesToUpload, {
						onSuccess: () => {
							setFilesToUpload([])
							// Then upload images
							if (imagesToUpload.length > 0) {
								uploadImages(imagesToUpload, {
									onSuccess: () => {
										setImagesToUpload([])
										// Then delete images if needed
										if (imagesToDelete.length > 0) {
											deleteImages(imagesToDelete, {
												onSuccess: () => {
													setImagesToDelete([])
												}
											})
										}
										// Then delete files if needed
										if (filesToDelete.length > 0) {
											deleteFiles(filesToDelete, {
												onSuccess: () => {
													setFilesToDelete([])
												}
											})
										}
									}
								})
							} else {
								// If no images to upload, handle deletions
								if (imagesToDelete.length > 0) {
									deleteImages(imagesToDelete, {
										onSuccess: () => {
											setImagesToDelete([])
										}
									})
								}
								if (filesToDelete.length > 0) {
									deleteFiles(filesToDelete, {
										onSuccess: () => {
											setFilesToDelete([])
										}
									})
								}
							}
						}
					})
				} else if (imagesToUpload.length > 0) {
					// If no files to upload, upload images next
					uploadImages(imagesToUpload, {
						onSuccess: () => {
							setImagesToUpload([])
							if (imagesToDelete.length > 0) {
								deleteImages(imagesToDelete, {
									onSuccess: () => {
										setImagesToDelete([])
									}
								})
							}
							if (filesToDelete.length > 0) {
								deleteFiles(filesToDelete, {
									onSuccess: () => {
										setFilesToDelete([])
									}
								})
							}
						}
					})
				} else {
					// If no uploads, just handle deletions
					if (imagesToDelete.length > 0) {
						deleteImages(imagesToDelete, {
							onSuccess: () => {
								setImagesToDelete([])
							}
						})
					}
					if (filesToDelete.length > 0) {
						deleteFiles(filesToDelete, {
							onSuccess: () => {
								setFilesToDelete([])
							}
						})
					}
				}
			}
		})
	}

	const t = useTranslations('Admin.ToastMessages')

	const onInvalid = (errors: FieldErrors<TypeDocumentsFormState>) => {
		if (Object.keys(errors).length > 0) {
			toast.error(t('please_fill_in_all_required_fields_correctly'))
		}
	}

	return (
		<div className='flex justify-end w-full'>
			<form
				className='mt-[3rem] sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)] w-full'
				onSubmit={handleSubmit(onSubmit, onInvalid)}
			>
				<DocumentsNav
					language={language}
					setLanguage={setLanguage}
					isPending={
						isDeletePending ||
						isFilesUploadPending ||
						isUpdatePending ||
						isImagesUploadPending ||
						isFilesDeletePending ||
						isLoading
					}
				/>

				<DocumentsForm
					isPending={
						isFilesUploadPending ||
						isUpdatePending ||
						isDeletePending ||
						isImagesUploadPending ||
						isFilesDeletePending ||
						isLoading
					}
					formState={formState}
					control={control}
					language={language}
					setFilesToUpload={setFilesToUpload}
					setFilesToDelete={setFilesToDelete}
					setImagesToUpload={setImagesToUpload}
					setImagesToDelete={setImagesToDelete}
				/>
			</form>
		</div>
	)
}

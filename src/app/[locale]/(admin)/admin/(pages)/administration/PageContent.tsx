'use client'

import { useLocale } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ManagementForm } from '@/components/AdminComponents/ManagementPageComponents/ManagementForm/ManagementForm'
import { StatisticsNav as ManagementNav } from '@/components/AdminComponents/StatisticsPageComponents/StatisticsNav'

import { ImageToUpload } from '@/types/blog.types'
import { TypeManagementFormState } from '@/types/management.types'

import { useDeleteImages } from '@/hooks/blog/useDeleteImages'
import { useUploadImages } from '@/hooks/blog/useUploadImages'
import { useInitialManagementData } from '@/hooks/management/useInitialManagementData'
import { useUpdateManagement } from '@/hooks/management/useUpdateManagement'

import { cleanManagementFormData } from '@/lib/form-data-cleaner.utils'

export function PageContent() {
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const [language, setLanguage] = useState<'ro' | 'ru' | 'en'>(locale)

	const [imagesToUpload, setImagesToUpload] = useState<ImageToUpload[]>([])
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([])

	const { uploadImages, isImagesUploadPending } = useUploadImages()
	const { deleteImages, isDeletePending } = useDeleteImages()
	const { updateManagement, isUpdatePending } = useUpdateManagement()

	const { handleSubmit, control, formState, reset } = useForm<TypeManagementFormState>({
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	})

	useInitialManagementData(reset)

	const onSubmit = (data: TypeManagementFormState) => {
		const cleanedData = cleanManagementFormData(data)
		updateManagement(cleanedData, {
			onSuccess: () => {
				if (imagesToUpload.length > 0) {
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
						}
					})
				} else if (imagesToDelete.length > 0) {
					deleteImages(imagesToDelete, {
						onSuccess: () => {
							setImagesToDelete([])
						}
					})
				}
			}
		})
	}

	return (
		<div className='flex justify-end w-full'>
			<form
				className='mt-[3rem] sidebar-req:w-[calc(100vw-20.625rem)] w-full'
				onSubmit={handleSubmit(onSubmit)}
			>
				<ManagementNav
					language={language}
					setLanguage={setLanguage}
					isPending={isDeletePending || isImagesUploadPending || isUpdatePending}
				/>

				<ManagementForm
					isPending={isImagesUploadPending || isUpdatePending || isDeletePending}
					formState={formState}
					control={control}
					language={language}
					setImagesToUpload={setImagesToUpload}
					setImagesToDelete={setImagesToDelete}
				/>
			</form>
		</div>
	)
}

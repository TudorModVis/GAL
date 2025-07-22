'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'

import { StatisticsForm } from '@/components/AdminComponents/StatisticsPageComponents/StatisticsForm/StatisticsForm'
import { StatisticsNav } from '@/components/AdminComponents/StatisticsPageComponents/StatisticsNav'

import { ImageToUpload } from '@/types/blog.types'
import { TypeStatisticsFormState } from '@/types/statistics.types'

import { useDeleteImages } from '@/hooks/blog/useDeleteImages'
import { useUploadImages } from '@/hooks/blog/useUploadImages'
import { useInitialStatisticsData } from '@/hooks/statistics/useInitialStatisticsData'
import { useUpdateStatistics } from '@/hooks/statistics/useUpdateStatistics'
import { toast } from 'sonner'

export function PageContent() {
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const [language, setLanguage] = useState<'ro' | 'ru' | 'en'>(locale)

	const [imagesToUpload, setImagesToUpload] = useState<ImageToUpload[]>([])
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([])

	const { uploadImages, isImagesUploadPending } = useUploadImages()
	const { deleteImages, isDeletePending } = useDeleteImages()
	const { updateStatistics, isUpdatePending } = useUpdateStatistics()

	const { register, handleSubmit, control, formState, reset } = useForm<TypeStatisticsFormState>({
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	})

	const { isLoading } = useInitialStatisticsData(reset)

	const onSubmit = (data: TypeStatisticsFormState) => {
		console.log(data)
		updateStatistics(data, {
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

	const t = useTranslations('Admin.ToastMessages')

	const onInvalid = (errors: FieldErrors<TypeStatisticsFormState>) => {
		if (Object.keys(errors).length > 0) {
			toast.error(t('please_fill_in_all_required_fields_correctly'))
		}
	}

	return (
		<div className='flex justify-end w-full'>
			<form
				className='mt-[3rem] sidebar-req:w-[calc(100vw-20.625rem)] w-full'
				onSubmit={handleSubmit(onSubmit, onInvalid)}
			>
				<StatisticsNav
					language={language}
					setLanguage={setLanguage}
					isPending={isDeletePending || isImagesUploadPending || isUpdatePending || isLoading}
				/>

				<StatisticsForm
					isPending={isImagesUploadPending || isUpdatePending || isDeletePending || isLoading}
					formState={formState}
					control={control}
					register={register}
					language={language}
					setImagesToUpload={setImagesToUpload}
					setImagesToDelete={setImagesToDelete}
				/>
			</form>
		</div>
	)
}

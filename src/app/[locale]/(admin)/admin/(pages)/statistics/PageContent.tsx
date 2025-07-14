'use client'

import { useLocale } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { StatisticsForm } from '@/components/AdminComponents/StatisticsPageComponents/StatisticsForm/StatisticsForm'
import { StatisticsNav } from '@/components/AdminComponents/StatisticsPageComponents/StatisticsNav'

import { ImageToUpload } from '@/types/blog.types'
import { TypeStatisticsFormState } from '@/types/statistics.types'

import { useDeleteImages } from '@/hooks/blog/useDeleteImages'
import { useUploadImages } from '@/hooks/blog/useUploadImages'
import { useInitialStatisticsData } from '@/hooks/statistics/useInitialStatisticsData'
import { useUpdateStatistics } from '@/hooks/statistics/useUpdateStatistics'

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

	useInitialStatisticsData(reset)

	const onSubmit = (data: TypeStatisticsFormState) => {
		if (imagesToUpload.length === 0 && imagesToDelete.length === 0) {
			updateStatistics(data)
			return
		}

		uploadImages(imagesToUpload, {
			onSuccess: () => {
				if (imagesToDelete.length === 0) {
					updateStatistics(data)
					setImagesToUpload([])
					return
				}
				deleteImages(imagesToDelete, {
					onSuccess: () => {
						updateStatistics(data)
						setImagesToUpload([])
					}
				})
			}
		})
	}

	return (
		<div className='flex justify-end w-full'>
			<form
				className='mt-[3rem] sidebar-req:w-[calc(100vw-20.625rem)] w-full'
				onSubmit={handleSubmit(onSubmit)}
			>
				<StatisticsNav
					language={language}
					setLanguage={setLanguage}
					isPending={isDeletePending || isImagesUploadPending || isUpdatePending}
				/>

				<StatisticsForm
					isPending={isImagesUploadPending || isUpdatePending || isDeletePending}
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

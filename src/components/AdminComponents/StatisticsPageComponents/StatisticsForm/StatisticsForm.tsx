'use client'

import { ErrorMessage } from '@hookform/error-message'
import { useCallback } from 'react'
import { Control, FormState, UseFormRegister } from 'react-hook-form'

import { ImageToUpload } from '@/types/blog.types'
import { TypeStatisticsFormState } from '@/types/statistics.types'

import { Spinner } from '../../ui/Spinner/Spinner'

import { StatisticsTitleInput } from './StatisticsTitleInput'
import { StatisticsMainImageUpload } from './StatisticsMainImageUpload'
import { GalStatistics } from './GalStatistics/GalStatistics'

interface Props {
	register: UseFormRegister<TypeStatisticsFormState>
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeStatisticsFormState>
	formState: FormState<TypeStatisticsFormState>
	isPending: boolean

	setImagesToUpload: React.Dispatch<React.SetStateAction<ImageToUpload[]>>
	setImagesToDelete: React.Dispatch<React.SetStateAction<string[]>>
}

export function StatisticsForm({
	register,
	language,
	control,
	formState,
	isPending,
	setImagesToUpload,
	setImagesToDelete
}: Props) {
	const addImageToUpload = useCallback(
		(image: ImageToUpload) => {
			setImagesToUpload(prev => {
				if (!prev.find(img => img.uploadUrl === image.uploadUrl)) {
					return [...prev, image]
				}
				return prev
			})
		},
		[setImagesToUpload]
	)

	const addImageToDelete = useCallback(
		(imageUrl: string) => {
			setImagesToDelete(prev => {
				if (!prev.includes(imageUrl)) {
					return [...prev, imageUrl]
				}
				return prev
			})
		},
		[setImagesToDelete]
	)

	const removeImageFromUpload = useCallback(
		(uploadUrl: string) => {
			setImagesToUpload(prev => prev.filter(img => img.uploadUrl !== uploadUrl))
		},
		[setImagesToUpload]
	)
	return (
		<div className='mt-[3rem]'>
			{isPending && (
				<div className='fixed inset-0 flex justify-center items-center bg-black/10 z-100'>
					<Spinner />
				</div>
			)}

			<StatisticsTitleInput
				formState={formState}
				register={register}
				language={language}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='title'
				render={() => <p className='text-error text-sm mt-1'>Title error</p>}
			/>

			<StatisticsMainImageUpload
				language={language}
				control={control}
				addImageToUpload={addImageToUpload}
				addImageToDelete={addImageToDelete}
				removeImageFromUpload={removeImageFromUpload}
			/>

			<ErrorMessage
				errors={formState.errors}
				name='image'
				render={() => (
					<p className='text-error text-sm mt-1'>
						Image error
					</p>
				)}
			/>

            <GalStatistics
                language={language}
                register={register}
                formState={formState}
            />
		</div>
	)
}

'use client'

import { useCallback } from 'react'
import { Control, FormState } from 'react-hook-form'

import { ImageToUpload } from '@/types/blog.types'
import { TypeManagementFormState } from '@/types/management.types'

import { Spinner } from '../../ui/Spinner/Spinner'

import { AdministrationInput } from './AdministrationInput'
import { CensorshipInput } from './CensorshipInput'
import { CommitteeInput } from './CommitteeInput'
import { ExecutiveInput } from './ExecutiveInput'
import { GeneralAssemblyInput } from './GeneralAssemblyInput'
import { ManagementMainImageUpload } from './ManagementMainImageUpload'
import { ManagementTag } from './ManagementTag'
import { PresidentInput } from './PresidentInput'
import { MANAGEMENT_GROUPS } from './management.data'
import { ErrorMessage } from '@hookform/error-message'
import { ADMIN_MANAGEMENT_TRANSLATE } from '@/constants/admin-management-translate.data'

interface Props {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeManagementFormState>
	formState: FormState<TypeManagementFormState>
	isPending: boolean

	setImagesToUpload: React.Dispatch<React.SetStateAction<ImageToUpload[]>>
	setImagesToDelete: React.Dispatch<React.SetStateAction<string[]>>
}

export function ManagementForm({
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

			<div className='flex gap-[0.5rem]'>
				{MANAGEMENT_GROUPS.map((group, index) => (
					<ManagementTag
						key={`management-group-${index}`}
						text={group.text[language]}
						color={group.color}
					/>
				))}
			</div>

			<h1 className='text-[3rem] font-[700] leading-[3.25rem] text-green-700 mt-[1rem]'>
				{ ADMIN_MANAGEMENT_TRANSLATE.pageTitle[language] }
			</h1>

			<ManagementMainImageUpload
				language={language}
				control={control}
				addImageToUpload={addImageToUpload}
				addImageToDelete={addImageToDelete}
				removeImageFromUpload={removeImageFromUpload}
			/>

			<ErrorMessage
				errors={formState.errors}
				name='main_image'
				render={() => (
					<p className='mt-2 text-red-600'>{ADMIN_MANAGEMENT_TRANSLATE.mainImageInput[language].error}</p>
				)}
			/>

			<h1 className='text-[3rem] font-[700] leading-[3.25rem] text-green-700 mt-[10rem]'>
				{ADMIN_MANAGEMENT_TRANSLATE.presidentTitle[language]}
			</h1>

			<PresidentInput
				language={language}
				control={control}
				formState={formState}
				addImageToUpload={addImageToUpload}
				addImageToDelete={addImageToDelete}
				removeImageFromUpload={removeImageFromUpload}
			/>

			<h1 className='text-[3rem] font-[700] leading-[3.25rem] text-green-700 mt-[6rem]'>
				{ADMIN_MANAGEMENT_TRANSLATE.executiveTitle[language]}
			</h1>

			<ExecutiveInput
				language={language}
				control={control}
				formState={formState}
			/>

			<h1 className='text-[3rem] font-[700] leading-[3.25rem] text-green-700 mt-[6rem]'>
				{ADMIN_MANAGEMENT_TRANSLATE.generalAssemblyTitle[language]}
			</h1>

			<GeneralAssemblyInput
				language={language}
				control={control}
				formState={formState}
			/>

			<h1 className='text-[3rem] font-[700] leading-[3.25rem] text-green-700 mt-[6rem]'>
				{ADMIN_MANAGEMENT_TRANSLATE.administrationTitle[language]}
			</h1>

			<AdministrationInput
				language={language}
				control={control}
				formState={formState}
			/>

			<h1 className='text-[3rem] font-[700] leading-[3.25rem] text-green-700 mt-[6rem]'>
				{ADMIN_MANAGEMENT_TRANSLATE.committeeTitle[language]}
			</h1>

			<CommitteeInput
				language={language}
				control={control}
				formState={formState}
			/>

			<h1 className='text-[3rem] font-[700] leading-[3.25rem] text-green-700 mt-[6rem]'>
				{ADMIN_MANAGEMENT_TRANSLATE.censorshipTitle[language]}
			</h1>

			<CensorshipInput
				language={language}
				control={control}
				formState={formState}
			/>
		</div>
	)
}

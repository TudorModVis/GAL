'use client'

import { DevTool } from '@hookform/devtools'
import { ErrorMessage } from '@hookform/error-message'
import { useCallback, useEffect } from 'react'
import { Control, FormState, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form'

import { BlogsContentTypeEnum, ImageToUpload, TypeBlogFormState } from '@/types/blog.types'

import { Spinner } from '../../ui/Spinner/Spinner'

import { AuthenticLocalCategoryInput } from './BlogAuthenicLocalCategoryInput'
import { BlogCategoriesInput } from './BlogCategoriesInput'
import { BlogContentTypeInput } from './BlogContentTypeInput'
import { BlogMainImageUpload } from './BlogMainImageUpload'
import { BlogParagraphsRoot } from './BlogParagraphs/BlogParagraphsRoot'
import { BlogSummaryInput } from './BlogSummaryInput'
import { BlogTitleInput } from './BlogTitleInput'
import { ADMIN_FORM_TRANSLATE } from '@/constants/admin-form-translate.data'

interface Props {
	register: UseFormRegister<TypeBlogFormState>
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeBlogFormState>
	setValue: UseFormSetValue<TypeBlogFormState>
	formState: FormState<TypeBlogFormState>
	isPending: boolean

	setImagesToUpload: React.Dispatch<React.SetStateAction<ImageToUpload[]>>
	setImagesToDelete: React.Dispatch<React.SetStateAction<string[]>>
}

export function BlogForm({
	register,
	language,
	control,
	setValue,
	formState,
	setImagesToUpload,
	setImagesToDelete,
	isPending
}: Props) {
	const contentType = useWatch({
		control,
		name: 'content_type'
	})

	useEffect(() => {
		if (contentType !== BlogsContentTypeEnum.AUTHENTIC_LOCAL) {
			setValue('authentic_local_category', undefined)
		}
	}, [contentType, setValue])

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

			{/* MARK: Title */}
			<BlogTitleInput
				formState={formState}
				register={register}
				control={control}
				language={language}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='title'
				render={() => (
					<p className='text-error text-sm mt-1'>
						{ ADMIN_FORM_TRANSLATE.titleInput[language].error }
					</p>
				)}
			/>

			{/* MARK: Content Type */}
			<BlogContentTypeInput
				language={language}
				control={control}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='content_type'
				render={() => <p className='text-error text-sm mt-1'>{ ADMIN_FORM_TRANSLATE.contentTypeInput[language].error }</p>}
			/>

			{contentType === BlogsContentTypeEnum.AUTHENTIC_LOCAL && (
				<>
					{/* MARK: Authentic Local Category */}
					<AuthenticLocalCategoryInput
						language={language}
						control={control}
					/>
					<ErrorMessage
						errors={formState.errors}
						name='authentic_local_category'
						render={() => (
							<p className='text-error text-sm mt-1'>{ ADMIN_FORM_TRANSLATE.authenticLocalCategoryInput[language].error }</p>
						)}
					/>
				</>
			)}

			{/* MARK: Categories */}
			<BlogCategoriesInput
				language={language}
				control={control}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='categories'
				render={() => <p className='text-error text-sm mt-1'>{ ADMIN_FORM_TRANSLATE.categoriesInput[language].error }</p>}
			/>

			{/* MARK: Main Image Upload */}
			<BlogMainImageUpload
				language={language}
				control={control}
				addImageToUpload={addImageToUpload}
				addImageToDelete={addImageToDelete}
				removeImageFromUpload={removeImageFromUpload}
			/>
			<ErrorMessage
				errors={formState.errors}
				name='main_image'
				render={() => <p className='text-error text-sm mt-1'>{ ADMIN_FORM_TRANSLATE.mainImageInput[language].error }</p>}
			/>

			{/* MARK: Summary Input */}
			<BlogSummaryInput
				language={language}
				control={control}
				formState={formState}
			/>

			{/* MARK: Paragraphs Root */}
			<BlogParagraphsRoot
				register={register}
				language={language}
				control={control}
				formState={formState}
				addImageToDelete={addImageToDelete}
				addImageToUpload={addImageToUpload}
				removeImageFromUpload={removeImageFromUpload}
			/>
			<DevTool control={control} />
		</div>
	)
}

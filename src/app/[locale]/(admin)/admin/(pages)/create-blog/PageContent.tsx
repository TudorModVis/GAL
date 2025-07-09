'use client'

import { useLocale } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { BlogForm } from '@/components/AdminComponents/BlogPageComponents/BlogForm/BlogForm'
import { BlogPageNav } from '@/components/AdminComponents/BlogPageComponents/BlogPageNav'

import { ImageToUpload, TypeBlogFormState } from '@/types/blog.types'
import { useUploadImages } from '@/hooks/blog/useUploadImages'
import { useCreateBlog } from '@/hooks/blog/useCreateBlog'
import { cleanBlogFormData } from '@/lib/form-data-cleaner.utils'

export function PageContent() {
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const [language, setLanguage] = useState<'ro' | 'ru' | 'en'>(locale)

	const [imagesToUpload, setImagesToUpload] = useState<ImageToUpload[]>([])
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([])

	const { uploadImages, isImagesUploadPending } = useUploadImages()
	const { createBlog, isCreatePending } = useCreateBlog()

	const { register, handleSubmit, control, setValue, formState } =
		useForm<TypeBlogFormState>({
			mode: 'onSubmit',
			reValidateMode: 'onChange'
		})

	const onSubmit = (data: TypeBlogFormState) => {
		const cleanedData = cleanBlogFormData(data)
		uploadImages(imagesToUpload, {
			onSuccess: () => {
				console.log(cleanedData)
				createBlog(cleanedData, {
					onError: (error) => {
						console.error('Failed to create blog:', error)
					}
				})
				setImagesToUpload([])
			}
		})
	}

	return (
		<form className='mt-[3rem]' onSubmit={handleSubmit(onSubmit)}>
			<BlogPageNav
				isPending={isImagesUploadPending || isCreatePending}
				language={language}
				setLanguage={setLanguage}
			/>

			<BlogForm
				isPending={isImagesUploadPending || isCreatePending}
				formState={formState}
				setValue={setValue}
				control={control}
				register={register}
				language={language}
				setImagesToUpload={setImagesToUpload}
				setImagesToDelete={setImagesToDelete}
			/>
		</form>
	)
}

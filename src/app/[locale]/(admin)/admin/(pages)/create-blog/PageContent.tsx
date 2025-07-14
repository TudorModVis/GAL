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
import { useRouter } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'
import { ADMIN_PAGES } from '@/config/admin-pages.config'

export function PageContent() {
	const router = useRouter()
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const [language, setLanguage] = useState<'ro' | 'ru' | 'en'>(locale)

	const [imagesToUpload, setImagesToUpload] = useState<ImageToUpload[]>([])
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
				createBlog(cleanedData, {
					onSuccess: (data) => {
						router.push(ADMIN_PAGES.getBlogEditPage(data.data._id) as Pathnames)
					}
				})
				setImagesToUpload([])
			}
		})
	}

	return (
		<div className='flex justify-end w-full'>
			<form className='mt-[1.5rem] sidebar-req:w-[calc(100vw-20.625rem)] w-full' onSubmit={handleSubmit(onSubmit)}>
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
		</div>
	)
}

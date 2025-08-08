'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'

import { BlogForm } from '@/components/AdminComponents/BlogPageComponents/BlogForm/BlogForm'
import { BlogPageNav } from '@/components/AdminComponents/BlogPageComponents/BlogPageNav'

import { ImageToUpload, TypeBlogFormState } from '@/types/blog.types'

import { ADMIN_PAGES } from '@/config/admin-pages.config'

import { useCreateBlog } from '@/hooks/blog/useCreateBlog'
import { useUploadImages } from '@/hooks/blog/useUploadImages'

import { useRouter } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'
import { cleanBlogFormData } from '@/lib/form-data-cleaner.utils'
import { toast } from 'sonner'

export function PageContent() {
	const router = useRouter()
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const [language, setLanguage] = useState<'ro' | 'ru' | 'en'>(locale)

	const [imagesToUpload, setImagesToUpload] = useState<ImageToUpload[]>([])
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([])

	const { uploadImages, isImagesUploadPending } = useUploadImages()
	const { createBlog, isCreatePending } = useCreateBlog()

	const { register, handleSubmit, control, setValue, formState } = useForm<TypeBlogFormState>({
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	})

	const onSubmit = (data: TypeBlogFormState) => {
		const cleanedData = cleanBlogFormData(data)
		console.log('cleanedData', cleanedData)
		createBlog(cleanedData, {
			onSuccess: response => {
				if (imagesToUpload.length > 0) {
					uploadImages(imagesToUpload, {
						onSuccess: () => {
							setImagesToUpload([])
							router.push(ADMIN_PAGES.getBlogEditPage(response.data._id) as Pathnames)
						}
					})
				} else {
					router.push(ADMIN_PAGES.getBlogEditPage(response.data._id) as Pathnames)
				}
			}
		})
	}

	const t = useTranslations('Admin.ToastMessages')

	const onInvalid = (errors: FieldErrors<TypeBlogFormState>) => {
		if (Object.keys(errors).length > 0) {
			toast.error(t('please_fill_in_all_required_fields_correctly'))
		}
	}

	return (
		<div className='flex justify-end w-full'>
			<form
				className='mt-[1.5rem] sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)] w-full'
				onSubmit={handleSubmit(onSubmit, onInvalid)}
			>
				<BlogPageNav
					isPending={isImagesUploadPending || isCreatePending}
					language={language}
					setLanguage={setLanguage}
					isCreate
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

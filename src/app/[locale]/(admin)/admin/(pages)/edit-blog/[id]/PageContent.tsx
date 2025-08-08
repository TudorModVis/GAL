'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { BlogForm } from '@/components/AdminComponents/BlogPageComponents/BlogForm/BlogForm'
import { BlogPageNav } from '@/components/AdminComponents/BlogPageComponents/BlogPageNav'

import { ImageToUpload, TypeBlogFormState } from '@/types/blog.types'

import { ADMIN_PAGES } from '@/config/admin-pages.config'

import { useDeleteBlog } from '@/hooks/blog/useDeleteBlog'
import { useDeleteImages } from '@/hooks/blog/useDeleteImages'
import { useInitialBlogData } from '@/hooks/blog/useInitialBlogData'
import { useUpdateBlog } from '@/hooks/blog/useUpdateBlog'
import { useUploadImages } from '@/hooks/blog/useUploadImages'

import { useRouter } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'
import { cleanBlogFormData } from '@/lib/form-data-cleaner.utils'

interface Props {
	blogId: string
}

export function PageContent({ blogId }: Props) {
	const router = useRouter()
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const [language, setLanguage] = useState<'ro' | 'ru' | 'en'>(locale)

	const [imagesToUpload, setImagesToUpload] = useState<ImageToUpload[]>([])
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([])

	const { uploadImages, isImagesUploadPending } = useUploadImages()
	const { deleteImages, isDeletePending } = useDeleteImages()
	const { updateBlog, isUpdatePending } = useUpdateBlog(blogId)
	const { deleteBlog, isBlogDeletePending } = useDeleteBlog()

	const { reset, register, getValues, handleSubmit, control, setValue, formState } =
		useForm<TypeBlogFormState>({
			mode: 'onSubmit',
			reValidateMode: 'onChange'
		})

	const { isLoading } = useInitialBlogData(blogId, reset)

	const onSubmit = (data: TypeBlogFormState) => {
		const cleanedData = cleanBlogFormData(data)

		updateBlog(cleanedData, {
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

	const handleDeleteBlog = () => {
		const currentData = getValues()

		const allImagesToDelete: string[] = []

		if (currentData.main_image) {
			allImagesToDelete.push(currentData.main_image)
		}

		if (currentData.sections) {
			currentData.sections.forEach(section => {
				section.subsections?.forEach(subsection => {
					if (subsection.images) {
						subsection.images.forEach(img => {
							if (img.url_2 !== undefined && img.url_2 !== '') {
								allImagesToDelete.push(img.url_1, img.url_2)
							} else {
								allImagesToDelete.push(img.url_1)
							}
						})
					}
				})
			})
		}

		if (imagesToDelete.length > 0) {
			allImagesToDelete.push(...imagesToDelete)
		}

		const uniqueImagesToDelete = [...new Set(allImagesToDelete)]

		if (uniqueImagesToDelete.length > 0) {
			deleteImages(uniqueImagesToDelete, {
				onSuccess: () => {
					deleteBlog(blogId, {
						onSuccess: () => {
							router.push(ADMIN_PAGES.NEWS as Pathnames)
						}
					})
				}
			})
		} else {
			deleteBlog(blogId)
		}
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
				className='mt-[3rem] sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)] w-full'
				onSubmit={handleSubmit(onSubmit, onInvalid)}
			>
				<BlogPageNav
					onDeleteBlog={handleDeleteBlog}
					isPending={
						isImagesUploadPending ||
						isDeletePending ||
						isUpdatePending ||
						isBlogDeletePending ||
						isLoading
					}
					language={language}
					setLanguage={setLanguage}
				/>

				<BlogForm
					isPending={
						isImagesUploadPending ||
						isDeletePending ||
						isUpdatePending ||
						isBlogDeletePending ||
						isLoading
					}
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

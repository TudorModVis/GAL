'use client'

import { useLocale } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { BlogForm } from '@/components/AdminComponents/BlogPageComponents/BlogForm/BlogForm'
import { BlogPageNav } from '@/components/AdminComponents/BlogPageComponents/BlogPageNav'

import { ImageToUpload, TypeBlogFormState } from '@/types/blog.types'

import { useDeleteBlog } from '@/hooks/blog/useDeleteBlog'
import { useDeleteImages } from '@/hooks/blog/useDeleteImages'
import { useInitialBlogData } from '@/hooks/blog/useInitialBlogData'
import { useUpdateBlog } from '@/hooks/blog/useUpdateBlog'
import { useUploadImages } from '@/hooks/blog/useUploadImages'

import { cleanBlogFormData } from '@/lib/form-data-cleaner.utils'

interface Props {
	blogId: string
}

export function PageContent({ blogId }: Props) {
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

	useInitialBlogData(blogId, reset)

	const onSubmit = (data: TypeBlogFormState) => {
		const cleanedData = cleanBlogFormData(data)

		if (imagesToUpload.length === 0 && imagesToDelete.length === 0) {
			updateBlog(cleanedData)
			return
		}
		uploadImages(imagesToUpload, {
			onSuccess: () => {
				if (imagesToDelete.length === 0) {
					updateBlog(cleanedData)
					setImagesToUpload([])
					return
				}
				deleteImages(imagesToDelete, {
					onSuccess: () => {
						updateBlog(cleanedData)
						setImagesToUpload([])
					}
				})
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
						allImagesToDelete.push(...subsection.images)
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
							// router.push('/admin/blogs') // if you have router
						}
					})
				}
			})
		} else {
			deleteBlog(blogId)
		}
	}

	return (
		<form
			className='mt-[3rem]'
			onSubmit={handleSubmit(onSubmit)}
		>
			<BlogPageNav
                onDeleteBlog={handleDeleteBlog}
				isPending={
					isImagesUploadPending || isDeletePending || isUpdatePending || isBlogDeletePending
				}
				language={language}
				setLanguage={setLanguage}
			/>

			<BlogForm
				isPending={
					isImagesUploadPending || isDeletePending || isUpdatePending || isBlogDeletePending
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
	)
}

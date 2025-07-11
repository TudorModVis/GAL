import { Control } from 'react-hook-form'

import { ADMIN_FORM_TRANSLATE } from '@/constants/admin-form-translate.data'

import { ImageToUpload, TypeBlogFormState } from '@/types/blog.types'

import { ImageUpload } from '../../ui/ImageUpload/ImageUpload'

import type { IBlogForm } from './blog-form.types'

interface IBlogContentTypeInput extends Omit<IBlogForm, 'register' | 'watch'> {
	control: Control<TypeBlogFormState>
	addImageToUpload: (image: ImageToUpload) => void
	addImageToDelete: (imageUrl: string) => void
	removeImageFromUpload: (uploadUrl: string) => void
}

export function BlogMainImageUpload({
	language,
	control,
	addImageToUpload,
	addImageToDelete,
	removeImageFromUpload
}: IBlogContentTypeInput) {
	return (
		<>
			<div className='flex justify-between items-center mt-[3rem]'>
				<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
					{ADMIN_FORM_TRANSLATE.mainImageInput[language].label}
				</label>
			</div>

			<ImageUpload
				language={language}
				name='main_image'
				control={control}
				className='mt-[0.5rem]'
				addImageToUpload={addImageToUpload}
				addImageToDelete={addImageToDelete}
				removeImageFromUpload={removeImageFromUpload}
				rules={{
					required: true
				}}
			/>
		</>
	)
}

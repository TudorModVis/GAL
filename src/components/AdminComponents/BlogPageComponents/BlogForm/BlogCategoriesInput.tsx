import { Control } from 'react-hook-form'

import { BlogsCategoriesEnum, TypeBlogFormState } from '@/types/blog.types'

import { MultiSelectBox } from '../../ui/SelectBox/MultiSelectBox'

import type { IBlogForm } from './blog-form.types'
import { ADMIN_FORM_TRANSLATE, FORM_BLOG_CATEGORIES_TRANSLATE } from '@/constants/admin-form-translate.data'

interface IBlogContentTypeInput extends Omit<IBlogForm, 'register' | 'watch'> {
	control: Control<TypeBlogFormState>
}

export function BlogCategoriesInput({ language, control }: IBlogContentTypeInput) {
	const translatedOptions = Object.values(BlogsCategoriesEnum).map(enumValue => ({
		value: enumValue,
		label: FORM_BLOG_CATEGORIES_TRANSLATE[enumValue][language]
	}))

	return (
		<>
			<div className='flex justify-between items-center mt-[3rem]'>
				<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
					{ ADMIN_FORM_TRANSLATE.categoriesInput[language].label }
				</label>
			</div>

			<MultiSelectBox
				options={translatedOptions}
				name='categories'
				control={control}
				placeholder={ ADMIN_FORM_TRANSLATE.categoriesInput[language].placeholder }
				className='bg-gray-300 mt-[0.5rem] font-bold'
				rules={{
					required: true
				}}
			/>
		</>
	)
}

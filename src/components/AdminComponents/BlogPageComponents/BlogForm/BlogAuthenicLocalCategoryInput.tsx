import { Control } from 'react-hook-form'

import { ADMIN_FORM_TRANSLATE, FORM_AUTHENTIC_LOCAL_CATEGORIES_TRANSLATE } from '@/constants/admin-form-translate.data'

import { AuthenticLocalCategoriesEnum, TypeBlogFormState } from '@/types/blog.types'

import { SelectBox } from '../../ui/SelectBox/SelectBox'

import type { IBlogForm } from './blog-form.types'

interface IBlogContentTypeInput extends Omit<IBlogForm, 'register' | 'watch'> {
	control: Control<TypeBlogFormState>
}

export function AuthenticLocalCategoryInput({ language, control }: IBlogContentTypeInput) {
	const translatedOptions = Object.values(AuthenticLocalCategoriesEnum).map(enumValue => ({
		value: enumValue,
		label: FORM_AUTHENTIC_LOCAL_CATEGORIES_TRANSLATE[enumValue][language]
	}))

	return (
		<>
			<div className='flex justify-between items-center mt-[3rem]'>
				<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
					{ ADMIN_FORM_TRANSLATE.authenticLocalCategoryInput[language].label }
				</label>
			</div>

			<SelectBox
				options={translatedOptions}
				name='authentic_local_category'
				control={control}
				placeholder={ ADMIN_FORM_TRANSLATE.authenticLocalCategoryInput[language].placeholder }
				className='bg-gray-300 mt-[0.5rem] font-bold'
				rules={{
					required: true
				}}
			/>
		</>
	)
}

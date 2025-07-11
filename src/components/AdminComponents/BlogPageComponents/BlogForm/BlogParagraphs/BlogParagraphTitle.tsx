import { FormState, UseFormRegister } from 'react-hook-form'

import { InputField } from '@/components/AdminComponents/ui/InputField'

import { TypeBlogFormState } from '@/types/blog.types'

import { BLOG_FORM } from '@/config/blog-form.config'
import { ADMIN_FORM_TRANSLATE } from '@/constants/admin-form-translate.data'

interface Props {
	register: UseFormRegister<TypeBlogFormState>
	language: 'ro' | 'ru' | 'en'
	formState: FormState<TypeBlogFormState>
	index: number
	onRemove: () => void
}

export function BlogParagraphTitle({ register, language, formState, index, onRemove }: Props) {
	const hasError = formState.errors?.sections?.[index]?.title

	return (
		<>
			<div className='flex items-center justify-between'>
				<label
					className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'
					htmlFor='title'
				>
					{ ADMIN_FORM_TRANSLATE.paragraphInput[language].label }
				</label>
				<p
					className='text-[0.875rem] text-error cursor-pointer hover:opacity-70 transition-opacity duration-300'
					onClick={onRemove}
				>
					{ ADMIN_FORM_TRANSLATE.addingElements[language].remove }
				</p>
			</div>
			<InputField
				key={`section-title-${language}`}
				hasError={!!hasError}
				placeholder={ ADMIN_FORM_TRANSLATE.paragraphInput[language].placeholder }
				id='title'
				className='bg-gray-300 mt-[0.5rem] font-bold placeholder:opacity-70'
				{...register(BLOG_FORM.getParagraphTitlePath(language, index), {
					required: true
				})}
			/>
		</>
	)
}

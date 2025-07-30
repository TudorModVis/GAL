'use client'

import { BLOG_FORM } from '@/config/blog-form.config'

import { InputField } from '../../ui/InputField'

import type { IBlogForm } from './blog-form.types'
import { TypeBlogFormState } from '@/types/blog.types'
import { Control, FormState, useWatch } from 'react-hook-form'
import { useEffect } from 'react'
import { ADMIN_FORM_TRANSLATE } from '@/constants/admin-form-translate.data'

interface BlogTitleInputProps extends IBlogForm {
	formState: FormState<TypeBlogFormState>
	control: Control<TypeBlogFormState>
}

export function BlogTitleInput({ register, language, formState, control }: BlogTitleInputProps) {
	const titleValue = useWatch({
		control,
		name: BLOG_FORM.getTitlePath(language),
	}) || ''

	console.log(titleValue)

	const characterCount = titleValue.toString().length;

	const hasError = formState.errors.title

	useEffect(() => {
		register("title.ro", { required: true })
		register("title.ru", { required: true })
		register("title.en", { required: true })
	}, [register])

	return (
		<>
			<div className='flex justify-between items-center'>
				<label
					className='font-bold cursor-text text-green-700 text-[1rem] leading-[1.125rem]'
					htmlFor='title'
				>
					{ ADMIN_FORM_TRANSLATE.titleInput[language].label }
				</label>
				<span className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
					{characterCount}/{BLOG_FORM.MAX_TITLE_LENGTH}
				</span>
			</div>
			<InputField
				hasError={!!hasError}
				placeholder={ADMIN_FORM_TRANSLATE.titleInput[language].placeholder}
				className={`bg-gray-300 mt-[0.5rem] font-bold placeholder:opacity-70`}
				maxLength={BLOG_FORM.MAX_TITLE_LENGTH}
				{...register(BLOG_FORM.getTitlePath(language), {
					maxLength: BLOG_FORM.MAX_TITLE_LENGTH,
					minLength: 1,
					required: true
				})}
			/>
		</>
	)
}

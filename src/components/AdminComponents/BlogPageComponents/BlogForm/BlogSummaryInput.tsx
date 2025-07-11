import { ErrorMessage } from '@hookform/error-message'
import { useCallback, useEffect } from 'react'
import { Control, FormState } from 'react-hook-form'

import { ADMIN_FORM_TRANSLATE } from '@/constants/admin-form-translate.data'

import { TypeBlogFormState } from '@/types/blog.types'

import { BLOG_FORM } from '@/config/blog-form.config'

import { RichTextEditor } from '../../ui/RichTextEditor/RichTextEditor'

import type { IBlogForm } from './blog-form.types'

interface IBlogContentTypeInput extends Omit<IBlogForm, 'register' | 'watch'> {
	control: Control<TypeBlogFormState>
	formState: FormState<TypeBlogFormState>
}

export function BlogSummaryInput({ language, control, formState }: IBlogContentTypeInput) {
	const summaryPaths = BLOG_FORM.getSummaryPaths(language)

	const createColumn2Validator = useCallback((language: 'ro' | 'ru' | 'en') => {
		return (value: string, formValues: TypeBlogFormState) => {
			const column2 = formValues.summary?.column2
			if (!column2) return true

			const { ro, ru, en } = column2
			const hasAnyContent = Boolean(ro?.trim() || ru?.trim() || en?.trim())

			if (hasAnyContent) {
				const currentValue = column2[language]
				if (!currentValue?.trim()) {
					const langName =
						language === 'ro' ? 'Romanian' : language === 'ru' ? 'Russian' : 'English'
					return `${langName} text is required when column 2 is used`
				}
			}

			return true
		}
	}, [])

	useEffect(() => {
		control.register('summary.column1.ro', { required: true })
		control.register('summary.column1.ru', { required: true })
		control.register('summary.column1.en', { required: true })

		control.register('summary.column2.ro', {
			validate: createColumn2Validator('ro')
		})
		control.register('summary.column2.ru', {
			validate: createColumn2Validator('ru')
		})
		control.register('summary.column2.en', {
			validate: createColumn2Validator('en')
		})
	}, [control, summaryPaths, createColumn2Validator])

	return (
		<>
			<div className='flex gap-[1.5rem] mt-[3rem] border-t border-gray-500 pt-[0.75rem]'>
				<div className='flex flex-col max-w-[21.5rem] flex-1 gap-[0.5rem]'>
					<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
						{ADMIN_FORM_TRANSLATE.summaryInput[language].label.title}
					</label>
				</div>

				<div className='flex flex-col max-w-[29rem] flex-1 gap-[0.5rem]'>
					<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
						{ADMIN_FORM_TRANSLATE.summaryInput[language].label.col1_title}
					</label>
					<RichTextEditor
						key={`summary-col1-${language}`}
						control={control}
						name={summaryPaths.column1}
						placeholder={ADMIN_FORM_TRANSLATE.summaryInput[language].placeholder.col1_placeholder}
						rules={{
							required: true
						}}
						className={`${formState.errors.summary?.column1 ? 'border-error text-error placeholder:text-error animate-shake' : ''}`}
					/>
					<ErrorMessage
						errors={formState.errors}
						name='summary.column1'
						render={() => <p className='text-error text-sm'>{ADMIN_FORM_TRANSLATE.summaryInput[language].error.col1_error}</p>}
					/>
				</div>

				<div className='flex flex-col max-w-[29rem] flex-1 gap-[0.5rem]'>
					<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
						{ADMIN_FORM_TRANSLATE.summaryInput[language].label.col2_title}
					</label>
					<RichTextEditor
						key={`summary-col2-${language}`}
						control={control}
						name={summaryPaths.column2}
						placeholder={ADMIN_FORM_TRANSLATE.summaryInput[language].placeholder.col2_placeholder}
						className={`${formState.errors.summary?.column2 ? 'border-error text-error placeholder:text-error animate-shake' : ''}`}
					/>
					<ErrorMessage
						errors={formState.errors}
						name='summary.column2'
						render={() => (
							<p className='text-error text-sm'>
								{ADMIN_FORM_TRANSLATE.summaryInput[language].error.col2_error}
							</p>
						)}
					/>
				</div>
			</div>
		</>
	)
}

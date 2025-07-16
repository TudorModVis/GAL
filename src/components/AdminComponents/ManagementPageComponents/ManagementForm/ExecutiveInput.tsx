import { ErrorMessage } from '@hookform/error-message'
import { useCallback, useEffect } from 'react'
import { Control, FormState } from 'react-hook-form'

import { TypeManagementFormState } from '@/types/management.types'

import { MANAGEMENT_FORM } from '@/config/management-form.config'

import { RichTextEditor } from '../../ui/RichTextEditor/RichTextEditor'
import { ADMIN_MANAGEMENT_TRANSLATE } from '@/constants/admin-management-translate.data'

interface IExecutiveInput {
	language: 'ro' | 'ru' | 'en'
	control: Control<TypeManagementFormState>
	formState: FormState<TypeManagementFormState>
}

export function ExecutiveInput({ language, control, formState }: IExecutiveInput) {
	const executivePaths = MANAGEMENT_FORM.getExecutivePaths(language)

	const createColumn2Validator = useCallback((language: 'ro' | 'ru' | 'en') => {
		return (value: string, formValues: TypeManagementFormState) => {
			const column2 = formValues.executive?.column2
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
		control.register('executive.column1.ro', { required: true })
		control.register('executive.column1.ru', { required: true })
		control.register('executive.column1.en', { required: true })

		control.register('executive.column2.ro', {
			validate: createColumn2Validator('ro')
		})
		control.register('executive.column2.ru', {
			validate: createColumn2Validator('ru')
		})
		control.register('executive.column2.en', {
			validate: createColumn2Validator('en')
		})
	}, [control, executivePaths, createColumn2Validator])

	return (
		<>
			<div className='flex gap-[1.5rem] mt-[3rem] border-t border-gray-500 pt-[0.75rem]'>
				<div className='flex flex-col max-w-[21.5rem] flex-1 gap-[0.5rem]'>
					<label className='font-bold text-green-700 max-w-[80%] text-[1rem] leading-[1.125rem]'>
						{ADMIN_MANAGEMENT_TRANSLATE.executiveInput.title[language]}
					</label>
				</div>

				<div className='flex flex-col max-w-[29rem] flex-1 gap-[0.5rem]'>
					<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
						{ADMIN_MANAGEMENT_TRANSLATE.executiveInput.column1Input[language].label}
					</label>
					<RichTextEditor
						key={`executive-col1-${language}`}
						control={control}
						name={executivePaths.column1}
						placeholder={ADMIN_MANAGEMENT_TRANSLATE.executiveInput.column1Input[language].placeholder}
						rules={{
							required: true
						}}
						className={`${formState.errors.executive?.column1 ? 'border-error text-error placeholder:text-error animate-shake' : ''}`}
					/>
					<ErrorMessage
						errors={formState.errors}
						name='executive.column1'
						render={() => (
							<p className='text-error text-sm'>
								{ADMIN_MANAGEMENT_TRANSLATE.executiveInput.column1Input[language].error}
							</p>
						)}
					/>
				</div>

				<div className='flex flex-col max-w-[29rem] flex-1 gap-[0.5rem]'>
					<label className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'>
						{ADMIN_MANAGEMENT_TRANSLATE.executiveInput.column2Input[language].label}
					</label>
					<RichTextEditor
						key={`executive-col2-${language}`}
						control={control}
						name={executivePaths.column2}
						placeholder={ADMIN_MANAGEMENT_TRANSLATE.executiveInput.column2Input[language].placeholder}
						className={`${formState.errors.executive?.column2 ? 'border-error text-error placeholder:text-error animate-shake' : ''}`}
					/>
					<ErrorMessage
						errors={formState.errors}
						name='executive.column2'
						render={() => (
							<p className='text-error text-sm'>
								{ADMIN_MANAGEMENT_TRANSLATE.executiveInput.column2Input[language].error}
							</p>
						)}
					/>
				</div>
			</div>
		</>
	)
}

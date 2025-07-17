'use client'

import { useEffect } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import { TypeStatisticsFormState } from '@/types/statistics.types'

import { STATISTICS_FORM } from '@/config/statistics-form.config'

import { InputField } from '../../ui/InputField'
import { ADMIN_STATISTICS_TRANSLATE } from '@/constants/admin-statistics-translate.data'

interface StatisticsTitleInputProps {
	formState: FormState<TypeStatisticsFormState>
	register: UseFormRegister<TypeStatisticsFormState>
	language: 'ro' | 'ru' | 'en'
}

export function StatisticsTitleInput({ register, language, formState }: StatisticsTitleInputProps) {
	const hasError = formState.errors.title

	useEffect(() => {
		register('title.ro', { required: true })
		register('title.ru', { required: true })
		register('title.en', { required: true })
	}, [register])

	return (
		<>
			<div>
				<label
					className='font-bold cursor-text text-green-700 text-[1rem] leading-[1.125rem]'
					htmlFor='title'
				>
					{ADMIN_STATISTICS_TRANSLATE.titleInput[language].label}
					{hasError && <span className='text-error'> *</span>}
				</label>
			</div>
			<InputField
				key={`title-${language}`}
				hasError={!!hasError}
				placeholder={ADMIN_STATISTICS_TRANSLATE.titleInput[language].placeholder}
				className={`bg-gray-300 mt-[0.5rem] font-bold placeholder:opacity-70`}
				{...register(STATISTICS_FORM.getTitlePath(language), {
					minLength: 1,
					required: true
				})}
			/>
		</>
	)
}

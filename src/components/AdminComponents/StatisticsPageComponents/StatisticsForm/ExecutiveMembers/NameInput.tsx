'use client'

import { useEffect } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import { InputField } from '@/components/AdminComponents/ui/InputField'

import { ADMIN_STATISTICS_TRANSLATE } from '@/constants/admin-statistics-translate.data'

import { TypeStatisticsFormState } from '@/types/statistics.types'

import { STATISTICS_FORM } from '@/config/statistics-form.config'

interface Props {
	register: UseFormRegister<TypeStatisticsFormState>
	language: 'ro' | 'ru' | 'en'
	formState: FormState<TypeStatisticsFormState>
	index: number
}

export function NameInput({ register, language, formState, index }: Props) {
	const hasError = formState.errors?.executive_members?.[index]?.name

	useEffect(() => {
		register(`executive_members.${index}.name.ro`, { required: true })
		register(`executive_members.${index}.name.ru`, { required: true })
		register(`executive_members.${index}.name.en`, { required: true })
	}, [register, index])

	return (
		<div className='mt-[1.5rem]'>
			<label
				className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'
				htmlFor='member_name'
			>
				{ADMIN_STATISTICS_TRANSLATE.executiveMembersNameInput[language].label}
			</label>

			<InputField
				key={`member-name-${language}`}
				hasError={!!hasError}
				placeholder={ADMIN_STATISTICS_TRANSLATE.executiveMembersNameInput[language].placeholder}
				id='member_name'
				className='bg-gray-300 mt-[0.5rem] font-[400] text-[1rem] leading-[1.125rem] placeholder:opacity-70'
				{...register(STATISTICS_FORM.getMemberNamePath(language, index), {
					required: true
				})}
			/>
		</div>
	)
}

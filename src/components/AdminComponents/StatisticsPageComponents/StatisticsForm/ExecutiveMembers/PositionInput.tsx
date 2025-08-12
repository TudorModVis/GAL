"use client"

import { FormState, UseFormRegister } from 'react-hook-form'

import { InputField } from '@/components/AdminComponents/ui/InputField'

import { ADMIN_STATISTICS_TRANSLATE } from '@/constants/admin-statistics-translate.data'

import { TypeStatisticsFormState } from '@/types/statistics.types'

import { STATISTICS_FORM } from '@/config/statistics-form.config'
import { useEffect } from 'react'

interface Props {
	register: UseFormRegister<TypeStatisticsFormState>
	language: 'ro' | 'ru' | 'en'
	formState: FormState<TypeStatisticsFormState>
	index: number
}

export function PositionInput({ register, language, formState, index }: Props) {
	const hasError = formState.errors?.executive_members?.[index]?.position

	useEffect(() => {
		register(`executive_members.${index}.position.ro`, { required: true })
		register(`executive_members.${index}.position.ru`, { required: true })
		register(`executive_members.${index}.position.en`, { required: true })
	}, [register, index])

	return (
		<div className='mt-[1rem]'>
			<label
				className='font-bold text-green-700 text-[1rem] leading-[1.125rem]'
				htmlFor='member_position'
			>
				{ADMIN_STATISTICS_TRANSLATE.executiveMemberPositionInput[language].label}
			</label>

			<InputField
				key={`member-position-${language}`}
				hasError={!!hasError}
				placeholder={ADMIN_STATISTICS_TRANSLATE.executiveMemberPositionInput[language].placeholder}
				id='member_position'
				className='bg-gray-300 mt-[0.5rem] font-[400] text-[1rem] leading-[1.125rem] placeholder:opacity-70'
				{...register(STATISTICS_FORM.getMemberPositionPath(language, index), {
					required: true
				})}
			/>
		</div>
	)
}

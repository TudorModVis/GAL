import {
	Select,
	SelectArrow,
	SelectItem,
	SelectItemCheck,
	SelectPopover,
	SelectProvider
} from '@ariakit/react'
import { Control, Controller, RegisterOptions } from 'react-hook-form'

import { BlogsCategoriesEnum, ISection, TypeBlogFormState } from '@/types/blog.types'
import { TypeStatisticsFormState } from '@/types/statistics.types'

import { cn } from '@/lib/utils'

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	options: { value: string; label: string }[]
	name: keyof TypeBlogFormState | keyof TypeStatisticsFormState
	control: Control<TypeBlogFormState | TypeStatisticsFormState>
	placeholder: string
	className?: string
	rules?: RegisterOptions
}

export const MultiSelectBox = ({
	className,
	name,
	control,
	options,
	placeholder,
	rules
}: ISelectProps) => {
	const getLabelForValue = (selectedValue: string) => {
		const option = options.find(opt => opt.value === selectedValue)
		return option ? option.label : selectedValue
	}
	return (
		<Controller
			name={name as keyof TypeBlogFormState | keyof TypeStatisticsFormState}
			control={control}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			rules={rules as any}
			render={({ field: { value = [], onChange }, fieldState }) => {
				const arrayValue = Array.isArray(value) ? value : []
				const hasError = !!fieldState.error

				return (
					<SelectProvider
						value={arrayValue as string[]}
						setValue={onChange}
					>
						<Select
							className={cn(
								`flex justify-between cursor-pointer items-center font-roboto transition-colors duration-300 h-[3rem] w-full px-[1.5rem] outline-none border border-gray-500 rounded-[0.5rem] text-[1rem] leading-[1.125rem] text-green-700 [&>span>svg]:transition-transform [&>span>svg]:duration-300 aria-expanded:[&>span>svg]:rotate-180 placeholder:text-green-700 ${hasError && 'border-red-500 text-red-500 placeholder:text-red-500 animate-shake'}`,
								className
							)}
						>
							{arrayValue.length === 0 ? (
								<span
									className={`text-green-700 opacity-70 ${hasError && 'border-red-500 text-red-500 placeholder:text-red-500 animate-shake'}`}
								>
									{placeholder}
								</span>
							) : (
								<div className='flex items-center gap-[0.5rem]'>
									{arrayValue.map((value, index) => (
										<span
											key={index}
											className='text-green-700 font-[400] text-[0.75rem] leading-[0.875rem] bg-white px-[1rem] py-[0.25rem] rounded-[0.25rem]'
										>
											{getLabelForValue(value.toString())}
										</span>
									))}
								</div>
							)}
							<SelectArrow />
						</Select>
						<SelectPopover
							data-lenis-prevent
							gutter={4}
							sameWidth
							className='bg-gray-300 max-h-[12rem] styled-scrollbar overflow-y-auto border z-60 border-gray-500 rounded-[0.25rem] overflow-hidden scale-y-0 data-[enter]:scale-y-100 origin-top transition-all duration-300'
						>
							{options.map(option => (
								<SelectItem
									key={option.value}
									value={option.value}
									className={cn(
										'text-green-700 flex justify-between items-center rounded-[0.25rem] h-[3rem] px-[0.5rem] transition-colors duration-300 cursor-pointer',
										arrayValue.includes(option.value as BlogsCategoriesEnum & ISection)
											? 'bg-gray-400 data-[active-item]:bg-gray-500/50'
											: 'data-[active-item]:bg-gray-400'
									)}
								>
									{option.label}
									<SelectItemCheck />
								</SelectItem>
							))}
						</SelectPopover>
					</SelectProvider>
				)
			}}
		/>
	)
}

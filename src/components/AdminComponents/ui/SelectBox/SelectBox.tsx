import {
	Select,
	SelectArrow,
	SelectItem,
	SelectItemCheck,
	SelectPopover,
	SelectProvider
} from '@ariakit/react'
import { Control, Controller, RegisterOptions } from 'react-hook-form'

import { TypeBlogFormState } from '@/types/blog.types'
import { TypeStatisticsFormState } from '@/types/statistics.types'

import { cn } from '@/lib/utils'

interface ISelectProps {
	options: string[]
	name: keyof TypeBlogFormState | keyof TypeStatisticsFormState
	control: Control<TypeBlogFormState | TypeStatisticsFormState>
	placeholder: string
	className?: string
	rules?: RegisterOptions
}

export const SelectBox = ({
	className,
	name,
	control,
	options,
	placeholder,
	rules
}: ISelectProps) => {
	return (
		<Controller
			name={name as keyof TypeBlogFormState | keyof TypeStatisticsFormState}
			control={control}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			rules={rules as any}
			render={({ field: { value = '', onChange }, fieldState }) => (
				<SelectProvider
					value={value as string}
					setValue={onChange}
				>
					<Select
						className={cn(
							`flex justify-between cursor-pointer items-center font-roboto transition-colors duration-300 h-[3rem] w-full px-[1.5rem] outline-none border border-gray-500 rounded-[0.5rem] text-[1rem] leading-[1.125rem] text-green-700 [&>span>svg]:transition-transform [&>span>svg]:duration-300 aria-expanded:[&>span>svg]:rotate-180 placeholder:text-green-700 ${!!fieldState.error && 'border-red-500 text-red-500 placeholder:text-red-500 animate-shake'}`,
							className
						)}
					>
						{value === '' ? (
							<span className={`text-green-700 opacity-70 ${!!fieldState.error && 'border-red-500 text-red-500 placeholder:text-red-500 animate-shake'}`}>{placeholder}</span>
						) : (
							<span className='text-green-700'>{value as string}</span>
						)}
						<SelectArrow />
					</Select>
					<SelectPopover
						gutter={4}
						sameWidth
						className='bg-gray-300 z-10 border border-gray-500 rounded-[0.25rem] overflow-hidden scale-y-0 data-[enter]:scale-y-100 origin-top transition-all duration-300'
					>
						{options.map(option => (
							<SelectItem
								key={option}
								value={option}
								className='text-green-700 flex justify-between items-center data-[active-item]:bg-gray-400 rounded-[0.25rem] h-[3rem] px-[0.5rem] transition-colors duration-300 cursor-pointer'
							>
								{option}
								<SelectItemCheck />
							</SelectItem>
						))}
					</SelectPopover>
				</SelectProvider>
			)}
		/>
	)
}

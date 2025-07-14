import { FormState, UseFormRegister } from 'react-hook-form'

import { TypeStatisticsFormState } from '@/types/statistics.types'

import { StatisticItem } from './StatisticItem'
import { STATISTICS_DATA } from './statistics.data'

interface Props {
	language: 'ro' | 'ru' | 'en'
	register: UseFormRegister<TypeStatisticsFormState>
	formState: FormState<TypeStatisticsFormState>
}

export function GalStatistics({ language, register, formState }: Props) {
	return (
		<div className='mt-[6rem]'>
			<h1 className='font-bold text-[3rem] leading-[3.25rem]'>Statistica GAL</h1>

			<div className='mt-[3rem] grid grid-cols-4 gap-x-[1.5rem] gap-y-[3rem]'>
				{STATISTICS_DATA.map((item, index) => (
					<StatisticItem
						key={`statistic-item-${index}`}
						register={register}
						title={item.title[language]}
						name={item.name}
						formState={formState}
					/>
				))}
			</div>
		</div>
	)
}

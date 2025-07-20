'use client'
import { useTranslations } from 'next-intl'
import React from 'react'

import AnimatedHeader from '../CommonComponents/AnimatedHeader'
import ParalaxImage from '../CommonComponents/ParalaxImage'
import { useQuery } from '@tanstack/react-query'
import { statisticsService } from '@/services/statistics.service'

const Breaker = () => {
	const tBreaker = useTranslations('index.Breaker')

	const { data } = useQuery({
		queryKey: ['statistics'],
		queryFn: () => statisticsService.getStatistics()
	})

	return (
		<section className='w-screen grid grid-cols-full relative sm:px-8 my-40'>
			<AnimatedHeader
				customStyles='col-span-full sm:col-span-9 text-2xl sm:text-5xl h-fit font-bold sm:leading-13 leading-7 mb-6 sm:mb-8 sm:mt-0 mt-20'
				text={tBreaker('motto')}
			/>
			<div className='col-span-full h-[358px] sm:h-[640px] relative'>
				<ParalaxImage
					source={data?.data?.image || '/breaker_image.png'}
					altText={tBreaker('image_alt')}
				/>
			</div>
		</section>
	)
}

export default Breaker

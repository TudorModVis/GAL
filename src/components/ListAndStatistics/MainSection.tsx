'use client'

import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import React from 'react'
import { useMemo } from 'react'

import AnimatedCounter from '../CommonComponents/AnimatedCounter'
import AnimatedHeader from '../CommonComponents/AnimatedHeader'
import AnimatedLine from '../CommonComponents/AnimatedLine'
import AnimatedText from '../CommonComponents/AnimatedText'
import LinkWithArrow from '../CommonComponents/LinkWithArrow'

import MapPlaceholder from './MapPlaceholder'
import MiniSection from './MiniSection'
import { statisticsService } from '@/services/statistics.service'

const MainSection = () => {
	const MapWithNoSSR = useMemo(
		() =>
			dynamic(() => import('./Map'), {
				loading: () => <MapPlaceholder />,
				ssr: false
			}),
		[]
	)

	const { data } = useQuery({
		queryKey: ['statistics'],
		queryFn: () => statisticsService.getStatistics()
	})

	const statistics = data?.data

	const tListAndStatistics = useTranslations('aboutUs.listAndStatistics')
	return (
		<>
			<section className='grid w-screen h-fit gap-[24px] grid-cols-donation mt-24'>
				<div className='col-span-full sm:col-span-12 flex flex-col justify-between'>
					<div className='w-full'>
						<AnimatedHeader
							text={tListAndStatistics('title')}
							customStyles='text-2xl sm:text-5xl sm:leading-13 leading-7 font-bold mb-6 sm:mt-0 mt-20 sm:mb-12'
						/>
						<AnimatedText
							text={tListAndStatistics('description')}
							customStyles='leading-4.5 mb-6'
						/>

						<LinkWithArrow
							text={tListAndStatistics('resource_map_button')}
							href='/'
							arrowProps='group-hover/link:rotate-0 -rotate-45 fill-sand-50'
							customStyle='flex w-full gap-1 items-center [&>div:nth-child(1)]:py-2.5 [&>div]:bg-forest-800 [&>div]:text-sand-50
                     [&>div:nth-child(1)]:px-4 [&>div]:group-hover/link:bg-forest-700 [&>div]:rounded-full [&>div:nth-child(2)]:p-3'
						/>
					</div>
					<div className='col-span-full max-h-[400px] mt-12 mb-6 bg-green-900 overflow-hidden sm:hidden block rounded-2xl'>
						<MapWithNoSSR />
					</div>
					<div className='w-full grid grid-cols-6 gap-4 sm:gap-[24px]'>
						<div className='sm:col-span-3 col-span-full'>
							<AnimatedLine />
							<AnimatedText
								text={tListAndStatistics('total_members')}
								customStyles='mt-2 mb-9 sm:mb-10'
							/>
							<AnimatedCounter
								from={0}
								to={statistics?.total_members ?? 0}
							/>
						</div>
						<div className='sm:col-span-3 col-span-full'>
							<AnimatedLine />
							<AnimatedText
								text={tListAndStatistics('entrepreneurial_sector_members')}
								customStyles='mt-2 mb-9 sm:mb-10'
							/>
							<AnimatedCounter
								from={0}
								to={statistics?.business_members ?? 0}
							/>
						</div>
						<div className='sm:col-span-3 col-span-full'>
							<AnimatedLine />
							<AnimatedText
								text={tListAndStatistics('public_sector_members')}
								customStyles='mt-2 mb-9 sm:mb-10'
							/>
							<AnimatedCounter
								from={0}
								to={statistics?.public_members ?? 0}
							/>
						</div>
						<div className='sm:col-span-3 col-span-full sm:mb-0 mb-20'>
							<AnimatedLine />
							<AnimatedText
								text={tListAndStatistics('civic_sector_members')}
								customStyles='mt-2 mb-9 sm:mb-10'
							/>
							<AnimatedCounter
								from={0}
								to={statistics?.civic_members ?? 0}
							/>
						</div>
					</div>
				</div>
				<div className='col-span-11 col-start-14 max-h-[70vh] bg-green-900 overflow-hidden sm:block hidden rounded-2xl'>
					<MapWithNoSSR />
				</div>
			</section>
			<MiniSection />
		</>
	)
}

export default MainSection

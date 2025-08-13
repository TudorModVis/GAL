'use client'

import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

import { IMultiLangText } from '@/types/shared/text.types'

import AnimatedHeader from '../CommonComponents/AnimatedHeader'
import AnimatedText from '../CommonComponents/AnimatedText'

import { statisticsService } from '@/services/statistics.service'

type Locale = keyof IMultiLangText

const Members = () => {
	const tMembers = useTranslations('aboutUs.members')

	const { data } = useQuery({
		queryKey: ['statistics'],
		queryFn: () => statisticsService.getStatistics()
	})

	const locale = useLocale() as Locale
	const statistics = data?.data?.executive_members ?? []

	const nameAt = (i: number) => statistics[i]?.name?.[locale] ?? statistics[i]?.name?.en ?? ''
	const positionAt = (i: number) =>
		statistics[i]?.position?.[locale] ?? statistics[i]?.position?.en ?? ''
	const imageAt = (i: number) => statistics[i]?.image

	return (
		<section className='w-screen min-h_[77vh] min-h-[77vh] h-fit grid grid-cols-full grid-rows-[auto_1fr] relative text-forest-900 mb-16'>
			<AnimatedHeader
				text={tMembers('title')}
				customStyles='font-bold text-2xl sm:text-5xl leading-7 sm:leading-13 col-span-full pt-4 sm:pt-0 mt-20 sm:mt-24 mb-6 sm:mb-12 border-t-[1px] border-stone-400 sm:border-t-0'
			/>

			<div className='sm:col-span-3 col-span-full h-full relative flex flex-col'>
				<div className='w-full sm:h-[67%] max-h-[358px] sm:max-h-none h-full'>
					{imageAt(0) ? (
						<Image
							alt={nameAt(0) || 'Executive member'}
							src={imageAt(0)!}
							width={300}
							height={400}
							className='rounded-2xl'
							style={{ objectFit: 'cover', height: '100%', width: '100%' }}
						/>
					) : (
						<div
							className='rounded-2xl bg-stone-400 animate-pulse'
							style={{ height: '100%', width: '100%' }}
						/>
					)}
				</div>
				<AnimatedText
					text={nameAt(0)}
					customStyles='font-bold mt-6 mb-4 text-xl'
				/>
				<AnimatedText
					text={positionAt(0)}
					customStyles='sm:mb-0 mb-6'
				/>
			</div>

			<div className='sm:col-span-3 col-span-full h-full relative flex flex-col'>
				<div className='w-full sm:h-[88%] max-h-[358px] sm:max-h-none h-full'>
					{imageAt(1) ? (
						<Image
							alt={nameAt(1) || 'Executive member'}
							src={imageAt(1)!}
							width={300}
							height={400}
							className='rounded-2xl'
							style={{
								objectFit: 'cover',
								objectPosition: 'top',
								height: '100%',
								width: '100%'
							}}
						/>
					) : (
						<div
							className='rounded-2xl bg-stone-400 animate-pulse'
							style={{ height: '100%', width: '100%' }}
						/>
					)}
				</div>
				<AnimatedText
					text={nameAt(1)}
					customStyles='font-bold mt-6 mb-4 text-xl'
				/>
				<AnimatedText
					text={positionAt(1)}
					customStyles='sm:mb-0 mb-6'
				/>
			</div>

			<div className='sm:col-span-3 col-span-full h-full relative flex flex-col'>
				<div className='w-full sm:h-[67%] max-h-[358px] sm:max-h-none h-full'>
					{imageAt(2) ? (
						<Image
							alt={nameAt(2) || 'Executive member'}
							src={imageAt(2)!}
							width={300}
							height={400}
							className='rounded-2xl'
							style={{ objectFit: 'cover', height: '100%', width: '100%' }}
						/>
					) : (
						<div
							className='rounded-2xl bg-stone-400 animate-pulse'
							style={{ height: '100%', width: '100%' }}
						/>
					)}
				</div>
				<AnimatedText
					text={nameAt(2)}
					customStyles='font-bold mt-6 mb-4 text-xl'
				/>
				<AnimatedText
					text={positionAt(2)}
					customStyles='sm:mb-0 mb-6'
				/>
			</div>

			<div className='sm:col-span-3 col-span-full h-full relative flex flex-col mb-20 sm:mb-0'>
				<div className='w-full sm:h-[88%] max-h-[358px] sm:max-h-none h-full'>
					{imageAt(3) ? (
						<Image
							alt={nameAt(3) || 'Executive member'}
							src={imageAt(3)!}
							width={300}
							height={400}
							className='rounded-2xl'
							style={{
								objectFit: 'cover',
								objectPosition: 'top',
								height: '100%',
								width: '100%'
							}}
						/>
					) : (
						<div
							className='rounded-2xl bg-stone-400 animate-pulse'
							style={{ height: '100%', width: '100%' }}
						/>
					)}
				</div>
				<AnimatedText
					text={nameAt(3)}
					customStyles='font-bold mt-6 mb-4 text-xl'
				/>
				<AnimatedText
					text={positionAt(3)}
					customStyles='sm:mb-0 mb-6'
				/>
			</div>
		</section>
	)
}

export default Members

// AboutUs.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { Variants, motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import React, { useRef } from 'react'

import AnimatedCounter from '../CommonComponents/AnimatedCounter'
import AnimatedHeader from '../CommonComponents/AnimatedHeader'
import AnimatedLine from '../CommonComponents/AnimatedLine'
import AnimatedText from '../CommonComponents/AnimatedText'
import LinkWithArrow from '../CommonComponents/LinkWithArrow'

import Moldova from './Moldova'
import { statisticsService } from '@/services/statistics.service'

// AboutUs.tsx

const AboutUs = () => {
	const tAboutUs = useTranslations('index.AboutUs')

	const { data } = useQuery({
		queryKey: ['statistics'],
		queryFn: () => statisticsService.getStatistics()
	})

	const statistics = data?.data

	const ease = [0.23, 1, 0.32, 1] as const

	const groupVariants: Variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: { staggerChildren: 0.15 }
		}
	}

	const childVariants: Variants = {
		hidden: { y: '1.5rem', opacity: 0 },
		show: { y: 0, opacity: 1, transition: { duration: 0.4, ease } }
	}

	const groupRef = useRef(null)
	const groupInView = useInView(groupRef, { once: true })

	return (
		<section
			id='aboutUs'
			className='w-screen h-fit grid grid-cols-full relative sm:px-8 sm:my-24 overflow-x-clip'
		>
			<motion.div
				className='order-1 col-span-full sm:col-span-6 leading-4.5 mb-12 sm:mb-0 sm:mt-0 mt-20'
				ref={groupRef}
				variants={groupVariants}
				initial='hidden'
				animate={groupInView ? 'show' : 'hidden'}
			>
				<motion.div variants={childVariants}>
					<p className='font-bold'>{tAboutUs('impact_title')}</p>
				</motion.div>
				<motion.div variants={childVariants}>
					<p className='mt-2 mb-9'>{tAboutUs('impact_description')}</p>
				</motion.div>
				<motion.div variants={childVariants}>
					<LinkWithArrow
						text={tAboutUs('button_learn_more')}
						href='/aboutUs'
						arrowProps='group-hover/link:fill-sand-50 leading-6 group-hover/link:rotate-0 -rotate-45 fill-sand-50'
						customStyle='flex w-fit leading-6 gap-1 items-center [&>div:nth-child(1)]:py-2.5
                     [&>div:nth-child(1)]:px-4 [&>div]:bg-forest-800 [&>div]:group-hover/link:bg-forest-700 text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3.5'
					/>
				</motion.div>
			</motion.div>
			<div className='order-3 sm:order-2 col-span-full sm:col-span-9 mt-12 sm:mt-60'>
				<AnimatedHeader
					customStyles='font-bold text-2xl sm:text-5xl sm:leading-13 leading-7'
					text={tAboutUs('main_headline')}
				/>
			</div>
			<div className='order-2 sm:order-3 sm:col-start-7 lg:col-start-8 xl:col-start-9 sm:col-span-4 flex justify-center col-span-full sm:absolute'>
				<Moldova />
			</div>
			<div className='order-4 flex flex-col col-span-full sm:col-span-3 sm:row-start-3 sm:mt-24 mt-6 sm:h-40 h-[106px]'>
				<AnimatedLine order={0} />
				<div className='h-full flex flex-col justify-between'>
					<AnimatedText
						customStyles='leading-4.5 mt-2'
						text={tAboutUs('stat_projects_success')}
					/>
					<div className='flex gap'>
						<AnimatedCounter
							from={0}
							to={statistics?.projects_number ?? 0}
						/>
						<span className='sm:leading-13 leading-7 font-bold sm:text-5xl text-2xl'>+</span>
					</div>
				</div>
			</div>
			<div className='order-5 flex flex-col col-span-full sm:col-span-3 sm:row-start-3 sm:mt-24 mt-4 sm:h-40 h-[106px]'>
				<AnimatedLine order={1} />
				<div className='h-full flex flex-col justify-between'>
					<AnimatedText
						customStyles='leading-4.5 mt-2'
						text={tAboutUs('stat_years_activity')}
					/>
					<div className='flex gap'>
						<AnimatedCounter
							from={0}
							to={statistics?.activity_years ?? 0}
						/>
					</div>
				</div>
			</div>
			<div className='order-6 flex flex-col col-span-full sm:col-span-3 sm:row-start-3 sm:mt-24 mt-4 sm:h-40 h-[106px]'>
				<AnimatedLine order={2} />
				<div className='h-full flex flex-col justify-between'>
					<AnimatedText
						customStyles='leading-4.5 mt-2'
						text={tAboutUs('stat_total_population')}
					/>
					<div className='flex gap'>
						<AnimatedCounter
							from={0}
							to={statistics?.population ?? 0}
						/>
						<span className='sm:leading-13 leading-7 font-bold text-2xl sm:text-5xl'>+</span>
					</div>
				</div>
			</div>
			<div className='order-7 flex flex-col col-span-full sm:col-span-3 sm:row-start-3 sm:mt-24 mt-4 sm:h-40 h-[106px] sm:mb-0 mb-20'>
				<AnimatedLine order={3} />
				<div className='h-full flex flex-col justify-between'>
					<AnimatedText
						customStyles='leading-4.5 mt-2'
						text={tAboutUs('stat_total_members')}
					/>
					<AnimatedCounter
						from={0}
						to={statistics?.total_members ?? 0}
					/>
				</div>
			</div>
		</section>
	)
}

export default AboutUs

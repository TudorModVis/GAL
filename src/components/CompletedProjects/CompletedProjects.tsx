'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Slider from 'react-slick'

import { IGetParams } from '@/types/blog.types'

import AnimatedHeader from '../CommonComponents/AnimatedHeader'
import AnimatedLine from '../CommonComponents/AnimatedLine'
import Arrow from '../CommonComponents/Arrow'
import BigPost from '../CommonComponents/BigPost'
import LinkWithArrow from '../CommonComponents/LinkWithArrow'
import SmallPost from '../CommonComponents/SmallPost'

import { blogService } from '@/services/blog.service'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const CompletedProjects = () => {
	const tCompletedProjects = useTranslations('index.CompletedProjects')
	const sliderRef = useRef<Slider>(null)
	const [currentSlide, setCurrentSlide] = useState(0)

	const [params, setParams] = useState<IGetParams>({
		page: 1,
		limit: 11
		// content_type: BlogsContentTypeEnum.PROJECT
	})

	useEffect(() => {
		setParams({
			page: 1,
			limit: 11
		})
	}, [])

	const { data } = useQuery({
		queryKey: ['blogs', params],
		queryFn: () => blogService.getAllBlogs(params)
	})

	const projectPages = useMemo(() => {
		if (!data?.data?.blogs) return []
		const pages = []
		for (let i = 0; i < data.data.blogs.length; i += 2) {
			pages.push(data.data.blogs.slice(i, i + 2))
		}
		return pages
	}, [data])

	const totalSlides = projectPages.length
	const mobileTotalSlides = data?.data?.blogs?.length ?? 0

	function useIsMobile(breakpoint = 640) {
		const [isMobile, setIsMobile] = useState(false)
		useEffect(() => {
			const check = () => setIsMobile(window.innerWidth < breakpoint)
			check()
			window.addEventListener('resize', check)
			return () => window.removeEventListener('resize', check)
		}, [breakpoint])
		return isMobile
	}

	const isMobile = useIsMobile()

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: !isMobile ? 1 : 1.15,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		onInit: () => setCurrentSlide(0),
		afterChange: (current: number) => setCurrentSlide(current)
	}

	return !isMobile ? (
		<section className='w-screen min-h-screen relative bg-sand-50 flex items-center'>
			<div className='grid-cols-full grid py-24 relative w-full'>
				<AnimatedLine customStyles='col-span-full mb-4 sm:hidden' />
				<div className='col-span-full flex justify-between items-center mb-6 sm:mb-12'>
					<AnimatedHeader
						customStyles='sm:text-5xl text-2xl font-bold text-forest-900'
						text={tCompletedProjects('completed_projects_header')}
					/>
					<div className='hidden sm:flex gap-2 items-center'>
						<button
							onClick={() => sliderRef.current?.slickPrev()}
							className='rounded-full bg-forest-700 border border-stone-300 hover:bg-forest-600 p-3 cursor-pointer'
						>
							<Arrow arrowCustomStyle='-rotate-180 fill-sand-50' />
						</button>
						<button
							onClick={() => sliderRef.current?.slickNext()}
							className='rounded-full bg-forest-700 border border-stone-300 hover:bg-forest-600 p-3 cursor-pointer'
						>
							<Arrow arrowCustomStyle='fill-sand-50' />
						</button>
					</div>
				</div>

				<div className='col-span-full overflow-hidden'>
					<Slider
						ref={sliderRef}
						{...settings}
					>
						{projectPages.map((page, pageIndex) => (
							<div
								key={pageIndex}
								className='outline-none'
							>
								<div className='grid grid-cols-14 sm:grid-cols-12 gap-x-6 sm:w-auto w-[200vw]'>
									{page.map(project => (
										<div
											key={project._id}
											className='col-span-5 sm:col-span-6'
										>
											<BigPost {...project} />
										</div>
									))}
								</div>
							</div>
						))}
					</Slider>
				</div>

				<div className='col-span-full mt-12 flex flex-col items-center'>
					<div className='bg-stone-300 h-[2px] w-full'>
						<motion.div
							className='bg-forest-900 h-full'
							animate={{
								width: `${totalSlides > 1 ? (currentSlide / (totalSlides - 1)) * 100 : 100}%`
							}}
							transition={{ ease: 'easeInOut', duration: 0.5 }}
						/>
					</div>
					<LinkWithArrow
						text={tCompletedProjects('see_more_projects')}
						href='/'
						arrowProps='group-hover/link:rotate-0 -rotate-45 fill-sand-50'
						customStyle='flex gap-1 mt-12 max-w-[15rem] w-full items-center [&>div:nth-child(1)]:py-2.5 [&>div:nth-child(1)]:px-4 [&>div]:text-sand-50 [&>div]:bg-forest-700 gap [&>div]:group-hover/link:bg-forest-800 [&>div]:group-hover/link:text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3'
					/>
				</div>
			</div>
		</section>
	) : (
		<section className='w-full relative bg-sand-50 py-20'>
			<div className='max-w-[390px] mx-auto'>
				<div className='pl-4'>
					<AnimatedHeader
						customStyles='text-3xl font-bold text-forest-900 mb-8'
						text='Proiecte realizate'
					/>
					<Slider
						ref={sliderRef}
						{...settings}
					>
						{data?.data?.blogs?.map(project => (
							<div
								key={project._id}
								className='pr-4 h-full ml-12'
							>
								<SmallPost {...project} />
							</div>
						))}
					</Slider>

					<div className='mt-12 flex flex-col items-center pr-6'>
						<div className='bg-stone-300 h-[2px] w-full rounded-full'>
							<motion.div
								className='bg-forest-900 h-full rounded-full'
								animate={{
									width: `${mobileTotalSlides > 1 ? (currentSlide / (mobileTotalSlides - 1)) * 100 : 100}%`
								}}
								transition={{ ease: 'easeInOut', duration: 0.5 }}
							/>
						</div>
						<div className='mt-12'>
							<LinkWithArrow
								text={tCompletedProjects('see_more_projects')}
								href='/'
								arrowProps='group-hover/link:rotate-0 -rotate-45 fill-sand-50 sm:fill-forest-900'
								customStyle='flex gap-1 mt-12 max-w-[15rem] w-full items-center [&>div:nth-child(1)]:py-2.5
                                 [&>div:nth-child(1)]:px-4 [&>div]:bg-forest-700 [&>div]:text-sand-50 sm:[&>div]:text-forest-900 sm:[&>div]:bg-sand-50 gap 
																 [&>div]:group-hover/link:bg-stone-200 [&>div]:rounded-full [&>div:nth-child(2)]:p-3'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default CompletedProjects

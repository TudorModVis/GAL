'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Slider from 'react-slick'

import { IGetParams } from '@/types/blog.types'

import AnimatedHeader from '../CommonComponents/AnimatedHeader'
import Arrow from '../CommonComponents/Arrow'
import LinkWithArrow from '../CommonComponents/LinkWithArrow'
import SmallPost from '../CommonComponents/SmallPost'

import { blogService } from '@/services/blog.service'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const LastNews = () => {
	const tLastNews = useTranslations('index.LastNews')
	const sliderRef = useRef<Slider>(null)
	const [currentSlide, setCurrentSlide] = useState(0)
	const [params, setParams] = useState<IGetParams>({
		page: 1,
		limit: 11
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

	const newsPages = useMemo(() => {
		if (!data?.data?.blogs) return []

		const pages = []
		for (let i = 0; i < data.data.blogs.length; i += 3) {
			pages.push(data.data.blogs.slice(i, i + 3))
		}
		return pages
	}, [data])

	const totalSlides = newsPages.length
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
		<section className='w-screen h-fit py-24 relative bg-forest-600 flex items-center'>
			<div className='grid-cols-full grid relative w-full'>
				<div className='col-span-full flex justify-between items-center mb-12'>
					<AnimatedHeader
						customStyles='text-5xl font-bold text-sand-50'
						text={tLastNews('last_news_header')}
					/>
					<div className='flex gap-2 items-center'>
						<button
							onClick={() => sliderRef.current?.slickPrev()}
							className='rounded-full bg-sand-50 hover:bg-stone-400 p-3 cursor-pointer'
						>
							<Arrow arrowCustomStyle='-rotate-180 fill-forest-900' />
						</button>
						<button
							onClick={() => sliderRef.current?.slickNext()}
							className='rounded-full bg-sand-50 hover:bg-stone-400 p-3 cursor-pointer'
						>
							<Arrow arrowCustomStyle='fill-forest-900' />
						</button>
					</div>
				</div>

				<div className='col-span-full overflow-hidden'>
					<Slider
						ref={sliderRef}
						{...settings}
					>
						{newsPages.map((page, pageIndex) => (
							<div
								key={pageIndex}
								className='outline-none'
							>
								<div className='grid grid-cols-12 gap-x-6'>
									{page.map(news => (
										<div
											key={news._id}
											className='col-span-4'
										>
											<SmallPost {...news} />
										</div>
									))}
								</div>
							</div>
						))}
					</Slider>
				</div>

				<div className='col-span-full mt-12 flex flex-col items-center'>
					<div className='bg-stone-500/50 h-[2px] w-full'>
						<motion.div
							className='bg-white h-full'
							animate={{
								width: `${totalSlides > 1 ? (currentSlide / (totalSlides - 1)) * 100 : 100}%`
							}}
							transition={{ ease: 'easeInOut', duration: 0.5 }}
						/>
					</div>
					<LinkWithArrow
						text={tLastNews('see_more_news')}
						href='/'
						arrowProps='group-hover/link:rotate-0 -rotate-45 fill-forest-900'
						customStyle='flex gap-1 mt-12 max-w-[15rem] w-full items-center [&>div:nth-child(1)]:py-2.5
                                 [&>div:nth-child(1)]:px-4 [&>div]:bg-sand-50 gap [&>div]:group-hover/link:bg-stone-200 [&>div]:rounded-full [&>div:nth-child(2)]:p-3'
					/>
				</div>
			</div>
		</section>
	) : (
		<section className='w-full relative bg-forest-600 py-20'>
			<div className='max-w-[390px] mx-auto'>
				<div className='pl-6'>
					<AnimatedHeader
						customStyles='text-3xl font-bold text-sand-50 mb-8'
						text={tLastNews('last_news_header')}
					/>

					<Slider
						ref={sliderRef}
						{...settings}
					>
						{data?.data?.blogs?.map(news => (
							<div
								key={news._id}
								className='pr-4 h-full ml-12'
							>
								<SmallPost {...news} />
							</div>
						))}
					</Slider>

					<div className='mt-12 flex flex-col items-center pr-6'>
						<div className='bg-stone-50/25 h-[2px] w-full rounded-full'>
							<motion.div
								className='bg-stone-50 h-full rounded-full'
								animate={{
									width: `${mobileTotalSlides > 1 ? (currentSlide / (mobileTotalSlides - 1)) * 100 : 100}%`
								}}
								transition={{ ease: 'easeInOut', duration: 0.5 }}
							/>
						</div>
						<div className='mt-12'>
							<LinkWithArrow
								text={tLastNews('see_more_news')}
								href='/'
								arrowProps='group-hover/link:rotate-0 -rotate-45 fill-forest-900'
								customStyle='flex gap-1 mt-12 max-w-[15rem] w-full items-center [&>div:nth-child(1)]:py-2.5
                                 [&>div:nth-child(1)]:px-4 [&>div]:bg-sand-50 gap [&>div]:group-hover/link:bg-stone-200 [&>div]:rounded-full [&>div:nth-child(2)]:p-3'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default LastNews

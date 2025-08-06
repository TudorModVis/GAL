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
	const [params, setParams] = useState<IGetParams>({ page: 1, limit: 12 })

	useEffect(() => {
		setParams({ page: 1, limit: 12 })
	}, [])

	const { data } = useQuery({
		queryKey: ['blogs', params],
		queryFn: () => blogService.getAllBlogs(params)
	})

	const totalSlides = useMemo(() => data?.data?.blogs?.length ?? 0, [data])

	const resetAutoplay = () => {
		if (!sliderRef.current) return
		sliderRef.current.slickPause()
		sliderRef.current.slickPlay()
	}

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
		slidesToShow: isMobile ? 1.15 : 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		onInit: () => setCurrentSlide(0),

		beforeChange: (_: number, next: number) => {
			const nextIndex = totalSlides ? next % totalSlides : 0
			setCurrentSlide(nextIndex)
			sliderRef.current?.slickPause()
		},
		afterChange: () => {
			sliderRef.current?.slickPlay()
		},

		onSwipe: () => {
			resetAutoplay()
		}
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
							className='rounded-full bg-sand-50 hover:bg-stone-200 duration-250 p-3 size-10 flex items-center justify-center cursor-pointer'
						>
							<Arrow arrowCustomStyle='-rotate-180 fill-forest-900' />
						</button>
						<button
							onClick={() => sliderRef.current?.slickNext()}
							className='rounded-full bg-sand-50 hover:bg-stone-200 duration-250 p-3 size-10 flex items-center justify-center cursor-pointer'
						>
							<Arrow arrowCustomStyle='fill-forest-900' />
						</button>
					</div>
				</div>

				<div className='col-span-full overflow-hidden -mx-4'>
					<Slider
						ref={sliderRef}
						className='[&_.slick-slide]:px-3'
						{...settings}
					>
						{data?.data?.blogs?.map(post => (
							<div key={post._id}>
								<SmallPost {...post} />
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
							transition={{ ease: 'easeInOut' }}
						/>
					</div>
					<LinkWithArrow
						text={tLastNews('see_more_news')}
						href='/news'
						arrowProps='group-hover/link:rotate-0 -rotate-45 fill-forest-900'
						customStyle='flex gap-1 mt-12 max-w-[15rem] w-full items-center [&>div:nth-child(1)]:py-2.5
                         [&>div:nth-child(1)]:px-4 [&>div]:bg-sand-50 gap [&>div]:group-hover/link:bg-stone-200 [&>div]:rounded-full [&>div:nth-child(2)]:p-3.5'
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
								className='pr-4 h-full ml-[13vw] [@media(min-width:430px)_and_(max-width:500px)]:ml-[12vw] [@media(min-width:501px)_and_(max-width:649px)]:ml-[10vw]'
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
									width: `${totalSlides > 1 ? (currentSlide / (totalSlides - 1)) * 100 : 100}%`
								}}
								transition={{ ease: 'easeInOut' }}
							/>
						</div>
						<div className='mt-12'>
							<LinkWithArrow
								text={tLastNews('see_more_news')}
								href='/news'
								arrowProps='group-hover/link:rotate-0 -rotate-45 fill-forest-900'
								customStyle='flex gap-1 mt-12 duration-250 transition max-w-[15rem] w-full items-center [&>div:nth-child(1)]:py-2.5
                             [&>div:nth-child(1)]:px-4 [&>div]:bg-sand-50 gap [&>div]:rounded-full [&>div:nth-child(2)]:p-3.5'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default LastNews

'use client'

import { useQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import { AuthenticLocalCategoriesEnum, BlogsContentTypeEnum, IGetParams } from '@/types/blog.types'

import { Pagination } from '../AdminComponents/NewsGrid/NewsCard/Pagination'

import AnimatedLine from './AnimatedLine'
import AnimatedText from './AnimatedText'
import BigPost from './BigPost'
import ColumnIcon from './ColumnIcon'
import GridIcon from './GridIcon'
import PostSkeleton from './PostSkeleton'
import SmallPost from './SmallPost'
import { blogService } from '@/services/blog.service'

interface VisualisationProps {
	header: string
	description: string
	type: string
	authenticType?: string
}

const itemVariants = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { duration: 0.2 } },
	exit: { opacity: 0, transition: { duration: 0.2 } }
}

const Visualization: React.FC<VisualisationProps> = props => {
	const [visualisationType, setVisualisationType] = useState(true)
	// În mod implicit va fi grid, adică true = grid
	const [params, setParams] = useState<IGetParams>({
		page: 1,
		limit: 2,
		content_type: props.type as BlogsContentTypeEnum,
		authentic_local_category: props.authenticType as AuthenticLocalCategoriesEnum,
		...(props.type !== 'NEWS' && {
			content_type: props.type as BlogsContentTypeEnum
		})
	})

	const updatePage = (newPage: number) => {
		setParams(prevParams => ({
			...prevParams,
			page: newPage
		}))
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const { data, isLoading } = useQuery({
		queryKey: ['blogs', params],
		queryFn: () => blogService.getAllBlogs(params)
	})

	const t = useTranslations('Visialization_type')

	return (
		<section className='w-screen h-fit grid grid-cols-full relative text-forest-900'>
			<AnimatedLine customStyles='col-span-full mb-2' />
			<AnimatedText
				text={props.header}
				customStyles='col-span-2 font-bold'
			/>
			<AnimatedText
				text={props.description}
				customStyles='col-span-4 col-start-4 mb-24'
			/>
			<div className='col-span-2 col-start-11 flex flex-col'>
				<AnimatedText
					text={t('type')}
					customStyles='text-right font-bold'
				/>
				<div className='flex justify-end gap-1 mt-2'>
					<button
						onClick={() => setVisualisationType(true)}
						className={`size-10 transition duration-300 small-custom-shadow relative ${
							!visualisationType ? 'bg-stone-50' : 'bg-forest-800'
						} rounded-full cursor-pointer flex justify-center items-center`}
					>
						<ColumnIcon color={!visualisationType ? 'fill-forest-800' : 'fill-stone-50'} />
					</button>
					<button
						onClick={() => setVisualisationType(false)}
						className={`size-10 transition duration-300 small-custom-shadow relative ${
							!visualisationType ? 'bg-forest-800' : 'bg-stone-50'
						} rounded-full cursor-pointer flex justify-center items-center`}
					>
						<GridIcon color={!visualisationType ? 'fill-stone-50' : 'fill-forest-800'} />
					</button>
				</div>
			</div>
			{isLoading ? (
				<PostSkeleton />
			) : data ? (
				<motion.div className='col-span-full grid grid-cols-12 gap-6'>
					<AnimatePresence mode='wait'>
						{data?.data.blogs.map((item, index) =>
							visualisationType ? (
								<motion.div
									key={'big-' + index}
									variants={itemVariants}
									initial='hidden'
									animate='show'
									exit='exit'
									className='col-span-6'
								>
									<BigPost {...item} />
								</motion.div>
							) : (
								<motion.div
									key={'small-' + index}
									variants={itemVariants}
									initial='hidden'
									animate='show'
									exit='exit'
									className='col-span-4 [&>div]:bg-amber-600!'
								>
									<SmallPost {...item} />
								</motion.div>
							)
						)}
					</AnimatePresence>
				</motion.div>
			) : (
				<div className='h-[calc(100vh-15rem)] grid place-content-center'>
					<p className='text-green-700 text-[1.25rem] text-center'>Nu s-a putut încărca</p>
				</div>
			)}
			{data && (
				<div className='col-span-full flex justify-center w-full'>
					<Pagination
						pagination={data.data.pagination}
						updatePage={updatePage}
						currentPage={params.page || 1}
					/>
				</div>
			)}
		</section>
	)
}

export default Visualization

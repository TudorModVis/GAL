/* eslint-disable */

import { AnimatePresence, motion } from 'motion/react'

import { IBlogsResponse } from '@/types/blog.types'

import { NewsCard } from './NewsCard/NewsCard'
import { Link } from '@/i18n/navigation'

interface Props extends Omit<IBlogsResponse, 'pagination' | 'filters'> {
	colsNumber: 2 | 3
}

export function NewsGrid({ colsNumber, blogs }: Props) {
	return (
		<AnimatePresence mode='wait' initial={false}>
			<motion.div
				key={colsNumber}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}
				className={`grid gap-[1.5rem] mt-[1.5rem]`}
				style={{
					gridTemplateColumns: `repeat(${colsNumber}, minmax(0, 1fr))`,
					gridAutoRows: 'minmax(0, 1fr)'
				}}
			>
				<Link href='/admin/create-blog'>
					<div className='bg-gray-100 h-full rounded-[1rem] grid place-content-center duration-300 border border-dashed border-gray-600'>
						<h2 className='text-lg font-semibold text-center'>Create New Blog</h2>
					</div>
				</Link>
				{blogs.map(blog => (
					<div key={blog._id}>
						<NewsCard {...blog} />
					</div>
				))}
			</motion.div>
		</AnimatePresence>
	)
}

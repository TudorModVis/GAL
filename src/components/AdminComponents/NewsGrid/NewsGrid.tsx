/* eslint-disable */

import { AnimatePresence, motion } from 'motion/react'

import { IBlogsResponse } from '@/types/blog.types'

import { NewsCard } from './NewsCard/NewsCard'
import { Link } from '@/i18n/navigation'
import { Plus } from 'lucide-react'
import { ADMIN_PAGES } from '@/config/admin-pages.config'
import { Pathnames } from '@/i18n/routing'

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
				<Link href={ ADMIN_PAGES.CREATE_BLOG as Pathnames }>
					<div className='bg-gray-300 h-full rounded-[1rem] flex items-center justify-center gap-[0.25rem] hover:opacity-70 transition-opacity duration-300 border border-dashed border-gray-500'>
						<Plus className='text-green-700 size-[1.125rem]' />
						<h2 className='text-[1rem] font-[500] text-green-700 text-center'>Create New Blog</h2>
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

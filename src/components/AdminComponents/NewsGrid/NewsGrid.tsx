import { AnimatePresence, motion } from 'motion/react'

import { IBlogsResponse } from '@/types/blog.types'

import { NewsCard } from './NewsCard'

interface Props extends IBlogsResponse {
	colsNumber: 2 | 3
}

export function NewsGrid({ colsNumber, blogs, pagination, filters }: Props) {
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
				{blogs.map(blog => (
					<motion.div key={blog._id}>
						<NewsCard {...blog} />
					</motion.div>
				))}
			</motion.div>
		</AnimatePresence>
	)
}

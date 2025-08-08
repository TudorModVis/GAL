import { AnimatePresence, motion } from 'motion/react'

interface Props {
	colsNumber: 2 | 3
    numberOfSkeletons?: number
}

export function SkeletonGrid({ colsNumber, numberOfSkeletons }: Props) {

	return (
		<div className='w-full mt-[1.5rem] flex justify-end'>
			<AnimatePresence mode='wait' initial={false}>
				<motion.div
					key={colsNumber}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}
					className={`grid w-full sidebar-req:w-[calc(100vw-20.625rem)] fullhd-threshold:w-[calc(var(--breakpoint-fullhd-threshold)-20.625rem)] gap-[1.5rem] items-stretch`}
					style={{
						gridTemplateColumns: `repeat(${colsNumber}, minmax(0, 1fr))`,
						gridAutoRows: 'minmax(0, 1fr)'
					}}
				>
					{Array.from({ length: numberOfSkeletons ? numberOfSkeletons + 1 : 12 }).map((_, index) => (
						<div key={index} className='w-full h-[31.25rem] bg-gray-400 animate-pulse rounded-[1rem]'>
						</div>
					))}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

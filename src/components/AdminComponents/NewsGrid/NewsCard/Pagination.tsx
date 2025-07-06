import Image from 'next/image'

import { IBlogsResponse } from '@/types/blog.types'

import { Button } from '../../ui/Button'

interface Props extends Omit<IBlogsResponse, 'blogs' | 'filters'> {
	updatePage: (newPage: number) => void
	currentPage: number
}

export function Pagination({ pagination, updatePage, currentPage }: Props) {
	return (
		<div className='flex items-center justify-center mt-[4rem] gap-[1rem]'>
			{currentPage !== 1 && (
				<Button onClick={() => updatePage(currentPage - 1)} className='px-[1.5rem] h-[2.5rem]  rounded-[1.25rem] flex items-center justify-center gap-[0.5rem] w-fit'>
					<Image
						src='/admin_assets/arrow-right.svg'
						alt='Previous Page'
						width={24}
						height={24}
						className='cursor-pointer size-[1.5rem] rotate-180'
						draggable={false}
					/>
					<p className='text-white font-manrope text-[1rem] leading-[1.125rem]'>Înapoi</p>
				</Button>
			)}

			<div className='flex items-center justify-center gap-[0.5rem]'>
				{Array.from({ length: Math.min(pagination.totalPages, 3) }, (_, index) => {
					const pageNum = index + 1
					return (
						<Button
							key={pageNum}
							className={`p-0 h-[2.5rem] rounded-[1.25rem] flex items-center justify-center ${
								currentPage === pageNum
									? 'bg-green-500 text-white w-[2.5rem]'
									: 'bg-white text-green-700 w-fit hover:bg-transparent duration-0'
							}`}
							onClick={() => updatePage(pageNum)}
						>
							{pageNum}
						</Button>
					)
				})}

				{pagination.totalPages > 3 && (
					<>
						<span className='text-green-700 w-fit text-center'>...</span>
						<Button
							className={`p-0 h-[2.5rem] rounded-[1.25rem] flex items-center justify-center ${
								currentPage === pagination.totalPages
									? 'bg-green-500 text-white w-[2.5rem]'
									: 'bg-white text-green-700 w-fit hover:bg-transparent duration-0'
							}`}
							onClick={() => updatePage(pagination.totalPages)}
						>
							{pagination.totalPages}
						</Button>
					</>
				)}
			</div>

			{currentPage !== pagination.totalPages && (
				<Button onClick={() => updatePage(currentPage + 1)} className='px-[1.5rem] h-[2.5rem]  rounded-[1.25rem] flex items-center justify-center gap-[0.5rem] w-fit'>
					<Image
						src='/admin_assets/arrow-right.svg'
						alt='Previous Page'
						width={24}
						height={24}
						className='cursor-pointer size-[1.5rem]'
						onClick={() => updatePage(currentPage + 1)}
						draggable={false}
					/>
					<p className='text-white font-manrope text-[1rem] leading-[1.125rem]'>Mai departe</p>
				</Button>
			)}
		</div>
	)
}

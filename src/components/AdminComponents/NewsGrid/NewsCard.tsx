import Image from 'next/image'

import { format } from 'date-fns'

import { IBlogResponse } from '@/types/blog.types'

export function NewsCard({ ...blog }: IBlogResponse) {
	console.log(blog)
	return (
		<div
			className='w-full flex flex-col bg-gray-300 rounded-[1rem] overflow-hidden'
			style={{ boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.1)' }}
		>
			<div className='w-full h-[25rem]'>
				<Image
					src='/breaker_image.png'
					alt='main image'
					width={700}
					height={400}
					className='object-cover w-full h-full'
				/>
			</div>

			<div className='p-[1.5rem]'>
				<div className='flex items-center justify-between mt-[1.5rem]'>
					<div className='flex items-center gap-[0.5rem]'>
						{blog.categories.map((category, index) => (
							<div
								key={`category-${index}`}
							>
								{category}
							</div>
						))}
					</div>

					<p>{ format(blog.updatedAt, 'dd.MM.yyyy') }</p>
				</div>
			</div>
		</div>
	)
}

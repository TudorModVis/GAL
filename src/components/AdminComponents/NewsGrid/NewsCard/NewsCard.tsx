import { format } from 'date-fns'
import { useLocale } from 'next-intl'
import Image from 'next/image'

import { IBlogResponse } from '@/types/blog.types'

import { ArrowIcon } from '../../Icons/ArrowIcon'
import { Button } from '../../ui/Button'

import { Category } from './Category'
import { Link } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

export function NewsCard({ ...blog }: IBlogResponse) {
	const locale = useLocale() as 'ro' | 'ru' | 'en'

	return (
		<Link href={`/admin/edit-blog/${blog._id}` as Pathnames} className='w-full'>
			<div
				className='cursor-pointer w-full flex flex-col bg-gray-300 rounded-[1rem] overflow-hidden group'
				style={{ boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.1)' }}
			>
				<div className='w-full h-[25rem]'>
					<Image
						src='/breaker_image.png'
						alt='main image'
						width={700}
						height={400}
						className='object-cover w-full h-full'
						draggable={false}
					/>
				</div>

				<div className='p-[1.5rem]'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-[0.5rem]'>
							{blog.categories.map((category, index) => (
								<Category
									key={`category-${index}`}
									category={category}
								/>
							))}
						</div>

						<p className='font-bold text-green-700 text-[0.75rem] leading-[0.875rem]'>
							{format(blog.updatedAt, 'dd.MM.yyyy')}
						</p>
					</div>

					<h2 className='mt-[1.5rem] line-clamp-2 font-bold text-green-700 text-[1.25rem] leading-[1.5rem]'>
						{blog.title[locale]}
					</h2>

					<p className='line-clamp-3 text-green-700 font-[400] text-[1rem] leading-[1.125rem] mt-[1rem]'>
						{blog.summary.column1[locale]}
					</p>

					<div className='flex items-center gap-[0.25rem] mt-[2rem]'>
						<Button className='hover:bg-green-500 w-fit font-[400] h-[2.5rem] px-[1rem] bg-white group-hover:bg-green-500 text-green-700 group-hover:text-white transition-colors duration-300'>
							Editează articolul
						</Button>
						<ArrowIcon className='bg-white group-hover:-rotate-45 rotate-0 group-hover:bg-green-500 group-hover:[&>svg>path]:fill-white transition-[colors_transform] duration-300' />
					</div>
				</div>
			</div>
		</Link>
	)
}

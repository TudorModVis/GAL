import { format } from 'date-fns'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

import { IBlogResponse } from '@/types/blog.types'

import { ADMIN_PAGES } from '@/config/admin-pages.config'

import { ArrowIcon } from '../../Icons/ArrowIcon'
import { Button } from '../../ui/Button'

import { Category } from './Category'
import { Link } from '@/i18n/navigation'
import { Pathnames } from '@/i18n/routing'

interface Props {
	blog: IBlogResponse
	cols: number
}

export function NewsCard({ blog, cols }: Props) {
	const locale = useLocale() as 'ro' | 'ru' | 'en'
	const t = useTranslations('Admin')

	return (
		<Link
			href={ADMIN_PAGES.getBlogEditPage(blog._id) as Pathnames}
			className='w-full h-full'
		>
			<div
				className='cursor-pointer w-full h-full flex flex-col bg-gray-300 rounded-[1rem] overflow-hidden group'
				style={{ boxShadow: '1px 1px 2px 0px rgba(0, 0, 0, 0.1)' }}
			>
				<div className={`w-full relative ${cols === 2 ? 'min-h-[25rem] max-h-[25rem]' : 'h-[16.5rem] max-h-[16.5rem]'}`}>
					<div
						className={`${cols === 2 && 'hidden'} flex absolute top-[1rem] left-[1rem] items-center gap-[0.5rem]`}
					>
						{blog.categories.map((category, index) => (
							<Category
								key={`category-${index}`}
								category={category}
							/>
						))}
					</div>
					<Image
						src={blog.main_image}
						alt='main image'
						width={700}
						height={400}
						className='object-cover w-full h-full'
						draggable={false}
					/>
				</div>

				<div className='p-[1.5rem] flex flex-col justify-between h-full'>
					<div>
						<div className={`flex items-center justify-between ${cols === 3 && 'hidden'}`}>
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

						<h2
							className={`${cols === 2 && 'mt-[1.5rem]'} line-clamp-2 font-bold text-green-700 text-[1.25rem] leading-[1.5rem]`}
						>
							{blog.title[locale]}
						</h2>

						<div
							className='line-clamp-3 text-green-700 font-[400] text-[1rem] leading-[1.125rem] mt-[1rem]'
							dangerouslySetInnerHTML={{ __html: blog.summary.column1[locale] }}
						></div>
					</div>

					<div
						className={`flex items-center gap-[0.25rem] mt-[2rem] ${cols === 3 && 'justify-between'}`}
					>
						<Button className='hover:bg-green-500 w-fit font-[400] h-[2.5rem] px-[1rem] bg-white group-hover:bg-green-500 text-green-700 group-hover:text-white transition-colors duration-300'>
							{t('edit_blog')}
						</Button>
						<ArrowIcon className='bg-white group-hover:-rotate-45 rotate-0 group-hover:bg-green-500 group-hover:[&>svg>path]:fill-white transition-[colors_transform] duration-300' />
					</div>
				</div>
			</div>
		</Link>
	)
}

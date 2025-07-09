'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { ThreeColIcon } from '@/components/AdminComponents/Icons/ThreeColIcon'
import { TwoColIcon } from '@/components/AdminComponents/Icons/TwoColIcon'
import { Pagination } from '@/components/AdminComponents/NewsGrid/NewsCard/Pagination'
import { NewsGrid } from '@/components/AdminComponents/NewsGrid/NewsGrid'
import { Spinner } from '@/components/AdminComponents/ui/Spinner/Spinner'

import { BlogsContentTypeEnum, IGetParams } from '@/types/blog.types'

import { blogService } from '@/services/blog.service'

export function PageContent() {
	const [cols, setCols] = useState<2 | 3>(2)
	const [params, setParams] = useState<IGetParams>({
		page: 1,
		limit: 11,
		content_type: BlogsContentTypeEnum.PROJECT
	})

	const { data, isLoading } = useQuery({
		queryKey: ['blogs', params],
		queryFn: () => blogService.getAllBlogs(params)
	})

	const updatePage = (newPage: number) => {
		setParams(prevParams => ({
			...prevParams,
			page: newPage
		}))
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<div className='mt-[2.5rem]'>
			<div className='flex items-center justify-end gap-[1rem]'>
				<p className='font-bold text-[1rem] leading-[1.125rem] text-green-700'>Tip vizualizare</p>
				<div className='flex items-center gap-[0.25rem]'>
					<TwoColIcon
						isActive={cols === 2}
						onClick={() => setCols(2)}
					/>
					<ThreeColIcon
						isActive={cols === 3}
						onClick={() => setCols(3)}
					/>
				</div>
			</div>

			{isLoading ? (
				<div className='w-full h-[calc(100vh-15rem)] grid place-content-center'>
					<Spinner />
				</div>
			) : data ? (
				data.data.blogs.length > 0 ? (
					<>
						<NewsGrid
							colsNumber={cols}
							blogs={data.data.blogs}
						/>
						<Pagination
							pagination={data.data.pagination}
							updatePage={updatePage}
							currentPage={params.page || 1}
						/>
					</>
				) : (
					<div className='h-[calc(100vh-15rem)] grid place-content-center'>
						<div className='text-center'>
							<p className='text-green-700 text-[1.25rem] mb-2'>No blogs found</p>
							<p className='text-gray-600 text-[0.875rem]'>
								There are no blogs to display at the moment.
							</p>
						</div>
					</div>
				)
			) : (
				<div className='h-[calc(100vh-15rem)] grid place-content-center'>
					<p className='text-green-700 text-[1.25rem] text-center'>Failed to load data</p>
				</div>
			)}
		</div>
	)
}

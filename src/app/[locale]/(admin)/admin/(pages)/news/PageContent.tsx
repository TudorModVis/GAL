'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { ThreeColIcon } from '@/components/AdminComponents/Icons/ThreeColIcon'
import { TwoColIcon } from '@/components/AdminComponents/Icons/TwoColIcon'
import { NewsGrid } from '@/components/AdminComponents/NewsGrid/NewsGrid'

import { IGetParams } from '@/types/blog.types'

import { blogService } from '@/services/blog.service'

export function PageContent() {
	const [cols, setCols] = useState<2 | 3>(2)
	const [params, setParams] = useState<IGetParams>({
		page: 1,
		limit: 12
	})

	const { data, isLoading } = useQuery({
		queryKey: ['blogs', params],
		queryFn: () => blogService.getAllBlogs(params)
	})

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
				<div className='mt-[2.5rem]'>Loading...</div>
			) : data ? (
				<NewsGrid
					colsNumber={cols}
					blogs={data.data.blogs}
                    pagination={data.data.pagination}
                    filters={data.data.filters}
				/>
			) : (
				<div className='mt-[2.5rem]'>No data available</div>
			)}
		</div>
	)
}

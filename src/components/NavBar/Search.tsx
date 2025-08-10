'use client'

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { BlogsContentTypeEnum } from '@/types/blog.types'
import { ResponseTypeEnums } from '@/types/search.types'
import { IMultiLangText } from '@/types/shared/text.types'

import { useSearchDebounce } from '@/hooks/useSearchDebounce'

import Arrow from '../CommonComponents/Arrow'

import Cross from './Cross'
import MagnifyGlass from './MagnifyGlass'
import SearchSidePart from './SearchSidePart'
import { useScrollLock } from './useScrollLock'
import { buildHref } from './utils/buildHref'
import { queryConfigFor } from './utils/queryConfigFor'
import { Link } from '@/i18n/navigation'

type Locale = keyof IMultiLangText
type AnyAxios = AxiosResponse<any, any>

type SearchProps = {
	hoveredMenu?: string | null
	handleHoverEnd?: () => void
}

export default function Search({ hoveredMenu = null, handleHoverEnd = () => {} }: SearchProps) {
	const locale = useLocale() as Locale
	const t = useTranslations('index.Search')
	const { search, data, isLoading, isError, isSuccess } = useSearchDebounce()
	const [isClicked, setIsClicked] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [filter, setFilter] = useState<'all' | 'news' | 'projects' | 'success'>('all')
	const [activeIdx, setActiveIdx] = useState<number>(0)
	const [mounted, setMounted] = useState(false)
	const queryClient = useQueryClient()
	const { lock, unlock } = useScrollLock()

	const results = data?.data.results
	const stats = data?.data.stats

	useEffect(() => setMounted(true), [])

	useEffect(() => {
		if (isClicked) setShowModal(true)
	}, [isClicked])

	useEffect(() => {
		if (!isClicked) return
		lock()
		return unlock
	}, [isClicked, lock, unlock])

	useEffect(() => {
		if (!isSuccess || !results?.length) return
		results.forEach(item => {
			const { queryKey, queryFn } = queryConfigFor(item)
			queryClient.prefetchQuery({ queryKey, queryFn: queryFn as () => Promise<unknown> })
		})
	}, [isSuccess, results, queryClient])

	const filteredResults = useMemo(() => {
		if (!results) return []
		switch (filter) {
			case 'news':
				return results.filter(r => r.content_type === BlogsContentTypeEnum.NEWS)
			case 'projects':
				return results.filter(r => r.content_type === BlogsContentTypeEnum.PROJECT)
			case 'success':
				return results.filter(r => r.content_type === BlogsContentTypeEnum.AUTHENTIC_LOCAL)
			default:
				return results
		}
	}, [results, filter])

	function kindFor(item: { response_type: any }) {
		switch (item.response_type) {
			case ResponseTypeEnums.MANAGEMENT:
				return 'management'
			case ResponseTypeEnums.DOCUMENT:
				return 'documents'
			default:
				return 'blog'
		}
	}

	const currentItem = filteredResults[activeIdx] ?? filteredResults[0]

	const { queryKey, queryFn } = currentItem
		? queryConfigFor(currentItem)
		: { queryKey: [], queryFn: undefined }

	const { data: payload } = useQuery<AnyAxios>({
		queryKey,
		queryFn: (queryFn ??
			(() => Promise.resolve(undefined as unknown as AnyAxios))) as () => Promise<AnyAxios>,
		enabled: !!currentItem && !!queryFn,
		placeholderData: keepPreviousData,
		staleTime: 600_000,
		gcTime: 1_800_000
	})

	const countForFilter = (current: typeof filter) => {
		if (!stats) return 0
		switch (current) {
			case 'news':
				return stats.total_blogs_news || 0
			case 'projects':
				return stats.total_blogs_project || 0
			case 'success':
				return stats.total_blogs_authentic_local || 0
			default:
				return stats.total_blogs || 0
		}
	}

	return (
		<>
			<button
				onClick={() => {
					setIsClicked(p => !p)
					if (hoveredMenu) handleHoverEnd()
				}}
				className={`cursor-pointer duration-250 flex justify-center items-center rounded-full ${
					isClicked ? 'bg-stone-50 hover:bg-stone-200' : 'bg-forest-800 hover:bg-forest-700'
				} transition p-3.5`}
			>
				{isClicked ? <Cross /> : <MagnifyGlass />}
			</button>

			{mounted &&
				showModal &&
				createPortal(
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: isClicked ? 1 : 0 }}
						transition={{ duration: 0.5 }}
						onAnimationComplete={() => !isClicked && setShowModal(false)}
						className='fixed top-0 -left-[50%] z-10 flex h-screen w-[200%] flex-col bg-black/35 backdrop-blur-xs'
					>
						<div className='relative mb-10 mt-[7.5rem] grid h-screen w-full grid-cols-full'>
							<div className='col-span-8 col-start-3 grid max-h-[751px] grid-cols-8 grid-rows-[4rem_4rem_1fr] gap-x-6 rounded-2xl bg-sand-50'>
								<input
									className='col-span-full h-16 bg-[url(/search.svg)] bg-[position:1.5rem_center] bg-no-repeat pl-14 pr-6 outline-none'
									type='search'
									onChange={e => search(e.target.value)}
									placeholder={t('placeholder')}
								/>

								<div className='col-span-full flex h-16 items-center space-x-2 bg-stone-50 px-6'>
									{(['all', 'news', 'projects', 'success'] as const).map(ft => (
										<div
											key={ft}
											onClick={() => setFilter(ft)}
											className={`cursor-pointer rounded-full px-4 py-2.5 ${
												filter === ft ? 'bg-forest-700 text-sand-50' : 'bg-sand-50 text-forest-900'
											}`}
										>
											{ft === 'all'
												? t('all')
												: ft === 'news'
													? t('news')
													: ft === 'projects'
														? t('projects')
														: t('authentic_local')}
											<span className='ml-2 rounded-full bg-sand-50 px-2 py-0.5 text-xs text-forest-900'>
												{countForFilter(ft)}
											</span>
										</div>
									))}
								</div>
								{!isLoading && filteredResults.length === 0 ? (
									<p className='text-base w-full col-span-full flex items-center justify-center'>
										{t('no_results')}
									</p>
								) : (
									<>
										<div className='col-span-4 col-start-1 mt-0 flex h-full flex-col overflow-hidden pb-7'>
											<span className='ml-12 mt-6 text-xs text-stone-600 col-span-4 col-start-1'>
												{countForFilter(filter)} {t('results')}
											</span>
											<div
												className='scrollable flex-1 overflow-y-auto overscroll-y-contain touch-pan-y pl-12 pr-2 pb-2 [&>a]:cursor-pointer'
												onWheelCapture={e => e.stopPropagation()}
												onTouchMoveCapture={e => e.stopPropagation()}
											>
												{isLoading && <p className='mt-4 text-sm text-stone-600'>{t('loading')}</p>}
												{isError && <p className='mt-4 text-sm text-red-600'>{t('error')}</p>}

												{filteredResults.map((item, idx) => (
													<Link
														key={item._id}
														href={buildHref(item)}
														locale={locale}
														onMouseEnter={() => setActiveIdx(idx)}
														onClick={() => setIsClicked(false)}
														className='block'
													>
														<div
															className={`group relative flex items-center justify-between px-2 py-2.5 transition rounded-xs ${
																activeIdx === idx ? 'bg-forest-500/20' : 'hover:bg-forest-500/20'
															}`}
														>
															{item.title[locale]}
															<div
																className={`ml-2 rotate-45 transition ${
																	activeIdx === idx
																		? 'opacity-100'
																		: 'opacity-0 group-hover:opacity-100'
																}`}
															>
																<Arrow arrowCustomStyle='fill-forest-900 -rotate-45' />
															</div>
														</div>
													</Link>
												))}
											</div>
										</div>

										<div className='relative col-span-4 col-start-5 rounded-br-2xl'>
											<SearchSidePart
												closeSearch={setIsClicked}
												tags={payload?.data?.categories ?? []}
												headerText={currentItem?.title[locale] ?? ''}
												imageSrc={payload?.data?.main_image}
												imageAlt={currentItem?.title[locale] ?? ''}
												summary={payload?.data?.summary?.column1?.[locale] ?? ''}
												kind={currentItem ? kindFor(currentItem) : undefined}
												locale={locale}
												href={currentItem ? buildHref(currentItem) : '/'}
											/>
										</div>
									</>
								)}
							</div>
						</div>
					</motion.div>,
					document.body
				)}
		</>
	)
}

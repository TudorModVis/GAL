'use client'

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { BlogsContentTypeEnum } from '@/types/blog.types'
import { IMultiLangText } from '@/types/shared/text.types'

import { useSearchDebounce } from '@/hooks/useSearchDebounce'

import { useScrollLock } from './useScrollLock'
import { buildHref } from './utils/buildHref'
import { queryConfigFor } from './utils/queryConfigFor'
import { Link } from '@/i18n/navigation'

type Locale = keyof IMultiLangText
type AnyAxios = AxiosResponse<any, any>
const FILTERS = ['all', 'news', 'projects', 'success'] as const
type Filter = (typeof FILTERS)[number]

type SearchResultItemProps = {
	item: any
	locale: Locale
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ item, locale }) => {
	const { queryKey, queryFn } = queryConfigFor(item)
	const {
		data: payload,
		isLoading,
		isError
	} = useQuery<AnyAxios>({
		queryKey,
		queryFn: (queryFn ??
			(() => Promise.resolve(undefined as unknown as AnyAxios))) as () => Promise<AnyAxios>,
		enabled: !!queryFn,
		placeholderData: keepPreviousData,
		staleTime: 600_000,
		gcTime: 1_800_000
	})

	const t = useTranslations('index.Search')

	return (
		<>
			<div className='grid-cols-full'>
				<Link
					key={item._id}
					href={buildHref(item)}
					locale={locale}
					className='grid grid-cols-8 gap-x-4'
				>
					<Image
						width={78}
						height={78}
						alt={item.title[locale]}
						src={payload?.data?.main_image ?? '/donation_image.png'}
						className='col-span-2 aspect-square rounded-lg object-cover'
					/>
					<div className='col-span-6 col-start-3 flex flex-col justify-center'>
						<p className='mb-2 line-clamp-2 text-base leading-4.5 text-forest-900'>
							{item.title[locale]}
						</p>
						{isLoading && <p className='text-xs text-stone-600'>{t('loading')}</p>}
						{isError && <p className='text-xs text-red-600'>{t('error')}</p>}
						{!isLoading && !isError && (
							<p
								className='line-clamp-2 text-xs leading-3 text-stone-600'
								dangerouslySetInnerHTML={{
									__html: payload?.data?.summary?.column1?.[locale] ?? ''
								}}
							/>
						)}
					</div>
				</Link>
			</div>
			<div className='h-[1px] w-screen border-b-[1px] border-black/25' />
		</>
	)
}

type SearchMobileProps = {
	isOpen: boolean
}

const SearchMobile: React.FC<SearchMobileProps> = ({ isOpen }) => {
	const locale = useLocale() as Locale
	const { search, data, isLoading, isError, isSuccess } = useSearchDebounce()
	const [filter, setFilter] = useState<Filter>('all')

	const queryClient = useQueryClient()
	const { lock, unlock } = useScrollLock()
	const barRef = useRef<HTMLDivElement>(null)

	const t = useTranslations('index.Search')
	const results = data?.data.results
	const stats = data?.data.stats

	useEffect(() => {
		if (isOpen) {
			lock()
			return unlock
		}
		unlock()
	}, [isOpen, lock, unlock])

	useEffect(() => {
		if (!isOpen) return

		const handleUserInteraction = (e: Event) => {
			const isInsideScrollable = (e.target as HTMLElement).closest('.scrollable')
			if (isInsideScrollable) unlock()
			else lock()
		}

		document.addEventListener('pointerdown', handleUserInteraction, {
			capture: true,
			passive: true
		})
		document.addEventListener('wheel', handleUserInteraction, { passive: true })
		document.addEventListener('touchmove', handleUserInteraction, {
			passive: true
		})

		return () => {
			document.removeEventListener('pointerdown', handleUserInteraction, true)
			document.removeEventListener('wheel', handleUserInteraction)
			document.removeEventListener('touchmove', handleUserInteraction)
		}
	}, [isOpen, lock, unlock])

	useEffect(() => {
		if (!isSuccess || !results?.length || !isOpen) return
		results.forEach(item => {
			const { queryKey, queryFn } = queryConfigFor(item)
			queryClient.prefetchQuery({
				queryKey,
				queryFn: queryFn as () => Promise<unknown>
			})
		})
	}, [isSuccess, results, queryClient, isOpen])

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

	const countForFilter = (current: Filter) => {
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
		<div>
			<div className='grid-cols-full'>
				<div className='mt-22 mb-6 flex h-4.5 items-center gap-4 col-span-full'>
					<Image
						src='/search.svg'
						width={16}
						height={16}
						alt='Search'
					/>
					<input
						name='search'
						className='h-4.5 w-full outline-none'
						type='search'
						onChange={e => search(e.target.value)}
						placeholder={t('placeholder')}
					/>
				</div>

				<div
					ref={barRef}
					className='flex h-14 items-center gap-2 overflow-x-scroll scrollbar-none snap-x snap-mandatory bg-stone-50 -mx-4 px-4 mb-6'
					style={{ WebkitOverflowScrolling: 'touch' }}
				>
					{FILTERS.map(ft => (
						<button
							key={ft}
							type='button'
							onClick={() => setFilter(ft)}
							className={
								'flex-shrink-0 snap-start select-none rounded-full px-3 py-1.5 text-xs ' +
								(filter === ft ? 'bg-forest-700 text-sand-50' : 'bg-sand-50 text-forest-900')
							}
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
						</button>
					))}
				</div>
			</div>

			{!isLoading && filteredResults.length === 0 ? (
				<p className='flex h-[calc(100vh-210px)] w-screen items-center justify-center text-base'>
					{t('no_results')}
				</p>
			) : (
				<div className='mt-6 flex max-h-[calc(100svh-112px)] flex-col overflow-hidden pb-30'>
					<span className='mx-auto mb-6 w-full max-w-[390px] px-4 text-xs text-stone-600'>
						{countForFilter(filter)} {t('results')}
					</span>

					<div className='scrollable grid flex-1 content-start gap-4 overflow-x-hidden overflow-y-auto overscroll-contain'>
						{isLoading && (
							<div className='flex w-screen justify-center'>
								<p className='mt-4 text-sm text-stone-600'>{t('loading')}</p>
							</div>
						)}
						{isError && (
							<div className='flex w-screen justify-center'>
								<p className='mt-4 text-sm text-red-600'>{t('error')}</p>
							</div>
						)}

						{filteredResults.map(item => (
							<SearchResultItem
								key={item._id}
								item={item}
								locale={locale}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default SearchMobile


// 'use client'

// import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
// import { AxiosResponse } from 'axios'
// import { useLocale, useTranslations } from 'next-intl'
// import Image from 'next/image'
// import React, { useEffect, useMemo, useState } from 'react'

// import { BlogsContentTypeEnum } from '@/types/blog.types'
// import { IMultiLangText } from '@/types/shared/text.types'

// import { useSearchDebounce } from '@/hooks/useSearchDebounce'

// import { useScrollLock } from './useScrollLock'
// import { buildHref } from './utils/buildHref'
// import { queryConfigFor } from './utils/queryConfigFor'
// import { Link } from '@/i18n/navigation'

// type Locale = keyof IMultiLangText
// type AnyAxios = AxiosResponse<any, any>

// type SearchResultItemProps = {
// 	item: any
// 	locale: Locale
// }

// const SearchResultItem: React.FC<SearchResultItemProps> = ({ item, locale }) => {
// 	const { queryKey, queryFn } = queryConfigFor(item)
// 	const {
// 		data: payload,
// 		isLoading,
// 		isError
// 	} = useQuery<AnyAxios>({
// 		queryKey,
// 		queryFn: (queryFn ??
// 			(() => Promise.resolve(undefined as unknown as AnyAxios))) as () => Promise<AnyAxios>,
// 		enabled: !!queryFn,
// 		placeholderData: keepPreviousData,
// 		staleTime: 600_000,
// 		gcTime: 1_800_000
// 	})

// 	const t = useTranslations('index.Search')

// 	return (
// 		<>
// 			<div className='grid-cols-full'>
// 				<Link
// 					key={item._id}
// 					href={buildHref(item)}
// 					locale={locale}
// 					className='grid grid-cols-8 gap-x-4'
// 				>
// 					<Image
// 						width={78}
// 						height={78}
// 						alt={item.title[locale]}
// 						src={payload?.data?.main_image ?? '/donation_image.png'}
// 						className='col-span-2 aspect-square rounded-lg object-cover'
// 					/>
// 					<div className='col-span-6 col-start-3 flex justify-center flex-col'>
// 						<p className='line-clamp-2 text-base text-forest-900 mb-2 leading-4.5'>
// 							{item.title[locale]}
// 						</p>
// 						{isLoading && <p className='text-xs text-stone-600'>{t('loading')}</p>}
// 						{isError && <p className='text-xs text-red-600'>{t('error')}</p>}
// 						{!isLoading && !isError && (
// 							<p
// 								className='text-xs text-stone-600 line-clamp-2 leading-3'
// 								dangerouslySetInnerHTML={{
// 									__html: payload?.data?.summary?.column1?.[locale] ?? ''
// 								}}
// 							/>
// 						)}
// 					</div>
// 				</Link>
// 			</div>
// 			<div className='border-b-[1px] border-black/25 w-screen h-[1px]'></div>
// 		</>
// 	)
// }

// type SearchMobileProps = {
// 	isOpen: boolean
// }

// const SearchMobile: React.FC<SearchMobileProps> = ({ isOpen }) => {
// 	const locale = useLocale() as Locale
// 	const { search, data, isLoading, isError, isSuccess } = useSearchDebounce()
// 	const [filter, setFilter] = useState<'all' | 'news' | 'projects' | 'success'>('all')
// 	const queryClient = useQueryClient()
// 	const { lock, unlock } = useScrollLock()

// 	const t = useTranslations('index.Search')
// 	const results = data?.data.results
// 	const stats = data?.data.stats

// 	useEffect(() => {
// 		if (isOpen) {
// 			lock()
// 			return unlock
// 		} else {
// 			unlock()
// 			return
// 		}
// 	}, [isOpen, lock, unlock])

// 	useEffect(() => {
// 		if (!isOpen) return

// 		const handleUserInteraction = (e: Event) => {
// 			const isInsideScrollable = (e.target as HTMLElement).closest('.scrollable')
// 			if (isInsideScrollable) {
// 				unlock()
// 			} else {
// 				lock()
// 			}
// 		}

// 		document.addEventListener('pointerdown', handleUserInteraction, {
// 			capture: true,
// 			passive: true
// 		})

// 		document.addEventListener('wheel', handleUserInteraction, { passive: true })
// 		document.addEventListener('touchmove', handleUserInteraction, { passive: true })

// 		return () => {
// 			document.removeEventListener('pointerdown', handleUserInteraction, true)
// 			document.removeEventListener('wheel', handleUserInteraction)
// 			document.removeEventListener('touchmove', handleUserInteraction)
// 		}
// 	}, [isOpen, lock, unlock])

// 	useEffect(() => {
// 		if (!isSuccess || !results?.length || !isOpen) return
// 		results.forEach(item => {
// 			const { queryKey, queryFn } = queryConfigFor(item)
// 			queryClient.prefetchQuery({ queryKey, queryFn: queryFn as () => Promise<unknown> })
// 		})
// 	}, [isSuccess, results, queryClient, isOpen])

// 	const filteredResults = useMemo(() => {
// 		if (!results) return []
// 		switch (filter) {
// 			case 'news':
// 				return results.filter(r => r.content_type === BlogsContentTypeEnum.NEWS)
// 			case 'projects':
// 				return results.filter(r => r.content_type === BlogsContentTypeEnum.PROJECT)
// 			case 'success':
// 				return results.filter(r => r.content_type === BlogsContentTypeEnum.AUTHENTIC_LOCAL)
// 			default:
// 				return results
// 		}
// 	}, [results, filter])

// 	const countForFilter = (current: typeof filter) => {
// 		if (!stats) return 0
// 		switch (current) {
// 			case 'news':
// 				return stats.total_blogs_news || 0
// 			case 'projects':
// 				return stats.total_blogs_project || 0
// 			case 'success':
// 				return stats.total_blogs_authentic_local || 0
// 			default:
// 				return stats.total_blogs || 0
// 		}
// 	}

// 	return (
// 		<div>
// 			<div className='grid-cols-full'>
// 				<div className='flex items-center h-4.5 gap-4 mt-22 mb-6 col-span-full'>
// 					<Image
// 						src='/search.svg'
// 						width={16}
// 						height={16}
// 						alt='Search'
// 					/>
// 					<input
// 						name='search'
// 						className='w-full outline-none h-4.5'
// 						type='search'
// 						onChange={e => search(e.target.value)}
// 						placeholder={t('placeholder')}
// 					/>
// 				</div>
// 				<div
// 					className='flex h-14 items-center bg-stone-50 overflow-x-auto no-scrollbar snap-x snap-mandatory mb-6'
// 					style={{
// 						WebkitOverflowScrolling: 'touch',
// 						touchAction: 'pan-x'
// 					}}
// 				>
// 					{(['all', 'news', 'projects', 'success'] as const).map(ft => (
// 						<div
// 							key={ft}
// 							onClick={() => setFilter(ft)}
// 							className={
// 								'flex-shrink-0 text-xs cursor-pointer rounded-full p-2 mr-2 whitespace-nowrap ' +
// 								(filter === ft ? 'bg-forest-700 text-sand-50' : 'bg-sand-50 text-forest-900')
// 							}
// 						>
// 							{ft === 'all'
// 								? t('all')
// 								: ft === 'news'
// 									? t('news')
// 									: ft === 'projects'
// 										? t('projects')
// 										: t('authentic_local')}
// 							<span className='ml-2 rounded-full bg-sand-50 px-2 py-0.5 text-xs text-forest-900'>
// 								{countForFilter(ft)}
// 							</span>
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 			{!isLoading && filteredResults.length === 0 ? (
// 				<p className='text-base w-screen h-[calc(100vh-210px)] col-span-full flex justify-center items-center'>
// 					{t('no_results')}
// 				</p>
// 			) : (
// 				<div className='mt-6 max-h-[calc(100svh-112px)] pb-30 flex flex-col overflow-hidden h-full'>
// 					<span className='text-xs text-stone-600 mb-6 w-full px-4 mx-auto max-w-[390px]'>
// 						{countForFilter(filter)} {t('results')}
// 					</span>

// 					<div className='scrollable flex-1 overflow-y-auto overscroll-contain overflow-x-hidden grid content-start gap-4'>
// 						{isLoading && (
// 							<div className='w-screen flex justify-center'>
// 								<p className='mt-4 text-sm text-stone-600'>{t('loading')}</p>
// 							</div>
// 						)}
// 						{isError && (
// 							<div className='w-screen flex justify-center'>
// 								<p className='mt-4 text-sm text-red-600'>{t('error')}</p>
// 							</div>
// 						)}

// 						{filteredResults.map(item => (
// 							<SearchResultItem
// 								key={item._id}
// 								item={item}
// 								locale={locale}
// 							/>
// 						))}
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// export default SearchMobile

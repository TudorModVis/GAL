'use client'

import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import React from 'react'

import AuthenticHeader, { Breadcrumb } from '@/components/CommonComponents/AuthenticHeader'
import AuthenticSkeleton from '@/components/CommonComponents/AuthenticSkeleton'
import BigSkeleton from '@/components/CommonComponents/BigSkeleton'
import InfoSection from '@/components/CommonComponents/InfoSection'
import NewsContent from '@/components/CommonComponents/NewsContent'
import Donation from '@/components/Donation/Donation'
import LastNews from '@/components/LastNews/LastNews'

import { IMultiLangText } from '@/types/shared/text.types'

import { blogService } from '@/services/blog.service'

const Page = () => {
	type Locale = keyof IMultiLangText
	const locale = useLocale() as Locale

	const t = useTranslations('index.TouristAttractions')
	const tCategories = useTranslations('BlogCategories')

	const formatDate = (isoDate?: string) => {
		if (!isoDate) return ''
		const date = new Date(isoDate)
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = date.getFullYear()
		return `${day}.${month}.${year}`
	}

	const params = useParams<{ 'tourist-attractions_name': string }>()
	const id = params['tourist-attractions_name']

	const { data, isSuccess } = useQuery({
		queryKey: ['blog', id],
		queryFn: () => blogService.getBlogById(id)
	})

	if (!isSuccess)
		return (
			<>
				<div className='hidden sm:block'>
					<AuthenticSkeleton />
				</div>
				<div className='block sm:hidden'>
					<BigSkeleton />
				</div>
			</>
		)

	const blog = data.data

	const locRaw = t.raw('location') as Record<string, string>

	const location: Breadcrumb[] = [
		{ text: locRaw['0'] ?? 'Home', link: '/' },
		{ text: locRaw['1'] ?? 'Authentic Local', link: '/authentic-local' },
		{ text: locRaw['2'] ?? 'Tourist Attractions', link: '/authentic-local/tourist-attractions' },
		{ text: blog.title[locale] }
	]

	const tags: string[] = Array.isArray(blog.categories)
		? blog.categories.map(k => tCategories(k))
		: [tCategories(blog.categories)]

	return (
		<main className='bg-sand-50 mb-12 sm:mb-[100vh]'>
			<div className='hidden sm:block'>
				<AuthenticHeader
					tags={tags}
					headerText={blog.title[locale]}
					lastActualization={formatDate(blog.updatedAt)}
					location={location}
					imageSrc={blog.main_image}
					imageAlt={blog.title[locale]}
					locale={locale}
				/>
			</div>
			<div className='block sm:hidden'>
				<InfoSection
					tags={tags}
					headerText={blog.title[locale]}
					lastActualization={formatDate(blog.updatedAt)}
					location={location}
					imageSrc={blog.main_image}
					imageAlt={blog.title[locale]}
					locale={locale}
				/>
			</div>
			<NewsContent
				summary={blog.summary}
				sections={blog.sections}
				locale={locale}
			/>
			<LastNews />
			<Donation />
		</main>
	)
}

export default Page

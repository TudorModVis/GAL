'use client'

import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import React from 'react'

import BigSkeleton from '@/components/CommonComponents/BigSkeleton'
import InfoSection from '@/components/CommonComponents/InfoSection'
import NewsContent from '@/components/CommonComponents/NewsContent'
import Donation from '@/components/Donation/Donation'

import { IMultiLangText } from '@/types/shared/text.types'

import { blogService } from '@/services/blog.service'

const page = () => {
	type Locale = keyof IMultiLangText
	const locale = useLocale() as Locale

	const t = useTranslations('index.News')
	const tCategories = useTranslations('BlogCategories')

	const formatDate = (isoDate?: string) => {
		if (!isoDate) return ''
		const date = new Date(isoDate)
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = date.getFullYear()
		return `${day}.${month}.${year}`
	}

	const { news_name } = useParams<{ news_name: string }>()
	const id = news_name
	const { data, isSuccess } = useQuery({
		queryKey: ['blog', id],
		queryFn: () => blogService.getBlogById(id)
	})

	if (!isSuccess) return <BigSkeleton />

	const blog = data.data

	const location = [
		...Object.values(t.raw('location') as Record<string, string>),
		blog.title[locale]
	]

	const tags: string[] = Array.isArray(blog.categories)
		? blog.categories.map(k => tCategories(k))
		: [tCategories(blog.categories)]

	return (
		<main className='bg-sand-50 mb-[100vh]'>
			<InfoSection
				tags={tags}
				headerText={blog.title[locale]}
				lastActualization={formatDate(blog.updatedAt)}
				location={location}
				imageSrc={blog.main_image}
				imageAlt={blog.title[locale]}
				locale={locale}
			/>
			<NewsContent
				summary={blog.summary}
				sections={blog.sections}
				locale={locale}
			/>
			<Donation />
		</main>
	)
}

export default page

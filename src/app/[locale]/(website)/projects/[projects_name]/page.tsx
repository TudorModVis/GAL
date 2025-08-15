'use client'

import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import React from 'react'

import BigSkeleton from '@/components/CommonComponents/BigSkeleton'
import InfoSection, { Breadcrumb } from '@/components/CommonComponents/InfoSection'
import NewsContent from '@/components/CommonComponents/NewsContent'
import Donation from '@/components/Donation/Donation'
import LastNews from '@/components/LastNews/LastNews'

import { IMultiLangText } from '@/types/shared/text.types'

import { blogService } from '@/services/blog.service'

const Page = () => {
	type Locale = keyof IMultiLangText
	const locale = useLocale() as Locale

	const t = useTranslations('index.Projects')
	const tCategories = useTranslations('BlogCategories')

	const formatDate = (isoDate?: string) => {
		if (!isoDate) return ''
		const date = new Date(isoDate)
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = date.getFullYear()
		return `${day}.${month}.${year}`
	}

	const { projects_name } = useParams<{ projects_name: string }>()
	const id = projects_name

	const { data, isSuccess } = useQuery({
		queryKey: ['blog', id],
		queryFn: () => blogService.getBlogById(id)
	})

	if (!isSuccess) return <BigSkeleton />

	const blog = data.data

	const locRaw = t.raw('location') as Record<string, string>

	const location: Breadcrumb[] = [
		{ text: locRaw['0'] ?? 'Home', link: '/' },
		{ text: locRaw['1'] ?? 'Projects', link: '/projects' },
		{ text: blog.title[locale] }
	]

	const tags: string[] = Array.isArray(blog.categories)
		? blog.categories.map(k => tCategories(k))
		: [tCategories(blog.categories)]

	return (
		<main className='bg-sand-50 mb-12 sm:mb-[100vh]'>
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
			<LastNews isPost={true} />
			<Donation />
		</main>
	)
}

export default Page

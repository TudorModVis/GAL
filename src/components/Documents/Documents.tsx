'use client'

import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

import { IDocumentsResponse } from '@/types/documents.types'
import { IMultiLangText } from '@/types/shared/text.types'

import AnimatedLine from '../CommonComponents/AnimatedLine'
import AnimatedText from '../CommonComponents/AnimatedText'
import InfoSection, { Breadcrumb } from '../CommonComponents/InfoSection'

import { documentsService } from '@/services/documents.service'

const pick = (t: IMultiLangText | undefined, loc: string) =>
	t?.[loc as keyof IMultiLangText] ?? t?.en ?? ''

const formatDate = (iso?: string) => {
	if (!iso) return ''
	const d = new Date(iso)
	return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1)
		.toString()
		.padStart(2, '0')}.${d.getFullYear()}`
}

const downloadFile = (url?: string) => {
	if (!url) return
	const a = document.createElement('a')
	a.href = url
	a.setAttribute('download', '')
	a.target = '_blank'
	document.body.appendChild(a)
	a.click()
	a.remove()
}

const Documents: React.FC = () => {
	const locale = useLocale()
	const t = useTranslations('index.Documents')
	const tCategories = useTranslations('BlogCategories')

	const tagKey = [
		'REGULATIONS',
		'STATUTE',
		'STRATEGY',
		'CONSTITUTION_AGREEMENT',
		'ANNUAL_REPORT'
	] as const
	const tags = tagKey.map(k => tCategories(k))

	const locRaw = t.raw('location') as Record<string, string>
	const location: Breadcrumb[] = [
		{ text: locRaw['0'] ?? 'Home', link: '/' },
		{ text: locRaw['1'] ?? 'AboutUs', link: '/aboutUs' },
		{ text: locRaw['2'] ?? 'Documents', link: '/documents' }
	]

	const { data } = useQuery({
		queryKey: ['documents'],
		queryFn: () => documentsService.getDocuments()
	})

	const docs = data?.data as IDocumentsResponse | undefined

	const sections: {
		key: 'regulations' | 'statuses' | 'strategies' | 'agreements' | 'reports'
		title: string
		btn: string
	}[] = [
		{ key: 'regulations', title: t('regulations'), btn: t('regulation_btn') },
		{ key: 'statuses', title: t('statute'), btn: t('statute_btn') },
		{ key: 'strategies', title: t('strategy'), btn: t('strategy_btn') },
		{ key: 'agreements', title: t('constitution_agreement'), btn: t('constitution_agreement_btn') },
		{ key: 'reports', title: t('annual_report'), btn: t('annual_report_btn') }
	]

	return (
		<main className='relative w-full h-fit sm:mb-[100vh] bg-sand-50'>
			<InfoSection
				tags={tags}
				headerText={t('title')}
				location={location}
				imageSrc={docs?.main_image ?? '/documents_image.png'}
				imageAlt='Documents Image'
				locale={locale}
				lastActualization={formatDate(docs?.updatedAt)}
				isAdminOrDocs
			/>

			<section className='w-screen h-fit flex flex-col'>
				{sections.map(({ key, title, btn }) => {
					const items = (docs?.[key] ?? []) as Array<{ text: IMultiLangText; file: string }>
					if (!items.length) return null

					return (
						<div
							key={key}
							className='grid grid-cols-full w-full'
						>
							<AnimatedLine customStyles='col-span-full mb-2' />
							<AnimatedText
								text={title}
								customStyles='font-bold col-span-full sm:col-span-3 sm:mb-0 mb-14'
							/>

							<div className='col-span-9 grid sm:grid-cols-2 gap-6'>
								{items.map((doc, idx) => (
									<div
										key={idx}
										className='flex flex-col gap-6'
									>
										<AnimatedText
											text={pick(doc.text, locale)}
											customStyles='col-span-full'
										/>
										<button
											onClick={() => downloadFile(doc.file)}
											disabled={!doc.file}
											className='bg-forest-800 hover:bg-forest-600 disabled:bg-forest-300 text-sand-50 cursor-pointer mb-24 w-fit px-4 py-2.5 rounded-full outline-none disabled:cursor-not-allowed'
										>
											{btn}
										</button>
									</div>
								))}
							</div>
						</div>
					)
				})}
			</section>
		</main>
	)
}

export default Documents

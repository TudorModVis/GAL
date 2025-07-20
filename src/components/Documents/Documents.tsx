'use client'

import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

import AnimatedLine from '../CommonComponents/AnimatedLine'
import AnimatedText from '../CommonComponents/AnimatedText'
import InfoSection, { Breadcrumb } from '../CommonComponents/InfoSection'

import { documentsService } from '@/services/documents.service'

const Documents = () => {
	const locale = useLocale()
	const t = useTranslations('index.Documents')
	const tCategories = useTranslations('BlogCategories')

	const tagKey = ['REGULATIONS', 'STATUTE', 'STRATEGY', 'CONSTITUTION_AGREEMENT', 'ANNUAL_REPORT']
	const tags: string[] = tagKey.map(k => tCategories(k))

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

	const formatDate = (isoDate?: string) => {
		if (!isoDate) return ''
		const date = new Date(isoDate)
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = date.getFullYear()
		return `${day}.${month}.${year}`
	}

	const documents = data?.data

	const downloadFile = (url?: string) => {
		if (!url) return
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', '')
		link.target = '_blank'
		document.body.appendChild(link)
		link.click()
		link.remove()
	}

	return (
		<main className='relative w-full h-fit mb-[100vh] bg-sand-50'>
			<InfoSection
				tags={tags}
				headerText={t('title')}
				location={location}
				imageSrc={documents?.main_image ?? '/documents_image.png'}
				imageAlt='Documents Image'
				locale={locale}
				lastActualization={formatDate(documents?.updatedAt)}
			/>

			<section className='w-screen h-fit flex flex-col'>
				{/* Regulations */}
				<div className='grid grid-cols-full relative w-full'>
					<AnimatedLine customStyles='col-span-full mb-2' />
					<AnimatedText
						text={t('regulations')}
						customStyles='font-bold col-span-3'
					/>
					<div className='col-span-3 flex flex-col gap-6'>
						<AnimatedText
							text={t('regulation_text')}
							customStyles='col-span-4 col-start-4'
						/>
						<button
							onClick={() => downloadFile(documents?.regulations?.[0]?.file)}
							disabled={!documents?.regulations?.[0]?.file}
							className='bg-forest-700 cursor-pointer hover:bg-forest-600 disabled:bg-forest-300 text-sand-50 w-fit px-4 py-2.5 rounded-full outline-none mb-24 disabled:cursor-not-allowed'
						>
							{t('regulation_btn')}
						</button>
					</div>
				</div>

				{/* Statute */}
				<div className='grid grid-cols-full relative w-full'>
					<AnimatedLine customStyles='col-span-full mb-2' />
					<AnimatedText
						text={t('statute')}
						customStyles='font-bold col-span-3'
					/>
					<div className='col-span-3 flex flex-col gap-6'>
						<AnimatedText
							text={t('statute_text')}
							customStyles='col-span-4 col-start-4'
						/>
						<button
							onClick={() => downloadFile(documents?.statuses?.[0]?.file)}
							disabled={!documents?.statuses?.[0]?.file}
							className='bg-forest-700 cursor-pointer hover:bg-forest-600 disabled:bg-forest-300 text-sand-50 w-fit px-4 py-2.5 rounded-full outline-none mb-24 disabled:cursor-not-allowed'
						>
							{t('regulation_btn')}
						</button>
					</div>
				</div>

				{/* Strategy */}
				<div className='grid grid-cols-full relative w-full'>
					<AnimatedLine customStyles='col-span-full mb-2' />
					<AnimatedText
						text={t('strategy')}
						customStyles='font-bold col-span-3'
					/>
					<div className='col-span-3 flex flex-col gap-6'>
						<AnimatedText
							text={t('strategy_text1')}
							customStyles='col-span-4 col-start-4'
						/>
						<button
							onClick={() => downloadFile(documents?.strategies?.[0]?.file)}
							disabled={!documents?.strategies?.[0]?.file}
							className='bg-forest-700 cursor-pointer hover:bg-forest-600 disabled:bg-forest-300 text-sand-50 w-fit px-4 py-2.5 rounded-full outline-none mb-24 disabled:cursor-not-allowed'
						>
							{t('strategy_btn')}
						</button>
					</div>
					<div className='col-span-3 flex flex-col gap-6'>
						<AnimatedText
							text={t('strategy_text2')}
							customStyles='col-span-4 col-start-8'
						/>
						<button
							onClick={() => downloadFile(documents?.strategies?.[1]?.file)}
							disabled={!documents?.strategies?.[1]?.file}
							className='bg-forest-700 cursor-pointer hover:bg-forest-600 disabled:bg-forest-300 text-sand-50 w-fit px-4 py-2.5 rounded-full outline-none mb-24 disabled:cursor-not-allowed'
						>
							{t('strategy_btn')}
						</button>
					</div>
				</div>

				{/* Constitution Agreement */}
				<div className='grid grid-cols-full relative w-full'>
					<AnimatedLine customStyles='col-span-full mb-2' />
					<AnimatedText
						text={t('constitution_agreement')}
						customStyles='font-bold col-span-3'
					/>
					<div className='col-span-3 flex flex-col gap-6'>
						<AnimatedText
							text={t('constitution_agreement_text')}
							customStyles='col-span-4 col-start-4'
						/>
						<button
							onClick={() => downloadFile(documents?.agreements?.[0]?.file)}
							disabled={!documents?.agreements?.[0]?.file}
							className='bg-forest-700 cursor-pointer hover:bg-forest-600 disabled:bg-forest-300 text-sand-50 w-fit px-4 py-2.5 rounded-full outline-none mb-24 disabled:cursor-not-allowed'
						>
							{t('constitution_agreement_btn')}
						</button>
					</div>
				</div>

				{/* Annual Report */}
				<div className='grid grid-cols-full relative w-full'>
					<AnimatedLine customStyles='col-span-full mb-2' />
					<AnimatedText
						text={t('annual_report')}
						customStyles='font-bold col-span-3'
					/>
					<div className='col-span-3 flex flex-col gap-6'>
						<AnimatedText
							text={t('annual_report_text1')}
							customStyles='col-span-4 col-start-4'
						/>
						<button
							onClick={() => downloadFile(documents?.reports?.[0]?.file)}
							disabled={!documents?.reports?.[0]?.file}
							className='bg-forest-700 cursor-pointer hover:bg-forest-600 disabled:bg-forest-300 text-sand-50 w-fit px-4 py-2.5 rounded-full outline-none mb-24 disabled:cursor-not-allowed'
						>
							{t('annual_report_btn')}
						</button>
					</div>
					<div className='col-span-3 flex flex-col gap-6'>
						<AnimatedText
							text={t('annual_report_text2')}
							customStyles='col-span-4 col-start-8'
						/>
						<button
							onClick={() => downloadFile(documents?.reports?.[1]?.file)}
							disabled={!documents?.reports?.[1]?.file}
							className='bg-forest-700 cursor-pointer hover:bg-forest-600 disabled:bg-forest-300 text-sand-50 w-fit px-4 py-2.5 rounded-full outline-none mb-24 disabled:cursor-not-allowed'
						>
							{t('annual_report_btn')}
						</button>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Documents

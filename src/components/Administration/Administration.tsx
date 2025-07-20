'use client'

import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

import AnimatedHeader from '../CommonComponents/AnimatedHeader'
import AnimatedLine from '../CommonComponents/AnimatedLine'
import AnimatedText from '../CommonComponents/AnimatedText'
import InfoSection, { Breadcrumb } from '../CommonComponents/InfoSection'

import { managementService } from '@/services/management.service'

const Administration = () => {
	const locale = useLocale()
	const t = useTranslations('index.Administration')
	const tCategories = useTranslations('BlogCategories')

	const tagKey = [
		'PRESIDENT',
		'EXECUTIVE_BODY',
		'GENERAL_ASSEMBLY',
		'BOARD_OF_DIRECTORS',
		'SELECTION_COMMITTEE',
		'AUDIT_COMMISSION'
	]
	const tags: string[] = tagKey.map(k => tCategories(k))

	const locRaw = t.raw('location') as Record<string, string>
	const location: Breadcrumb[] = [
		{ text: locRaw['0'] ?? 'Home', link: '/' },
		{ text: locRaw['1'] ?? 'AboutUs', link: '/aboutUs' },
		{ text: locRaw['2'] ?? 'Administration', link: '/administration' }
	]

	const { data } = useQuery({
		queryKey: ['management'],
		queryFn: () => managementService.getManagement()
	})

	const formatDate = (isoDate?: string) => {
		if (!isoDate) return ''
		const date = new Date(isoDate)
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = date.getFullYear()
		return `${day}.${month}.${year}`
	}

	const management = data?.data

	const renderMembers = (baseKey: string, columnCount = 1) => {
		const members = t.raw(`${baseKey}.members`) as string[]
		if (!members?.length) return null

		if (columnCount === 1) {
			return (
				<div className='col-span-4 flex flex-col gap-4 mb-24'>
					{members.map((member, idx) => (
						<AnimatedText
							key={idx}
							text={member}
						/>
					))}
				</div>
			)
		}

		const chunkSize = Math.ceil(members.length / columnCount)
		return (
			<>
				{Array.from({ length: columnCount }).map((_, colIdx) => (
					<div
						key={colIdx}
						className='col-span-4 flex flex-col gap-4 mb-24'
					>
						{members.slice(colIdx * chunkSize, (colIdx + 1) * chunkSize).map((member, idx) => (
							<AnimatedText
								key={idx}
								text={member}
							/>
						))}
					</div>
				))}
			</>
		)
	}

	const renderSelectionCommittee = () => {
		const members = t.raw('selectionCommittee.members') as string[]
		const substitutes = t.raw('selectionCommittee.substitutes') as string[]

		return (
			<>
				<div className='col-span-4 flex flex-col gap-4 mb-24'>
					{members.map((member, idx) => (
						<AnimatedText
							key={idx}
							text={member}
						/>
					))}
				</div>

				<div className='col-span-4 flex flex-col gap-4 mb-24'>
					<AnimatedText text={t('selectionCommittee.substitutesHeader') as string} />
					{substitutes.map((sub, idx) => (
						<AnimatedText
							key={idx}
							text={sub}
						/>
					))}
				</div>
			</>
		)
	}

	return (
		<main className='relative w-full h-fit mb-[100vh] bg-sand-50'>
			<InfoSection
				tags={tags}
				headerText={t('title')}
				location={location}
				imageSrc={management?.main_image ?? '/management_img.png'}
				imageAlt='Management Image'
				locale={locale}
				lastActualization={formatDate(management?.updatedAt)}
			/>

			<section className='w-screen h-fit flex flex-col'>
				<div className='grid grid-cols-full w-full relative'>
					<AnimatedHeader
						text={t('president.header')}
						customStyles='col-span-full text-5xl font-bold leading-13'
					/>
					<AnimatedLine customStyles='col-span-full mb-2 mt-12' />
					<AnimatedText
						text={t('president.detailsLabel')}
						customStyles='font-bold col-span-3'
					/>
					{renderMembers('president')}
				</div>

				<div className='grid grid-cols-full w-full relative'>
					<AnimatedHeader
						text={t('executiveBody.header')}
						customStyles='col-span-full text-5xl font-bold leading-13'
					/>
					<AnimatedLine customStyles='col-span-full mb-2 mt-12' />
					<AnimatedText
						text={t('executiveBody.detailsLabel')}
						customStyles='font-bold col-span-3'
					/>
					{renderMembers('executiveBody')}
				</div>

				<div className='grid grid-cols-full w-full relative'>
					<AnimatedHeader
						text={t('generalAssembly.header')}
						customStyles='col-span-full text-5xl font-bold leading-13'
					/>
					<AnimatedLine customStyles='col-span-full mb-2 mt-12' />
					<AnimatedText
						text={t('generalAssembly.subheader')}
						customStyles='font-bold col-span-3'
					/>
					{renderMembers('generalAssembly', 2)}
				</div>

				<div className='grid grid-cols-full w-full relative'>
					<AnimatedHeader
						text={t('boardOfDirectors.header')}
						customStyles='col-span-full text-5xl font-bold leading-13'
					/>
					<AnimatedLine customStyles='col-span-full mb-2 mt-12' />
					<AnimatedText
						text={t('boardOfDirectors.subheader')}
						customStyles='font-bold col-span-3'
					/>
					{renderMembers('boardOfDirectors')}
				</div>

				<div className='grid grid-cols-full w-full relative'>
					<AnimatedHeader
						text={t('selectionCommittee.header')}
						customStyles='col-span-full text-5xl font-bold leading-13'
					/>
					<AnimatedLine customStyles='col-span-full mb-2 mt-12' />
					<AnimatedText
						text={t('selectionCommittee.subheader')}
						customStyles='font-bold col-span-3'
					/>
					{renderSelectionCommittee()}
				</div>

				<div className='grid grid-cols-full w-full relative'>
					<AnimatedHeader
						text={t('auditCommission.header')}
						customStyles='col-span-full text-5xl font-bold leading-13'
					/>
					<AnimatedLine customStyles='col-span-full mb-2 mt-12' />
					<AnimatedText
						text={t('auditCommission.subheader')}
						customStyles='font-bold col-span-3'
					/>
					{renderMembers('auditCommission')}
				</div>
			</section>
		</main>
	)
}

export default Administration

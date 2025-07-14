'use client'

import { useLocale, useTranslations } from 'next-intl'
// import type { LinkProps } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'

import { BlogsContentTypeEnum, IBlogResponse } from '@/types/blog.types'
import { IMultiLangText } from '@/types/shared/text.types'

import AnimatedHeader from './AnimatedHeader'
import LinkWithArrow from './LinkWithArrow'
import { Link } from '@/i18n/navigation'

const bgClasses = ['bg-forest-800', 'bg-forest-700', 'bg-forest-600']

const BigPost: React.FC<IBlogResponse> = props => {
	const [isDragging, setIsDragging] = useState(false)
	type Locale = keyof IMultiLangText
	const locale = useLocale() as Locale
	const tPost = useTranslations('LinkArrow')
	const t = useTranslations('BlogCategories')

	const handleMouseDown = () => {
		setIsDragging(false)
	}

	const handleMouseMove = () => {
		setIsDragging(true)
	}

	const handleClick = (e: React.MouseEvent) => {
		if (isDragging) {
			e.preventDefault()
			e.stopPropagation()
		}
	}

	const formatDate = (isoDate?: string) => {
		if (!isoDate) return ''
		const date = new Date(isoDate)
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = date.getFullYear()
		return `${day}.${month}.${year}`
	}

	const getPathname = (type: BlogsContentTypeEnum) => {
		switch (type) {
			case 'NEWS':
				return {
					// Pass the KEY from routing.ts
					pathname: '/news/[news_id]' as const,
					params: { news_id: props._id }
				}
			case 'PROJECT':
				return {
					// Pass the KEY from routing.ts
					pathname: '/projects/[projects_id]' as const,
					params: { projects_id: props._id }
				}
			case 'AUTHENTIC_LOCAL':
				return {
					// Pass the CORRECTED KEY from routing.ts
					pathname: '/authentic-local/[authentic_local_id]' as const,
					// Use the CORRECTED param name
					params: { authentic_local_id: props._id }
				}
			default:
				return '/'
		}
	}

	return (
		<Link
			href={getPathname(props.content_type)}
			draggable='false'
			className='bg-stone-50 group col-span-6 custom-shadow w-full h-[605px] relative flex flex-col rounded-2xl overflow-hidden cursor-pointer select-none'
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onClick={handleClick}
		>
			<div className='h-1/2 relative'>
				<Image
					draggable='false'
					// schimba ALT-ul mai tarziu
					alt='imagine'
					src={props.main_image}
					fill
					style={{ objectFit: 'cover' }}
					sizes='50vw'
				/>
			</div>
			<div className='h-1/2 px-6 py-8 flex flex-col justify-between group text-forest-900'>
				<div className='flex justify-between items-center w-full'>
					<div className='flex gap-2'>
						{props.categories.map(tag => {
							const randomBg = bgClasses[tag.length % bgClasses.length]
							return (
								<div
									key={tag}
									className={`${randomBg} text-sand-50 text-xs py-1 px-3 rounded-sm`}
								>
									{t(tag)}
								</div>
							)
						})}
					</div>
					<span className='text-forest-900 text-xs font-bold'>{formatDate(props.createdAt)}</span>
				</div>
				<AnimatedHeader
					customStyles='font-bold text-xl leading-6'
					text={props.title[locale]}
				/>
				<h4
					className='leading-4.5 line-clamp-3'
					dangerouslySetInnerHTML={{ __html: props.summary.column1[locale] }}
				/>
				<LinkWithArrow
					asBtn
					text={tPost('read_article')}
					href='/'
					arrowProps='group-hover:fill-forest-900 group-hover:rotate-0 -rotate-45 fill-sand-50'
					customStyle='flex w-full gap-1 items-center [&>div:nth-child(1)]:py-2.5
                       [&>div:nth-child(1)]:px-4 [&>div]:group-hover:bg-sand-50 [&>div]:bg-forest-700 [&>div]:group-hover:text-forest-900 [&>div]:text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3'
				/>
			</div>
		</Link>
	)
}

export default BigPost

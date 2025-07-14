'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'

import { IBlogResponse } from '@/types/blog.types'
import { IMultiLangText } from '@/types/shared/text.types'

import AnimatedHeader from './AnimatedHeader'
import LinkWithArrow from './LinkWithArrow'
import { Link } from '@/i18n/navigation'

const bgClasses = ['bg-forest-800', 'bg-forest-700', 'bg-forest-600']

const SmallPost: React.FC<IBlogResponse> = props => {
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

	return (
		<Link
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onClick={handleClick}
			draggable='false'
			href={{
				pathname: '/news/[news_id]',
				params: { news_id: 'example-news' }
			}}
			className='grid col-span-4 pointer select-none'
		>
			<div className='bg-sand-50 my-3 custom-shadow relative flex h-[483px] sm:h-[500px] flex-col rounded-2xl overflow-hidden cursor-pointer group'>
				<div className='h-1/3 sm:h-1/2 relative'>
					<div className='absolute top-4 left-4 z-10 flex flex-wrap gap-2'>
						{props.categories.map((tag, index) => {
							const randomBg = bgClasses[tag.length % bgClasses.length]
							return (
								<div
									key={index}
									className={`${randomBg} py-1 px-4 text-sand-50 rounded-sm text-sm`}
								>
									{t(tag)}
								</div>
							)
						})}
					</div>
					<Image
						draggable='false'
						// schimba ALT-ul mai tarziu
						alt='imagine'
						src={props.main_image}
						fill
						style={{ objectFit: 'cover' }}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
				</div>
				<div className={`bg-stone-50 h-2/3 sm:h-1/2 px-4 pb-4 pt-6 flex justify-between flex-col`}>
					<AnimatedHeader
						customStyles='font-bold text-xl leading-6'
						text={props.title[locale]}
					/>
					<h4
						className='group-hover:opacity-100 leading-4.5 line-clamp-4 opacity-100 sm:opacity-0 transition-opacity duration-300'
						dangerouslySetInnerHTML={{ __html: props.summary.column1[locale] }}
					/>
					<LinkWithArrow
						asBtn
						text={tPost('read_article')}
						href='/'
						arrowProps='group-hover:fill-sand-50 group-hover:rotate-0 sm:-rotate-45 sm:fill-forest-900 fill-sand-50'
						customStyle='flex w-full justify-between items-center [&>div:nth-child(1)]:py-2.5
                      [&>div:nth-child(1)]:px-4 sm:[&>div]:group-hover:bg-forest-700 
											sm:[&>div]:group-hover:text-sand-50 [&>div]:rounded-full [&>div]:text-sand-50 [&>div]:bg-forest-700 sm:[&>div]:bg-sand-50 sm:[&>div]:text-forest-900
											[&>div:nth-child(2)]:p-3'
					/>
				</div>
			</div>
		</Link>
	)
}
export default SmallPost

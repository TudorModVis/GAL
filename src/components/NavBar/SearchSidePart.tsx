import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import React from 'react'

import LinkWithArrow from '../CommonComponents/LinkWithArrow'

import { Link } from '@/i18n/navigation'

interface SidePartProps {
	tags: string[]
	headerText: string
	imageSrc?: string
	imageAlt: string
	locale?: string
	summary?: string
	kind?: string
	closeSearch: React.Dispatch<React.SetStateAction<boolean>>
	href: any
}

const SearchSidePart: React.FC<SidePartProps> = props => {
	const tCategories = useTranslations('BlogCategories')
	const tLink = useTranslations('LinkArrow')
	const bgClasses = ['bg-forest-600', 'bg-forest-800', 'bg-forest-700', 'bg-forest-500']

	const auxTags: Record<'documents' | 'management', string[]> = {
		documents: ['REGULATIONS', 'STATUTE', 'STRATEGY', 'CONSTITUTION_AGREEMENT', 'ANNUAL_REPORT'],
		management: [
			'PRESIDENT',
			'EXECUTIVE_BODY',
			'GENERAL_ASSEMBLY',
			'BOARD_OF_DIRECTORS',
			'SELECTION_COMMITTEE',
			'AUDIT_COMMISSION'
		]
	}

	function hashString(str: string): number {
		let hash = 0
		for (let i = 0; i < str.length; i++) {
			hash = (hash << 5) - hash + str.charCodeAt(i)
			hash |= 0
		}
		return Math.abs(hash)
	}

	function pickBgClass(seed: string) {
		const idx = hashString(seed) % bgClasses.length
		return bgClasses[idx]
	}

	const rawTags =
		props.kind === 'documents' || props.kind === 'management' ? auxTags[props.kind] : props.tags

	const tags = useMemo(() => rawTags.map(k => tCategories(k)), [rawTags, tCategories])

	const [currentSrc, setCurrentSrc] = useState<string | undefined>(props.imageSrc)
	const [loaded, setLoaded] = useState<boolean>(false)

	useEffect(() => {
		if (!props.imageSrc || props.imageSrc === currentSrc) return
		let cancelled = false
		const img = new window.Image()
		img.decoding = 'async'
		img.src = props.imageSrc
		img.onload = () => {
			if (cancelled) return
			setCurrentSrc(props.imageSrc)
			setLoaded(false)
		}
		img.onerror = () => {
			if (cancelled) return
			setCurrentSrc(props.imageSrc)
			setLoaded(false)
		}
		return () => {
			cancelled = true
		}
	}, [props.imageSrc, currentSrc])

	const blurPixel = 'data:image/gif;base64,R0lGODlhAQABAAAAACw='

	return (
		<Link
			href={props.href}
			onClick={() => props.closeSearch(false)}
		>
			<div className='absolute left-6 top-6 z-10 flex h-full flex-col gap-2 pr-6 group'>
				<div className='flex flex-wrap items-center gap-2 text-sand-50'>
					{tags.map((tag, index) => (
						<span
							key={index}
							className={`${pickBgClass(tag)} rounded-sm px-4 py-1 text-xs whitespace-nowrap`}
						>
							{tag}
						</span>
					))}
				</div>

				<h3 className='text-2xl font-bold text-sand-50'>{props.headerText}</h3>

				{props.summary ? (
					<h4
						className='line-clamp-4 font-normal leading-4.5 text-sand-50'
						dangerouslySetInnerHTML={{ __html: props.summary }}
					/>
				) : null}

				<LinkWithArrow
					asBtn
					text={tLink('read_article')}
					href='/'
					arrowProps='group-hover:fill-forest-900 group-active:rotate-0 group-hover:rotate-0 -rotate-45 fill-sand-50'
					customStyle='flex w-full justify-between gap-1 items-center [&>div:nth-child(1)]:py-2.5 align-bottom mt-auto mb-12
                       [&>div:nth-child(1)]:px-4 [&>div]:group-hover:bg-sand-50 [&>div]:bg-forest-800 [&>div]:group-hover:text-forest-900 [&>div]:text-sand-50 [&>div]:rounded-full [&>div:nth-child(2)]:p-3.5'
				/>
			</div>

			{currentSrc && (
				<>
					<Image
						key={currentSrc}
						fill
						priority
						fetchPriority='high'
						className={`object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
						src={currentSrc}
						alt={props.imageAlt}
						placeholder='blur'
						blurDataURL={blurPixel}
						onLoadingComplete={() => setLoaded(true)}
					/>
					<div className='absolute inset-0 bg-black/[0.35]' />
				</>
			)}

			{!loaded && (
				<div
					className='h-full w-full animate-pulse bg-gray-500'
					aria-label='Loading image'
				/>
			)}
		</Link>
	)
}

export default SearchSidePart

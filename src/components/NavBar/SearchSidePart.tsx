import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import React from 'react'

interface SidePartProps {
	tags: string[]
	headerText: string
	imageSrc?: string
	imageAlt: string
	locale?: string
	summary?: string
	kind?: string
}

const SearchSidePart: React.FC<SidePartProps> = props => {
	const tCategories = useTranslations('BlogCategories')
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

	const tags = rawTags.map(k => tCategories(k))

	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		setLoaded(false)
	}, [props.imageSrc])

	return (
		<>
			<div className='absolute left-6 top-6 z-10 flex flex-wrap gap-2 pr-6'>
				<div className='flex gap-2 text-sand-50 items-center flex-wrap'>
					{tags.map((tag, index) => (
						<span
							key={index}
							className={`${pickBgClass(tag)} px-4 py-1 rounded-sm text-xs whitespace-nowrap`}
						>
							{tag}
						</span>
					))}
				</div>

				<h3 className='text-2xl font-bold text-sand-50'>{props.headerText}</h3>

				{props.summary ? (
					<h4
						className='font-normal leading-4.5 text-sand-50 line-clamp-4'
						dangerouslySetInnerHTML={{ __html: props.summary }}
					/>
				) : null}
			</div>

			{props.imageSrc && (
				<>
					<Image
						fill
						className={`object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
						src={props.imageSrc}
						alt={props.imageAlt}
						onLoadingComplete={() => setLoaded(true)}
					/>
					<div className='absolute inset-0 bg-black/[0.35]'></div>
				</>
			)}

			{!loaded && (
				<div
					className='h-full w-full bg-gray-500 animate-pulse'
					aria-label='Loading image'
				/>
			)}
		</>
	)
}

export default SearchSidePart

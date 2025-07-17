import React, { ComponentProps } from 'react'

import AnimatedHeader from './AnimatedHeader'
import AnimatedLine from './AnimatedLine'
import AnimatedText from './AnimatedText'
import Arrow from './Arrow'
import ParalaxImage from './ParalaxImage'
import { Link } from '@/i18n/navigation'

type LinkHref = ComponentProps<typeof Link>['href']

export interface Breadcrumb {
	text: string
	link?: LinkHref
}

interface InfoSectionProps {
	tags: string[]
	headerText: string
	lastActualization?: string
	location: Breadcrumb[]
	imageSrc: string
	imageAlt: string
	locale?: string
}

const InfoSection: React.FC<InfoSectionProps> = props => {
	const actualization =
		props.locale === 'ro'
			? 'Ultima actualizare'
			: props.locale === 'ru'
				? 'Последнее обновление'
				: 'Last updated'

	return (
		<section className='w-screen h-fit grid grid-cols-full relative text-forest-900 align-content-start pt-24'>
			<div className='col-span-9 flex flex-col mt-24'>
				<div className='flex gap-2 text-sand-50 items-center'>
					{props.tags.map((tag, index) => (
						<span
							key={index}
							className='bg-forest-800 px-3 py-1 rounded-sm mr-2 mb-2 text-nowrap'
						>
							{tag}
						</span>
					))}
				</div>
				<AnimatedHeader
					text={props.headerText}
					customStyles='leading-13 text-5xl font-bold my-4'
				/>
				{props.lastActualization && (
					<AnimatedText
						text={actualization + ' ' + props.lastActualization}
						customStyles='leading-4.5 mb-6 font-bold'
					/>
				)}
			</div>

			<AnimatedLine customStyles='col-span-full mt-24 mb-2' />

			<div
				aria-label='Breadcrumb'
				className='flex gap-1 items-center col-span-full'
			>
				{props.location.map((loc, index) => {
					const isLast = index === props.location.length - 1
					const baseClass = isLast ? 'text-forest-900' : 'text-stone-600'
					return (
						<React.Fragment key={index}>
							{loc.link && !isLast ? (
								<Link
									href={loc.link}
									className={`${baseClass} hover:underline`}
								>
									{loc.text}
								</Link>
							) : (
								<span
									className={baseClass}
									aria-current={isLast ? 'page' : undefined}
								>
									{loc.text}
								</span>
							)}
							{!isLast && <Arrow arrowCustomStyle='fill-stone-600 scale-75' />}
						</React.Fragment>
					)
				})}
			</div>

			<div className='w-[1448px] h-[64vh] overflow-hidden mt-6 rounded-2xl mb-40 col-span-full'>
				<ParalaxImage
					altText={props.imageAlt}
					source={props.imageSrc}
				/>
			</div>
		</section>
	)
}

export default InfoSection

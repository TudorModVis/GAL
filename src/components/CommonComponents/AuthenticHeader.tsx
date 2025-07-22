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

interface AuthenticHeaderProps {
	tags: string[]
	headerText: string
	lastActualization?: string
	location: Breadcrumb[]
	imageSrc: string
	imageAlt: string
	locale?: string
}

const AuthenticHeader: React.FC<AuthenticHeaderProps> = props => {
	const actualization =
		props.locale === 'ro'
			? 'Data publicării'
			: props.locale === 'ru'
				? 'Дата публикации'
				: 'Publication date'

	return (
		<section className='w-screen h-fit grid grid-cols-donation relative text-forest-900 align-content-start pt-24 mb-40'>
			<div className='w-full h-[64vh] overflow-hidden mt-24 rounded-2xl col-span-11'>
				<ParalaxImage
					altText={props.imageAlt}
					source={props.imageSrc}
				/>
			</div>
			<div className=' col-span-12 col-start-13 mt-24 flex flex-col'>
				<AnimatedLine customStyles='mb-2 w-full' />
				<div
					aria-label='Breadcrumb'
					className='space-x-1 w-full'
				>
					{props.location.map((loc, index) => {
						const isLast = index === props.location.length - 1
						const baseClass = isLast ? 'text-forest-900' : 'text-stone-600'

						const Crumb =
							loc.link && !isLast ? (
								<span
									// href={loc.link}
									className={`${baseClass} hover:underline`}
								>
									{loc.text}
								</span>
							) : (
								<span
									className={baseClass}
									aria-current={isLast ? 'page' : undefined}
								>
									{loc.text}
								</span>
							)

						return (
							<span
								key={index}
								className='items-center inline'
							>
								{Crumb}
								{!isLast && <Arrow arrowCustomStyle='fill-stone-600 ml-1 scale-75' />}
							</span>
						)
					})}
				</div>
				<div className='w-full flex flex-col mt-auto'>
					<div className='flex gap-2 text-sand-50 items-center'>
						{props.tags.map((tag, index) => (
							<span
								key={index}
								className='bg-forest-800 px-4 text-xs py-1 rounded-sm text-nowrap'
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
							customStyles='leading-4.5 font-bold'
						/>
					)}
				</div>
			</div>
		</section>
	)
}

export default AuthenticHeader

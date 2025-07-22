import React from 'react'

import { ISection, ISummary } from '@/types/blog.types'
import { IMultiLangText } from '@/types/shared/text.types'

import AnimatedHeader from './AnimatedHeader'
import AnimatedLine from './AnimatedLine'
import AnimatedText from './AnimatedText'
import ParalaxImage from './ParalaxImage'

export type Locale = 'ro' | 'ru' | 'en'

export interface NewsContentProps {
	summary: ISummary
	sections: ISection[]
	locale: Locale
}

const t = (value: IMultiLangText | undefined, locale: Locale): string => {
	if (!value) return ''
	return value[locale] ?? ''
}

const NewsContent: React.FC<NewsContentProps> = ({ summary, sections, locale }) => {
	const summaryColumns = [summary.column1, summary.column2].filter(Boolean) as IMultiLangText[]

	return (
		<section className='w-screen h-fit grid grid-cols-full relative text-forest-900'>
			<AnimatedLine customStyles='col-span-full mb-2' />
			<AnimatedText
				text={t({ ro: 'Sumarul proiectului', ru: 'Сводка проекта', en: 'Project summary' }, locale)}
				customStyles='col-span-2 font-bold leading-4.5'
			/>
			{summaryColumns.map((c, idx) => (
				<AnimatedText
					key={`summary-${idx}`}
					text={t(c, locale)}
					customStyles={`col-span-4 col-start-${4 + idx * 4} leading-4.5`}
				/>
			))}

			{sections.map((section, sIdx) => (
				<React.Fragment key={`section-${sIdx}`}>
					<AnimatedHeader
						text={t(section.title, locale)}
						customStyles='col-span-9 text-5xl leading-13 font-bold mt-24'
					/>
					{section.subsections.map((sub, subIdx) => (
						<React.Fragment key={`sub-${sIdx}-${subIdx}`}>
							<AnimatedLine customStyles='col-span-full mb-2 mt-12' />
							<AnimatedText
								text={t(sub.title, locale)}
								customStyles='col-span-2 font-bold leading-4.5'
							/>
							<AnimatedText
								text={t(sub.column1, locale)}
								customStyles='col-span-4 col-start-4 leading-4.5'
							/>
							<AnimatedText
								text={t(sub.column2, locale)}
								customStyles='col-span-4 col-start-8 leading-4.5'
							/>
							{/* Display all images for the subsection, if any */}
							{sub.images && sub.images.length > 0 && (
								<div className='col-span-full mt-24 mb-16 space-y-24'>
									{sub.images.map((src, imgIdx) => (
										<div
											key={`img-${sIdx}-${subIdx}-${imgIdx}`}
											className='w-[1448px] h-[64vh] overflow-hidden rounded-2xl'
										>
											<ParalaxImage
												altText={`${t(sub.title, locale)} image ${imgIdx + 1}`}
												source={src.url}
											/>
										</div>
									))}
								</div>
							)}
						</React.Fragment>
					))}
				</React.Fragment>
			))}
		</section>
	)
}

export default NewsContent

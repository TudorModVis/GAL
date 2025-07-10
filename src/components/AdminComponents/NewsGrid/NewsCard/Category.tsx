import { useTranslations } from 'next-intl'

import { BlogsCategoriesEnum } from '@/types/blog.types'

import { getCategoryColor } from '@/lib/news-card.utils'

interface Props {
	category: BlogsCategoriesEnum
}

export function Category({ category }: Props) {
	const t = useTranslations('BlogCategories')

	return (
		<div
			className={`h-[1.5rem] rounded-[0.25rem] px-[1rem] flex items-center justify-center ${getCategoryColor(category)}`}
		>
			<p className='text-[0.75rem] leading-[0.875rem] font-[400] text-white'>{t(category)}</p>
		</div>
	)
}

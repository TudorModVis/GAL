import { setRequestLocale } from 'next-intl/server'

import ClientPart from './ClientPart'
import { blogService } from '@/services/blog.service'
import { IBlogResponse } from '@/types/blog.types'

export type Locale = 'ro' | 'ru' | 'en'

interface IMultiLangText {
	ro: string
	ru: string
	en: string
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ locale: Locale; id: string }>
}) {
	const { locale, id } = await params
	setRequestLocale(locale)

	let imageFromBackend: string | undefined
	let title: string | undefined
	let description: string | undefined

	try {
		const { data } = (await blogService.getBlogById(id)) as {
			data: IBlogResponse
		}

		imageFromBackend = data?.main_image
		title = data?.title?.[locale]
		description = data?.summary?.column1?.[locale]
	} catch {}

	const fallbackImage = '/videoPoster.jpg'
	const image = imageFromBackend || fallbackImage

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [{ url: image, alt: title }]
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [image]
		}
	}
}

export default async function Projects() {
	return <ClientPart />
}

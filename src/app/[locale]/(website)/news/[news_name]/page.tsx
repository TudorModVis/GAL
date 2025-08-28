import { getTranslations, setRequestLocale } from 'next-intl/server'

import type { IBlogResponse } from '@/types/blog.types'

import ClientPart from './ClientPart'
import { blogService } from '@/services/blog.service'

export type Locale = 'ro' | 'ru' | 'en'

export async function generateMetadata({
	params
}: {
	params: { locale: Locale; news_id: string }
}) {
	const { locale, news_id } = params
	setRequestLocale(locale)

	const t = await getTranslations('index.meta')
	let title: string = t('title')
	let description: string = t('description')
	let image: string = '/meta_image.jpg'

	const key = decodeURIComponent(news_id).normalize?.('NFC') ?? news_id

	try {
		const res = await blogService.getBlogById(key)
		const data: IBlogResponse = (res as any)?.data ?? (res as any)

		if (data?.main_image) image = data.main_image

		const rawTitle = (data as any)?.title
		const localizedTitle = typeof rawTitle === 'object' ? rawTitle?.[locale] : rawTitle
		if (localizedTitle) title = String(localizedTitle)

		const rawSummary = (data as any)?.summary
		const maybeDesc: unknown = rawSummary?.column1
			? typeof rawSummary.column1 === 'object'
				? rawSummary.column1?.[locale]
				: rawSummary.column1
			: typeof rawSummary === 'object'
				? rawSummary?.[locale]
				: rawSummary

		if (maybeDesc) description = htmlToPlainText(String(maybeDesc))
	} catch (e) {
		console.error('generateMetadata(news):', e)
	}

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

function htmlToPlainText(html?: string): string {
	if (!html) return ''
	const withoutTags = html.replace(/<[^>]*>/g, ' ')
	const decoded = withoutTags
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
	return decoded.replace(/\s+/g, ' ').trim()
}

export default async function News() {
	return <ClientPart />
}
